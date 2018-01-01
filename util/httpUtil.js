
var http = require("http");
var httpObject = {
    post:function(res,host,port,url,data,method,contentType){
        var options = {
            host:host,
            port:port,
            path:url,
            method:method,
            headers:{
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
                //'Content-Type' : 'application/x-www-form-urlencoded',// 不写这个参数，后台会接收不到数据
                'Content-Type':contentType,
                'Content-Length' : data.length
            }
        };
        var post_req = http.request(options, function (response) {
            var responseText=[];
            var size = 0;
            response.on('data', function (data) {
                responseText.push(data);
                size+=data.length;
                console.log('data================='+data);
            });
            response.on('error', function (e) {
                console.log('error========='+e.message);
            });
            /*response.on('end', function () {
                // Buffer 是node.js 自带的库，直接使用
                responseText = Buffer.concat(responseText,size);
                callback(responseText);
            });*/
        });

        // post the data
        post_req.write(data);
        post_req.end();
    }
}

module.exports = httpObject;