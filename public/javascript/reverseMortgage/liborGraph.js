$( document ).ready(function() {
liborOneMonthCurve=[];
showLiborCurve=true;

$.ajax({
  type: "POST",
  url: "getLibor",

  success: function(data) {
  for(i=0;i<data.length;i++){
liborOneMonthCurve.push([data[i].period,data[i].LIBOR*100])
}

	},
	error:function(xhr, status, error){
	console.log(xhr.responseText)
	}

})

$('#updateRates').click(function(){
if(showLiborCurve==false){
$('#liborGraph').css('display','none');
showLiborCurve=true;
}
else{
$('#liborGraph').css('display','block');
liborGraph(liborOneMonthCurve);
showLiborCurve=false;
}
})



})

function liborGraph(data){
d1=[];


for(i=0;i<data.length;i++){
d1.push([data[i][0],data[i][1]])
}
 options = {
  yaxis : {  
	  tickFormatter: function(val){ return val + ' %'},
	  max: 10,
      },
   	HtmlText : true,
    lines: {show: true},
    mouse: {
	track:true,
	trackFormatter: function(obj){ 
	month = obj.x;
	rate =obj.y * 100;
	message =month + rate;
	
	return 'Month ' + obj.x.replace('.0','') + ' 1 Month Libor = ' + obj.y + ' %'	},
	},
    title: 'One Month Libor Forward Curve'
  };
  Flotr.draw(document.getElementById("liborGraph"),{data:d1},options)
  Flotr.EventAdapter.observe(document.getElementById("liborGraph"), 'flotr:click', function(position){
  currentRate=d1[position.x.toFixed(0)][1];
  newRate=position.y;
  difference =Math.abs(currentRate-newRate);
  plusMinus=0;
  if(difference>7){plusMinus=150}
  else if(difference>6){plusMinus=140}
   else if(difference>5){plusMinus=130}
   else if(difference>4){plusMinus=120}
   else if(difference>3){plusMinus=100}
   else if(difference>2){plusMinus=80}
   else if(difference>1){plusMinus=20}
   else{plusMinus=60}
  
   start= Math.max(position.x.toFixed(0) - plusMinus,0);
   finish =Math.min(position.x.toFixed(0) + plusMinus,359);
   d1[position.x.toFixed(0)][1]=newRate;
   up=(newRate - d1[start][1])/plusMinus;
	down=(d1[finish][1]-newRate)/plusMinus;
	initial=d1[start][1];
	for(i=start;i<position.x.toFixed(0);i++){
	d1[i][1]=initial;
	initial = initial + up;
	if(initial>10){initial=9.99}
	if(initial<0){initial=0.001}
	}
	for(i=position.x.toFixed(0);i<=finish;i++){
	d1[i][1]=initial;
	initial = initial + down;
	if(initial>10){initial=9.99}
	if(initial<0){initial=0.001}
	}
	liborOneMonthCurve = d1;
	
	
Flotr.draw(document.getElementById("liborGraph"),{data:d1},options)
  
  });

}

