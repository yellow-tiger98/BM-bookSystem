<?php
	header("Content-type:application/json;charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	date_default_timezone_set('PRC');
	$link=mysqli_connect('localhost','root','220352','library','3306');
	if ($link) {
		# code...
		$email=$_POST['useremail'];
		$name=$_POST['username'];
		$age=$_POST['age'];
		$sex=$_POST['sex'];
		$pwd=$_POST['pwd'];
		$sql="SELECT * FROM reader WHERE `e-mail`='{$email}'";
		mysqli_query($link,'SET NAMES utf8');
		$result = mysqli_query($link,$sql);
		if(mysqli_num_rows($result)>0){
			echo "此邮箱已被注册!";
		}else{
		$sql2="INSERT INTO reader(`e-mail`,`pwd`,`name`,`sex`,`age`)VALUES('{$email}','{$pwd}','{$name}','{$sex}','{$age}')";
		$result2=mysqli_query($link,$sql2);
		echo json_encode(array('success'=>'注册成功'));
		}

	}else{
	echo json_encode(array('连接信息'=>'连接失败'));
	}

	mysqli_close($link);
?>