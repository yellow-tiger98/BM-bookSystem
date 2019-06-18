<?php
header("Content-type:application/json;charset=UTF-8");
header('Access-Control-Allow-Origin:*');
$link=mysqli_connect('localhost','root','220352','library','3306');
if($link){
	$obookname=$_POST['obookname'];
	$obookwriter=$_POST['obookwriter'];
	$obooknum=$_POST['obooknum'];
	$sql="INSERT INTO border(`bookname`,`bookwriter`,`booknum`,`status`)VALUES('{$obookname}','{$obookwriter}','{$obooknum}','未完成') ";
	mysqli_query($link,'SET NAMES utf8');
     mysqli_query($link,$sql);

   echo json_encode(array('success'=>'yes'));


}else{
  	echo json_encode(array('连接信息'=>'连接失败'));
  	}
 mysqli_close($link);
?>