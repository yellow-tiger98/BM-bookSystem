<?php
header("Content-type:application/json;charset=UTF-8");

header('Access-Control-Allow-Origin:*');

$link=mysqli_connect('localhost','root','220352','library','3306');
if($link){
	$aid=$_GET['aid'];
	mysqli_query($link,'SET NAMES utf8');
	$sql="SELECT * FROM admin WHERE `aid`='{$aid}'";
	  $result= mysqli_query($link,$sql);
	  $senddata=array();
  	while($row=mysqli_fetch_assoc($result)){
  		array_push($senddata, array(
  			       'aid'=>$row['aid'],
  			       'name'=>$row['name'],
  			       'sex'=>$row['sex'],
  			       'age'=>$row['age'],
               'type'=>$row['type']
  			));
 
  }echo json_encode($senddata);
	 
}
mysqli_close($link);
?>