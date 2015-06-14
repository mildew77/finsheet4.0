@extends('layouts.master')
@section('head')
{{HTML::script('javascript/assumptions/global.js')}}
{{HTML::script('javascript/assumptions/app.js')}}
{{HTML::style('css/assumptions/style.css');}}
@stop
@section('content')
<div ng-controller="MainCtrl" class="container-fluid hold" id="assumptionReturns" hm-panmove="swipeRight">
  <table class="table table-hover">
    <thead>
      <tr>
        <th>
          Asset Description
          <a ng-hide="plus" ng-click="plusAction()"><span class="glyphicon glyphicon-plus"></span></a>
          <a ng-hide="minus" ng-click="minusAction()"><span class="glyphicon glyphicon-minus"></span></a>
        </th>
        <th class="text-center percentageLabel" ng-click="zero()" ng-mouseleave="labelChange($event)" ng-mouseover="labelChange($event)"><% label %></th>
        <th class="text-center">Average Annual Return</th>
        <th class="text-center">Average Annual Standard Deviation</th>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat="assets in assets" ng-if="assets.show==true">
        <td><% assets.Description %></td>
        <td class="text-center"><div class="assetPercent"  data-ng-model="assets.Percent" ng-blur ="plusMinus()"  percent-input ></div> </td>
        <td class="text-center"><div  data-ng-model="assets.average"percent-input ng-blur="summation()" ></div></td>
        <td class="text-center"><div  data-ng-model="assets.stdev"percent-input ng-blur="summation()" ></div></td>
      </tr>
      <tr class="sums">
        <td  ><strong>Portfolio</strong></td>
        <td  class="text-center" ><strong><% sum %></strong></td>
        <td  class="text-center"><strong><% portReturn| number:2 %> %</strong></td>
        <td  class="text-center"><strong><% portStdev | number:2 %> %</strong></td>
        
      </tr>
    </tbody>
  </table>
</div>
<div ng-controller="MainCtrl" class="container-fluid hold " id="assumptionCorrelations" hm-panmove="swipeLeft" >
  <table class="table table-hover table-condensed">
    
    <tr>
      <td class="rotate"><div class="text-left"><span></span></div></td>
      <td class="rotate" ng-repeat="assets in assets" ><div><span><% assets.Description %></span></div></td>
    </tr>
    
    
    <tr ng-repeat="assets in assets" >
      <td><% assets.Description %></td>
      <td ng-repeat="list in assetList"><span ng-class="[list.Symbol,assets.Symbol]" data-ng-model="assets[list.Description]" ng-blur="corrUpdate()" number-input></span></td>
    </tr>
    
  </table>
</div>
<DIV ng-controller="MainCtrl">
  
  <!--  <small> Time Frame: <span class="glyphicon glyphicon-calendar"></span><br> </small> -->
  <DIV class="col-md-12 text-right timeFrameSelect">
<div class="error calendarError" id="calendarError"></div>
  <small> Start Date: <% startMonth %> <span ng-model="startYear" ><% startYear%></span>  <span ng-click="open('Start')" class="glyphicon glyphicon-calendar"></span> </small>
  <small>  End Date: <% endMonth %> <% endYear%>   <span ng-click="open('End')" class="glyphicon glyphicon-calendar"></span> </small> </DIV>
  

  <!-- Start of the modal -->
  
  <script type="text/ng-template" id="myModalContent.html">
  <div class="modal-header">
    
    <select class="form-control text-center" id="calendarOption" ng-model="yearSelect"  >
      <option  ng-repeat="year in years"><% year %></option>
    </select>

  </div>
  <div class="modal-body">
    <table id="calendar" class="text-center">
      <tr >
        <td ng-repeat="obj in objects | filter:row1" ng-click="ok([objects[obj._index].text , yearSelect])"  ><% objects[obj._index].text %></td>
      </tr>
      <tr >
        <td ng-repeat="obj in objects | filter:row2"  ng-click="ok([objects[obj._index].text , yearSelect])" ><% objects[obj._index].text %></td>
      </tr>
      <tr >
        <td ng-repeat="obj in objects | filter:row3"  ng-click="ok([objects[obj._index].text , yearSelect])" ><% objects[obj._index].text %></td>
      </tr>
    </table>
    
  </div>
  <div class="modal-footer">
    <h3 class="text-center"><% startEnd %> Date</h3>
    
  </div>
  </script>
  <!-- End of the modal -->
</DIV>
@stop
@section('scripts')
{{HTML::script('javascript/assumptions/assumptionFunctions.js')}}
{{HTML::script('javascript/assumptions/errorFunctions.js')}}
{{HTML::script('javascript/assumptions/percentInput.js')}}
{{HTML::script('javascript/assumptions/numberInput.js')}}
{{HTML::script('javascript/assumptions/utilities.js')}}
{{HTML::script('javascript/moment.js')}}
{{HTML::script('javascript/angularBootstrap.js')}}
{{HTML::script('javascript/velocity.js')}}
@stop