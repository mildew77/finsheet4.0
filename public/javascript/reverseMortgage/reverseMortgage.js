$( document ).ready(function() {

$('#expectedReturn').text(($.cookie("portfolioReturn")*100).toFixed(2) + " %");
$('#expectedVolatility').text(($.cookie("portfolioStdev")*100).toFixed(2)+ " %");




$( "#portfolioSize,#houseValue,#monthlyExpense,#tenurePayment,#termPayment,#closingCosts,#lof" ).bind( "blur", function() {
  temp =(this.value.replace(/[^\0-9]/ig, "")/1).toFixed(0) ;
  if(isNaN(temp)){
  temp = 0;
  }
  console.log(temp)
	this.value = formatDollar(temp);
});
$('#age').blur(function(){
temp =this.value.replace(/\D/g,'');
if(temp<62){
temp = 62;
}
if(temp>110){
temp = 110;
}
this.value = temp;
})

$( "#margin, #homeAppreciation, #upfrontMIP, #monthlyMIP, #annualInflation" ).bind( "blur", function() {
  
  temp = (this.value.replace(/[^\0-9]/ig, "")/1).toFixed(2);
  if(isNaN(temp)){
  temp = 0 + " %";
  }
  this.value = temp + " %";
  
})
$('#expenseLiving').click(function(){
$('#expenseLivingTd').addClass('remove');
$('#expenseInflationTd').removeClass('remove');
})
$('#expenseInflation').click(function(){
$('#expenseInflationTd').addClass('remove');
$('#expenseLivingTd').removeClass('remove');
})



})

//calculated using age 100
//if older than 95 they are calculated as being 95 living to 100
//if they outlive 100 tenure still pays even if above principal limit


function formatDollar(num) {
   return "$ " + num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

