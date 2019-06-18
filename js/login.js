$('document').ready(function(){

	$('.main-box button ').on("click", function(e) {
		var $email=document.getElementById('email').value;
        var $pwd = document.getElementById('pwd').value;
       e.preventDefault();
      var jsonBooks={
			useremail:$email,
			password:$pwd
		};
		if ($email==""||$pwd=="") {
			alert("请输入账号或者密码！");
		}
		else{
		$.ajax({
		url:'http://localhost/BMbookmanager/sever/login.php',
		type:'POST',
		data:jsonBooks,
		dataType:'json',
		 success:function(data) {
                    console.log(data);
                    $sid=data.sid;
                    $rid=data.rid;
                    window.close();
                  	window.open("../index.html?"+"sid="+$sid+"&rid="+$rid);
             
                },
         complete: function() { 
            

        },
        error: function() {
            console.log("数据加载失败");
            alert("邮箱或者密码错误！")
  	}

	});
	}




});
});

// function login(email,pwd){
// 	var jsonBooks={
// 			useremail:email,
// 			password:pwd
// 		};
// 		if (email==""||pwd=="") {
// 			alert("请输入账号或者密码！");
// 		}
// 		else{
// 		$.ajax({
// 		url:'http://localhost/school_library-master/sever/login.php',
// 		type:'post',
// 		data:jsonBooks,
// 		datatype:'text',
// 		 success:function(data) {  
//                     console.log(data);
                   
//                 },
//          complete: function() { 
            

//         },
//         error: function() {
//             console.log("数据加载失败");
//   	}

// 	});
// 	}
// }