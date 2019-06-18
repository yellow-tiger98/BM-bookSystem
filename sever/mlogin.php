<?php
	header("Content-type:application/json;charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	date_default_timezone_set('PRC');
	$link=mysqli_connect('localhost','root','220352','library','3306');
	if($link){
		$id=$_POST['userid'];
		$pwd=$_POST['password'];
		$sql="SELECT * FROM admin WHERE `aid`='{$id}' and `pwd`='{$pwd}'";
		mysqli_query($link,'SET NAMES utf8');
		$result = mysqli_query($link,$sql);
		if(mysqli_num_rows($result)>0){
			while ($row=mysqli_fetch_assoc($result)) {
			$arr['list'][]=array(
                  'aid'=>$row['aid'],
                  'name'=>$row['name'],
                  'type'=>$row['type'],
                  'sex'=>$row['sex'],
                  'age'=>$row['age'],
         );
		}
		foreach($arr['list'] as $k=>$val){
			$type=$val['type'];
		}
			$arr1=array(
				'type'=>$type
			);
			
			echo json_encode($arr1);
		}
	}
	else{
		echo "<script>alert('邮箱或者密码错误，请重新输入');location='login.html'</script>";
	}
	mysqli_close($link);
?>