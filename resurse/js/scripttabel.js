window.onload = function(){
	
 var globt;
 var pp;
var ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function() {
	
			if (this.readyState == 4 && this.status == 200) {
					
					var obJson = JSON.parse(this.responseText);
					pp=obJson.produse;
					globt=pp.slice();
					afiseazaJsonTemplate(obJson, 'tproduse');
			}
	};
	ajaxRequest.open("GET", "/json/produse.json", true);
	ajaxRequest.send();
	function afiseazaJsonTemplate(obJson,id) { 
			 
			let container=document.getElementById(id);

			let textTemplate ="";
			
			for(let i=0;i<obJson.produse.length;i++){
				textTemplate+=ejs.render("<div class='template_produse'>\
				<p><%= produs.numeprodus %></p>\
				<p><%= produs.descriereprodus %></p>\
				<p><%= produs.pret %> RON</p>\
				<p><%= produs.recomandatincepatori %> </p>\
				</div>", 
				{produs: obJson.produse[i]});
				
				
			}	
			container.innerHTML=textTemplate;
	}
	
	


	
setInterval(function(){ 
    var tbody=document.getElementById("tproduse");
    var randuri=tbody.children;
	var nr = Math.floor((Math.random() * 150) + 100);
	randuri[0].children[2].innerHTML=nr+" RON";
	}, 3000);
	
	
	setInterval(function(){ 
    var tbody=document.getElementById("tproduse");
    var randuri=tbody.children;
	var pren=localStorage.getItem("cuv");
	if(pren==null)
		return;
	for(let i=0;i<randuri.length;i++)
	{
		
		var ok=false;
      if(randuri[i].children[0].innerHTML.toLowerCase().includes(pren.toLowerCase()))
	   {
	   ok=true
	   }
	   randuri[i].style.display="";
	   if(ok==false)
	   {
	   randuri[i].style.display="none";
	   }
	}
	return;
	}, 1);
document.getElementById("reset1").onclick = function()
  {
    
	 var tbody=document.getElementById("tproduse");
	var randuri= tbody.children;
	for(let i=0;i<globt.length;i++)
	{
		randuri[i].children[0].innerHTML=globt[i].numeprodus;
		randuri[i].children[1].innerHTML=globt[i].descriereprodus;
		randuri[i].children[2].innerHTML=globt[i].pret;
		randuri[i].children[3].innerHTML=globt[i].recomandatincepatori;
		randuri[i].style.display="";
	}
	localStorage.clear();
  }
document.getElementById("preia").onclick = function()
  {
	  setTimeout(function(){ alert("Va invitam sa cautati din gama noastra de produse destinate jocului de tenis!"); }, 3000);
    var pren=document.getElementById("text").value;
	var s=document.getElementById("text");
    var tbody=document.getElementById("tproduse");
    
	var randuri= tbody.children;
	
    Array.prototype.findIndex.call(randuri, function(rand){
	var randl=rand.children[0].innerHTML.toLowerCase();
	var ok=false;
      if(randl.includes(pren.toLowerCase()))
	   {
	   ok=true
	   }
	   rand.style.display="";
	   localStorage.setItem("cuv",pren);
	   if(ok==false)
	   {
	   rand.style.display="none";
	   }
    })
  }
  document.getElementById("cresc").onclick = function(){
    var tbody=document.getElementById('tproduse');
		var randuri= tbody.children; 
    var v_randuri= Array.prototype.slice.call(randuri);
	
	var num=[];
	for(var x in v_randuri)
	{

	//console.log(v_randuri[x].children[2].innerHTML[1]);
	var ch=0;
	var nr=0;
	while(v_randuri[x].children[2].innerHTML[ch]>='0' && v_randuri[x].children[2].innerHTML[ch]<='9')
	{
	
	//console.log(parseInt(v_randuri[x].children[2].innerHTML[ch]));
	nr+=parseInt(v_randuri[x].children[2].innerHTML[ch]);
	
	nr*=10;
	ch+=1;
	}
	nr/=10;
	
	num[x]=nr;
	}
	
	//console.log(num);
	for(var i =0; i< 18;i++)
	{
	for(var j =i+1;j<18;j++ )
	{
	  if(num[i]>num[j])
	  {
	    let aux=num[i];
		num[i]=num[j];
		num[j]=aux;
	    aux = v_randuri[i];
		v_randuri[i]=v_randuri[j]
		v_randuri[j]=aux;
	  }
	}
	}
	
		for(let r of v_randuri)
      tbody.appendChild(r);
  }
  document.getElementById("desc").onclick = function(){
    var tbody=document.getElementById('tproduse');
		var randuri= tbody.children; 
    var v_randuri= Array.prototype.slice.call(randuri);
	var num=[];
	for(var x in v_randuri)
	{
	//console.log(v_randuri[x].children[2].innerHTML[1]);
	var ch=0;
	var nr=0;
	while(v_randuri[x].children[2].innerHTML[ch]>='0' && v_randuri[x].children[2].innerHTML[ch]<='9')
	{
	//console.log(parseInt(v_randuri[x].children[2].innerHTML[ch]));
	nr+=parseInt(v_randuri[x].children[2].innerHTML[ch]);
	nr*=10;
	ch+=1;
	}
	nr/=10;
	num[x]=nr;
	}
	//console.log(num);
	for(var i =0; i< 18;i++)
	{
	for(var j =i+1;j<18;j++ )
	{
	  if(num[i]<num[j])
	  {
	    let aux=num[i];
		num[i]=num[j];
		num[j]=aux;
	    aux = v_randuri[i];
		v_randuri[i]=v_randuri[j]
		v_randuri[j]=aux;
	  }
	}
	}
	
		for(let r of v_randuri)
      tbody.appendChild(r);
  }
   document.getElementById("i_check1").onclick = function()
  {
    //console.log(document.getElementById("i_check1").checked);
	
	if(document.getElementById("i_check1").checked==false)
	{
		
	 var tbody=document.getElementById('tproduse');
    var randuri= tbody.children;
	
    Array.prototype.findIndex.call(randuri, function(rand){
		
    if(rand.children[0].innerHTML.includes("Racordaj"))
	rand.style.display="none";
		
    })
	}
	else
	{
		
	 var tbody=document.getElementById('tproduse');
    var randuri= tbody.children;
    Array.prototype.findIndex.call(randuri, function(rand){
	var ok=false;
    if(rand.children[0].innerHTML.includes("Racordaj"))
	rand.style.display="";
		
    })
	}
  }
  document.getElementById("i_check2").onclick = function()
  {
    //console.log(document.getElementById("i_check2").checked);
	if(document.getElementById("i_check2").checked==false)
	{
	 var tbody=document.getElementById('tproduse');
    var randuri= tbody.children;
    Array.prototype.findIndex.call(randuri, function(rand){
    if(rand.children[0].innerHTML.includes("Racheta"))
	rand.style.display="none";
		
    })
	}
	else
	{
	 var tbody=document.getElementById('tproduse');
    var randuri= tbody.children;
    Array.prototype.findIndex.call(randuri, function(rand){
	var ok=false;
    if(rand.children[0].innerHTML.includes("Racheta"))
	rand.style.display="";
		
    })
	}
  }
  document.getElementById("i_check3").onclick = function()
  {
    //console.log(document.getElementById("i_check3").checked);
	if(document.getElementById("i_check3").checked==false)
	{
	 var tbody=document.getElementById('tproduse');
    var randuri= tbody.children;
    Array.prototype.findIndex.call(randuri, function(rand){
    if(rand.children[0].innerHTML.includes("Geanta"))
	rand.style.display="none";
		
    })
	}
	else
	{
	 var tbody=document.getElementById('tproduse');
    var randuri= tbody.children;
    Array.prototype.findIndex.call(randuri, function(rand){
	var ok=false;
    if(rand.children[0].innerHTML.includes("Geanta"))
	rand.style.display="";
		
    })
	}
  }
  document.getElementById("i_check5").onclick = function()
  {
    //console.log(document.getElementById("i_check4").checked);
	if(document.getElementById("i_check5").checked==false)
	{
	 var tbody=document.getElementById('tproduse');
    var randuri= tbody.children;
    Array.prototype.findIndex.call(randuri, function(rand){
    if(rand.children[0].innerHTML.includes("mingi"))
	rand.style.display="none";
    if(rand.children[0].innerHTML.includes("Vibrastop"))
	rand.style.display="none";
		
    })
	}
	else
	{
	 var tbody=document.getElementById('tproduse');
    var randuri= tbody.children;
    Array.prototype.findIndex.call(randuri, function(rand){
	var ok=false;
    if(rand.children[0].innerHTML.includes("mingi") )
	rand.style.display="";
    if(rand.children[0].innerHTML.includes("Vibrastop"))
	rand.style.display="none";
    })
	}
  }
  document.getElementById("calc").onclick = function()
  {
	   var tbody=document.getElementById('tproduse');
    var randuri= tbody.children;
	var sum=0;
	Array.prototype.findIndex.call(randuri, function(rand){
     sum+=parseInt(rand.children[2].innerHTML);
    })
	  document.getElementById("sum").innerHTML="Suma totala este: "+sum+" RON";
  }
}
window.onkeypress=function(e){
    var tasta=e.key
	console.log(e.key);
    var tbody=document.getElementById("tproduse");
    var randuri=tbody.children;
    for(let i=0; i<randuri.length;i++)
    {
		
      if (!randuri[i].children[0].innerHTML.toLowerCase().includes(e.key)){
        randuri[i].style.display="none";
        }
    }
}