//File created to check for message cookie $.cookie("message")
//Display message if there and then fade away
$( document ).ready(function() {

(function report_message(){



message = $.cookie("message");
//Check portfolio and if it does not equal 100% send back to portfolio

if(message){
$('#message').css("color","red");
$('#message').text(message)

window.setTimeout(messageRemove, 4000);


$.cookie("message","")
}


})()


})
//need to work on function to fade out text using velocity js
function messageRemove(){

$('#message').velocity({ opacity: 0 }, { duration: 1000,
complete:function(){
$('#message').text("");
$('#message').css("opacity","100%");


} }); 
}