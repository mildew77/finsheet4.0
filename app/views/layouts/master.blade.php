<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>{{$title}}</title>

{{HTML::script('javascript/jquery.js')}}
{{HTML::script('javascript/cookies/jquery.cookie.js')}}
{{HTML::script('javascript/cookies/jquery.json.js')}}
{{HTML::script('javascript/velocity.js')}}
{{HTML::script('javascript/assets.js')}}
{{HTML::script('javascript/message.js')}}

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
{{ navi::nav([ 'pages/portfolio' => 'Portfolio Composition', 'pages/assumptions' => 'Assumptions','pages/portfolioreturn' => 'Portfolio Return','pages/valueatrisk' => 'Value at Risk','pages/reversemortgage' => 'Reverse Mortgage']) }}
	@yield('menu')
	</div>
	
	<div id="message"></div>
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