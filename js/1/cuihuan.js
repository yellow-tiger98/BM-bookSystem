//当打开后台管理界面时清空table
$('documnet').ready(function() {
	var $borrowTable = $('#borrowtable tbody');
	//刷新页面
	refreshBorrow();
	//催还功能
	var bookId = null;
	var rId = null;
	$borrowTable.on('click', '.btn-warning', function(e) {
        $('#borrowModal').modal('show');
        bookId = ($(this).parent().prevAll().eq(4).html());
        rId = ($(this).parent().prevAll().eq(2).html());
        console.log(bookId);
        console.log(rId);
    });
    $('#borrowModal #confirmBorrow').click(function(e) {
        if (bookId) {
            $.ajax({
                url: 'http://127.0.0.1/sever/borrow.php',
                type: 'post',
                data: { bookid: bookId ,rid: rId},
                success: function(data) {
                    console.log(data);
                    $('#borrowModal').modal('hide');
                    refreshBorrow();

                }
            });
        }
    });
    //恢复正常
    var bookId = null;
	var rId = null;
	$borrowTable.on('click', '.btn-success', function(e) {
        $('#normalModal').modal('show');
        bookId = ($(this).parent().prevAll().eq(4).html());
        rId = ($(this).parent().prevAll().eq(2).html());
        console.log(bookId);
        console.log(rId);
    });
    $('#normalModal #confirmNormal').click(function(e) {
        if (bookId) {
            $.ajax({
                url: 'http://127.0.0.1/sever/normal.php',
                type: 'post',
                data: { bookid: bookId ,rid: rId},
                success: function(data) {
                    console.log(data);
                    $('#normalModal').modal('hide');
                    refreshBorrow();

                }
            });
        }
    });



	//刷新页面，载入数据
	function refreshBorrow() {
		$borrowTable.empty();
		$.ajax({
			url: 'http://127.0.0.1/sever/getborrows.php',
			type: 'POST',
			datatype: 'json',
			// data: {},
			success:function(ss){
				ss.forEach(function( item, index, array){
					var $bookid = $('<td>').html(item.bookid);
					var $bookname = $('<td>').html(item.bookname);
					var $rid = $('<td>').html(item.rid);
					var $time = $('<td>').html(item.time);
					var $bwstatus=$('<td>').html(item.bwstatus);
					var $borrowtd = $('<td>');
					var $borrow = $('<button>').addClass('btn btn-warning btn-xs').html('催还');
					var $normal = $('<button>').addClass('btn btn-success btn-xs').html('正常');
					$borrowtd.append($borrow,$normal);
					var $tRow = $('<tr>');
					$tRow.append($bookid, $bookname,$rid,$time,$bwstatus,$borrowtd);
					$borrowTable.append($tRow);
				});
			}
		});
	}
});