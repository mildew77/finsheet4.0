app.directive('percentInput', function() {
  return {
    require: 'ngModel',
    
     template: "<input type=\"text\" >",
     replace: true,  

    link: function(scope, element, attrs, modelCtrl) {
      var remember = 0;
  
 angular.element(document).ready(function () {
   temp=element[0].value;
   temp=temp/1;
  temp = temp.toFixed(2);
   element[0].value =temp +" %";
    });
    
    
    
    
    


      element.bind('focus', function(inputValue) {

        remember = this.value;
        remember = remember.replace(/[^\d\.]/g, "")
          .replace(/\./, "x")
          .replace(/\./g, "")
          .replace(/x/, ".");
        inputValue = "";
        modelCtrl.$setViewValue(inputValue);
        modelCtrl.$render();

      })


      element.bind('blur', function(inputValue) {

        if (this.value === '') {
          
          temp = remember / 1;
          temp = temp.toFixed(2);
        
          modelCtrl.$setViewValue(temp);
        modelCtrl.$render();
          this.value = temp + " %";
        } else {
          temp = this.value / 1;

          temp = temp.toFixed(2);
        
          modelCtrl.$setViewValue(temp);
        modelCtrl.$render();
          this.value = temp + " %";
        }
      })


      modelCtrl.$parsers.push(function(inputValue) {

        var transformedInput = inputValue.replace(/[^\d\.]/g, "")
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