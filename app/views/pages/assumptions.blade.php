@extends('layouts.master')
@section('head')
{{HTML::script('javascript/assumptions/global.js')}}
{{HTML::script('javascript/assumptions/app.js')}}
{{HTML::style('css/assumptions/style.css');}}
@stop
@section('content')
<div ng-controller="MainCtrl" class="container-fluid hold" id="assumptionReturns" hm-panmove="swipeRight">
<button ng-click="testing()">Test</button>
Returns
  <table class="table table-hover">
   <thead>
      <tr>
        <th>Asset Description</th>
        <th class="text-center">Percent of Portfolio</th>
        <th class="text-center">Average Annual Return</th>
        <th class="text-center">Average Annual Standard Deviation</th>
      </tr>
    </thead>
     <tbody>
    <tr ng-repeat="assets in assets" ng-if="assets.Percent>0">
    <td><% assets.Description %></td>
     <td class="text-center"><% assets.Percent | number:2 %> %</td>
     <td data-ng-model="asset.average" class="text-center"><% assets.average*100 | number:2 %> %</td>
   	  <td data-ng-model="asset.stdev" class="text-center"><% assets.stdev*100 | number:2 %> %</td>
  </tr>
    </tbody>
  </table>


</div>

<div ng-controller="MainCtrl" class="container-fluid hold" id="assumptionCorrelations" hm-panmove="swipeLeft" >
Correlations  
  <table></table>

  
</div>
@stop
@section('scripts')
{{HTML::script('javascript/assumptions/assumptionFunctions.js')}}

@stop