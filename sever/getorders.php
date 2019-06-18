<?php
header("Content-type:application/json;charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$link=mysqli_connect('localhost','root','220352','library','3306');
if ($link) {
	$sql="SELECT * FROM border";
	mysqli_query($link,'SET NAMES utf8');
	$result = mysqli_query($link,$sql);
	// if (!$result) {
	// 	printf("Error: %s\n", mysqli_error($link));
	// 	exit();
	// }
	$senddata=array();
	while($row=mysqli_fetch_assoc($result)){
		array_push($senddata, array(
			'orderid'=>$row['orderid'],
			'bookname'=>$row['bookname'],
			'bookwriter'=>$row['bookwriter'],
			'booknum'=>$row['booknum'],
			'status'=>$row['status'],
			));
	}echo json_encode($senddata);
}
else{
	echo json_encode(array('连接信息'=>'连接失败'));
}
mysqli_close($link);
?>