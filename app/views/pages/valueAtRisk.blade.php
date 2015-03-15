@extends('layouts.master')
@section('head')
{{HTML::style('css/vaR/vaR.css')}}
@stop
@section('menu')

@stop

@section('content')
<div id="infoHold">
<span>Expected Annual Return = </span>
<span class="output" id="expectedReturn"></span>
<span>Expected Annual Volatility = </span>
<span class="output" id="expectedVolatility"></span>
<span>Initial Investment = </span>
<input id="initialInvest"class="output" type="text">
<span>TimeFrame = </span>

<select id="timeFrameSelect" class="output">
<option value="1" >1 Month</option>
<option value="3" selected="selected">3 Months</option>
<option value="6" >6 Months</option>
<option value="12" >1 Year</option>
<option value="24" >2 Years</option>
<option value="60" >5 Years</option>
<option value="120" >10 Years</option>
</select>
<button id="runSimulation">Find Value at Risk</button>
</div>
<div id="varDescription"></div>
<div id="waitHold">
<div id="wait">0 %</div>
<div id="pleaseWait">Please wait while calculating...</div>
</div>


<div id="barGraph"></div>

@stop

@section('scripts')
 <!--[if lt IE 9]>{{HTML::script('javascript/excanvas.js')}}<![endif]--> 
{{HTML::script('javascript/flotr2.min.js')}}

{{HTML::script('javascript/vaR/vaR.js')}}

@stop