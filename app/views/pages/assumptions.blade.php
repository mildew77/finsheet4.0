@extends('layouts.master')

@section('head')
{{HTML::style('css/assumptions/table.css');}}
{{HTML::style('css/assumptions/assumptions.css');}}
{{HTML::style('calander/calander.css');}}
{{HTML::script('javascript/jquery-ui.min.draggable.js')}}
{{HTML::script('javascript/assumptions/assumptions.js')}}
{{HTML::script('calander/calander.js')}}
{{HTML::script('javascript/assumptions/customReturns.js')}}
{{HTML::script('javascript/assumptions/covariance.js')}}

@stop

@section('content')
<div id="covarianceUpdate">Correlation Matrix <input type="checkbox" id="covarianceUpdateCheckBox"></div>
<div id="covHold">
<div id="covarianceCustom">Customize Correlation <input type="checkbox" id="covarianceCustomCheckBox"></div>
<table id="corrTable"></table>
<table id="custCorrTable"></table>
</div>
<div id="tablesHold">
<table id="customTable"></table>
<table id="assumptionsTable"></table>
<div id="timePeriodInfo"></div>
<div id="custumReturns">Customize returns <input type="checkbox" id="customReturnCheckBox"></div>
<div id="calanderHold"></div>
</div>
@stop

@section('scripts')
{{HTML::script('javascript/moment.js')}}


@stop