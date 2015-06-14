<!DOCTYPE html>
<html ng-app="finsheet">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>{{$title}}</title>

<!-- Main Frameworks	 -->
    {{HTML::script('javascript/angular.js')}}
  <!--   {{HTML::script('javascript/jquery.js')}} -->

<!-- Bootstrap	 -->

<!-- {{HTML::style('css/bootstrap.css');}}
{{HTML::script('javascript/bootstrap.min.js')}} -->
<!-- Had to use below for calander glyph to work ? -->
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<!-- Scripts used throughout application	 -->

{{HTML::script('javascript/angular.cookie.js')}}
{{HTML::script('javascript/hammer.js')}}
{{HTML::script('javascript/angular.hammer.js')}}
{{HTML::script('javascript/flot.js')}}
{{HTML::script('javascript/flotPie.js')}}
{{HTML::script('javascript/bootstrap.min.js')}}
<!-- Styles shared throughout application	 -->


{{HTML::style('css/default.css');}}
{{HTML::style('css/menu.css');}}



	@yield('head')
	</head>
	<body>
	<header>
	<div id="logo">Logo Here</div>
	<div id="login">Login info Here</div>
	</header>
	
	<article>
	<div id="menu">
<ul><li>Assumptions</li></ul>

	</div>
	

	<div id="content">
	@yield('content')
	</div>
	</article>
	<footer>
	@yield('footer')
	
	</footer>	
	@yield('scripts')

	</body>
</html>