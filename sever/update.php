<?php
header("Content-type:application/json;charset=UTF-8");
header('Access-Control-Allow-Origin:*');
$link=mysqli_connect('localhost','root','220352','library','3306');
if($link){
	//修改图片
	$booktype=$_POST['booktype'];
	$bookimg=$_POST['bookimg'];
	$booknum=$_POST['booknum'];
	$bookid=$_POST['bookid'];
	$bookname=$_POST['bookname'];
	$sql="UPDATE `books` SET `booktype`='{$booktype}',`bookimg`='{$bookimg}',`booknum`='{$booknum}', `bookname`= '{$bookname}' WHERE `bookid`={$bookid}";
	mysqli_query($link,'SET NAMES utf8');
    mysqli_query($link,$sql);

   echo json_encode(array('修改信息'=>'修改成功'));



}
 mysqli_close($link);
?>