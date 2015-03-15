@extends('layouts.master')
@section('head')
{{HTML::style('css/portfolioReturns/portfolioReturns.css');}}


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
<input id="initialInvest"class="output" type="text" value="$10,000">
<span>TimeFrame = </span>

<select id="timeFrameSelect" class="output">
<option>5 Years</option>
<option selected="selected">10 Years</option>
<option>25 Years</option>
<option>50 Years</option>
</select>
<button id="runSimulation">Run Simulation</button>
</div>
<div id="modelGraph"></div>

@stop

@section('scripts')
{{HTML::script('javascript/moment.js')}}
{{HTML::script('javascript/portfolioReturn/portfolioReturn.js')}}
{{HTML::script('javascript/flotr2.min.js')}}

@stop
