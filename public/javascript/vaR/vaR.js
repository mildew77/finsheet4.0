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
else if(!$.cookie("initialInvestmentValue")){

//the message cookie is used to store messages for redirects 
$.cookie("message", "Please confirm assumptions before modeling portfolio return");
window.location.href = 'portfolioreturn';

}

else{
var initialInvestmentValue = $.cookie("initialInvestmentValue");
var portfolioReturn = $.cookie("portfolioReturn");
var portfolioStdev = $.cookie("portfolioStdev");


$('#expectedReturn').text(($.cookie("portfolioReturn")*100).toFixed(2) + " %");
$('#expectedVolatility').text(($.cookie("portfolioStdev")*100).toFixed(2)+ " %");
$('#initialInvest').val(formatDollar($.cookie("initialInvestmentValue")));

$("#runSimulation").click(function(){
$('#varDescription').css('display','none');
$('#barGraph').css('display','none');
graphInput=[];
graphData=[];
seriesVar =[{
color:"#4b82f0",
}]
ready=false;

$('#waitHold').css('display','block')
$('#wait').text('0 %');
setTimeout(function(){update(0,5);},500); 
setTimeout(function(){update(5,10);},1000); 
setTimeout(function(){update(10,35);},1500); 
setTimeout(function(){update(40,55);},2000); 
setTimeout(function(){update(55,90);},3000); 
setTimeout(function(){update(90,99);},3500); 
setTimeout(function(){
$('#waitHold').css('display','none');
$('#barGraph').css('display','block');
$('#varDescription').css('display','block');

vaRmessage = "After a period of ";
vaRmessage += $('#timeFrameSelect option:selected').text();
vaRmessage += " the portfolio has a five percent chance that it will be worth ";
fivePercentValue = formatDollar(initialInvestmentValue/1 +  seriesVar[0].data[5][1]/1);
vaRmessage += fivePercentValue + " or less."
$('#varDescription').text(vaRmessage)


Flotr.draw(
    document.getElementById("barGraph"),
   seriesVar,
    {
		HtmlText : true,
      bars : {
        show : true,
        shadowSize : 0,
        barWidth : 0.5
      },
      xaxis : {  
	  tickFormatter: function(val){ return val/100 + ' %'},
	  noTicks : 8,
      },
	  yaxis:{
	   tickFormatter: function(val){ return formatDollar(val)}
	  }
    }
  );


},3500);



timePeriod = $('#timeFrameSelect').val();
initialInvestmentValue =$('#initialInvest').val().replace(/\D/g,'');
graphValues=calculateVaR(portfolioReturn,portfolioStdev,timePeriod,initialInvestmentValue);
for(j=0;j<graphValues.length;j += 100){
graphData.push([j,Number(graphValues[j])])
}
seriesVar[0].data=graphData;



})
}

$( "#initialInvest" ).bind( "blur", function() {
  temp =(this.value.replace(/[^\0-9]/ig, "")/1).toFixed(0) ;
	this.value = formatDollar(temp);
});


})


function formatDollar(num) {
   return "$ " + num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
function calculateVaR(portReturn,portStddev,timeFrame,startAmount){
var trials = [];




for(k=0;k<10000;k++){
trials[k]= monteCarloSim(portReturn,portStddev,timeFrame,startAmount);
}
return trials.sort(function(a, b){return a-b});

}
function update(min, max){

$('#wait').text(randomIntFromInterval(min,max) + ' %')

}
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function monteCarloSim(portReturn,portStddev,timeFrame,startAmount){
start = startAmount
expK=portReturn-(.5 * (portStddev * portStddev))
for(i=0;i<timeFrame;i++){
temp = (expK * (1/12) + portStddev * Norminsv(Math.random())*Math.sqrt(1/12));
startAmount = startAmount * Math.exp(temp);
}
startAmount = startAmount - start;
return startAmount.toFixed(2);
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



