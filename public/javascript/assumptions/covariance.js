//still need to add custom correlation

$( document ).ready(function() {

$('#covarianceUpdateCheckBox').change(function(){
if(this.checked){
$('#covHold').css('display','block');
$('#tablesHold').css('display','none');

if($.cookie("customCorrelation")=="true"){
$('#corrTable').css('display','none');
$('#custCorrTable').css('display','block');
$("#covarianceCustomCheckBox").prop("checked", true);



temp = $.cookie("correlation");
corrObj= $.secureEvalJSON(temp);


corrTableData = "<tr><th>Correlation</th>"
for(i=0;i<corrObj[0].length;i++){
corrTableData += "<th>" + assumptions.currentReturns[0][i] + "</th>"
};
corrTableData += "</tr>";
for(i=0;i<corrObj[0].length;i++){
corrTableData += "<tr><th>" + assumptions.currentReturns[0][i] +"</th>";
for(y=0;y<corrObj[0].length;y++){
if(y==i){

corrTableData += "<td class ='customCorrelation'>" +corrObj[i][y]+ "</td>";
}
else{

corrTableData += "<td>"+ "<input class ='customCorrelation' type='text' value='"+corrObj[i][y]+"'>"  + "</td>";
}

}
corrTableData += "</tr>";
}
$('#custCorrTable').append(corrTableData);

$('#custCorrTable input').bind('blur',function(){
//function found below
updateCustomCorrelation(this);
});

$('#corrTable').empty();
corrTableData = "<tr><th>Correlation</th>"
for(i=0;i<assumptions.currentReturns[0].length;i++){
corrTableData += "<th>" + assumptions.currentReturns[0][i] + "</th>"
};
corrTableData += "</tr>";
for(i=0;i<assumptions.currentReturns[0].length;i++){
corrTableData += "<tr><th>" + assumptions.currentReturns[0][i] +"</th>";
for(y=0;y<assumptions.corrMatrix[0].length;y++){
corrTableData += "<td>"+ assumptions.corrMatrix[i][y].toFixed(4) + "</td>";
}
corrTableData += "</tr>";
}
$('#corrTable').append(corrTableData);





}

else{
$('#corrTable').css('display','block');
$('#custCorrTable').css('display','none');
$('#corrTable').empty();
corrTableData = "<tr><th>Correlation</th>"
for(i=0;i<assumptions.currentReturns[0].length;i++){
corrTableData += "<th>" + assumptions.currentReturns[0][i] + "</th>"
};
corrTableData += "</tr>";
for(i=0;i<assumptions.currentReturns[0].length;i++){
corrTableData += "<tr><th>" + assumptions.currentReturns[0][i] +"</th>";
for(y=0;y<assumptions.corrMatrix[0].length;y++){
corrTableData += "<td>"+ assumptions.corrMatrix[i][y].toFixed(4) + "</td>";
}
corrTableData += "</tr>";
}
$('#corrTable').append(corrTableData);
}

}
else{
$('#covHold').css('display','none');
$('#tablesHold').css('display','block');

}
});


$('#covarianceCustomCheckBox').change(function(){
if(this.checked){
$.cookie("customCorrelation",true)
$('#custCorrTable').empty();
$('#corrTable').css('display','none');
$('#custCorrTable').css('display','block');

temp = $.cookie("correlation");
corrObj= $.secureEvalJSON(temp);


corrTableData = "<tr><th>Correlation</th>"
for(i=0;i<assumptions.currentReturns[0].length;i++){
corrTableData += "<th>" + assumptions.currentReturns[0][i] + "</th>"
};
corrTableData += "</tr>";
for(i=0;i<assumptions.currentReturns[0].length;i++){
corrTableData += "<tr><th>" + assumptions.currentReturns[0][i] +"</th>";
for(y=0;y<corrObj[0].length;y++){
if(y==i){
corrTableData += "<td class ='customCorrelation'>" +corrObj[i][y].toFixed(4)+ "</td>";
}
else{
corrTableData += "<td>"+ "<input class ='customCorrelation' type='text' value='"+corrObj[i][y].toFixed(4)+"'>"  + "</td>";
}

}
corrTableData += "</tr>";
}
$('#custCorrTable').append(corrTableData);

$('#custCorrTable input').bind('blur',function(){
//function found below
updateCustomCorrelation(this);
});


}
else{
$.cookie("customCorrelation",false)
srcCorrelation = JSON.stringify(assumptions.corrMatrix);
$.cookie("correlation", srcCorrelation);
$('#corrTable').css('display','block');
$('#custCorrTable').css('display','none');
}
})

});

function updateCustomCorrelation(element){

//set cousin value
oldValue=element.defaultValue;
updatedValue=element.value;
if(updatedValue > 1){updatedValue=1}
else if(updatedValue < -1){updatedValue=-1}
$('.customCorrelation').each(function(){
if(this.value){
if(this.defaultValue == oldValue){
this.value=updatedValue;
}
else{};
}
else{};
})

initialArray=[];

  $('.customCorrelation').each(function(){
if(this.value){
initialArray.push(this.value)
}
else{
initialArray.push(this.innerText)
}
})


arrayHold=[];
temp = $.cookie("correlation");
corrObj= $.secureEvalJSON(temp);

for(i=0;i<corrObj.length;i++){
arrayHold[i]=initialArray.slice(0,corrObj.length)
for(y=0;y<corrObj.length;y++){
initialArray.shift()
}
}

 src = JSON.stringify(arrayHold);
		$.cookie("correlation", src); 


		
}