<?php
	header("Content-type:application/json;charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	date_default_timezone_set('PRC');
	session_start();
	$_SESSION = array();
	 if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time()-42000, '/');
     }
     session_destroy();
     echo json_encode(array('退出信息'=>'退出成功！'))
?>