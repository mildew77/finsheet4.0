<?php

class PARSE {

//To call function -->   MARSHALL::hello();
//Needed to add C:\wamp\www\tape_maker\app\helpers\marshall.php
//Also update C:\wamp\www\tape_maker\app\start\global.php
//With app_path().'/helpers',


    public static function hello($someVar=NULL) {

        

        return 'hello parse';
    }

/***********************************************************************
split_string($string, $delineator, $desired, $type)                
-------------------------------------------------------------            
DESCRIPTION:                                                             
        Returns a potion of the string that is either before or after    
        the delineator. The parse is not case sensitive, but the case of
        the parsed string is not effected.								
INPUT:                                                                    
        $string         Input string to parse                            
        $delineator     Delineation point (place where split occurs)    
        $desired        BEFORE: return portion before delineator        
                        AFTER:  return portion before delineator        
        $type           INCL: include delineator in parsed string    
                        EXCL: exclude delineator in parsed string    
***********************************************************************/
public static function split_string($string, $delineator, $desired, $type)
    {
    # Case insensitive parse, convert string and delineator to lower case
    $lc_str = strtolower($string);
	$marker = strtolower($delineator);
    
    # Return text BEFORE the delineator
    if($desired == true)
        {
        if($type == true)  // Return text ESCL of the delineator
            $split_here = strpos($lc_str, $marker);
        else               // Return text INCL of the delineator
            $split_here = strpos($lc_str, $marker)+strlen($marker);
        
        $parsed_string = substr($string, 0, $split_here);
        }
    # Return text AFTER the delineator
    else
        {
        if($type==true)    // Return text ESCL of the delineator
            $split_here = strpos($lc_str, $marker) + strlen($marker);
        else               // Return text INCL of the delineator
            $split_here = strpos($lc_str, $marker) ;
        
        $parsed_string =  substr($string, $split_here, strlen($string));
        }
    return $parsed_string;
    }

/***********************************************************************
$value = return_between($string, $start, $end, $type)                   
-------------------------------------------------------------           
DESCRIPTION:                                                            
        Returns a substring of $string delineated by $start and $end    
        The parse is not case sensitive, but the case of the parsed     
        string is not effected.                                         
INPUT:                                                                  
        $string         Input string to parse                           
        $start          Defines the beginning of the sub string         
        $end            Defines the end of the sub string               
        $type           INCL: include delineators in parsed string      
                        EXCL: exclude delineators in parsed string      
***********************************************************************/
public static function return_between($string, $start, $stop, $type)
    {
    $temp = PARSE::split_string($string, $start, false, $type);
    return PARSE::split_string($temp, $stop, true, $type);
    }
	

/***********************************************************************
$array = parse_array($string, $open_tag, $close_tag)                    
-------------------------------------------------------------           
DESCRIPTION:                                                            
        Returns an array of strings that exists repeatedly in $string.  
        This function is usful for returning an array that contains     
        links, images, tables or any other data that appears more than  
        once.                                                           
INPUT:                                                                  
        $string     String that contains the tags                       
        $open_tag   Name of the open tag (i.e. "<a>")                   
        $close_tag  Name of the closing tag (i.e. "</title>")           
                                                                        
***********************************************************************/
public static function parse_array($string, $beg_tag, $close_tag)
    {
    preg_match_all("($beg_tag(.*)$close_tag)siU", $string, $matching_data);
    return $matching_data[0];
    }
	
	/***********************************************************************
$value = get_attribute($tag, $attribute)                                
-------------------------------------------------------------           
DESCRIPTION:                                                            
        Returns the value of an attribute in a given tag.               
INPUT:                                                                  
        $tag         The tag that contains the attribute                
        $attribute   The name of the attribute, whose value you seek    
                                                                        
***********************************************************************/
public static function get_attribute($tag, $attribute)
    {
    # Use Tidy library to 'clean' input
    $cleaned_html = tidy_html($tag);
    
    # Remove all line feeds from the string
    $cleaned_html = str_replace("\r", "", $cleaned_html);   
    $cleaned_html = str_replace("\n", "", $cleaned_html);
    
    # Use return_between() to find the properly quoted value for the attribute
    return return_between($cleaned_html, strtoupper($attribute)."=\"", "\"", true);
    }
	/***********************************************************************
remove($string, $open_tag, $close_tag)                                  
-------------------------------------------------------------           
DESCRIPTION:                                                            
        Removes all text between $open_tag and $close_tag               
INPUT:                                                                  
        $string     The target of your parse                            
        $open_tag   The starting delimitor                              
        $close_tag  The ending delimitor                                
                                                                        
***********************************************************************/
public static function remove($string, $open_tag, $close_tag)
    {
    # Get array of things that should be removed from the input string
    $remove_array = PARSE::parse_array($string, $open_tag, $close_tag);
    
    # Remove each occurrence of each array element from string;
    for($xx=0; $xx<count($remove_array); $xx++)
        $string = str_replace($remove_array, "", $string);
    
    return $string;
    }

/***********************************************************************
tidy_html($input_string)                                                
-------------------------------------------------------------           
DESCRIPTION:                                                            
        Returns a "Cleans-up" (parsable) version raw HTML               
INPUT:                                                                  
        $string     raw HTML                                            
                                                                        
OUTPUT:                                                                 
        Returns a string of cleaned-up HTML                             
***********************************************************************/
public static function tidy_html($input_string)
    {
    // Detect if Tidy is in configured
    if( function_exists('tidy_get_release') )
        {
        # Tidy for PHP version 4
        if(substr(phpversion(), 0, 1) == 4)
            {
            tidy_setopt('uppercase-attributes', TRUE);
            tidy_setopt('wrap', 800);
            tidy_parse_string($input_string);            
            $cleaned_html = tidy_get_output();  
            }
        # Tidy for PHP version 5
        if(substr(phpversion(), 0, 1) == 5)
            {
            $config = array(
                           'uppercase-attributes' => true,
                           'wrap'                 => 800);
            $tidy = new tidy;
            $tidy->parseString($input_string, $config, 'utf8');
            $tidy->cleanRepair();
            $cleaned_html  = tidy_get_output($tidy);  
            }
        }
    else
        {
        # Tidy not configured for this computer
        $cleaned_html = $input_string;
        }
    return $cleaned_html;
    }	

}

?>