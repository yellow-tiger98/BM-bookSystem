<?php
	header("Content-type:application/text;charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	date_default_timezone_set('PRC');
	$link=mysqli_connect('localhost','root','220352','library','3306');
	if($link){
		$bookid=$_POST['bookid'];
		$rid=$_POST['rid'];
		$sql="SELECT bookname FROM books WHERE `bookid`='{$bookid}' ";
		mysqli_query($link,'SET NAMES utf8');
		$result = mysqli_query($link,$sql);
		$query=mysqli_query($link,"SELECT * FROM books WHERE `bookid`='{$bookid}'");
		while ($row=mysqli_fetch_assoc($query)) {
			$arr['list'][]=array(
                  'bookid'=>$row['bookid'],
                  'bookimg'=>$row['bookimg'],
                  'booknum'=>$row['booknum'],
                  'bookname'=>$row['bookname'],
                  'bookwriter'=>$row['bookwriter'],
                  'bookjj'=>$row['bookjj'],
                  'printer'=>$row['printer'],
         );
		}
		foreach($arr['list'] as $k=>$val){
			$bookid=$val["bookid"];
			$bookimg=$val["bookimg"];
			$booknum=$val["booknum"];
			$bookname=$val["bookname"];
			$bookwriter=$val["bookwriter"];
			$bookjj=$val["bookjj"];
			$printer=$val["printer"];
			
		}
		$time= date("Y-m-d H:i:s");
		if($booknum>0){
		$sql2="INSERT INTO yuyue(`bookid`,`bookname`,`rid`,`time`)VALUES('{$bookid}','{$bookname}','".$rid."','".$time."')";
		$num=$booknum-1;
		$sql3="UPDATE books SET booknum='$num' where bookid='{$bookid}'";
		 if(mysqli_query($link,$sql2)){
			mysqli_query($link,$sql3);
			echo json_encode(array('提示1'=>'信息插入成功'));
			echo json_encode(array('提示2'=>'信息更新成功'));
		 }else{
			echo "数据插入失败";
		 }
		}
		else{
			echo "库存为0";
		}
		echo json_encode(array('success'=>'yes'));
	}
	else{
  	echo json_encode(array('连接信息'=>'连接失败'));
  	}
 	mysqli_close($link);
?>