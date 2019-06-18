<?php
	header("Content-type:application/json;charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	date_default_timezone_set('PRC');
	$sid=$_POST['sid'];
	session_id($sid);
	session_start();
	echo json_encode($_SESSION);
	
?>