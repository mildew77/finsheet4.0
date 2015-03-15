


$( document ).ready(function() {



$('#customReturnCheckBox').change(function(){

if(this.checked){
//need to replace below with 
$.cookie("customReturns",true);
$('#assumptionsTable').css('display','none');
$('#timePeriodInfo').css('display','none');
$('#customTable').css('display','block');



$('#customTable').empty();
		$('#customTable').append("<tr><th>Asset</th><th>Percentage</th><th>Annual Return</th><th>Standard Deviation</th></tr>");
		for(i=0;i<assumptions.currentReturns[0].length;i++){
		$('#customTable').append("<tr><td>"+assumptions.currentReturns[0][i]+"</td><td>"+assumptions.currentReturns[1][i]+" %</td><td><input class ='customAnnualReturn' type='text' value='"+assumptions.currentReturns[2][i]+"'> %</td><td><input type='text' class ='customAnnualStd' value='"+assumptions.currentReturns[3][i]+"'> %</td></tr>")
	
		}
updateCustomReturns();//function found below






		
$('#customTable input').bind('blur',function(){

updateCustomReturns();//function found below
});

}
else{
$.cookie("customReturns",false)
$('#customTable').css('display','none');
$('#assumptionsTable').css('display','block');
$('#timePeriodInfo').css('display','block');
updateRegularReturns();//function found below




}



})
})

function updateCustomReturns(){
assumptions.currentReturns[2]=[];
assumptions.currentReturns[3]=[];
$('.customAnnualReturn').each(function(){
assumptions.currentReturns[2].push(this.value)
})
$('.customAnnualStd').each(function(){
assumptions.currentReturns[3].push(this.value)
})
src = JSON.stringify(assumptions.currentReturns);
		$.cookie("currentReturns", src);

}


function updateRegularReturns(){
assumptions.currentReturns[2]=[];
assumptions.currentReturns[3]=[];
$('.areturn').each(function(){

assumptions.currentReturns[2].push(this.textContent.replace(' %',''))
})
$('.astdev').each(function(){
assumptions.currentReturns[3].push(this.textContent.replace(' %',''))
})
src = JSON.stringify(assumptions.currentReturns);
		$.cookie("currentReturns", src);

}

