<?php
/***********************************************************************
Webbot defaults (scope = global)                                       
----------------------------------------------------------------------*/
# Define how your webbot will appear in server logs
define("WEBBOT_NAME", "Mozilla/4.08");

# Length of time cURL will wait for a response (seconds)
define("CURL_TIMEOUT", 25);

# Location of your cookie file. (Must be fully resolved local address)
define("COOKIE_FILE", "c:\cookie.txt");

# DEFINE METHOD CONSTANTS
define("HEAD", "HEAD");
define("GET",  "GET");
define("POST", "POST");

# DEFINE HEADER INCLUSION
define("EXCL_HEAD", FALSE);
define("INCL_HEAD", TRUE);




?>