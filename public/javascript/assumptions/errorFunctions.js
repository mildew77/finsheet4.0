app.service('errors', ['$timeout',
    function($timeout) {
     

        this.errorMessage = function(id, message) {

            var element = $("#" + id);

            element.text(message);
            element.css({'opacity':0})

$.Velocity
  .animate(element, { opacity: 1 }, 1250)
	.then(function() { 
  
 $.Velocity
  .animate(element, { opacity: 0 }, 7250)
  });
      


        }


    }
]);