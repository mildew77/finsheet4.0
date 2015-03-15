<?php

class YAHOODB {

  public static function hello($someVar=NULL) {
		
		
        return 'hello parse';
    }
	
	
	
	public static function createTest($table){
	 try
{
DB::statement('drop table '.$table);
	DB::statement('CREATE TABLE '.$table.'(date DATE)');
}
catch(Exception $e) {
DB::statement('CREATE TABLE '.$table.'(date DATE)');
}

	return 'testreturns';
	
	
	}
	
/***********************************************************************
function addetf($etf,$etfdb, $column, $newdb)
-------------------------------------------------------------            
DESCRIPTION:                                                             
        Uploads information to database table from specified section given table
      						
INPUT:                                                                    
        $section        Example:     http://etfdb.com/etfdb-category/currency/                      
        $table    	Digit, usually 2 for fee info and inception or whatever  
		$reference  Defaults to etfb.com but place any full lenght site that makes sense as far as where the request is coming from		
         
***********************************************************************/	
 public static function createTable() {
 try
{
DB::statement('drop table etfreturns');
	DB::statement('CREATE TABLE etfreturns(date DATE)');
}
catch(Exception $e) {
DB::statement('CREATE TABLE etfreturns(date DATE)');
}

 
 
 }	
	
 public static function addetf($etf) {
 $start='http://ichart.finance.yahoo.com/table.csv?s='; 
/*  $start='http://real-chart.finance.yahoo.com//table.csv?s='; */
 $end='&g=m&ignore=.csv'; 
/*  $end='\u00a0&amp;a=00&amp;b=2&amp;c=1978&amp;d=00&amp;e=8&amp;f=2015&amp;g=m&amp;ignore=.csv'; */
 
 $filename=$start.$etf.$end;
$handle = fopen($filename, "r");
 $header = fgetcsv($handle);
		//alter heading might need to address
         for($i=0;$i<count($header);$i++){
		 $header[$i]=str_replace(" ","",$header[$i]);
		 $header[$i]=preg_replace("/[^A-Za-z0-9 ]/", '', $header[$i]);
		 }
$pre_upload=array();
	 while (($row = fgetcsv($handle)) !== FALSE) {
	
	 $data = array();
	 
	 // for each header field
            foreach ($header as $k=>$head) {
                // get the data field from Model.field
                if (strpos($head,'.')!==false) {
                    $h = explode('.',$head);
                    $data[$h[0]][$h[1]]=(isset($row[$k])) ? $row[$k] : '';
                }
                // get the data field from field
                else {
                    $data[$head]=(isset($row[$k])) ? $row[$k] : '';
                }
            }
 array_push($pre_upload, $data);
	 
	 }		 
		 $upload=array();
		 for($i=0;$i<count($pre_upload);$i++){
		 $temp=array();
		 array_push($temp, $pre_upload[$i]['Date']);
		 array_push($temp, $pre_upload[$i]['AdjClose']);
		 
		  array_push($upload,$temp);
		 }
		 
		
		 
        return $upload;
    }	

	
	/***********************************************************************
function initialpop($array,$database) Does not work need to manually place column names for the rest using
Schema::table($databaseTable, function($table){
$table->float('vexmx');
$table->float('vwigx');
})


$table->timestamps();
Schema::table($databaseTable, function($table){
$table->timestamps();
})
-------------------------------------------------------------            
DESCRIPTION:  
	 This function will populate a database of returns for given stock symbols                                                           
     Make sure that you create a database and place a date field then provide array of stock symbols ($array) and the name of
the database ($database)
      						
INPUT:                                                                    
        $array       Example:   $array = array("vexmx","vwigx","vsgbx")             
        $databaseTable	  Example:  $database ="myDatabaseTableName"
         
***********************************************************************/
/* Make sure that you create a database and place a date field then provide array of stock symbols ($array) and the name of
the database ($database)	 */
public static function initialpop($array,$databaseTable){
$count = 0;
$countCatch;
$arrayHold=[];
$arrayHoldCount=0;
$columnName=[];

foreach($array as $value){
array_push($arrayHold,YAHOODB::addetf($value));
array_push($columnName,$value);

 if(count($arrayHold[$arrayHoldCount]) > $count){
  $count = count($arrayHold[$arrayHoldCount]);
  $countCatch =$value;
  }
  $arrayHoldCount ++;
}
$initialArray = YAHOODB::addetf($countCatch);
foreach($initialArray as $date){
DB::table($databaseTable)->insert(array('date'=> $date[0]));
}
foreach($columnName as $name){
DB::statement('ALTER TABLE '.$databaseTable.' ADD '.$name.' FLOAT NOT NULL');
}
for($k=0;$k<count($columnName);$k++){
for($i=0;$i<count($arrayHold[$k]);$i++){
DB::table($databaseTable)->where('date', '=', $arrayHold[$k][$i][0])
	->update(array($columnName[$k] => $arrayHold[$k][$i][1]));
}
}
return $arrayHold;
}	
public static function updateGold($databaseTable){
$historicGold = DB::table('gold')->whereNotNull('gld')->get();
foreach($historicGold as $Gold){
DB::table($databaseTable)->where('date', '=', $Gold->date)->update(array('gld' => $Gold->gld));
	
}


}


	
	
	
	
}
?>