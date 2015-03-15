$( document ).ready(function() {

//set custom correlation to false ; drives covariance.js logic
$.cookie("customCorrelation",false)
//Check for existing cookie and provide drop downs and graph for given object
if($.cookie("assets")){

objCounter=0;
objDescription=[];
objPercent=[];

temp = $.cookie("assets");
obj= $.secureEvalJSON(temp);
for(i=0;i<obj.length;i++){
if(obj[i].percent>0){
objDescription.push(obj[i].Description);
objPercent.push(obj[i].percent);
objCounter ++;
}
}
assetCountSelect(objCounter,obj);
eachCount=0;
$( '.assetSelect' ).each(function(){
this.value=objDescription[eachCount];
eachCount++;
})
eachCount=0;
$( ".assetPercent" ).each(function(){
this.value=objPercent[eachCount].toFixed(2) +' %';
eachCount++;
})
graph()
$('#assetPercentSum').css('display','inline');
var percentTotal = 0
 $('.assetPercent').each(function(){
  percentTotal +=(this.value.replace('%',''))/1
  
  })
$('#assetPercentSum').text(percentTotal.toFixed(2) +' %');



}
if($.cookie("sumPortfolio")==false){console.log('what')}
console.log($.cookie("sumPortfolio"))

//Animation for choosing how many assets
$('#howManyAssets').click(function(){
$('#howManyAssetsUl').css('display','block');
$('#howManyAssetsUl').velocity({ width: '80%'}, { duration: 1000,
complete:function(){
$('#howManyAssetsUl').css("height","100%");
} }); 
})

//Once number of assets selected will provide input fields 
$('#howManyAssetsUl > li').click(function(){
assetCountSelect(this.outerText,assets);
$('#assetPercentSum').css('display','inline')
 
})



});

//Below are variables and functions related to the Portfolio Composition tab
var portfolioData=[]

//function to create input fields using number of assets chosen and assets //object found in assets.js
function assetCountSelect(number,assetObj){

$('#compositionForm').html('')
$('#assetNumber').text(number)
$('#howManyAssetsUl').velocity({width:"0%", height:"30px"}, {
duration: 1000,
 complete: function(){
$('#howManyAssetsUl').css('display','none');
}}); 
//Inner function to create select field intended to use json file assets.js
function createSelect(assetObj){
element ="<select class='assetSelect'>"
for(k=0;k<assetObj.length;k++){
element += "<option class='assetDropdown' value='" + assetObj[k].Description + "'>" + assetObj[k].Description +
"</option>"  
}
element += "</select>"
return element;
}
for(i=1;i<=number;i++){
$('#compositionForm').append("<tr class='assetInput'><td><span class='assetCount'>Asset "+ i + "   : </span></td><td>" +
 createSelect(assetObj) + "</td><td><input class= 'assetPercent' type='text'></td></tr>")
}
//if portfolio already exists keep some or all with asset number change

if($.cookie("assets")){
objCounter=0;
objDescription=[];
objPercent=[];
eachCount=0;
compare=0;
temp = $.cookie("assets");
obj= $.secureEvalJSON(temp);
for(i=0;i<obj.length;i++){
if(obj[i].percent>0){
objDescription.push(obj[i].Description);
objPercent.push(obj[i].percent);
objCounter ++;
}
}

$( '.assetSelect' ).each(function(){

try {
  this.value=objDescription[eachCount] ;

	eachCount++;
}
catch(err) {

}

})
eachCount=0;
$( ".assetPercent" ).each(function(){
try {

  this.value=objPercent[eachCount].toFixed(2) +' %';
eachCount++;
}
catch(err) {

}
})

}
else{
$('.assetPercent').each(function(){this.value=((1/number)*100).toFixed(2) + " %"});
}


//zero out when in focus
$( ".assetPercent" ).bind( "focus", function() {
  this.value = "";
});

//graph when asset is selected
$( '.assetSelect' ).change(function() {
     graph()
   });

//Function to format the percentage field for how many loans
$( ".assetPercent" ).bind( "blur", function() {
  this.value =(this.value.replace(/[^\0-9]/ig, "")/1).toFixed(2) + " %";
  var result =0;
  $('.assetPercent').each(function(){
  result +=(this.value.replace('%',''))/1
  
  })
$('#assetPercentSum').text(result.toFixed(2) +' %');
if(result!=100 ){
$('#assetPercentSum').css('color','red');
//forces redirect if true 
$.cookie("sumPortfolio",false);

}
else{
$('#assetPercentSum').css('color','white');
$.cookie("sumPortfolio",true);
}

//found in graph.js
graph()
});

percentTotal = 0
 $('.assetPercent').each(function(){
  percentTotal +=(this.value.replace('%',''))/1
  
  })
$('#assetPercentSum').text(percentTotal.toFixed(2) +' %');

}



