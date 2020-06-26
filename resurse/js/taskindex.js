
function myFunction() {
  
  var x = document.getElementById("imag");
  var y = document.getElementById("imag2");
  var z = document.getElementById("imag3");
  var t = document.getElementById("imag4");
  if (x.style.display === "none") {
  document.getElementById("btn").innerHTML="Ascunde imagini";
    x.style.display = "block";
	
  } else {
    x.style.display = "none";
	document.getElementById("btn").innerHTML="Afiseaza imagini";
  }
  
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
  
  if (z.style.display === "none") {
    z.style.display = "block";
  } else {
    z.style.display = "none";
  }
  
  if (t.style.display === "none") {
    t.style.display = "block";
  } else {
    t.style.display = "none";
  }
}
var i = 0;
var txt = document.getElementById("ap1").innerHTML;
document.getElementById("ap1").innerHTML="";
var speed = 500;
var inc=0;
var sf=1;
function typeWriter(inc,sf) {
  while(txt[sf+1]!=undefined)
    {
    if(txt[sf]==" ")
         break;	
	sf++;}
  if (i < sf) {
  
    document.getElementById("ap1").innerHTML +=  txt.substr(inc,sf-inc);
    i++;
    setTimeout(typeWriter, speed, sf,sf+1);
  }
}
typeWriter(inc,sf);
i=0;
txt2 = document.getElementById("ap2").innerHTML;
document.getElementById("ap2").innerHTML="";
inc=0;
sf=1;
function typeWriter2(inc,sf) {
while(txt2[sf+1]!=undefined){
  if(txt2[sf]==" ")
         break;	
	sf++;}
  if (i < sf) {
  
    document.getElementById("ap2").innerHTML += txt2.substr(inc,sf-inc);
    i++;
    setTimeout(typeWriter2, speed, sf,sf+1);
  }
}
typeWriter2(inc,sf);



document.getElementById("rrr").onclick = function()
{
  var now=new Date();
  setTimeout(function(){ document.getElementById("intrebare").style.display="none";alert("Timpul intrebarii pe pagina a expirat");  }, 3000);
}
document.getElementById("submit").onclick = function()
{
  var rasp=document.getElementById("rrr").value;
  if(rasp=="PerfRackets")
    document.getElementById("feed").innerHTML="Felicitari!";
  else
	{
	document.getElementById("feed").innerHTML="Ai gresit!";
	}

}
