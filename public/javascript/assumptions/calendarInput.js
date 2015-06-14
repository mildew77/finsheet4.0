app.directive( 'calendarInput', function() {
  return {
    require: 'ngModel',
    template: "<table >
   <caption>Year</caption>
  <tr>
    <td value=1>Jan</td>
    <td value=2>Feb</td>
    <td value=3>Mar</td>
    <td value=4>Apr</td>
  </tr>
  <tr>
    <td value=5>May</td>
    <td value=6>Jun</td>
    <td value=7>Jul</td>
    <td value=8>Aug</td>
  </tr>
  <tr>
    <td value=9>Sep</td>
    <td value=10>Oct</td>
    <td value=11>Nov</td>
    <td value=12>Dec</td>
  </tr>
</table>",
     
     replace: true,  

    link: function(scope, element, attrs, modelCtrl) {
     
  
}
  };
})