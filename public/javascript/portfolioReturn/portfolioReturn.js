$( document ).ready(function() {

if(!$.cookie("assets")){
//the message cookie is used to store messages for redirects 
//located in message.js leverages velocity.js
//master blade file contains <div id="message"></div>
$.cookie("message", "Please build portfolio below before setting assumptions");
window.location.href = 'portfolio';
}
else if(!$.cookie("correlation")){
//the message cookie is used to store messages for redirects 
$.cookie("message", "Please confirm assumptions before modeling portfolio return");
window.location.href = 'assumptions';

}
else{
var initialInvestmentValue=10000;
$.cookie("initialInvestmentValue", initialInvestmentValue);
var timeFrameValue=120;

temp = $.cookie("assets");
nobj = $.secureEvalJSON(temp);
temp = $.cookie("correlation");
correlation = $.secureEvalJSON(temp);
temp = $.cookie("currentReturns");
currentReturns = $.secureEvalJSON(temp);


portfolioReturn = portfolioReturn(currentReturns);
covarianceMatrix = corrToCov(correlation,currentReturns);
portfolioStdev = portStdev(covarianceMatrix,currentReturns);
console.log(covarianceMatrix)
$('#expectedReturn').text((portfolioReturn*100).toFixed(2)+" %");
$('#expectedVolatility').text((portfolioStdev*100).toFixed(2)+" %");
$.cookie("portfolioReturn", portfolioReturn);
$.cookie("portfolioStdev", portfolioStdev);



//monteCarloSim(portReturn,portStddev,timeFrame,startAmount)
//See below for further details
initialGraph=monteCarloSim(portfolioReturn,portfolioStdev,timeFrameValue,initialInvestmentValue);
buildGraph(initialGraph,"modelGraph");


$( "#initialInvest" ).bind( "focus", function() {
  this.value = "";
});

$( "#initialInvest" ).bind( "blur", function() {
  temp =(this.value.replace(/[^\0-9]/ig, "")/1).toFixed(0) ;
  initialInvestmentValue=temp;
  $.cookie("initialInvestmentValue", initialInvestmentValue);
this.value = formatDollar(temp);
});
$( '#timeFrameSelect' ).change(function() {
 temp =(this.value.replace(/[^\0-9]/ig, "")/1).toFixed(0) ;
 timeFrameValue = temp * 12
 
   });

$('#runSimulation').click(function(){

temp=monteCarloSim(portfolioReturn,portfolioStdev,timeFrameValue,initialInvestmentValue);

buildGraph(temp,"modelGraph");
})





}
})





function formatDollar(num) {
   return "$ " + num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
//Function to build graph 
function buildGraph(data,id){
d2=[];
min=data[0][0];
max=data[data.length - 1][0];
for(i=0;i<data.length;i++){
d2.push([data[i][0],data[i][1]]);
}


    graph = Flotr.draw(document.getElementById(id), [ 
    data
	], {
	  xaxis : {
      mode : 'time', 
    
       
        labelsAngle : 45
    },
	 colors:['#4b82f0'],
     
	 
	 yaxis: {
	 tickFormatter: function(val){
	 
	return formatDollar(val);
	 
	 }
	 },
           HtmlText : true,
          });

}


//Functions used on inititiation of page
function portfolioReturn(currentReturns){
portfolioReturn = 0 ;
 for(i=0;i<currentReturns[0].length;i++){
 portfolioReturn += currentReturns[1][i]/100 * currentReturns[2][i]
 
 }
return portfolioReturn/100;
}
function corrToCov (correlation,currentReturns){
cov =[];
for(i=0;i<correlation.length;i++){
temp = [];
for(y=0;y<correlation.length;y++){
tempVariable = correlation[i][y]*(currentReturns[3][i]/100)
tempVariable = tempVariable*(currentReturns[3][y]/100)
temp.push(tempVariable);
}
cov.push(temp);
}
return cov;
}
function portStdev(covarianceMatrix,currentReturns){
portStdev=0;
temp=[];
for(i=0;i<covarianceMatrix.length;i++){
 tempVar=0;
for(y=0;y<covarianceMatrix.length;y++){
tempVar += covarianceMatrix[i][y]*(currentReturns[1][y]/100);
}
temp.push(tempVar);
}

for(k=0;k<covarianceMatrix.length;k++){
portStdev += temp[k]*(currentReturns[1][k]/100);
}

return Math.sqrt(portStdev)
}
function monteCarloSim(portReturn,portStddev,timeFrame,startAmount){
  
/*   timeFrame = typeof a !== 'undefined' ? timeFrame : 120;
  startAmount = typeof a !== 'undefined' ? startAmount : 10000; */
 
 portReturns=[];
 time=[];
 combined=[];
start = moment();
expK=portReturn-(.5 * (portStddev * portStddev))
combined.push([start.format("MMM YYYY"),startAmount])
portReturns.push(startAmount);
time.push(start.format("MMM YYYY"))
for(i=1;i<timeFrame;i++){
temp = (expK * (1/12) + portStddev * Norminsv(Math.random())*Math.sqrt(1/12));
startAmount = startAmount * Math.exp(temp);
portReturns.push(startAmount);
 start = moment(start).add(1, 'M'); 
time.push(start.format("MMM YYYY")); 
combined.push([start,startAmount])
}

return combined;
}
function Norminsv(p){
    // Coefficients in rational approximations
    var a = new Array(-3.969683028665376e+01,  2.209460984245205e+02,
                      -2.759285104469687e+02,  1.383577518672690e+02,
                      -3.066479806614716e+01,  2.506628277459239e+00);
    var b = new Array(-5.447609879822406e+01,  1.615858368580409e+02,
                      -1.556989798598866e+02,  6.680131188771972e+01,
                      -1.328068155288572e+01 );
    var c = new Array(-7.784894002430293e-03, -3.223964580411365e-01,
                      -2.400758277161838e+00, -2.549732539343734e+00,
                      4.374664141464968e+00,  2.938163982698783e+00);
    var d = new Array (7.784695709041462e-03, 3.224671290700398e-01,
                       2.445134137142996e+00,  3.754408661907416e+00);
    // Define break-points.
    var plow  = 0.02425;
    var phigh = 1 - plow;
    // Rational approximation for lower region:
    if ( p < plow ) {
             var q  = Math.sqrt(-2*Math.log(p));
             return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
                                             ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
    }
    // Rational approximation for upper region:
    if ( phigh < p ) {
             var q  = Math.sqrt(-2*Math.log(1-p));
             return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
                                                    ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
    }
    // Rational approximation for central region:
    var q = p - 0.5;
    var r = q*q;
    return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q /
                             (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
}