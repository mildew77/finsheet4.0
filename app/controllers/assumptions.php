<?php

class assumptions extends BaseController{
public $restful = true;

public function historicReturns(){
if(Request::ajax()){
$dataArray=[];
$counter=1;
$dataArray[0] = DB::table('etfreturns')->lists('date'); 
foreach ($_POST["objSymbol"] as $value){
$temp = preg_replace('#[^A-Za-z0-9]#i','', $value);
$dataArray[$counter]= DB::table('etfreturns')->lists($temp); 
$counter ++;
}
return $dataArray;
}
}

public function getLibor(){
$forwardCurve=DB::table('liborforward')->get(); 
return $forwardCurve;
}
public function getSwap(){
$swapCurve=DB::table('liborSwap')->get(); 
return $swapCurve;
}




}


?>