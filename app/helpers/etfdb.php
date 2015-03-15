<?php

class ETFDB {


public static $primary_column='Symbol';

/***********************************************************************
etf_scrape($section, $table, $reference = 'http://etfdb.com')           
-------------------------------------------------------------            
DESCRIPTION:                                                             
         Simply insert the key and the value into the array						
INPUT:                                                                    
        $array      Subject array                      
        $key	 	key  
		$value	    value		
         
***********************************************************************/
 public static function array_push_assoc(&$array, $key, $value){
	
	$array[$key] = $value;
	return $array; 
}


/***********************************************************************
etf_scrape($section, $table, $reference = 'http://etfdb.com')           
-------------------------------------------------------------            
DESCRIPTION:                                                             
        Returns an array of Arrays that will first scrape the headers for   
        each column then go through each page of the given table for the section provided
        place info under that column and at the end name the column with header name scraped.							
INPUT:                                                                    
        $section        Example:     http://etfdb.com/etfdb-category/currency/                      
        $table    	Digit, usually 2 for fee info and inception or whatever  
		$reference  Defaults to etfb.com but place any full lenght site that makes sense as far as where the request is coming from		
         
***********************************************************************/

   public static function etf_scrape($section, $table, $reference = 'http://etfdb.com')  {

$ETF=array();
 $page = BOTS::http_get($section,$reference);

PARSE::tidy_html($page);
$cut_1=PARSE::parse_array($page['FILE'], '<table', '/table>');

//$cut_1[2] gives symbol name inception and expense ratio and category
$head_1=PARSE::parse_array($cut_1[$table], '<thead>', '</thead>');
$head_2=array();
$head_3=array();
foreach($head_1 as $value){
array_push($head_2,PARSE::parse_array($head_1[0], '<th>', '</th>'));
}

foreach($head_2[0] as $value){
array_push($head_3,strip_tags($value));
}
 for($i=0;$i<count($head_3);$i++){
		 $head_3[$i]=str_replace(" ","",$head_3[$i]);
		$head_3[$i]=preg_replace("/[^A-Za-z0-9 ]/", '', $head_3[$i]);
		 }
for($i=0;$i<count($head_3);$i++){
array_push($ETF,array());

}

$body_1=PARSE::parse_array($cut_1[$table], '<tbody>', '</tbody>');
$body_2=array();
foreach($body_1 as $value){
array_push($body_2,PARSE::parse_array($body_1[0], '<tr>', '</tr>'));
}
//var_dump($body_2[0][0]);
for($i=0;$i<count($body_2[0]);$i++){
$temp= PARSE::parse_array($body_2[0][$i], '<td', '</td>');
for($k=0;$k<count($temp);$k++){
array_push($ETF[$k],strip_tags($temp[$k]));
}
}
array_push($ETF,$head_3);


return $ETF;

}

/***********************************************************************
function etf_upload($section, $table, $reference = 'http://etfdb.com')       
-------------------------------------------------------------            
DESCRIPTION:                                                             
        Uploads information to database table from specified section given table
      						
INPUT:                                                                    
        $section        Example:     http://etfdb.com/etfdb-category/currency/                      
        $table    	Digit, usually 2 for fee info and inception or whatever  
		$reference  Defaults to etfb.com but place any full lenght site that makes sense as far as where the request is coming from		
         
***********************************************************************/
public static function etf_upload($section, $table, $reference = 'http://etfdb.com'){
$count=1;
$table_count=1;
while($table_count>0) {
 $temp=$section."?page=".$count;
 $page = BOTS::http_get($temp,$reference);

$cut_1=PARSE::parse_array($page['FILE'], '<table', '/table>');
$table_count = count($cut_1);
  $count++;
} 
$count= $count -1;
//$count - 2  is how many pages with tables were found -have minus 1 for while loop to come
$start=1;
$etf=array();
$etf_hold=array();
while($start<$count) {
$temp_2 = $section."?page=".$start;
$etf=ETFDB::etf_scrape($temp_2, $table, $reference = 'http://etfdb.com');
array_push($etf_hold,$etf);
$start++;
}
$couger=array();
$etf_colum_add_count=0;
while($etf_colum_add_count<count($etf[count($etf)-1])){
if (Schema::hasColumn('etf', $etf[count($etf)-1][$etf_colum_add_count]))
{

$etf_colum_add_count ++;
}
elseif($etf_colum_add_count<1){
//DB::statement("ALTER TABLE etf ADD {$etf[count($etf)-1][$etf_colum_add_count]} VARCHAR(260) primary key ");
array_push($couger,$etf_colum_add_count);
DB::statement("ALTER TABLE etf ADD {$etf[count($etf)-1][$etf_colum_add_count]} VARCHAR(26) UNIQUE");
}
else{
DB::statement("ALTER TABLE etf ADD {$etf[count($etf)-1][$etf_colum_add_count]} VARCHAR(260)");
}
}

$insert=array();
for($i=0;$i<count($etf_hold);$i++){

for($g=0;$g<count($etf_hold[$i][0]);$g++){
$temp=array();
for($h=0;$h<count($etf)-1;$h++){
ETFDB::array_push_assoc($temp,$etf[count($etf)-1][$h],$etf_hold[$i][$h][$g]);
//array_shift($etf_hold[$i][$h]);
}
array_push($insert,$temp);

}
}
reset($insert[0]);
$first_key = key($insert[0]);
$symbols = DB::table('etf')->lists($first_key);
$clean=array_count_values($symbols);

for($i=0;$i<count($insert);$i++){
try
{
DB::table('etf')->insert($insert[$i]);
}
catch(Exception $e) {
$temp_insert=$insert[$i][$first_key];
array_shift($insert[$i]);

 DB::table('etf')->where($first_key, '=', $temp_insert)
	->update($insert[$i]);
}

}



return $insert;
}

}

?>