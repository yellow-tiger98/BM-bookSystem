<?php
	header("Content-type:application/json;charset=UTF-8");
	header("Access-Control-Allow-Origin: *");
	$link=mysqli_connect('localhost','root','220352','library','3306');
	if($link)
	{
		if($_POST['bookid']){
			$bookid=$_POST['bookid'];
			$sql="SELECT bookname FROM  books WHERE `bookid`='{$bookid}'";
			mysqli_query($link,'SET NAMES utf8');
			$result = mysqli_query($link,$sql);
			$query=mysqli_query($link,"SELECT * FROM  books WHERE `bookid`='{$bookid}'");
			while($row=mysqli_fetch_assoc($query)){
			$arr['list'][]=array(
                  'bookid'=>$row['bookid'],
                  'bookimg'=>$row['bookimg'],
                  'booknum'=>$row['booknum'],
                  'bookname'=>$row['bookname'],
                  'bookwriter'=>$row['bookwriter'],
                  'bookjj'=>$row['bookjj'],
                  'printer'=>$row['printer'],
              );
		
		}echo json_encode($arr);
	}
	else{
           $sql="SELECT * FROM books";
           mysqli_query($link,'SET NAMES utf8');
           $result = mysqli_query($link,$sql);
           $senddata=array();
           while($row=mysqli_fetch_assoc($result)){
            array_push($senddata, array(
                 'bookid'=>$row['bookid'],
                 'booktype'=>$row['booktype'],
                 'bookimg'=>$row['bookimg'],
                 'booknum'=>$row['booknum'],
                 'bookname'=>$row['bookname'],
                 'printer'=>$row['printer'],
        ));
	}echo json_encode($senddata);
}
}
	else{
		echo json_encode(array('连接信息'=>'连接失败'));
	}

	 mysqli_close($link);

?>