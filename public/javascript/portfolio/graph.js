function graph(){
$.cookie("customReturns",false)
$.cookie("customCorrelation",false)
var percentArray=[];
var assetCount=0;
var graphData=[];
var remainder = 100;
var graphColors=[];
var container;
var percentColor=[];
$('.assetPercent').each(function(){
  percentArray.push((this.value.replace('%',''))/1);
  })
for(i=0;i<assets.length;i++){
assets[i].percent=0;
}
$('.assetSelect').each(function(){

for(i=0;i<assets.length;i++){
if(assets[i].Description==this.value){
assets[i].percent += percentArray[assetCount]
$(this).css('color',assets[i].Color)
percentColor.push(assets[i].Color)


}
}
assetCount += 1;
})
//color in percent 
 for(i=0;i<percentColor.length;i++){
 $( ".assetPercent:eq(" + i + " )" ).css( "color", percentColor[i]);
 }

for(i=0;i<assets.length;i++){
if(assets[i].percent > 0){
graphData.push({data: [[0,assets[i].percent]], label: assets[i].Description,color: assets[i].Color })

}}

  Flotr.draw(document.getElementById("compositionGraph"),graphData, {
    HtmlText : true,
    grid : {
      verticalLines : false,
      horizontalLines : false,
	  outlineWidth:0
    },
    xaxis : { showLabels : false },
    yaxis : { showLabels : false },
    pie : {
      show : true
	 
    },
    legend : {
      show : false
     
    }
  });
  
//set cookie that contains asset object update.  Located in assets.js 



src = JSON.stringify(assets);
$.cookie("assets", src);
temp = $.cookie("assets");
nobj = $.secureEvalJSON(temp);



}