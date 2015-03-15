

$( document ).ready(function() {


$.ajax({
  type: "POST",
  url: "getSwap",

  success: function(data) {
tenYearSwap = (data[7].LIBOR/100).toFixed(6);
	},
	error:function(xhr, status, error){
	console.log(xhr.responseText)
	}

})





$('#test').click(function(){
console.dir(key);
console.dir(monteCarloSimContainer);
})

$('#simulate').click(function(){

strategy="";


var simObj =  function(){
this.housePrice=[];
this.investmentPortfolio=[];
this.loanAmount=[];
this.principalLimit=[];
this.expenseSchedule=[];
this.initialBalance=0;
this.maxClaimAmount=0;
this.annualReturn = $('#expectedReturn').text().replace(" %", "")/100;
this.annualVol=$('#expectedVolatility').text().replace(" %", "")/100;
this.portSize =  $('#portfolioSize').val().replace(/\D/g, "")/1;
this.strategy = $('#strategy').val();
this.age = $('#age').val()/1;
this.houseValue =  $('#houseValue').val().replace(/\D/g, "")/1;
this.margin = $('#margin').val().replace(" %", "")/100;
this.homeAppreciation = $('#homeAppreciation').val().replace("%", "")/100;
this.monthlyExpense =$('#monthlyExpense').val().replace(/\D/g, "")/1;
this.inflation =$('#annualInflation').val().replace(" %", "")/100;
this.tenurePayment =$('#tenurePayment').val().replace(/\D/g, "")/1;
this.termLength = $('#termLength').val().replace(" Years", "")/1;
this.termPayment =$('#termPayment').val().replace(/\D/g, "")/1;
this.upfrontMip = $('#upfrontMIP').val().replace(" %", "")/100;
this.annualMip = $('#monthlyMIP').val().replace(" %", "")/100;
this.lof= $('#lof').val().replace(/\D/g, "")/1; 
this.closingCosts=$('#closingCosts').val().replace(/\D/g, "")/1;  
this.maxClaimAmount = Math.min(maxClaimLimit,this.houseValue);
this.princiaplLimitAppreciation = (this.margin + this.annualMip + tenYearSwap/1)/12 + 1;
this.pl=pl_factor(this.age,this.margin/1 + tenYearSwap/1) * this.maxClaimAmount;
this.princiaplLimitAppreciation = (this.margin + this.annualMip + tenYearSwap/1)/12 + 1
this.initialBalance = (this.maxClaimAmount*this.upfrontMip)+this.closingCosts+this.lof; 
this.investmentPortfolio.push(this.portSize)
this.loanAmount.push(this.initialBalance);
this.loanAppreciation = (this.margin + this.annualMip)/12 + 1;
tempPl=this.pl
for(i=0;i<360;i++){
this.principalLimit.push(tempPl)
tempPl=tempPl * this.princiaplLimitAppreciation;
}
tempHouseValue = this.houseValue/1;
tempHomeAppreciation = this.homeAppreciation/12 +1
for(i=0;i<360;i++){
this.housePrice.push(tempHouseValue.toFixed(2));
tempHouseValue = tempHouseValue * tempHomeAppreciation;
}
tempInflation= this.inflation/12 + 1;
tempExpense = this.monthlyExpense/1
for(i=0;i<360;i++){
this.expenseSchedule.push(tempExpense);
tempExpense = tempExpense * tempInflation;
}

}

strategy = $('#strategy').val();
for(j=0;j<trials;j++){
tempObject = new simObj;
if(strategy == "Tenure Payments"){
tempObject=Tenure(tempObject);
}else if(strategy == "Term Payments"){
tempObject=Term(tempObject);
}else if(strategy == "Flex Draw"){
tempObject=Flex(tempObject);
}else if(strategy == "Full Draw & Invest"){
tempObject=Full(tempObject);
}else{

}

monteCarloSimContainer.investmentPortfolio[j]=tempObject.investmentPortfolio; 
monteCarloSimContainer.loanAmount[j]=tempObject.loanAmount; 
monteCarloSimContainer.principalLimit[j]=tempObject.principalLimit; 
monteCarloSimContainer.housePrice[j]=tempObject.housePrice; 
}
for(j=0;j<trials;j++){
tempArray=[];
tempArray.push(j);
investmentSum=0;
k=1
for(i=monteCarloSimContainer.investmentPortfolio[j].length-1;i>-1;i--){
investmentSum = investmentSum + monteCarloSimContainer.investmentPortfolio[j][i]/Math.pow(1.01,k)
k++;
}
tempArray.push(investmentSum );
key.push(tempArray);
}
key.sort(compareSecondColumn);



console.dir(key);
console.dir(monteCarloSimContainer);


})


})


