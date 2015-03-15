//starts object that will be used by calander.js and assumptions.js
//end and start date set by initial ajax call from assumptions.js
//need moment.js , jquery UI and assumptoins.js for this thing to work
var calander =[{

'startDate':'',
'endDate':'',
//used to determine if start or end date is selected for calander pop up
'start':'',
'test':'testing',
}]

//this funciton builds calander and adds functionality to calander
function calanderBuild(calanderElement,startElement,endElement,object){
calanderElement.empty();
var end = assumptions.completeReturns[0].length - 1;
calander.months=['Jan','Feb','Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];


startYear=moment(assumptions.completeReturns[0][end]).format("YYYY")/1;
endYear=moment(assumptions.completeReturns[0][0]).format("YYYY")/1;


dropdown="<select class='calanderDropDown'>"

for(i=startYear;i<=endYear;i++){
dropdown +="<option>"+i+"</option>"

}
dropdown +="</select>"
var calanderTable = "<table class='calander'><th colspan='4'>"+dropdown+"</th><tr><td id='Jan'>Jan</td><td id='Feb'>Feb</td><td id='Mar'>Mar</td><td id='Apr'>Apr</td></tr><tr><td id='May'>May</td><td id='Jun'>Jun</td><td id='Jul'>Jul</td><td id='Aug'>Aug</td></tr><tr><td id='Sep'>Sep</td><td id='Oct'>Oct</td><td id='Nov'>Nov</td><td id='Dec'>Dec</td></tr></table>"


calanderElement.append(calanderTable);
calanderElement.css('display','none');
$('.calander').draggable();

//build calander applicable to start date
startElement.bind( "click", function() {

calander.start=true;
calanderElement.css('display','block');
year=moment(this.text).format("YYYY");
for(i=0;i<calander.months.length;i++){
$('#' + calander.months[i]).removeClass('inactiveMonth');
$('#' + calander.months[i]).addClass('activeMonth');
}


$('.calanderDropDown').val(year);
lastYear=moment(assumptions.completeReturns[0][0]).format("YYYY");
firstYear=moment(assumptions.completeReturns[0][assumptions.completeReturns[0].length-1]).format("YYYY");
lastMonth=moment(assumptions.completeReturns[0][0]).format("M");
firstMonth=moment(assumptions.completeReturns[0][assumptions.completeReturns[0].length-1]).format("M");

startMonthsGrey=[];
endMonthsGrey=[];
for(i=0;i<12;i++){
if(firstMonth/1>i+1){
startMonthsGrey[i]=calander.months[i];
}
}
for(i=12;i>0;i--){
if(i>lastMonth/1){
endMonthsGrey[12-i]=calander.months[i-1];
}
}

if(year==firstYear){
for(i=0;i<startMonthsGrey.length;i++){
$('#' + startMonthsGrey[i]).addClass('inactiveMonth');
$('#' + startMonthsGrey[i]).removeClass('activeMonth');
}
}
if(year==lastYear){
for(i=0;i<endMonthsGrey.length;i++){
$('#' + endMonthsGrey[i]).addClass('inactiveMonth');
$('#' + endMonthsGrey[i]).removeClass('activeMonth');
}
}



//set up months per year choice chosen, once month is chosen magic will actually happen
$('.calanderDropDown').bind("change",function(){
for(i=0;i<calander.months.length;i++){
$('#' + calander.months[i]).removeClass('inactiveMonth');
$('#' + calander.months[i]).addClass('activeMonth');
}

if($('.calanderDropDown').val()==firstYear){
for(i=0;i<startMonthsGrey.length;i++){
$('#' + startMonthsGrey[i]).addClass('inactiveMonth');
$('#' + startMonthsGrey[i]).removeClass('activeMonth');
}
}
else if($('.calanderDropDown').val()==lastYear){
for(i=0;i<endMonthsGrey.length;i++){
$('#' + endMonthsGrey[i]).addClass('inactiveMonth');
$('#' + endMonthsGrey[i]).removeClass('activeMonth');
}
}
else{}
})

});


//build calander applicable to end date
endElement.bind( "click", function() {
calander.start=false;
calanderElement.css('display','block');
year=moment(this.text).format("YYYY");
for(i=0;i<calander.months.length;i++){
$('#' + calander.months[i]).removeClass('inactiveMonth');
$('#' + calander.months[i]).addClass('activeMonth');
}


$('.calanderDropDown').val(year);
lastYear=moment(assumptions.completeReturns[0][0]).format("YYYY");
firstYear=moment(assumptions.completeReturns[0][assumptions.completeReturns[0].length-1]).format("YYYY");
lastMonth=moment(assumptions.completeReturns[0][0]).format("M");
firstMonth=moment(assumptions.completeReturns[0][assumptions.completeReturns[0].length-1]).format("M");

startMonthsGrey=[];
endMonthsGrey=[];
for(i=0;i<12;i++){
if(firstMonth/1>i+1){
startMonthsGrey[i]=calander.months[i];
}
}
for(i=12;i>0;i--){
if(i>lastMonth/1){
endMonthsGrey[12-i]=calander.months[i-1];
}
}

if(year==firstYear){
for(i=0;i<startMonthsGrey.length;i++){
$('#' + startMonthsGrey[i]).addClass('inactiveMonth');
$('#' + startMonthsGrey[i]).removeClass('activeMonth');
}
}
if(year==lastYear){
for(i=0;i<endMonthsGrey.length;i++){
$('#' + endMonthsGrey[i]).addClass('inactiveMonth');
$('#' + endMonthsGrey[i]).removeClass('activeMonth');
}
}


$('.calanderDropDown').bind("change",function(){
for(i=0;i<calander.months.length;i++){
$('#' + calander.months[i]).removeClass('inactiveMonth');
$('#' + calander.months[i]).addClass('activeMonth');
}

if($('.calanderDropDown').val()==firstYear){
for(i=0;i<startMonthsGrey.length;i++){
$('#' + startMonthsGrey[i]).addClass('inactiveMonth');
$('#' + startMonthsGrey[i]).removeClass('activeMonth');
}
}
else if($('.calanderDropDown').val()==lastYear){
for(i=0;i<endMonthsGrey.length;i++){

$('#' + endMonthsGrey[i]).addClass('inactiveMonth');
$('#' + endMonthsGrey[i]).removeClass('activeMonth');
}
}
else{}
})


});
//when month is chosen sets date and recalculates using assumptions.js function customReturn()
$('.calander td').click(function(){
month = this.innerText;
year = $('.calanderDropDown').val();
completeReturnsPosition="";
date="";
newReturnArray=[];


start="";
end="";

if(this.className=="activeMonth"){
for(i=0;i<assumptions.completeReturns[0].length;i++){
if(month == moment(assumptions.completeReturns[0][i]).format('MMM') && year == moment(assumptions.completeReturns[0][i]).format('YYYY')){
completeReturnsPosition = i;
date = assumptions.completeReturns[0][i];
};
/* console.log(moment(assumptions.completeReturns[0][i]).format('MMM')) */
}

/* if(calander.start){
if(completeReturnsPosition == assumptions.completeReturns[0].length-1){}
else{
calander.startDate=assumptions.completeReturns[0][completeReturnsPosition];

}
}
else{
if(completeReturnsPosition == 0){}
else{
calander.endDate=assumptions.completeReturns[0][completeReturnsPosition];

}

} */
if(calander.start){
calander.startDate = date;
}
else{calander.endDate = date}
for(i=0;i<assumptions.completeReturns[0].length;i++){
if(assumptions.completeReturns[0][i]==calander.startDate){
start = i;
}
if(assumptions.completeReturns[0][i]==calander.endDate){
end = i;
}

}
//if start date is greater than end date it does nothing
if(start <= end){}
else{
for(i=0;i<assumptions.completeReturns.length;i++){
newReturnArray.push(assumptions.completeReturns[i].slice(end,start+1))
}

//found in assumptions.js
presentAssumptions(newReturnArray);

}


}

})

}

