$.ajaxSetup({
    timeout: 10000,
    dataType: 'html',
    //请求成功后触发
    success: function (data) {
        console.log('success invoke!' + data + '<br/>');
    },
    //请求失败遇到异常触发
    error: function (xhr, status, e) {
        console.log('error invoke!' + e + '<br/>');
    },
    //完成请求后触发。即在success或error触发后触发
    complete: function (xhr, status) {
        //$modal.modal('hide');
        console.log('complete invoke! status:' + status + '<br/>');
        if (xhr.status == 401) {
            window.location = '/login';
            return;
        }
        /*if (xhr.status == 443) {
            window.location = '/film/danmuCheck';
            return;
        }*/
    },
    //发送请求前触发
    beforeSend: function (xhr) {
        //可以设置自定义标头
        //xhr.setRequestHeader('Content-Type', 'application/xml;charset=utf-8');
        console.log('beforeSend invoke!' +'<br/>');
    },
})


