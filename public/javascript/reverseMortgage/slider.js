$( document ).ready(function() {
console.log(monteCarloSimContainer + "is working");
var valueBubble = '<output class="rangeslider__value-bubble" />';

$('input[type="range"]').rangeslider({
  polyfill: false,
  onInit: function() {
      this.$range.append($(valueBubble));
      this.update();
  },
  onSlide: function(pos, value) {
    var $valueBubble = $('.rangeslider__value-bubble', this.$range);
    tempPosition = pos + this.grabX;
    position = (tempPosition <= this.handleWidth) ? this.handleWidth : (tempPosition >= this.maxHandleX) ? this.maxHandleX : tempPosition;
    
    if ($valueBubble.length) {
      $valueBubble[0].style.left = Math.ceil(position) + 'px';
	  $valueBubble[0].innerHTML = value + "th Percentile";
	  if(value == 3 ||value == 23||value == 33||value == 43||value == 53||value == 63||value == 73||value == 83||value == 93 )
	  {$valueBubble[0].innerHTML = value + "rd Percentile";}
	  else if(value == 2 ||value == 22||value == 32||value == 42||value == 52||value == 62||value == 72||value == 82||value == 92 )
	  {$valueBubble[0].innerHTML = value + "nd Percentile";}
	  else if(value == 1 ||value == 21||value == 31||value == 41||value == 51||value == 61||value == 71||value == 81||value == 91 )
	  {$valueBubble[0].innerHTML = value + "st Percentile";}
      else if(value == 0 )
	  {$valueBubble[0].innerHTML = value + " Percentile";}
    }
/* 	graphRM(value)//found in reverseMortgage.js */
	
  },
  
  
  onSlideEnd:function(pos, value) {
  	graphRM(value)//found in reverseMortgage.js 
  }
  

});





})

