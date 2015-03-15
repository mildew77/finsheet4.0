

$( document ).ready(function() {

$('#submit').click(function(){
dataBaseName = "testTable";
symbols=[];
for(i=0;i<assets.length;i++){
symbols.push(assets[i].Symbol);
}

console.log(symbols);
$.ajax({
  type: "POST",
  url: "refreshDataPost",
   data: {symbols:symbols,dataBaseName:dataBaseName},
  success: function(data) {
  console.log(data);
	},
	error:function(xhr, status, error){
	console.log(xhr.responseText)
	}

}) 


})
$('#libor').click(function(){
/* swapRates = [0.16625,0.44,0.89,1.29,1.57,1.78,2.05,2.28,2.69]; */
swapRates=[];

 $.ajax({
  type: "POST",
  url: "liborPost",
 
  success: function(data) {
  console.log(data);
  for(i=0;i<data.length;i++){
  swapRates.push(data[i]/1)
  }
  	swapTable(swapRates);//create swap rate table for RM prin limit
   swapCurve = swapCurveCreator(swapRates);
    forward=forwardCurveCreator(swapCurve); 
	console.log('half way there')
	liborTable(forward);
	},
	error:function(xhr, status, error){
	console.log(xhr.responseText)
	}

})   



})


})
function liborTable(forwardCurve){
tableName = "liborForward";
 $.ajax({
  type: "POST",
  url: "createLibor",
 data: {forwardCurve:forwardCurve,tableName:tableName},
  success: function(data) {
  console.log(data);
  
	},
	error:function(xhr, status, error){
	console.log(xhr.responseText)
	}

}) 

}
function swapTable(swapRates){
tableName = "liborSwap";

 $.ajax({
  type: "POST",
  url: "liborSwap",
 data: {swapRates:swapRates,tableName:tableName},
  success: function(data) {
  console.log(data);
  
	},
	error:function(xhr, status, error){
	console.log(xhr.responseText)
	}

});

}

function info(value){
console.log(value);
}

function swapCurveCreator(nineRateArray){
swapArray=[];
diff = nineRateArray[1] - nineRateArray[0];
for(i=0;i<12;i++){
adjDiff = i * (diff/11) + nineRateArray[0]; 
swapArray.push(adjDiff);
}
diff = nineRateArray[2] - nineRateArray[1];
for(i=1;i<13;i++){
adjDiff = i * (diff/12) + nineRateArray[1]; 
swapArray.push(adjDiff);
}
diff = nineRateArray[3] - nineRateArray[2];
for(i=1;i<13;i++){
adjDiff = i * (diff/12) + nineRateArray[2]; 
swapArray.push(adjDiff);
}
 diff = nineRateArray[4] - nineRateArray[3];
for(i=1;i<13;i++){
adjDiff = i * (diff/12) + nineRateArray[3]; 
swapArray.push(adjDiff);
} 
 diff = nineRateArray[5] - nineRateArray[4];
for(i=1;i<13;i++){
adjDiff = i * (diff/12) + nineRateArray[4]; 
swapArray.push(adjDiff);
} 
 diff = nineRateArray[6] - nineRateArray[5];
for(i=1;i<29;i++){
adjDiff = i * (diff/28) + nineRateArray[5]; 
swapArray.push(adjDiff);
} 


 diff = nineRateArray[7] - nineRateArray[6];
for(i=1;i<33;i++){
adjDiff = i * (diff/32) + nineRateArray[6]; 
swapArray.push(adjDiff);
} 
 diff = nineRateArray[8] - nineRateArray[7];
for(i=1;i<241;i++){
adjDiff = i * (diff/240) + nineRateArray[7]; 
swapArray.push(adjDiff);
} 
for(i=0;i<swapArray.length;i++){
swapArray[i]=swapArray[i]/100;
}
return swapArray;
};

function forwardCurveCreator(swapCurve){
forwardCurve=[];
forwardCurve.push(swapCurve[0])
 console.log(swapCurve.length);
for(i=1;i<swapCurve.length;i++){
previousForwardSum =0;
for(k=0;k<i;k++){
 previousForwardSum = previousForwardSum +(swapCurve[i]/12*1000)/(Math.pow(1+forwardCurve[k],(k+1)/12)); 
}

forwardRate = (Math.pow(((swapCurve[i]/12 * 1000 + 1000)/(1000-previousForwardSum)),(12/(i+1)))-1)


forwardCurve.push(forwardRate);
} 
return forwardCurve;
}



