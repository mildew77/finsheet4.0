app.directive('numberInput', function() {
  return {
    require: 'ngModel',
    
     template: "<input type=\"text\"  style=\"border:none;text-align: center;width:100%\">",
     replace: true,  

    link: function(scope, element, attrs, modelCtrl) {
      var remember = 0;
  
 angular.element(document).ready(function () {

   setTimeout(function(){
	   temp=element[0].value;
   temp=temp/1;
  temp = temp.toFixed(2);
   element[0].value =temp;



   }, 900);
   
    });
    
    
    
    
    


      element.bind('focus', function(inputValue) {

        remember = this.value;
        remember = remember.replace(/[^\d\.-]/g, "")
          .replace(/\./, "x")
          .replace(/\./g, "")
          .replace(/x/, ".");
        inputValue = "";
        modelCtrl.$setViewValue(inputValue);
        modelCtrl.$render();

      })


      element.bind('blur', function(inputValue) {
	  	var selectorString ="";
		var selectorCount= 0;	
		for(i=0;i<element[0].classList.length;i++){
		if(element[0].classList[i].indexOf("-")<0){
		selectorString +=".";
		selectorString += element[0].classList[i];
		selectorCount +=1;
		}
		}
		
		
        if (this.value === '') {
          
          temp = remember / 1;
          temp = temp.toFixed(2);
        
          modelCtrl.$setViewValue(temp);
        modelCtrl.$render();
          this.value = temp + " %";
        } else {
          temp = this.value / 1;
		  if(temp>1){temp=1};
		  if(temp<-1){temp=-1}
		   if(selectorCount==1){
		   temp=1;
		    temp = temp.toFixed(2);
			this.value = temp;
			
		   }
		else{
		 temp = temp.toFixed(2);
        
          modelCtrl.$setViewValue(temp);
        modelCtrl.$render();
          this.value = temp;
		   $(selectorString).val(temp);
		   modelCtrl.$render()
		}		   
		         }
      })


      modelCtrl.$parsers.push(function(inputValue) {

        var transformedInput = inputValue.replace(/[^\d\.-]/g, "")
          .replace(/\./, "x")
          .replace(/\./g, "")
          .replace(/x/, ".");




        if (transformedInput != inputValue) {
          modelCtrl.$setViewValue(transformedInput);
          modelCtrl.$render();
        }

        return transformedInput;
      });


    }
  };
})