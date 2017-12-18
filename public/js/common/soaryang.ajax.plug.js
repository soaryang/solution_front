/*!
 * danmu.ajax.plug v1.0.0
 */
/*(function ($) {
    $.commonAjax = function (url, method,dataType,data, success, error) {
        $.ajax({
            contentType: "application/json; charset=utf-8",
            type: method,
            url: url,
            data: data,
            dataType: dataType,
            success: success,
            error: error
        });
    }
})(jQuery);*/

/*var soaryang={
     getAjax:function (url, data, success, error) {
         soaryang.commonAjax(url,"get",data,success,error);
     },
     postAjax:function (url, data,success,error) {
         soaryang.commonAjax(url,"post",data,success,error);
     },
     commonAjax:function (url, method,data, success, error) {
         $.ajax({
             contentType: "application/json; charset=utf-8",
             type: method,
             url: url,
             data: data,
             dataType: "json",
             success: success,
             error: error
         });
     }
}*/

var soaryang = {
    getAjax: function (url, data, success, error) {
        soaryang.commonAjax(url, "get", data, success, error);
    }, postAjax: function (url, data, success, error) {
        soaryang.commonAjax(url, "post", data, success, error);
    }, loading: function () {
        var model = $("#my-modal-loading");
        //model.modal("toggle")
    }, loadingHide: function () {
        var model = $("#my-modal-loading");
       // model.modal("close")
    }, commonAjax: function (url, method,data, success, error) {
        soaryang.loading();
        $.ajax({
            //contentType: "application/json; charset=utf-8",
            type: method,
            url: url,
            data: data,
            dataType: "json",
            success: function (a) {
                soaryang.loadingHide();
                success(a)
            },
            error: function (a) {
                soaryang.loadingHide();
                error(a)
            }
        })
    }
};
/*var soaryang = {
    getAjax: function (b, c, d, a) {
        soaryang.commonAjax(b, "get", c, d, a)
    }, postAjax: function (b, c, d, a) {
        soaryang.commonAjax(b, "post", c, d, a)
    }, loading: function () {
        var a = $("#my-modal-loading");
        a.modal("toggle")
    }, loadingHide: function () {
        var a = $("#my-modal-loading");
        a.modal("close")
    }, commonAjax: function (b, e, c, d, a) {
        soaryang.loading();
        $.ajax({
            contentType: "application/json; charset=utf-8",
            type: e,
            url: b,
            data: c,
            dataType: "json",
            success: function (f) {
                soaryang.loadingHide();
                d(f)
            },
            error: function (f) {
                soaryang.loadingHide();
                a(f)
            }
        })
    }
};*/