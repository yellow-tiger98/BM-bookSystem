$('document').ready(function(){
    window.history.forward(1);
    var $borrowTable = $('#borrowtable tbody');
    var $yuyueTable = $('#yuyuetable tbody');
	var id=getQueryString("rid");
	getUser(id);

	//编辑按钮点击事件
	$('#edit').click(function(e){
		$('#updateModal').modal('show');
		 $.ajax({
            url: 'http://localhost/BMbookmanager/sever/user.php',
            type: 'POST',
            datatype: 'json',
            data: {userid: id },
            success: function(data) {
            	var list=data.list;
            	 list.forEach(function(item, index, array) {
                $('#uid').val(id);
                $('#uname').val(item.name);
                $('#uemail').val(item.email);
                $('#usex').val(item.sex);
                $('#uage').val(item.age);
                });
            }
        });
	});
	//编辑用户信息确认按钮点击事件
	 $('#updateModal #confirmUpdate').click(function(e) {
        $.ajax({
            url: 'http://localhost/BMbookmanager/sever/userupdate.php',
            type: 'post',
            data: {
                uid: $('#uid').val(),
                name: $('#uname').val(),
                email: $('#uemail').val(),
                sex:$('#usex').val(),
                age:$('#uage').val(),
            },
            success: function(data) {
                console.log(data);
                $('#updateModal').modal('hide');
                getUser(id);
            }

        });
    });

     //归还按钮点击事件
    var deleteId = null;
    $borrowTable.on('click', '.guihui', function(e) {
        deleteId = ($(this).parent().prevAll().eq(3).html());
            $.ajax({
                url: 'http://localhost/BMbookmanager/sever/guihuan.php',
                type: 'post',
                data: { bookid: deleteId,rid:id},
                success: function(data) {
                    console.log(data);
                    alert("书籍归还成功！");
                    getBorrowBook(id);

                }
            });
    });
   
   //借阅按钮点击事件
    var borrowId = null;
    $yuyueTable.on('click', '.jieyue', function(e) {
        borrowId = ($(this).parent().prevAll().eq(2).html());
            $.ajax({
                url: 'http://localhost/BMbookmanager/sever/yutoborrow.php',
                type: 'post',
                data: { bookid: borrowId,rid:id},
                success: function(data) {
                    console.log(data);
                    alert("书籍借阅成功！");
                    getYuYueBook(id);

                }
            });
    });

      //取消按钮点击事件
      var cancelId = null;
    $yuyueTable.on('click', '.cancel', function(e) {
        $('#deleModal').modal('show');
        cancelId = ($(this).parent().prevAll().eq(2).html());
         });
        $('#deleModal #confirmDelete').click(function(e) {
            $.ajax({
                url: 'http://localhost/BMbookmanager/sever/cancel.php',
                type: 'post',
                data: { bookid: cancelId,rid:id},
                success: function(data) {
                    console.log(data);
                    $('#deleModal').modal('hide');
                    alert("此书预约已经为您取消！");
                    getYuYueBook(id);

                }
            });
         });
  

      //个人信息标签点击事件
    $('#click1 a').click(function(e){
        getUser(id);
    });
	//已借书籍标签点击事件
	$('#click2 a').click(function(e){
		getBorrowBook(id);
	});
     //已预约标签点击事件
    $('#click3 a').click(function(e){
        getYuYueBook(id);
    });
    //退出登录标签点击事件
    $('#click4 a').click(function(e){
        $.ajax({
        url:'http://localhost/BMbookmanager/sever/exit.php',
        type: 'POST',
        datatype: 'json',
        data:{},
        success: function(data) {
         console.log(data);
         window.location.href="../index.html";
        },
        complete: function() { 
            console.log("111")

        },
        error: function() {
            console.log("数据加载失败");
        }

    });
    });
});

//根据userid获取用户的信息
function getUser(id){
	var $lists = $('div #list ul');
	$.ajax({
		url:'http://localhost/BMbookmanager/sever/user.php',
		type: 'POST',
		datatype: 'json',
		data:{userid:id},
		beforeSend:function(){
			$("#list ul").append("<li id='loading'>loading...</li>");
		},
		success: function(data) {
            $lists.empty();
            var list = data.list;
            list.forEach(function(item, index, array) {
                var $list = $('<li></li>').html("读者id："+item.rid).appendTo($lists);
        		var $list1 =$('<li></li>').html("读者姓名："+item.name).appendTo($lists);
        		var $list2 =$('<li></li>').html("读者邮箱："+item.email).appendTo($lists);
        		var $list3 =$('<li></li>').html("读者性别："+item.sex).appendTo($lists);
        		var $list3 =$('<li></li>').html("读者年龄："+item.age).appendTo($lists);
            });
        },
        complete: function() { 
            console.log("111")

        },
        error: function() {
            console.log("数据加载失败");
        }

	});
}

//获取用户借书信息
function getBorrowBook(id) {
	var $bookTable = $('#borrowtable #list');
      $bookTable.empty();
        $.ajax({
            url: 'http://localhost/BMbookmanager/sever/userborrow.php',
            type: 'POST',
            datatype: 'json',
            data: { userid:id },
            success:function(data){
            	var list = data.list;
                list.forEach(function( item, index, array){
                    var $bookid = $('<td>').html(item.bookid);
                    var $bookname = $('<td>').html(item.bookname);
                    var $time = $('<td>').html(item.time);
                    var $status = $('<td>').html(item.status);
                    var $booktd = $('<td>');
                    var $bookbtn = $('<button>').addClass('btn btn-primary btn-sm guihui').html('归还'); 
                    $booktd.append($bookbtn);
                    var $tRow = $('<tr>');
                    $tRow.append($bookid, $bookname,$time,$status,$booktd);
                    $bookTable.append($tRow);
                });
            }
        });
    }
//获取用户预约信息 
function getYuYueBook(id) {
    var $bookTable = $('#yuyuetable #list');
      $bookTable.empty();
        $.ajax({
            url: 'http://localhost/BMbookmanager/sever/useryuyue.php',
            type: 'POST',
            datatype: 'json',
            data: { userid:id },
            success:function(data){
                var list = data.list;
                list.forEach(function( item, index, array){
                    var $bookid = $('<td>').html(item.bookid);
                    var $bookname = $('<td>').html(item.bookname);
                    var $time = $('<td>').html(item.time);
                    var $booktd = $('<td>');
                    var $bookbtn = $('<button>').addClass('btn btn-primary btn-sm jieyue').html('借阅'); 
                    var $btndele = $('<button>').addClass('btn btn-sm btn-danger cancel').html('取消');
                    $booktd.append($bookbtn,$btndele);
                    var $tRow = $('<tr>');
                    $tRow.append($bookid, $bookname,$time,$booktd);
                    $bookTable.append($tRow);
                });
            }
        });
    }
//获取url上的参数值
function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = decodeURI(window.location.search).substr(1).match(reg); 
if (r != null) 
return unescape(r[2]); 
return null; 
}