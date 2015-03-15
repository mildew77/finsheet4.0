<?php

class navigation extends BaseController{
public $restful = true;

public function index(){
	$view = View::make('pages.index');
  	$view->title ="Welcome to Asset Guide";
	
	
	return $view;
}
public function portfolio(){
	$view = View::make('pages.portfolio');
	/* $view->names = Etf::getColumnsNames(); */
  	$view->title ="Portfolio";

	
	return $view;
}
public function portfolioReturn(){
	$view = View::make('pages.portfolioreturn');
  	$view->title ="Portfolio Return";

	
	return $view;
}
public function assumptions(){
	$view = View::make('pages.assumptions');
  	$view->title ="Portfolio Assumptions";

	
	return $view;
}
public function reverseMortgage(){
	$view = View::make('pages.reversemortgage');
  	$view->title ="Reverse Mortgage";

	
	return $view;
}
public function valueAtRisk(){
	$view = View::make('pages.valueatrisk');
  	$view->title ="Value at Risk";

	
	return $view;
}

public function needportfolio(){
return Redirect::to('/pages/portfolio')->with('message', 'Please compose a portfolio');
}




}


?>