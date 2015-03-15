<?php


class data extends BaseController{
public $restful = true;


public function refreshData(){
	$view = View::make('pages.refreshData');
  	$view->title ="Refresh Data";
	
	
	return $view;
}
public function refreshDataPost(){
	$array= $_POST['symbols'];
	$databaseTable= $_POST['dataBaseName'];https://wellsfargoadvisors.mworld.com/m/m.w?lp=S&qv=1631&Type=Financials&sub=i&incper=q
    $dataBaseName = YAHOODB::createTest($databaseTable);
	$data = YAHOODB::initialpop($array,$databaseTable); 
	YAHOODB::updateGold($databaseTable);

return $data; 
	
}
public function libor(){
$swapHtml=[];
$swap=[];
//$swap will hold monthly libor, 1yr swap,2yr swap,3yr swap,4yr swap,5yr swap
//7yr swap,10yr swap,30yr swap
//Reference is the address to pull the one month libor rate from
$reference ='http://online.wsj.com/mdc/public/page/2_3020-libor.html?mod=topnav_2_3020';
$source='http://online.wsj.com/mdc/public/page/2_3020-moneyrate.html?mod=topnav_2_3010';
$referenceFed ='http://www.federalreserve.gov/releases/h15/current/';
$sourceFed = 'http://www.federalreserve.gov/releases/h15/default.htm';
$test='http://www.finsheet.com/';
 $data = BOTS::http_get($reference,$source); 
 $html = $data['FILE']; 
/* $html ='<html><body><div id="example"><p></p></div></body></html>';  */
$testQuery = phpQuery::newDocument($html);
$searchTd = pq('tr:has(td:contains("Libor 1 Month"))');
$testQuery = phpQuery::newDocument($searchTd);
$secondSearch =pq('td:eq(1)');
$monthlyLibor =$secondSearch->text();
array_push($swap,$monthlyLibor);
$swapData = BOTS::http_get($referenceFed,$sourceFed); 
 $htmlSwap = $swapData['FILE']; 
 $testQuery = phpQuery::newDocument($htmlSwap);
 $fedTable =pq('.statistics');
  $testQuery = phpQuery::newDocument($fedTable);
$oneYearSwapRow = pq('tr:eq(45)');
array_push($swapHtml,$oneYearSwapRow);
$twoYearSwapRow = pq('tr:eq(46)');
array_push($swapHtml,$twoYearSwapRow);
$threeYearSwapRow = pq('tr:eq(47)');
array_push($swapHtml,$threeYearSwapRow);
$fourYearSwapRow = pq('tr:eq(48)');
array_push($swapHtml,$fourYearSwapRow);
$fiveYearSwapRow = pq('tr:eq(49)');
array_push($swapHtml,$fiveYearSwapRow);
$sevenYearSwapRow = pq('tr:eq(50)');
array_push($swapHtml,$sevenYearSwapRow);
$tenYearSwapRow = pq('tr:eq(51)');
array_push($swapHtml,$tenYearSwapRow);
$thirtyYearSwapRow = pq('tr:eq(52)');
array_push($swapHtml,$thirtyYearSwapRow);
foreach($swapHtml as $next){
 $temp =phpQuery::newDocument($next);
array_push($swap,pq('td:eq(5)')->text()); 

}

return $swap;

}

function createLibor(){
$tableName= $_POST['tableName'];
$forwardCurve= $_POST['forwardCurve'];
libor::createTable($tableName);
libor::insertLibor($forwardCurve,$tableName);
return $tableName;
}
function liborSwap(){
$tableName= $_POST['tableName'];
$swapRates= $_POST['swapRates'];
libor::createTable($tableName);
libor::insertLibor($swapRates,$tableName);
return $tableName;
}




}


?>