@extends('layouts.master')
@section('head')
{{HTML::script('javascript/portfolio/app.js')}}
{{HTML::style('css/portfolioComposition/style.css');}}
@stop
@section('content')
<div ng-controller="MainCtrl">
  
  
  
  <div class="container portSumHold"><span class="text-right col-sm-6">Portfolio Sum </span><span><%sum%></span></div>
  <div class="container-fluid hold" id="portfolioHold" hm-panmove="swipeRight">
    <form class="form-horizontal" ng-repeat="asset in assets">
      <div class="form-group">
        <label for="inputEmail3" class="col-sm-6 control-label"><%asset.Description%></label>
        <div class="col-sm-2">
          <input class="form-control percentInput" data-ng-model="asset.Percent" ng-blur="summation()" percent-input>
        </div>
      </div>
    </form>
  </div>
</div>
<div ng-controller="MainCtrl" class="container-fluid hold" id="graphHold" hm-panmove="swipeLeft" data-ng-init="updateGraph()">
  <div id="chartLegend"></div>
  <div id="plotDiv"></div>
  
</div>
@stop
@section('scripts')
{{HTML::script('javascript/portfolio/graph.js')}}
{{HTML::script('javascript/portfolio/percentInput.js')}}
@stop