<?php
header("Content-type:application/json;charset=UTF-8");

header('Access-Control-Allow-Origin:*');

$link=mysqli_connect('localhost','root','220352','library','3306');
if($link){
	$orderid= $_POST['orderid'];
	mysqli_query($link,'SET NAMES utf8');
	$sql="UPDATE `border` SET `status`='完成' WHERE `orderid`={$orderid}";
	mysqli_query($link,'SET NAMES utf8');
	mysqli_query($link,$sql);
	 echo json_encode(array('订单状态'=>'完成'));
}

mysqli_close($link);
?>