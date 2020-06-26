window.onload = function(){
//1
function afisV(){
var t = document.getElementById("dataa").value;
var d = parseInt(t[0])*10+parseInt(t[1]);
var m = parseInt(t[3])*10+parseInt(t[4]);
var y = parseInt(t[6])*1000+parseInt(t[7])*100+parseInt(t[8])*10+parseInt(t[9]);
var countDownDate = new Date(y,m-1,d);
console.log(countDownDate,m,d,y);
var x = setInterval(function() {
var now = new Date();
var zi=now.getDate();
var ora=now.getHours();
var min=now.getMinutes();
var sec=now.getSeconds();
var distance = now-countDownDate;
var years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
var mounths = Math.floor(((distance / (1000 * 60 * 60 * 24 * 365))-Math.floor(distance / (1000 * 60 * 60 * 24 * 365)))*10);
var days=zi-d;
var hours = ora;
var minutes = min;
var seconds = sec;
if(days<0)
{mounths=mounths-1;
days=30+days;
}
document.getElementById("vaf").innerHTML = years + " ani " + mounths +" luni "+ days +" zile " + hours + " ore " + minutes + " minute " + seconds + " secunde ";
  if (distance <= 0) {
    clearInterval(x);
    document.getElementById("vaf").innerHTML = "INTRODUCETI O DATA VALIDA";
  }
}, 1000);
}

//60,5
var countDownDate = new Date("Jun 30, 2020 08:00:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("timp").innerHTML = days + " zile " + hours + " ore " + minutes + " minute " + seconds + " secunde ";
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timp").innerHTML = "EXPIRED";
  }
}, 1000);

//3
var x=document.getElementById("titap").innerHTML;
document.getElementById("titap").innerHTML="";
var i1=0;
var speed1=100;
function typeWriter1() {
  if (i1 < x.length/2-1) {
  var j1=document.getElementById("titap").innerHTML.length;
    var temp = document.getElementById("titap").innerHTML;
    document.getElementById("titap").innerHTML = temp.substr(0, Math.trunc(j1/2)) + x[i1] +x[x.length-i1-1] + temp.substr( Math.trunc(j1/2) );
	i1++;
    setTimeout(typeWriter1, speed1);
  }
  else if(x.length%2!=0)
  {
    var j1=document.getElementById("titap").innerHTML.length;
    var temp = document.getElementById("titap").innerHTML;
    document.getElementById("titap").innerHTML = temp.substr(0, Math.trunc(j1/2))  +x[x.length-i1-1] + temp.substr( Math.trunc(j1/2) );
  
  }
}
typeWriter1();


//13

    var count=0;
	var h = document.getElementsByTagName("header");
    var p = document.getElementsByTagName("body");
	var f = document.getElementsByTagName("footer");
	for(var i = 0; i < h.length; i++)
    {
        count += h[i].innerText.split(/[^A-Za-z0-9]/).length;
    }
    for(var i = 0; i < p.length; i++)
    {
        count += p[i].innerText.split(/[^A-Za-z0-9]/).length;
    }
	for(var i = 0; i < f.length; i++)
    {
        count += f[i].innerText.split(/[^A-Za-z0-9]/).length;
    }

 document.getElementsByTagName("footer")[0].innerHTML+="Numarul de cuvinte este " + count;
}