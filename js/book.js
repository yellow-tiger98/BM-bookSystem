$('document').ready(function(){ 
	var bookname;
	var booknum;
	var rid;
	rid=getQueryString("rid");	
	bookid=getQueryString("bookid");
	// bookname="中国教育史";
	getbooks(bookid); //页面内容获取

	$('#click1 a').click(function(e){
		window.history.go(-1);
	});
	$('#click2 a').click(function(e){
		getbooks(bookname);
	});
	$('#click3 a').click(function(e){
		window.open("./user.html?"+"rid="+rid);
	});
	//借阅按钮点击事件
	$('.button1 button').on("click",function(e){
		e.preventDefault();
		var $bookid=getQueryString("bookid");
		// var $booknum=getQueryString("booknum");
		var jsonBooks={
			bookid:$bookid,
			rid:rid
		};
		getbooks($bookid);
		
	$.ajax({
		url:'http://localhost/BMbookmanager/sever/borrow.php',
		type:'post',
		data:jsonBooks,
		datatype:'text',
		 success:function(data) {  
                    console.log(data);
                    alert("借阅成功！");
                    getbooks($bookid);
                },
         complete: function() { //生成分页条
            

        },
        error: function() {
            console.log("数据加载失败");
            alert("此书暂时不可借阅！数量：0");
  	}

	});		

	});

	//预定按钮点击事件
	$('.button2 button').on("click",function(e){
		e.preventDefault();
		var $bookid=getQueryString("bookid");
		var jsonBooks={
			bookid:$bookid,
			rid:rid
		};
		getbooks($bookid);
	$.ajax({
		url:'http://localhost/BMbookmanager/sever/yuyue.php',
		type:'post',
		data:jsonBooks,
		datatype:'text',
		 success:function(data) {  
                    console.log(data);
                    alert("预约成功！");
                    getbooks(bookid);
                },
         complete: function() { //生成分页条
            

        },
        error: function() {
            console.log("数据加载失败");
            alert("预约失败！此书无库存")
  	}

	});

	});




//根据书名获取书的信息
function getbooks(id){
	var $lists = $('div #list ul');
	var $lists2=$('div #pic');
	$.ajax({
		url:'http://localhost/BMbookmanager/sever/bookdetail.php',
		type: 'POST',
		datatype: 'json',
		data:{bookname:'',bookid:id},
		beforeSend:function(){
			$("#list ul").append("<li id='loading'>loading...</li>");
		},
		success: function(data) {
            $lists.empty();
            $lists2.empty();
            var list = data.list;
            list.forEach(function(item, index, array) {
                var $list = $('<li></li>').html("书名："+item.bookname).appendTo($lists);
        		var $list1 =$('<li></li>').html("作者："+item.bookwriter).appendTo($lists);
        		var $list2 =$('<li></li>').html("出版社："+item.printer).appendTo($lists);
        		var $list3 =$('<li></li>').html("简介：").appendTo($lists);
        		var $p=$('<p></p>').html(item.bookjj).appendTo($list3);
        		var $list3 =$('<li></li>').html("库存："+item.booknum).appendTo($lists);
        		var $list4=$('<img>').attr("src","../"+item.bookimg).prependTo($lists2);
        		booknum=item.booknum;
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

//获取url传过来的参数值
function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = decodeURI(window.location.search).substr(1).match(reg); 
if (r != null) 
return unescape(r[2]); 
return null; 
}

});

// function borrow(bookname){
// 	var jsonBooks={

// 	};
// 	$.ajax({
// 		url:'http://localhost/school_library-master/sever/borrow.php',
// 		type:'post',
// 		data:bookname,
// 		datatype:'json',
// 		 success: function(data) {
//                     console.log(data);
//                     //刷新页面
//                     getbooks(bookname);
//                 },
//                 complete: function() { //生成分页条
//             console.log("完成");

//         },
//         error: function() {
//             console.log("数据加载失败");
//   	}
// 	});

// }