function Term(simObj){
term = simObj.termLength * 12;
portReturn = simObj.annualReturn
portStddev = simObj.annualVol
expK=portReturn-(.5 * (portStddev * portStddev))
portfolioSize = simObj.investmentPortfolio[0];
term = simObj.termLength * 12;
remainder = 0;
termPayment = simObj.termPayment;
for(i=1;i<360;i++){
if(term > 0){termPayment = simObj.termPayment;}
else{termPayment = 0}
loc = simObj.principalLimit[i-1] - simObj.loanAmount[i-1];
loc = loc - termPayment;
moneyNeeded = simObj.expenseSchedule[i-1];
loanAmount =simObj.loanAmount[i-1];
portfolioAppreciation = (expK * (1/12) + portStddev * Norminsv(Math.random())*Math.sqrt(1/12));
portfolioSize = simObj.investmentPortfolio[i-1];
if(portfolioSize > 0){
if(loc > moneyNeeded){
loanAmount = (loanAmount + termPayment ) * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12)
portfolioGrab = moneyNeeded - termPayment;
portfolioSize = portfolioSize - portfolioGrab; 
}
else if(loc > 0){
portfolioGrab = moneyNeeded-loc;
loanAmount = (loanAmount + loc ) * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12);
portfolioSize = portfolioSize - portfolioGrab; 
}
else{
portfolioGrab= moneyNeeded;
loanAmount= loanAmount * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12);
portfolioSize = portfolioSize - portfolioGrab; 
}
}
else{
if(loc > moneyNeeded){
loanAmount = (loanAmount + moneyNeeded ) * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12)
}
else if(loc > 0){
loanAmount = simObj.principalLimit[i-1] * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12);
}
else{
loanAmount = loanAmount * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12);
}
}
portfolioSize = portfolioSize * Math.exp(portfolioAppreciation);
simObj.loanAmount[i]=loanAmount;
if(portfolioSize < 0){portfolioSize = 0 }
simObj.investmentPortfolio[i] = portfolioSize;
term --;
}
return simObj;
}

function Full(simObj){
portReturn = simObj.annualReturn
portStddev = simObj.annualVol
expK=portReturn-(.5 * (portStddev * portStddev))
portfolioSize = simObj.investmentPortfolio[0];
draw = simObj.principalLimit[0] - simObj.loanAmount[0];
portfolioSize = portfolioSize + draw;
simObj.loanAmount[0] = simObj.principalLimit[0];
for(i=1;i<360;i++){
portfolioSize = portfolioSize - simObj.expenseSchedule[i];
temp = (expK * (1/12) + portStddev * Norminsv(Math.random())*Math.sqrt(1/12));
portfolioSize = portfolioSize * Math.exp(temp);
 if(portfolioSize < 0){ portfolioSize = 0; }
simObj.investmentPortfolio.push(portfolioSize);
newBalance = simObj.loanAmount[i-1] * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12 );
simObj.loanAmount.push(newBalance);
}
return simObj;
}

