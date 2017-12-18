
soaryang.page = function (object) {
    var page = 0;
    var count = object.count;
    var pageSize = object.pageSize;
    var id = object.id;


    if (count % pageSize == 0) {
        page = count / pageSize
    } else {
        page = count / pageSize + 1
    }
    var pageHtml = '<ul data-am-widget="pagination" class="am-pagination am-pagination-default">';

    if (index == 1) {
        pageHtml += ' <li class="am-pagination-first"><a href="javascript:void(0);">&laquo;</a></li>'
    } else {
        pageHtml += ' <li><a href="javascript:void(0);" onclick="init(' + 1 + "," + type + ')" >&laquo;</a></li>'
    }
    for (var i = 1; i <= page; i++) {
        if (index == i) {
            pageHtml += ' <li class="active"><a href="javascript:void(0);">' + i + "</a></li>"
        } else {
            pageHtml += ' <li><a href="javascript:void(0);" onclick="init(' + i + "," + type + ')">' + i + "</a></li>"
        }
    }
    if (parseInt(page) == index) {
        pageHtml += ' <li class="disabled"><a href="javascript:void(0);">&raquo;</a></li>'
    } else {
        pageHtml += ' <li><a href="javascript:void(0);" onclick="init(' + parseInt(page) + "," + type + ')">&raquo;</a></li>'
    }
    pageHtml += "</ul>";
    $("#"+id).html(pageHtml);
}
       
