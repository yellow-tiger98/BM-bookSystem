//当打开后台管理界面时清空table
$('documnet').ready(function() {
	var $staffTable = $('#stafftable tbody');
	//刷新页面
    var $type=getQueryString("type");
    if($type=="总管理员"){
        refreshStaff();
    }else{

    }
    $('#btnstaff').click(function(e) {
        e.preventDefault();  
        //输入判断
        if ($('#staffid').val() === "" || $('#staffname').val() === ""||$('#staffpwd').val()==="" || $('#staffsex').val() === ""||$('#staffage').val()===""||$('#stafffunc').val()==="") {
            if ($('#staffid').val() === "") {
                $('#staffid').parent().addClass('has-error');
            } else {
                $('#staffid').parent().removeClass('has-error');
            }
            if ($('#staffname').val() === "") {
                $('#staffname').parent().addClass('has-error');
            } else {
                $('#staffname').parent().removeClass('has-error');
            }
            if ($('#staffpwd').val() === "") {
                $('#staffpwd').parent().addClass('has-error');
            } else {
                $('#staffpwd').parent().removeClass('has-error');
            }
            if ($('#staffsex').val() === "") {
                $('#staffsex').parent().addClass('has-error');
            } else {
                $('#staffsex').parent().removeClass('has-error');
            }
            if($('#staffage').val()===""){
                $('#staffage').parent().addClass('has-error');
            }else{
                $('#staffage').parent().removeClass('has-error');
            }
            if($('#stafffunc').val()===""){
                $('#stafffunc').parent().addClass('has-error');
            }else{
                $('#stafffunc').parent().removeClass('has-error');
            }    
        }else{
            var jsonBooks = {
                   staffid: $('#staffid').val(),
                   staffname: $('#staffname').val(),
                   staffpwd: $('#staffpwd').val(),
                   staffsex: $('#staffsex').val(),
                   staffage: $('#staffage').val(),
                   stafffunc:$('#stafffunc').val()
               };
                //提交添加的新闻
                $.ajax({
                    url: 'http://localhost/BMbookmanager/sever/insertstaff.php',
                    type: 'post',
                    data: jsonBooks,
                    datatype: 'json',
                    success: function(data) {
                        console.log(data);
                    //刷新页面
                    refreshStaff();

                }
            });
            }
        });






    //删除员工功能
    var deleteId = null;
    $staffTable.on('click', '.btn-danger', function(e) {
        $('#deleModal').modal('show');
        deleteId = ($(this).parent().prevAll().eq(4).html());
        console.log(deleteId);
    });
    $('#deleModal #confirmDelete').click(function(e) {
        if (deleteId) {
            $.ajax({
                url: 'http://localhost/BMbookmanager/sever/deletestaff.php',
                type: 'post',
                data: { aid: deleteId },
                success: function(data) {
                    console.log(data);
                    $('#deleModal').modal('hide');
                    refreshStaff();

                }
            });
        }
    });

    //修改员工功能
    var updateId = null;
    $staffTable.on('click', '.btn-primary', function(e) {
        $('#updateStaffModal').modal('show');
        updateId = $(this).parent().prevAll().eq(4).html();
        $.ajax({
            url: 'http://localhost/BMbookmanager/sever/currentstaff.php',
            type: 'get',
            datatype: 'json',
            data: {aid: updateId },
            success: function(data) {
                // $('#ubookid').val(data[0].bookid)
                $('#uname').val(data[0].name);
                $('#usex').val(data[0].sex);
                $('#uage').val(data[0].age);
                $('#utype').val(data[0].type);
            }
        });
    });
    $('#updateStaffModal #confirmUpdate').click(function(e) {
        $.ajax({
            url: 'http://localhost/BMbookmanager/sever/updatestaff.php',
            type: 'POST',
            datatype:'json',
            data: {
                name: $('#uname').val(),
                sex: $('#usex').val(),
                age: $('#uage').val(),
                type:$('#utype').val(),
                aid: updateId
            },
            success: function(data) {
                console.log(data);
                $('#updateStaffModal').modal('hide');
                refreshStaff();
            }

        });
    });

	//刷新页面，载入数据
	function refreshStaff() {
		$staffTable.empty();
		$.ajax({
			url:'http://localhost/BMbookmanager/sever/getstaffs.php',
			type:'POST',
			datatype: 'json',
            // data: { type: '',name:'' },
            success:function(ss){
            	ss.forEach(function(item,index,array){
            		var $aid = $('<td>').html(item.aid);
            		var $name = $('<td>').html(item.name);
            		var $sex = $('<td>').html(item.sex);
            		var $age = $('<td>').html(item.age);
            		var $type = $('<td>').html(item.type);
            		var $stafftd = $('<td>');
            		var $staffbtn = $('<button>').addClass('btn btn-primary btn-xs').html('编辑');
                    var $btndele = $('<button>').addClass('btn btn-xs btn-danger').html('删除');
                    $stafftd.append($staffbtn, $btndele);
                    var $tRow = $('<tr>');
                    $tRow.append($aid, $name,$sex,$age,$type,$stafftd);
                    $staffTable.append($tRow);
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