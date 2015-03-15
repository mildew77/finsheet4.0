@extends('layouts.master')
@section('head')
{{HTML::style('css/portfolioComposition/assetCount.css');}}
{{HTML::style('css/portfolioComposition/form.css');}}

@stop
@section('content')

<div id="numberOfAssets">
<span id="howManyAssets">How many assets?</span><span id="assetNumber">0</span><span id="assetPercentSum">0%</span>
<ul id="howManyAssetsUl">
<li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li><li>11</li>
<li>12</li><li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li>
</ul>	
	</div>
<div id="formGraphContainer">


<table id="compositionForm">
</table>	
<div id="compositionGraph"></div>
</div>
@stop

@section('scripts')

{{HTML::script('javascript/portfolio/howManyAssets.js')}}
{{HTML::script('javascript/flotr2.min.js')}}
{{HTML::script('javascript/portfolio/graph.js')}}

@stop