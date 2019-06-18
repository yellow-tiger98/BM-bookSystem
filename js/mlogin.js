$('document').ready(function(){

	$('.main-box button ').on("click", function(e) {
		var $id=document.getElementById('mid').value;
        var $pwd = document.getElementById('pwd').value;
       e.preventDefault();
      var jsonBooks={
			userid:$id,
			password:$pwd
		};
		if ($id==""||$pwd=="") {
			alert("请输入账号或者密码！");
		}
		else{
		$.ajax({
		url:'http://localhost/BMbookmanager/sever/mlogin.php',
		type:'POST',
		data:jsonBooks,
		dataType:'json',
		 success:function(data) {
                    console.log(data);
                    $type=data.type;
                    window.close();
                  	window.open("../manage.html?"+"type="+$type);
             
                },
         complete: function() { 
            

        },
        error: function() {
            console.log("数据加载失败");
            alert("id或者密码错误！")
  	}

	});
	}




});
});