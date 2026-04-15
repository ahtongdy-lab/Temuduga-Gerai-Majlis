let data=[];

fetch("database.json")
.then(res=>res.json())
.then(json=>{ data=json; });

function formatIC(input){
let value=input.value.replace(/\D/g,'');

if(value.length>12){ value=value.slice(0,12); }

if(value.length>6 && value.length<=8){
value=value.slice(0,6)+"-"+value.slice(6);
}
else if(value.length>8){
value=value.slice(0,6)+"-"+value.slice(6,8)+"-"+value.slice(8);
}

input.value=value;
}

function validateIC(ic){
let regex=/^\d{6}-\d{2}-\d{4}$/;
return regex.test(ic);
}

function maskIC(ic){
let clean=ic.replace(/-/g,'');
let first2=clean.substring(0,2);
let last4=clean.substring(8,12);
return first2+"******"+last4;
}

function semak(){

let icInput=document.getElementById("ic").value;
let errorBox=document.getElementById("icError");
errorBox.innerHTML="";

if(!validateIC(icInput)){
errorBox.innerHTML="Format IC tidak sah";
return;
}

let ic=icInput.replace(/-/g,'');

document.getElementById("loading").style.display="block";

setTimeout(function(){

document.getElementById("loading").style.display="none";

let calon=data.find(c=>c.ic===ic);

if(calon){

let berjaya=calon.status==="BERJAYA";
let warna=berjaya?"berjaya":"gagal";
let icMasked=maskIC(icInput);

let printBtn=berjaya
? `<button id="printBtn" onclick="cetak('${calon.nama}','${icMasked}')">Cetak Surat Tawaran</button>`
:"";

document.getElementById("result").innerHTML=
`<p><b>Nama:</b> ${calon.nama}</p>
<p><b>No IC:</b> ${icMasked}</p>
<div class="badge ${warna}">
${berjaya?"TAHNIAH! ANDA BERJAYA":"KEPUTUSAN TEMUDUGA TIDAK BERJAYA"}
</div>
${printBtn}`;

}else{

document.getElementById("result").innerHTML="Rekod tidak dijumpai";

}

// kosongkan search bar
document.getElementById("ic").value="";

},1000);

}

function cetak(nama,ic){
localStorage.setItem("nama",nama);
localStorage.setItem("ic",ic);
window.open("surat.html");
}
