var express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var path = require('path');
var formidable = require('formidable');
var session = require('express-session');
var fs = require('fs');//file system - folosim pt administrare de directoare si fisiere  (inclusiv citit+scris)
var crypto= require('crypto');
var app = express();//createServer

// pentru folosirea ejs-ului 
app.set('view engine', 'ejs');

app.use(session({
	secret: "parola_sesiune",
	resave:true,
	saveUninitialized:false
})) // o sa apara campul session in request: req.session care va fi acelasi obiect pentru toate requesturile


console.log("cale proiect: "+ __dirname)
app.use(express.static(path.join( __dirname, "resurse")));

// -------------------cereri post-------------------------------

//<form method="post" action="/inreg"
app.post('/inreg', function(req, res){
  var dateFormular= new formidable.IncomingForm()
	dateFormular.parse(req, function(err, fields, files){
		//in files o sa am campurile de tip file <input type="file"
		//in fields o sa am restul
		//campurile(proprietatile) din fields sunt valorile atributelor name (de exemplu, fields.username, pentru ca aveam un name="username") din inputurile formularului, iar valorile proprietatilor sunt ce a introdus utilizatorul in acele inputuri
		var textFisier= fs.readFileSync("useri.json") //cale relativa la index.js
		var objson=JSON.parse(textFisier);
		var parolaCriptata;
		var algCriptare=crypto.createCipher("aes-128-cbc", "cheie_de_criptare")
		parolaCriptata=algCriptare.update(fields.parola, "utf8", "hex");
		parolaCriptata+=algCriptare.final("hex");
		if(fields.dorinte){
			console.log(fields.dorinte.length)
			sird=fields.dorinte
		}
		else sird=""
		var utilizatorNou={
      id:objson.lastId,
      username:fields.username,
      nume:fields.nume,
      prenume:fields.prenume,
      email:fields.email,
      parola:parolaCriptata,
      data: new Date(),
            rol: "user",
      nivel_de_joc: fields.nivel_de_joc,
      participant_la_turnee: fields.participant_la_turnee,
      tip_de_joc:fields.tip_de_joc,
      varsta:fields.varsta,
	  dorinte: sird
        }
    objson.useri.push(utilizatorNou)
    objson.lastId += 1

		//stringify trece de la obiect la sir (opusul lui JSON.parse)
    var jsonNou=JSON.stringify(objson);
		fs.writeFileSync("useri.json", jsonNou);
		res.redirect("/");
	});
	     
}) 



app.post('/login', function(req, res){
  var dateFormular= new formidable.IncomingForm()
	dateFormular.parse(req, function(err, fields, files){	
		var textFisier= fs.readFileSync("useri.json") //cale relativa la index.js
		var objson=JSON.parse(textFisier);
		var parolaCriptata;
		var algCriptare=crypto.createCipher("aes-128-cbc", "cheie_de_criptare")
		parolaCriptata=algCriptare.update(fields.parola, "utf8", "hex");
		parolaCriptata+=algCriptare.final("hex");
		
		//user e null daca nu gaseste un utiliz cu acea conditie
		var user=objson.useri.find(function(el){
			return el.username == fields.username && el.parola == parolaCriptata
		})
		if(user){
			console.log("S-a logat un user!");
			req.session.utilizator=user;
			res.render("html/index", {username: user.username});
		}
	});
}) 

// --------------  cereri get ------------------------
// cand se face o cerere get catre pagina de index 
app.get('/', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
	var u=req.session ? (req.session.utilizator ? req.session.utilizator.username : null) :null;
	console.log(u);
  res.render('html/index',{username:u});
});
app.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect("/");
})
/*
app.get('/test', function(req, res) {
	//afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) 
    res.render('html/test');
});
*/
app.get('/ceva', function(req, res) {
	console.log("whatever")
	//<link type="image/x-icon"
	res.setHeader("Content-Type", "text/html");
	res.write("<html><body>");
	//if(....)
	res.write("<p>Ce mai faci?</p></body></html>");
	res.end();
});

app.get('/*', function(req, res){
	var u=(req.session? (req.session.utilizator? req.session.utilizator.username: null) :null);
  res.render('html' + req.url,{username:u}, function(err, rezRandare){
		if(err){
				if(err.message.indexOf("Failed to lookup view")!=-1){
					res.status(404).render("html/404", {username:u})
        
				}
        else throw err
		}
    else res.send(rezRandare)
	});
});
///////////////////  daaa?
/*app.use(function(req, res){
	res.status(404).render("html/404")

});*/
/////////////////////
app.listen(8080);
console.log('Aplicatia se va deschide pe portul 8080.');


