//当打开后台管理界面时清空table
$('documnet').ready(function() {
	var $orderTable = $('#ordertable tbody');
	//刷新页面
	refreshOrder();
    $('#btnorder').click(function(e) {
        e.preventDefault();
        //输入判断
        if ($('#obookname').val() === "" || $('#obookwriter').val() === "" || $('#obooknum').val() === "") {
          
            if ($('#obookname').val() === "") {
                $('#obookname').parent().addClass('has-error');
            } else {
                $('#obookname').parent().removeClass('has-error');
            }
            if ($('#obookwriter').val() === "") {
                $('#obookwriter').parent().addClass('has-error');
            } else {
                $('#obookwriter').parent().removeClass('has-error');
            }
            if ($('#obooknum').val() === "") {
                $('#obooknum').parent().addClass('has-error');
            } else {
                $('#obooknum').parent().removeClass('has-error');
            }
        }else {
            var jsonOrders = {
                    obookname: $('#obookname').val(),
                    obookwriter: $('#obookwriter').val(),
                    obooknum: $('#obooknum').val(),
                };
                //提交添加的订单
            $.ajax({
                url: 'http://localhost/BMbookmanager/sever/insertorder.php',
                type: 'post',
                data: jsonOrders,
                datatype: 'json',
                success: function(data) {
                    console.log(data);
                    //刷新页面
                    refreshOrder();

                }
            });
        }
    });

	//订单完成
	var finishId = null;
	$orderTable.on('click', '.btn-success', function(e) {
        $('#finModal').modal('show');
        finishId = ($(this).parent().prevAll().eq(4).html());
        console.log(finishId);
    });
    $('#finModal #confirmFinish').click(function(e) {
        if (finishId) {
            $.ajax({
                url: 'http://localhost/BMbookmanager/sever/finishorder.php',
                type: 'post',
                data: { orderid: finishId },
                success: function(data) {
                    console.log(data);
                    $('#finModal').modal('hide');
                    refreshOrder();

                }
            });
        }
    });

    //订单未完成
    var unfinishId = null;
    $orderTable.on('click', '.btn-danger', function(e) {
        $('#unfinModal').modal('show');
        unfinishId = ($(this).parent().prevAll().eq(4).html());
        console.log(unfinishId);
    });
    $('#unfinModal #confirmUNFinish').click(function(e) {
        if (unfinishId) {
            $.ajax({
                url: 'http://localhost/BMbookmanager/sever/unfinishorder.php',
                type: 'post',
                data: { orderid: unfinishId },
                success: function(data) {
                    console.log(data);
                    $('#unfinModal').modal('hide');
                    refreshOrder();

                }
            });
        }
    });


	//刷新页面，载入数据
	function refreshOrder() {
		$orderTable.empty();
		$.ajax({
			url: 'http://localhost/BMbookmanager/sever/getorders.php',
			type: 'POST',
			datatype: 'json',
			// data: {},
			success:function(ss){
				ss.forEach(function( item, index, array){
					var $orderid = $('<td>').html(item.orderid);
					var $bookname = $('<td>').html(item.bookname);
					var $bookwriter = $('<td>').html(item.bookwriter);
					var $booknum = $('<td>').html(item.booknum);
					var $status=$('<td>').html(item.status);
					var $ordertd = $('<td>');
					var $orderss = $('<button>').addClass('btn btn-success btn-xs').html('完成');
					var $orderus = $('<button>').addClass('btn btn-xs btn-danger').html('未完成');
					$ordertd.append($orderss, $orderus);
					var $tRow = $('<tr>');
					$tRow.append($orderid, $bookname,$bookwriter,$booknum,$status,$ordertd);
					$orderTable.append($tRow);
				});
			}
		});
	}
});