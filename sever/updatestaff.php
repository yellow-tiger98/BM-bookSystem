<?php
header("Content-type:application/json;charset=UTF-8");
header('Access-Control-Allow-Origin:*');
$link=mysqli_connect('localhost','root','220352','library','3306');
if($link){
	//修改图片
	$name=$_POST['name'];
	$sex=$_POST['sex'];
	$age=$_POST['age'];
	$aid=$_POST['aid'];
	$type=$_POST['type'];
	$sql="UPDATE `admin` SET `name`='{$name}',`sex`='{$sex}',`age`='{$age}', `type`= '{$type}' WHERE `aid`={$aid}";
	mysqli_query($link,'SET NAMES utf8');
    mysqli_query($link,$sql);

   echo json_encode(array('修改信息'=>'修改成功'));



}
 mysqli_close($link);
?>