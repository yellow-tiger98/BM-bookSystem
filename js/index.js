$('document').ready(function() {
      var booktype;
      booktype='教材教辅';
        islogin();
        refreshbooks(booktype, 1);
    var curPage = 1; //当前页码
    var total, pageSize, totalPage;
  
    var bookname;
    // 导航栏的点击事件
    $('#click a ').on("click", function(e) {
        booktype = $(this).text(); 
       e.preventDefault();
        $(this).addClass("active");
        $(this).siblings().removeClass('active');
        refreshbooks(booktype, 1);
    });
   //页面栏点击事件
      $(document).on('click', "a", function() {
        var rel = $(this).attr("rel");
        if (rel) {
            refreshbooks(booktype, rel);
        }
    });
   //搜索按钮点击事件
    $('#search').on('click',function(){
      bookname=$('#bn').val();
      if(bookname){
         searchbooks(bookname,1);}
     
    });
});

//搜索功能的实现
function searchbooks(bookname,page){
    var $lists = $('div #list ul');
    var $rid;
     $rid=getQueryString("rid");
    $.ajax({
        url: 'http://localhost/BMbookmanager/sever/getbooks.php',
        type: 'POST',
        datatype: 'json',
        data: { bookname: bookname, pageNum: page - 1 ,booktype:''},
        beforeSend: function() {
            $("#list ul").append("<li id='loading'>loading...</li>");
        },
        success: function(data) {
            console.log(111);
            $lists.empty();
            total = data.total; //总记录数
            pageSize = data.pageSize; //每页显示条数
            curPage = page; //当前页
            totalPage = data.totalPage; //总页数
            var list = data.list;
            if(getQueryString("sid")!=null){
            list.forEach(function(item, index, array) {
                 var $list = $('<li></li>').prependTo($lists);
                var $a = $('<a></a>').attr('href', './views/book.html?bookid='+item.bookid+'&rid='+$rid+'').appendTo($list);
                var $img = $('<img>').attr('src', item.bookimg).appendTo($a);
                var $p = $('<p></p>').attr('id','bookname').html(item.bookname).appendTo($list);
            });
        }else{ 
            list.forEach(function(item, index, array) {
                var $list = $('<li></li>').prependTo($lists);
                 var $a = $('<a></a>').attr('href', '#').appendTo($list);
                var $img = $('<img>').attr('src', item.bookimg).appendTo($a);
                var $p = $('<p></p>').attr('id','bookname').html(item.bookname).appendTo($list);
                });
        }
        },

        complete: function() { //生成分页条
            getPageBar();

        },
        error: function() {
            console.log("数据加载失败");
  	}

    });

}

//刷新页面，载入数据
function refreshbooks(type, page) { //获取数据
    var $lists = $('div #list ul');
    var $rid;
     $rid=getQueryString("rid");
    $.ajax({
        url: 'http://localhost/BMbookmanager/sever/getbooks.php',
        type: 'POST',
        datatype: 'json',
        data: { booktype: type, bookname:'',bookwriter:'',pageNum: page - 1 },
        beforeSend: function() {
            $("#list ul").append("<li id='loading'>loading...</li>");
        },
        success: function(data) {
            $lists.empty();
            total = data.total; //总记录数
            pageSize = data.pageSize; //每页显示条数
            curPage = page; //当前页
            totalPage = data.totalPage; //总页数
            var list = data.list;
             if(getQueryString("sid")!=null){
            list.forEach(function(item, index, array) {
                 var $list = $('<li></li>').prependTo($lists);
                var $a = $('<a></a>').attr('href', './views/book.html?bookid='+item.bookid+'&rid='+$rid+'').appendTo($list);
                var $img = $('<img>').attr('src', item.bookimg).appendTo($a);
                var $p = $('<p></p>').attr('id','bookname').html(item.bookname).appendTo($list);
            });
        }else{ 
            list.forEach(function(item, index, array) {
                var $list = $('<li></li>').prependTo($lists);
                 var $a = $('<a></a>').attr('href', '#').appendTo($list);
                var $img = $('<img>').attr('src', item.bookimg).appendTo($a);
                var $p = $('<p></p>').attr('id','bookname').html(item.bookname).appendTo($list);
                });
        }
        },

        complete: function() { //生成分页条
            getPageBar();

        },
        error: function() {
            console.log("数据加载失败");
        }

    });
}
//获取分页条
function getPageBar() {
    //页码大于最大页数
    var pageStr = "";
    if (curPage > totalPage) curPage = totalPage;
    //页码小于1
    if (curPage < 1) curPage = 1;
    pageStr += "<span>共" + total + "条</span></span>" + curPage + "/" + totalPage + "</span>";
    //如果是第一页
    if (curPage == 1) {
        pageStr += "<span>首页</span><span>上一页</span>";
    } else {
        pageStr += "<span ><a href='#' rel='1'>首页</a></span><span><a href='#' rel='" + (curPage - 1) + "'>上一页</a></span>";
    }
    //如果是最后页
    if (curPage >= totalPage) {
        pageStr += "<span>下一页</span><span>尾页</span>";

    } else {
        pageStr += "<span ><a href='#'  rel='" + (parseInt(curPage) + 1) + "'>下一页</a></span><span ><a href='#' rel='" + totalPage + "'>尾页</a></span>";
    }
    $('#pagecount').html(pageStr);
}

//判断用户是否进行登录
function islogin(){
     var $sid;
     var $rid;
     if(getQueryString("sid")!=null){
        $sid=getQueryString("sid");
        $rid=getQueryString("rid");
    $.ajax({
        url: 'http://localhost/BMbookmanager/sever/session.php',
        type: 'POST',
        datatype: 'json',
        data:{sid:$sid},
        cache:true,
        success:function(data){
            console.log(data.rid);

            document.getElementById('name').setAttribute('href','./views/user.html?rid='+$rid+'');
           document.getElementById('name').innerHTML=data.rid;
        },
        error: function() {
            console.log("数据加载失败");
        }

    });
    }else{

    }
}

//获取url上的参数值
function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = decodeURI(window.location.search).substr(1).match(reg); 
if (r != null) 
return unescape(r[2]); 
return null; 
}