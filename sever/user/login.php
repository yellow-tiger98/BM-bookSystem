<?php
	session_start();
	header("Content-type:application/json;charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	date_default_timezone_set('PRC');
	$link=mysqli_connect('localhost','root','220352','library','3306');
	if($link){
		$sid=session_id();
		$email=$_POST['useremail'];
		$pwd=$_POST['password'];
		$sql="SELECT * FROM reader WHERE `e-mail`='{$email}' and `pwd`='{$pwd}'";
		mysqli_query($link,'SET NAMES utf8');
		$result = mysqli_query($link,$sql);
		if(mysqli_num_rows($result)>0){
			while ($row=mysqli_fetch_assoc($result)) {
			$arr['list'][]=array(
                  'rid'=>$row['rid'],
                  'email'=>$row['e-mail'],
                  'name'=>$row['name'],
                  'sex'=>$row['sex'],
                  'age'=>$row['age'],
         );
		}
		foreach($arr['list'] as $k=>$val){
			$id=$val['rid'];
		}
			$_SESSION['rid']=$id;
			$id2=$_SESSION['rid'];
			$arr1=array(
				'rid'=>$id2,
				'sid'=>$sid
			);
			
			echo json_encode($arr1);
		}
	}
	else{
		echo "<script>alert('邮箱或者密码错误，请重新输入');location='login.html'</script>";
	}
	mysqli_close($link);
?>