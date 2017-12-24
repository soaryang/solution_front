/*!
 * danmu.ajax.plug v1.0.0
 */
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