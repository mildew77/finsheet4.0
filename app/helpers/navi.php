<?php

class navi {

  public static function hello($someVar=NULL) {

        return 'Hello World';
    }
	
	
	
	 public static function nav($list, $attributes = null)
 {
  $nav = [];
     
    // iterate through each element of the array and get url => link pairs
    foreach ($list as $key => $val)
    {
        // Sometimes we want to pass a condition and display link based on the condition
        // (ex: dispaly login vs. logout link based on if user is logged in), 
        // in this case, an array will be passed instead of a string.
        // The first value will be the condition, 2nd and 3rd will be the links
        if (is_array($val))
        {
            $condition = $val[0];
             
            // set url to the keys of the array
            $link = array_keys($val);
             
            // sometimes we don't want to display any link if the condition isn't met, 
            // then we need to check if a 2nd link is omitted
            $link[2] = array_key_exists(2, $link) ? $link[2] : null;
             
             // check to see if condition passes
            $key = $condition ? $link[1] : $link[2];
             
            // if a second link isn't passed, then stop the current loop at this point
            // and skip to the next loop
            if (is_null($key))
            {
                continue;
            }
             
            $val = $val[$key];
        }
         
        // Check to see if both url and link is passed
        // Many times, both url and link name will be the same, so we can avoid typing it twice
        // and just pass one value
        // In this case, the key will be numeric (when we just pass a value instead of key => value pairs)
        // We will have to set the url to equal the key instead
        $url = is_numeric($key) ? $val : $key;
     
        // If we are using controller routing (ex: HomeController@getIndex),
        // then we need to use URL::action() instead of URL::to()
        $url = (strpos($url, '@') !== false) ? URL::action($url) : URL::to(strtolower($url));
     
        // Set the active state automatically
        $class['class'] = (Request::url() === $url) ? 'active' : null;
     
        // Push the new list into the $nav array
        array_push($nav, HTML::link($url, $val, $class));
    }
     
     // Generate the unordered list
    $menu = HTML::ul($nav, $attributes);
    // HTML::ul() performs htmlentities on the list by default,
    // so we have to decode it back using HTML::decode()
    $menu = HTML::decode($menu);
     
    // Return the generated menu
    return $menu;
 }
  public static function userTableDropdown($list){

$structure = [];
$matchArray= [];
  $username ='root';
  $password='';
$db = new PDO('mysql:host=localhost;dbname=price', $username, $password);
$result = $db->query("show tables");
while ($row = $result->fetch(PDO::FETCH_NUM)) {
array_push($structure,$row[0]);
  
}

for($i=0;$i<count($structure);$i++){
$temp=explode('#', $structure[$i]);
if($temp[0]==$list){
array_push($matchArray,$temp[1]);

}

}

  return $matchArray;
  
  }
 
	

}

?>