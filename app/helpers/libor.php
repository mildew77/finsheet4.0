<?php

class libor {

  public static function hello($someVar=NULL) {
		
		
        return 'hello parse';
    }
	
	
	
	public static function createTable($table){
	 try
{
DB::statement('drop table '.$table);
	DB::statement('CREATE TABLE '.$table.'(period INT)');
}
catch(Exception $e) {
DB::statement('CREATE TABLE '.$table.'(period INT)');
}

	return 'testreturns';
	
	
	}
	
	public static function insertLibor($forward,$table){
	DB::statement('ALTER TABLE '.$table.' ADD LIBOR FLOAT NOT NULL');
	$i=1;
	foreach($forward as $value){
	DB::table($table)->insert(array('LIBOR'=> $value,'period'=> $i));
	$i++;
	}
	
	}
	


	
	
	
	
}
?>