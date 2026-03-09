function upload(){

let file=document.getElementById("excel").files[0];

let reader=new FileReader();

reader.onload=function(e){

let data=new Uint8Array(e.target.result);

let workbook=XLSX.read(data,{type:"array"});

let sheet=workbook.Sheets[workbook.SheetNames[0]];

let json=XLSX.utils.sheet_to_json(sheet);

document.getElementById("status").innerText=
"Data berjaya dibaca. Sila eksport sebagai database.json";

console.log(json);

};

reader.readAsArrayBuffer(file);

}