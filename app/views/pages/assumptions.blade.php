@extends('layouts.master')
@section('head')
{{HTML::script('javascript/assumptions/global.js')}}
{{HTML::script('javascript/assumptions/app.js')}}
{{HTML::style('css/assumptions/style.css');}}
@stop
@section('content')
<div ng-controller="MainCtrl" class="container-fluid hold" id="assumptionReturns" hm-panmove="swipeRight">

<p>Envelope icon: <span class="glyphicon glyphicon-calendar"></span></p>  

 <a class="btn btn-large" href="#"><i class="icon-star"></i> Star</a>
 



  <table class="table table-hover">
   <thead>
      <tr>
        <th>Asset Description</th>
        <th class="text-center percentageLabel" ng-click="zero()" ng-mouseleave="labelChange($event)" ng-mouseover="labelChange($event)"><% label %></th>
        <th class="text-center">Average Annual Return</th>
        <th class="text-center">Average Annual Standard Deviation</th>
      </tr>
    </thead>
     <tbody>
    <tr ng-repeat="assets in assets" ng-if="assets.show==true">
    <td><% assets.Description %></td>
     <td class="text-center"><div class="assetPercent"  data-ng-model="assets.Percent" ng-blur="summation()" percent-input ></div> </td>
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
  <td class="rotate" ng-repeat="assets in assets" ng-if="assets.show==true"><div><span><% assets.Description %></span></div></td>
  </tr>
  
  
     <tr ng-repeat="assets in assets" >
    <td><% assets.Description %></td>
     <td ng-repeat="list in assetList"><span ng-class="[list.Symbol,assets.Symbol]" data-ng-model="assets[list.Description]" ng-blur="corrUpdate()" number-input></span></td>
  </tr>
  
  </table>

  
</div>
@stop
@section('scripts')
{{HTML::script('javascript/assumptions/assumptionFunctions.js')}}
{{HTML::script('javascript/assumptions/percentInput.js')}}
{{HTML::script('javascript/assumptions/numberInput.js')}}
@stop