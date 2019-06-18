<?php
header("Content-type:application/json;charset=UTF-8");
header('Access-Control-Allow-Origin:*');
$link=mysqli_connect('localhost','root','220352','library','3306');
if($link){
	$staffid=$_POST['staffid'];
	$staffname=$_POST['staffname'];
	$staffpwd=$_POST['staffpwd'];
	$staffsex=$_POST['staffsex'];
	$staffage=$_POST['staffage'];
    $stafffunc=$_POST['stafffunc'];
	$sql="INSERT INTO admin(`aid`,`name`,`pwd`,`sex`,`age`,`type`)VALUES('{$staffid}','{$staffname}','{$staffpwd}','{$staffsex}','{$staffage}','{$stafffunc}') ";
	mysqli_query($link,'SET NAMES utf8');
     mysqli_query($link,$sql);

   echo json_encode(array('success'=>'yes'));


}else{
  	echo json_encode(array('连接信息'=>'连接失败'));
  	}
 mysqli_close($link);
?>