<?php
header("Content-type:application/json;charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$link=mysqli_connect('localhost','root','220352','library','3306');
if($link){
	$bookid= $_POST['bookid'];
	$rid=$_POST['rid'];
	mysqli_query($link,'SET NAMES utf8');
	$sql="DELETE FROM borrow WHERE `bookid`={$bookid} and `rid`={$rid}";
	mysqli_query($link,$sql);
	$sql2="SELECT bookname FROM books WHERE `bookid`='{$bookid}' ";
		$result = mysqli_query($link,$sql2);
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
		$num=$booknum+1;
		$sql3="UPDATE books SET booknum='$num' where bookid='{$bookid}'";
		mysqli_query($link,$sql3);
		echo json_encode(array('归还状态'=>'库存成功更新'));
}

mysqli_close($link);
?>