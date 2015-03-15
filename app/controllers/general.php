<?php

class general extends BaseController{
public $restful = true;

public function index(){
	$view = View::make('pages.index');
  	$view->title ="Welcome to Asset Guide";

	
	return $view;

}






}


?>