//当打开后台管理界面时清空table
$('documnet').ready(function() {
    var $bookTable = $('#booktable tbody');
    //刷新页面
    var $type=getQueryString("type");
    if($type=="总管理员"){
        refreshBook();
    }else if($type=="入库管理员"){
        $('#sm').removeClass('active');
        $('#bm').addClass('active');
        $('#yuangong').removeClass('tab-pane fade in active');
        $('#yuangong').addClass('tab-pane fade');
         $('#tushu').removeClass('tab-pane fade');
        $('#tushu').addClass('tab-pane fade in active');
        $("#sm").addClass('disabled');
        $("#staffm").attr("href","#");
        $("#bwm").addClass('disabled');
        $("#borrowm").attr("href","#");
        $("#om").addClass('disabled');
        $("#orderm").attr("href","#");
         refreshBook();

    }else if($type=="流通管理员"){
        $('#sm').removeClass('active');
        $('#bwm').addClass('active');
        $('#yuangong').removeClass('tab-pane fade in active');
        $('#yuangong').addClass('tab-pane fade');
         $('#liutong').removeClass('tab-pane fade');
        $('#liutong').addClass('tab-pane fade in active');
        $("#sm").addClass('disabled');
        $("#staffm").attr("href","#");
        $("#bm").addClass('disabled');
        $("#bookm").attr("href","#");
        $("#om").addClass('disabled');
        $("#orderm").attr("href","#");
         refreshBook();

    }else if($type=="订单管理员"){
         $('#sm').removeClass('active');
        $('#om').addClass('active');
        $('#yuangong').removeClass('tab-pane fade in active');
        $('#yuangong').addClass('tab-pane fade');
         $('#dingdan').removeClass('tab-pane fade');
        $('#dingdan').addClass('tab-pane fade in active');
        $("#sm").addClass('disabled');
        $("#staffm").attr("href","#");
        $("#bm").addClass('disabled');
        $("#bookm").attr("href","#");
        $("#bwm").addClass('disabled');
        $("#borrowm").attr("href","#");
         refreshBook();
    }else{
        alert("请进行登录！");
        window.location.href("./views/mlogin.html");
    }
    $('#btnbook').click(function(e) {
        e.preventDefault();
        //输入判断
        if ($('#booktype').val() === "" || $('#bookimg').val() === "" || $('#booknum').val() === ""||$('#bookname').val()==="") {
          
            if ($('#booktype').val() === "") {
                $('#booktype').parent().addClass('has-error');
            } else {
                $('#booktype').parent().removeClass('has-error');
            }
            if ($('#bookimg').val() === "") {
                $('#bookimg').parent().addClass('has-error');
            } else {
                $('#bookimg').parent().removeClass('has-error');
            }
            if ($('#booknum').val() === "") {
                $('#booknum').parent().addClass('has-error');
            } else {
                $('#booknum').parent().removeClass('has-error');
            }
            if($('#bookname').val()===""){
                $('#bookname').parent().addClass('has-error');
            }else{
                $('#bookname').parent().removeClass('has-error');
            }
        } else {
            var jsonBooks = {
                   // bookid: $('#bookid').val(),
                    booktype: $('#booktype').val(),
                    bookimg: $('#bookimg').val(),
                    booknum: $('#booknum').val(),
                    bookname:$('#bookname').val()
                };
                //提交添加的新闻
            $.ajax({
                url: 'http://localhost/BMbookmanager/sever/insert.php',
                type: 'post',
                data: jsonBooks,
                datatype: 'json',
                success: function(data) {
                    console.log(data);
                    //刷新页面
                    refreshBook();

                }
            });
        }
    });



    //删除图书的功能
    var deleteId = null;
    $bookTable.on('click', '.btn-danger', function(e) {
        $('#deleModal').modal('show');
        deleteId = ($(this).parent().prevAll().eq(4).html());
        console.log(deleteId);
    });
    $('#deleModal #confirmDelete').click(function(e) {
        if (deleteId) {
            $.ajax({
                url: 'http://localhost/BMbookmanager/sever/delete.php',
                type: 'post',
                data: { bookid: deleteId },
                success: function(data) {
                    console.log(data);
                    $('#deleModal').modal('hide');
                    refreshBook();

                }
            });
        }
    });
    //修改图书
    var updateId = null;
    $bookTable.on('click', '.btn-primary', function(e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(4).html();
        $.ajax({
            url: 'http://localhost/BMbookmanager/sever/current.php',
            type: 'get',
            datatype: 'json',
            data: {bookid: updateId },
            success: function(data) {
                // $('#ubookid').val(data[0].bookid)
                $('#ubooktype').val(data[0].booktype);
                $('#ubookimg').val(data[0].bookimg);
                $('#ubooknum').val(data[0].booknum);
                $('#ubookname').val(data[0].bookname);
            }
        });
    });
    $('#updateModal #confirmUpdate').click(function(e) {
        $.ajax({
            url: 'http://localhost/BMbookmanager/sever/update.php',
            type: 'POST',
            datatype:'json',
            data: {
                booktype: $('#ubooktype').val(),
                bookimg: $('#ubookimg').val(),
                booknum: $('#ubooknum').val(),
                bookname:$('#ubookname').val(),
                bookid: updateId
            },
            success: function(data) {
                console.log(data);
                $('#updateModal').modal('hide');
                refreshBook();
            }

        });
    });
    //刷新页面，载入数据
    function refreshBook() {
      $bookTable.empty();
        $.ajax({
            url: 'http://localhost/BMbookmanager/sever/getbooks.php',
            type: 'POST',
            datatype: 'json',
            data: { booktype: '',bookname:'' },
            success:function(ss){
                ss.forEach(function( item, index, array){
                    var $bookid = $('<td>').html(item.bookid);
                    var $booktype = $('<td>').html(item.booktype);
                    var $bookimg = $('<td>').html(item.bookimg);
                    var $booknum = $('<td>').html(item.booknum);
                    var $bookname=$('<td>').html(item.bookname);
                    var $booktd = $('<td>');
                    var $bookbtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $booktd.append($bookbtn, $btndele);
                    var $tRow = $('<tr>');
                    $tRow.append($bookid, $booktype,$bookimg,$booknum,$bookname,$booktd);
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

});
