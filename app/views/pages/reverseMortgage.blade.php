@extends('layouts.master')

@section('head')
{{HTML::style('css/assumptions/table.css');}}
{{HTML::style('css/reverseMortgage/reverseMortgage.css');}}
{{HTML::style('css/reverseMortgage/rangeslider.css');}}
{{HTML::style('css/reverseMortgage/slider.css');}}

@stop

@section('menu')

@stop

@section('content')
<div>

<div id="investmentPortfolio" >
<table>
<tr>
<td>Expected Annual Return</td>
<td id="expectedReturn"></td>
</tr>
<tr>
<td>Expected Annual Volatility</td>
<td id="expectedVolatility"></td>
</tr>
<tr>
<td>Investment Portfolio Size</td>
<td><input id="portfolioSize" type="text" value="$500,000"></td>
</tr>
<tr>
<td>Interest Rates</td>
<td><button id="updateRates">Update</button></td>
</tr>
<tr>
<td>Strategy</td>
<td> <select id="strategy">
<option>Tenure Payments</option>
<option>Term Payments</option>
<option>Flex Draw</option>
<option>Full Draw & Invest</option>
<option>No Reverse Mortgage</option>
</select></td>
</tr>
<tr id="expenseLivingTd">
<td id="expenseLiving">Monthly Living Expenses</td>
<td><input id="monthlyExpense" type="text" value="$5,000"></td>
</tr>
<tr class="remove" id="expenseInflationTd">
<td id="expenseInflation">Annual Inflation Rate</td>
<td><input id="annualInflation" type="text" value="2.00 %"></td>
</tr>
</table>
</div>

<div id="housePortfolio">
<table>
<tr>
<td>Age</td>
<td><input id="age" type="text" value="65"></td>
</tr>
<tr>
<td>House Value</td>
<td><input id="houseValue" type="text" value="$250,000"></td>
</tr>
<tr>
<td>Annual Home Appreciation %</td>
<td><input id="homeAppreciation" type="text" value="2.00 %"></td>
</tr>
<tr>
<td>Margin</td>
<td><input id="margin" type="text" value="2.50 %"></td>
</tr>
<tr>
<td>Upfront MIP %</td>
<td><input id="upfrontMIP" type="text" value="0.50 %"></td>
</tr>
<tr>
<td>Annual MIP %</td>
<td><input id="monthlyMIP" type="text" value="1.50 %"></td>
</tr>
</table>
</div>

<div id="paymentDetails">
<table>
<tr>
<td>Loan Origination Fee</td>
<td><input id="lof" type="text" value="$2,500"></td>
</tr>
<tr>
<td>Other Closing Costs</td>
<td><input id="closingCosts" type="text" value="$3,000"></td>
</tr>
<tr>
<td>Tenure Monthly Payment</td>
<td><input id="tenurePayment" type="text" value="$500"></td>
</tr>
<tr>
<td>Term Length</td>
<td> <select id="termLength">
<option>5 Years</option>
<option>15 Years</option>
<option>20 Years</option>
<option>25 Years</option>
<option>30 Years</option>
</select></td>
</tr>
<tr>
<td>Term Monthly Payment</td>
<td><input id="termPayment" type="text" value="$500"></td>
</tr>
<tr>
<td colspan="2"><button id="simulate">Run Simulation</button></td>

</tr>
</table>
</div>

</div>

<button id="test">test</button>
 <input type="range" min="0" max="100" step="1" value="50" id="range">
<div id="liborGraph"></div>
<div id="simGraph"></div>



@stop
@section('scripts')
<!--[if lt IE 9]>{{HTML::script('javascript/excanvas.js')}}<![endif]--> 
{{HTML::script('javascript/reverseMortgage/global.js')}}
{{HTML::script('javascript/flotr2.min.js')}}
{{HTML::script('javascript/reverseMortgage/pl_factor.js')}}
{{HTML::script('javascript/reverseMortgage/reverseMortgage.js')}}
{{HTML::script('javascript/reverseMortgage/liborGraph.js')}}
{{HTML::script('javascript/reverseMortgage/RMSimulation.js')}}
{{HTML::script('javascript/reverseMortgage/rangeslider.js')}}
{{HTML::script('javascript/reverseMortgage/slider.js')}}
{{HTML::script('javascript/reverseMortgage/reverseMortgageGraph.js')}}
@stop