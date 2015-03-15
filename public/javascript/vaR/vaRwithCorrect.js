Flotr.draw(
    document.getElementById("barGraph"),
    seriesVar[0],
    {
		
		HtmlText : true,
      bars : {
        show : true,
        shadowSize : 0,
        barWidth : 0.5
      },
   
      xaxis : {
	  
	  tickFormatter: function(val){ return val/100 + ' %'}
       
      },
	  yaxis:{
	   tickFormatter: function(val){ return formatDollar(val)}
	  }
    }
  );
