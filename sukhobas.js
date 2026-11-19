(function(){
var PHONE="919674900952",MAIL="sukhobas.kol@gmail.com";
// To receive enquiries directly by email, create a free Formspree form and paste its URL here, e.g. "https://formspree.io/f/xxxxxxx".
var FORM_ENDPOINT="";
var root=document.documentElement;
(function(){var C=window.SITE_IMAGES||{};document.querySelectorAll("[data-slot]").forEach(function(el){
 var c=C[el.getAttribute("data-slot")];if(!c||!c.src)return;
 var img=new Image();img.alt=c.alt||el.getAttribute("data-alt")||"";
 img.onload=function(){var old=el.innerHTML;el.classList.add("has-img");el.innerHTML="";
  var a=document.createElement("a");a.href=c.src;a.target="_blank";a.rel="noopener";a.appendChild(img);el.appendChild(a);
  if(c.illustrative!==false){var t=document.createElement("span");t.className="il";t.textContent="Illustrative image";el.appendChild(t)}};
 img.src=c.src})})();
function setLang(l){root.setAttribute("data-lang",l);root.lang=l==="bn"?"bn":"en";var b=document.getElementById("langBtn");if(b)b.textContent=l==="bn"?"English":"বাংলা";try{localStorage.setItem("sukhobas-lang",l)}catch(e){}}
var saved="en";try{saved=localStorage.getItem("sukhobas-lang")||"en"}catch(e){}
setLang(saved);
var lb=document.getElementById("langBtn");if(lb)lb.addEventListener("click",function(){setLang(root.getAttribute("data-lang")==="bn"?"en":"bn")});
var mb=document.getElementById("menuBtn"),nav=document.getElementById("nav");
if(mb)mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)});
document.querySelectorAll("#enquiryForm").forEach(function(f){
 var err=f.querySelector("#formErr"),res=f.querySelector("#formResult");
 function v(n){return (f.elements[n].value||"").trim()}
 f.addEventListener("submit",function(e){
  e.preventDefault();
  f.querySelectorAll(".field").forEach(function(x){x.classList.remove("invalid")});
  var bad=[],mobile=v("mobile").replace(/[\s-]/g,"").replace(/^(\+91|91|0)/,"");
  [["name","your name"],["relationship","your relationship with the elderly person"],["location","the area in Kolkata"],["assistance","the type of assistance"]].forEach(function(r){if(!v(r[0]))bad.push(r)});
  if(!/^[6-9]\d{9}$/.test(mobile))bad.push(["mobile","a valid 10-digit mobile number"]);
  if(v("email")&&!/^\S+@\S+\.\S+$/.test(v("email")))bad.push(["email","a valid email address"]);
  if(!f.elements.consent.checked)bad.push(["consent","your consent to be contacted"]);
  if(bad.length){
   bad.forEach(function(b){var el=f.elements[b[0]];if(el.closest(".field"))el.closest(".field").classList.add("invalid")});
   err.textContent="Please check: "+bad.map(function(b){return b[1]}).join(", ")+".";err.hidden=false;f.elements[bad[0][0]].focus();return}
  err.hidden=true;
  var lines=["Hello SUKHOBAS, I would like to make an enquiry.","Name: "+v("name"),"Mobile: "+mobile,"Email: "+(v("email")||"-"),"Relationship: "+v("relationship"),"Parent: "+(v("parent")||"-")+(v("age")?", age "+v("age"):""),"Area in Kolkata: "+v("location"),"Assistance: "+v("assistance"),"Frequency: "+(v("frequency")||"-"),"Details: "+(v("details")||"-")];
  var text=lines.join("\n");
  var wa="https://wa.me/"+PHONE+"?text="+encodeURIComponent(text);
  var mail="mailto:"+MAIL+"?subject="+encodeURIComponent("Enquiry from "+v("name"))+"&body="+encodeURIComponent(text);
  function showSent(){res.innerHTML="<strong>Thank you for contacting SUKHOBAS.</strong> We have received your enquiry and will get in touch with you.";res.hidden=false;res.focus();f.reset()}
  function showManual(){res.innerHTML="<strong>Your enquiry is ready.</strong> It has not been sent yet. Please send it to us using one of these:<div class=\"actions\"><a class=\"btn btn-wa\" href=\""+wa+"\">Send on WhatsApp</a><a class=\"btn btn-green\" href=\""+mail+"\">Send by email</a></div>";res.hidden=false;res.focus()}
  if(FORM_ENDPOINT){
   var fd=new FormData();lines.forEach(function(l,i){fd.append("line"+(i+1),l)});fd.append("message",text);
   fetch(FORM_ENDPOINT,{method:"POST",body:fd,headers:{Accept:"application/json"}}).then(function(r){r.ok?showSent():showManual()}).catch(showManual)
  }else showManual();
 })});
})();
