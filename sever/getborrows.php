<?php
header("Content-type:application/json;charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$link=mysqli_connect('localhost','root','220352','library','3306');
if ($link) {
	$sql="SELECT * FROM borrow";
	mysqli_query($link,'SET NAMES utf8');
	$result = mysqli_query($link,$sql);
	$senddata=array();
	while ($row=mysqli_fetch_assoc($result)) {
		array_push($senddata,array(
			'bookid'=>$row['bookid'],
			'bookname'=>$row['bookname'],
			'rid'=>$row['rid'],
			'time'=>$row['time'],
			'status'=>$row['status'],
			));
	}echo json_encode($senddata);
}
else{
	echo json_encode(array('连接信息'=>'连接失败'));
}
mysqli_close($link);
?>