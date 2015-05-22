app.service('assumption', function() {
 this.test = function() {
console.log('working')
 }

this.getReturnData = function(obj){
var objSymbol =[];
for(i=0;i<obj.length;i++){
objSymbol.push(obj[i].Symbol);
}
$.ajax({
  type: "POST",
  url: "historicReturns",
  data: {objSymbol:objSymbol},
  success: function(data) {
  	global_assetsReturns = trimDataArray(data);
	},
	error:function(xhr, status, error){
	console.log(xhr.responseText)
	}
})
}

 //takes multidemension array and returns a smaller array with no zero values (avoids division by zero)	
var trimDataArray = function(dataArray){
lengthOfDataArray =dataArray[0].length;
whicharray = 0;
returnArray = [];
for(y=1;y<dataArray.length;y++){
for(i=0;i<dataArray[y].length;i++){
if(dataArray[y][i]< 0.01 && i < lengthOfDataArray){
lengthOfDataArray = i;
whicharray = y;
}
}
}
for(y=0;y<dataArray.length;y++){
returnArray[y] =  dataArray[y].splice(0,lengthOfDataArray);
}
return returnArray;
}

////////////////////////////////////////////////////////////////////////////////////////////
/*
Formula to find return for each security in completeReturns
 1+x=(price(N)/price(0))^1/(periods/12)
 Formula to find std for each security in completeReturns
 mean =sum(returns)/count
 variance =  (sum(return - mean)^2) /count
 stdev = sqrt(variance)
 
 
 */
this.customReturn = function(dataArray){
resultArray=[];
for(i=1;i<dataArray.length;i++){
arrayLength = dataArray[i].length;
x = (dataArray[i][0]/dataArray[i][arrayLength-1]);
z=(1/((arrayLength - 1)/12))
y= Math.pow(x, z);
/* ^(1/((arrayLength - 1)/12)) */
resultArray.push((y-1)*100);
}
return resultArray;
}



this.customStdev = function(dataArray){
resultArray=[];
for(i=1;i<dataArray.length;i++){
temp=[];
for(y=dataArray[i].length - 1;y>0;y--){
temp[y]=dataArray[i][y-1]/dataArray[i][y]-1;
}
monthly = standardDeviation(temp)
annual =Math.sqrt(12)*monthly;
//Made this to show as 05 rather than .05 
annual = annual *100;
resultArray.push(annual)
}
return resultArray;
}

var standardDeviation = function(values){
  var avg = average(values);
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  var avgSquareDiff = average(squareDiffs);
  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}
 
var average = function(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);
   var avg = sum / data.length;
  return avg;
}

this.covariance =function(arr1,arr2){
sum1=arr1.reduce(function(a, b) {
  return a + b;
});
sum2=arr2.reduce(function(a, b) {
  return a + b;
});
 cnt=arr1.length;
avg1=sum1/cnt;
avg2=sum2/cnt;
  ret = [];
  for(ii=0;ii<arr1.length;ii++){
  ret[ii]=(arr2[ii]-avg2) * (arr1[ii]-avg1) ;
  }
 x=ret.reduce(function(a, b) {
  return a + b;
});
  covarian=x/(cnt);
return covarian;
}

this.correlation = function(arr1,arr2){
sum1=arr1.reduce(function(a, b) {
  return a + b;
});
sum2=arr2.reduce(function(a, b) {
  return a + b;
});
 cnt=arr1.length;
avg1=sum1/cnt;
avg2=sum2/cnt;
  ret = [];
  for(ii=0;ii<arr1.length;ii++){
  ret[ii]=(arr2[ii]-avg2) * (arr1[ii]-avg1) ;
  }
 x=ret.reduce(function(a, b) {
  return a + b;
});
  covarian=x/(cnt-1);
std1=standardDeviation(arr1)
std2=standardDeviation(arr2)
corr= covarian/std1;
corr= corr/std2
return corr;
}

this.portfolioReturn = function(assetArray){
portfolioReturn = 0 ;
 for(i=0;i<assetArray.length;i++){
 portfolioReturn += assetArray[i].Percent/100 * assetArray[i].average
 }
return portfolioReturn/1;
}

this.portfolioStDev = function(assets){
var assetList = [];
var percentList = [];
var covarianceMatrix = [];
var firstMMULT=[];
var portfolioStDev=0;
for(i=0;i<assets.length;i++){
assetList.push(assets[i].Description)
}
for(i=0;i<assets.length;i++){
percentList.push(assets[i].Percent/100)
}
for(i=0;i<assets.length;i++){
var tempArray=[];
for(y=0;y<assetList.length;y++){
var correlation=0;

correlation = assets[i][assetList[y]] * (assets[i].stdev/100);
var secondStDev=0;
for(j=0;j<assets.length;j++){
if(assets[j].Description==assetList[y]){
secondStDev =assets[j].stdev;
}
}
correlation = correlation * (secondStDev/100);
tempArray.push(correlation);
}
covarianceMatrix.push(tempArray);
}

//good
//console.log(covarianceMatrix);
for(i=0;i<percentList.length;i++){
var mmultPush=0;
for(y=0;y<percentList.length;y++){
mmultPush += covarianceMatrix[y][i] * percentList[y];
}
firstMMULT.push(mmultPush);
}


for(i=0;i<firstMMULT.length;i++){
console.log("mmult"+firstMMULT[i]);
//console.log("%"+percentList[i]);
portfolioStDev += firstMMULT[i]*percentList[i];
//console.log(portfolioStDev);
}
portfolioStDev =Math.sqrt(portfolioStDev);
portfolioStDev= portfolioStDev * 100;
return portfolioStDev;
}

});