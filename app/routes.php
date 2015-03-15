<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/',array('as'=>'index','uses'=>'navigation@index'));
Route::get('/pages/assumptions',array('as'=>'assumptions','uses'=>'navigation@assumptions'));
Route::get('/pages/portfolio',array('as'=>'portfolio','uses'=>'navigation@portfolio'));
Route::get('/pages/reversemortgage',array('as'=>'reverseMortgage','uses'=>'navigation@reverseMortgage'));
Route::get('/pages/valueatrisk',array('as'=>'valueAtRisk','uses'=>'navigation@valueAtRisk'));
Route::get('/pages/portfolioreturn',array('as'=>'portfolioReturn','uses'=>'navigation@portfolioReturn'));
Route::get('/refreshData',array('as'=>'refreshData','uses'=>'data@refreshData'));
Route::post('/refreshDataPost', 'data@refreshDataPost');
Route::post('/createLibor','data@createLibor');
Route::post('/liborSwap','data@liborSwap');
Route::post('/liborPost', 'data@libor');
Route::post('pages/historicReturns', 'assumptions@historicReturns');
Route::post('pages/getLibor', 'assumptions@getLibor');
Route::post('pages/getSwap', 'assumptions@getSwap');
