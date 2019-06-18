$('document').ready(function(){
	$('.main-box button').on("click",function(e){
		var $email=document.getElementById('email').value;
		var $username=document.getElementById('username').value;
		var $age=document.getElementById('age').value;
		var $sex=document.getElementById('sex').value;
        var $pwd = document.getElementById('pwd').value;
        e.preventDefault();
        var jsonBooks={
        	useremail:$email,
        	username:$username,
        	age:$age,
        	sex:$sex,
        	pwd:$pwd
        }
        if($email==""||$username==""||$age==""||$sex==""||$pwd==""){
        	alert("请完善你的信息！");
        }else{
        if(isEmail($email)){


        $.ajax({
        	url:'http://localhost/BMbookmanager/sever/register.php',
        	type:'POST',
        	data:jsonBooks,
        	dataType:'json',
        	success:function(data){
        		console.log(data);
        		alert("注册成功！请前往登录");
        		window.location.href="./login.html";
        	},
        	error:function(){
        		alert("此邮箱已被使用，无法注册！")
        	}
        });
    }else{
    	alert("邮箱格式不符，请重新输入");
    }
}


	})

function isEmail(strEmail) {
if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){
return true;
}
else{
return false;
}
}



});