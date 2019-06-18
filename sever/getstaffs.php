<?php
header("Content-type:application/json;charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$link=mysqli_connect('localhost','root','220352','library','3306');
if ($link) {
	// if ($_POST['type']) {
	// 	$type=$_POST['type'];
	// 	$page=intval($_POST['pageNum']);
	// 	$sql="SELECT aid FROM  admin WHERE `type`='{$type}'";
	// 	mysqli_query($link,'SET NAMES utf8');
	// 	$result = mysqli_query($link,$sql);
	// 	$total=mysqli_num_rows($result);
	// 	$pageSize=20;//每页显示的数目
	// 	$totalPage=ceil($total/$pageSize);//总页数
	// 	$startPage=$page*$pageSize;
	// 	$arr['total']=$total;
 //        $arr['pageSize']=$pageSize;
 //        $arr['totalPage']=$totalPage;
 //        $query=mysqli_query($link,"SELECT * FROM  admin WHERE `type`='{$type}' order by aid asc limit $startPage,$pageSize");
 //        while ($row=mysqli_fetch_assoc($query)) {
 //        	$arr['list'][]=array(
 //        		'aid'=>$row['aid'],
 //                'sex'=>$row['sex'],
 //                'age'=>$row['age'],
 //        		);
 //        }echo json_encode($arr);
	// }

	// else if ($_POST['name']) {
	//   $name=$_POST['name'];
 //      $page=intval($_POST['pageNum']);
 //      $sql="SELECT aid FROM  books WHERE `name` LIKE '%".$_POST['name']."%'";
 //      mysqli_query($link,'SET NAMES utf8');
 //       $result = mysqli_query($link,$sql);
 //       $total=mysqli_num_rows($result);
 //       $pageSize=20;//每页显示的数目
 //       $totalPage=ceil($total/$pageSize);//总页数
 //       $startPage=$page*$pageSize;
 //       $arr['total']=$total;
 //        $arr['pageSize']=$pageSize;
 //        $arr['totalPage']=$totalPage;
 //        $query=mysqli_query($link,"SELECT * FROM  books WHERE `name` LIKE '%".$_POST['name']."%' order by aid asc limit $startPage,$pageSize");
 //        while ($row=mysqli_fetch_assoc($query)) {
 //        	$arr['list'][]=array(
 //        		'aid'=>$row['aid'],
 //                'name'=>$row['name'],
 //                'sex'=>$row['sex'],
 //                'age'=>$row['age']
 //        		);
 //        }echo json_encode($arr);
	// }
  
		$sql="SELECT * FROM admin";
		mysqli_query($link,'SET NAMES utf8');
		$result = mysqli_query($link,$sql);
        $senddata=array();
        while ($row=mysqli_fetch_assoc($result)) {
        	array_push($senddata,array(
        		'aid'=>$row['aid'],
                 'name'=>$row['name'],
                 'sex'=>$row['sex'],
                 'age'=>$row['age'],
                 'type'=>$row['type'],
        		));
        }echo json_encode($senddata);

}
else{
	echo json_encode(array('连接信息'=>'连接失败'));
}

mysqli_close($link);

?>