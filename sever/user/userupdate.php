<?php
header("Content-type:application/json;charset=UTF-8");
header("Access-Control-Allow-Origin: *");
$link=mysqli_connect('localhost','root','220352','library','3306');
if($link){
	//修改图片
	$uid=$_POST['uid'];
	$name=$_POST['name'];
	$email=$_POST['email'];
	$sex=$_POST['sex'];
	$age=$_POST['age'];
	$sql="UPDATE `reader` SET `rid`='{$uid}',`e-mail`='{$email}',`name`='{$name}',`sex`='{$sex}', `age`= '{$age}' WHERE `rid`={$uid}";
	mysqli_query($link,'SET NAMES utf8');
    mysqli_query($link,$sql);

   echo json_encode(array('修改信息'=>'修改成功'));


}
 mysqli_close($link);
?>