$( document ).ready(function() {


})

function graphRM(percentile){



try {
selection =percentile/100 * trials;
selection = selection.toFixed(0);
if(selection >= trials){
selection = trials - 1;
}
choice=key[selection][0];
d1=[];
d2=[];
d3=[];
d4=[];
d5=[];
for(i=0;i<monteCarloSimContainer.loanAmount[choice].length;i++){

temp1=[];
temp2=[];
temp3=[];
temp4=[];
temp5=[];

temp1.push(i);
temp2.push(i);
temp3.push(i);
temp4.push(i);
temp5.push(i);

temp1.push(monteCarloSimContainer.investmentPortfolio[choice][i]);
temp2.push(monteCarloSimContainer.loanAmount[choice][i]);
temp3.push(monteCarloSimContainer.principalLimit[choice][i]);
temp4.push(monteCarloSimContainer.housePrice[choice][i]);

equity = monteCarloSimContainer.housePrice[choice][i] - monteCarloSimContainer.loanAmount[choice][i];
if(equity<0){equity=0};
wealth = equity + monteCarloSimContainer.investmentPortfolio[choice][i];
temp5.push(wealth);

d1.push(temp1);
d2.push(temp2);
d3.push(temp3);
d4.push(temp4);
d5.push(temp5);

 options = {
   	HtmlText : true,
    lines: {show: true},
    title: 'One Month Libor Forward Curve',
	y2axis : {
	color : '#FF0000', 
	title : 'Wealth',
	fill:'true',
	 tickFormatter: function(val){
	 
	return formatDollar(val);
	 
	 }
	
	},
	 yaxis: {
	 tickFormatter: function(val){
	 
	return formatDollar(val);
	 
	 }
	 },
  };

  Flotr.draw(document.getElementById("simGraph"),[{data:d1, label:'Investment Portfolio'},{data:d2, label:'Reverse Mortgage Loan'},{data:d3, label:'Principal Limit'},{data:d4, label:'House Price'},{data:d5,lines:{fill:true}, label:'Total Weatlh'}],options)

}


console.log(monteCarloSimContainer.loanAmount[choice])

}
catch(err) {
    console.log(err)
}

}

function formatDollar(num) {
   return "$ " + num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}