function Tenure(simObj){
portReturn = simObj.annualReturn;
portStddev = simObj.annualVol;
expK=portReturn-(.5 * (portStddev * portStddev));
portfolioSize = simObj.investmentPortfolio[0];
tenurePayment = simObj.tenurePayment;
for(i=1;i<360;i++){
loc = simObj.principalLimit[i-1] - simObj.loanAmount[i-1];
loc = loc - tenurePayment;
moneyNeeded = simObj.expenseSchedule[i-1];
loanAmount =simObj.loanAmount[i-1];
portfolioAppreciation = (expK * (1/12) + portStddev * Norminsv(Math.random())*Math.sqrt(1/12));
portfolioSize = simObj.investmentPortfolio[i-1];

if(portfolioSize > 0){
if(loc > moneyNeeded){
loanAmount = (loanAmount + tenurePayment ) * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12)
portfolioGrab = moneyNeeded - tenurePayment;
portfolioSize = portfolioSize - portfolioGrab; 
}
else if(loc > 0){
portfolioGrab = moneyNeeded-loc;
loanAmount = (loanAmount + loc ) * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12);
portfolioSize = portfolioSize - portfolioGrab; 
}
else{
portfolioGrab= moneyNeeded;
loanAmount= loanAmount * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12);
portfolioSize = portfolioSize - portfolioGrab; 
}
}
else{
if(loc > moneyNeeded){
loanAmount = (loanAmount + moneyNeeded ) * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12)
}
else if(loc > 0){
loanAmount = simObj.principalLimit[i-1] * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12);

}
else{
loanAmount = loanAmount * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12);

}
}
portfolioSize = portfolioSize * Math.exp(portfolioAppreciation);
simObj.loanAmount[i]=loanAmount;
if(portfolioSize < 0){portfolioSize = 0 }
simObj.investmentPortfolio[i] = portfolioSize;
}


return simObj;
}


//First take from investment portfolio, if portfolio returns does not cover expenses draw from loan
function Flex(simObj){

portReturn = simObj.annualReturn;
portStddev = simObj.annualVol;
expK=portReturn-(.5 * (portStddev * portStddev));

//This is different compared to tenure and term to account for first draw which will come from investment portfolio
portfolioAppreciation = (expK * (1/12) + portStddev * Norminsv(Math.random())*Math.sqrt(1/12));
portfolioSize = simObj.investmentPortfolio[0] - simObj.expenseSchedule[0];
portfolioSize = portfolioSize * Math.exp(portfolioAppreciation);
loanAmount = simObj.loanAmount[0] * (simObj.loanAppreciation + liborOneMonthCurve[0][1]/100/12);
simObj.investmentPortfolio[1] = portfolioSize;
simObj.loanAmount[1]=loanAmount;

for(i=2;i<360;i++){
loc = simObj.principalLimit[i-1] - simObj.loanAmount[i-1];
moneyNeeded = simObj.expenseSchedule[i-1];
loanAmount =simObj.loanAmount[i-1];
portfolioAppreciation = (expK * (1/12) + portStddev * Norminsv(Math.random())*Math.sqrt(1/12));
portfolioSize = simObj.investmentPortfolio[i-1];
if(portfolioSize > 0){
if(portfolioSize - simObj.investmentPortfolio[i-2] > 0){
portfolioSize=portfolioSize - moneyNeeded;
}
else{
if(moneyNeeded > loc){
if(loc>0){
loanAmount = loanAmount + loc;
portfolioSize = portfolioSize - (moneyNeeded - loc);
}
else{
portfolioSize=portfolioSize - moneyNeeded ;
}
}
else{
loanAmount = loanAmount + moneyNeeded;
}
}
}
else{
if(moneyNeeded > loc){
if(loc>0){
loanAmount = loanAmount + loc;
portfolioSize=0;
}else{
portfolioSize=0;
}
}
else{
loanAmount = loanAmount + moneyNeeded;
portfolioSize=0;
}
}
portfolioSize = portfolioSize * Math.exp(portfolioAppreciation);
loanAmount = loanAmount * (simObj.loanAppreciation + liborOneMonthCurve[i-1][1]/100/12);
simObj.loanAmount[i]=loanAmount;
if(portfolioSize < 0){portfolioSize = 0 }
simObj.investmentPortfolio[i] = portfolioSize;
}
return simObj;

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

function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}



