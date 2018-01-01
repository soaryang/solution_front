var express = require('express');
var router = express.Router();
var request = require('request');
var http = require("http");
var test = require('../util/test');
var querystring = require('querystring');
var httpUtil = require('../util/httpUtil');
var githubConfig = {
    // 客户ID
    //client_ID: 'a5a36494dfb0fa76a60b',
    // 客户密匙
    //client_Secret: '58c6417b218516158be0b64f4f5066f2002e64dc',
    // 获取 access_token
    // eg: https://github.com/login/oauth/access_token?client_id=7***************6&client_secret=4***************f&code=9dbc60118572de060db4&redirect_uri=http://manage.hgdqdev.cn/#/login
    access_token_url: 'https://github.com/login/oauth/access_token',
    // 获取用户信息
    // eg: https://api.github.com/user?access_token=86664b010dbb841a86d4ecc38dfeb8ac673b9430&scope=&token_type=bearer
    user_info_url: 'https://api.github.com/user?',
    // 回调地址
    redirect_uri: 'http://www.yangtengfei.cn/login/githubLogin'
}

/* GET home page. */
router.get('/', function (req, res, next) {
    //function(res,host,port,url,data,method,contentType){
    //test.say(res);
    console.log('ClientID==========>'+process.env.ClientID);
    console.log('ClientSecret==========>'+process.env.ClientSecret);
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Express'});
});


router.get('/questionAdd', function (req, res, next) {
    res.render('question/questionAdd', {title: 'Express'});
});

router.get('/tagList', function (req, res, next) {
    res.render('question/tagList', {title: 'Express'});
});

router.get('/questionList/:id', function (req, res, next) {
    res.render('question/questionList', {tagId: req.params.id});
});


router.get("/question/:id", function (req, res, next) {
    var id = req.params.id;
    console.log("id:" + id);
    res.render('question/questionInfo', {questionId: id});
})

router.get("/login/githubLogin", function (req, res, next) {
    console.log('=================>' + req.query.code);
    var code = req.query.code;
    var param = req.query || req.params;
    if (code == '') {
        res.end(JSON.stringify({
            msg: '请传入正确的参数',
            status: 103
        }));
        return;
    }

    var options = {
        'method': 'post',
        'url': githubConfig.access_token_url,
        'form': {
            client_id: process.env.ClientID,
            client_secret: process.env.ClientSecret,
            code: code,
            redirect_uri: githubConfig.redirect_uri
        }
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('body======' + body);
            var urlStr = githubConfig.user_info_url + body;
            var options2 = {
                'url': urlStr,
                'headers': {
                    'User-Agent': 'misiteyang'
                }
        }
            console.log('url:'+urlStr);
            request(options2, function (error, response, resbody) {
                if (!error) {
                    /*res.end(JSON.stringify({
                        msg: '获取成功',
                        status: 100,
                        data: JSON.parse(resbody.data)
                    }));*/


                    console.log('==========='+resbody);
                    //var userObject = JSON.parse(resbody);
                    var dataObject  = {
                        'userInfo':resbody
                    }

                    var data = require('querystring').stringify(dataObject);
                    console.log('------------------'+userObject);

                    //post:function(res,host,port,url,data,method,contentType){
                    httpUtil.post('localhost',80,'v1/api/github/userAdd',data,'application/x-www-form-urlencoded')
                    /*var postData = querystring.stringify({
                        'msg': 'Hello World!'
                    });*/
                } else {
                    res.end(JSON.stringify({
                        msg: '获取用户信息失败',
                        status: 102
                    }));
                    res.render('index', {title: 'Express'});
                }
            })


        } else {
            console.log('error');
        }
    })
    /*request({
    url: githubConfig.access_token_url,
    form: {
        client_id: githubConfig.client_ID,
        client_secret: githubConfig.client_Secret,
        code: code,
        redirect_uri: githubConfig.redirect_uri
    }},
    function(error, response, body){
        if (!error && response.statusCode == 200) {
            var urlStr = githubConfig.user_info_url + body;
            request({
                    url: urlStr,
                    headers: {
                        'User-Agent': 'zhuming3834'
                    }
                },
                function(error, response, resbody){
                    if (!error) {
                        /*res.end(JSON.stringify({
                            msg: '获取成功',
                            status: 100,
                            data: JSON.parse(resbody.data)
                        }));

                        var userObject = JSON.parse(resbody);
                        console.log('------------------');
                        var postData = querystring.stringify({
                            'msg' : 'Hello World!'
                        });
                        httpUtil.post(res,'127.0.0.1',80,'/v1/node/Http',querystring.stringify(userObject),'POST','application/x-www-form-urlencoded')
                        //res.render('index', { title: 'Express' });
                    }else{
                        res.end(JSON.stringify({
                            msg: '获取用户信息失败',
                            status: 102
                        }));
                        res.render('index', { title: 'Express' });
                    }
                }
            )
        }else{
            res.end(JSON.stringify({
                msg: '获取用户信息失败',
                status: 101
            }));
        }
    }
    )*/
})

router.all('/api/github/user_info', function (req, res, next) {
    var param = req.query || req.params;
    var code = param.code || '';
    if (code == '') {
        res.end(JSON.stringify({
            msg: '请传入正确的参数',
            status: 103
        }));
        return;
    }
    request({
            url: githubConfig.access_token_url,
            form: {
                client_id: githubConfig.client_ID,
                client_secret: githubConfig.client_Secret,
                code: code,
                redirect_uri: githubConfig.redirect_uri
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var urlStr = githubConfig.user_info_url + body;
                request({
                        url: urlStr,
                        headers: {
                            'User-Agent': 'zhuming3834'
                        }
                    },
                    function (error, response, resbody) {
                        if (!error) {
                            res.end(JSON.stringify({
                                msg: '获取成功',
                                status: 100,
                                data: JSON.parse(resbody)
                            }));
                        } else {
                            res.end(JSON.stringify({
                                msg: '获取用户信息失败',
                                status: 102
                            }));
                        }
                    }
                )
            } else {
                res.end(JSON.stringify({
                    msg: '获取用户信息失败',
                    status: 101
                }));
            }
        }
    )
})

var mypost = function (res, host, port, url, data, method, contentType) {
    var options = {
        host: host,
        port: port,
        path: url,
        method: method,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
            //'Content-Type' : 'application/x-www-form-urlencoded',// 不写这个参数，后台会接收不到数据
            'Content-Type': contentType,
            'Content-Length': data.length
        }
    };
    var post_req = http.request(options, function (response) {
        var responseText = [];
        var size = 0;
        response.on('data', function (data) {
            responseText.push(data);
            size += data.length;
            console.log('data=================' + data);
        });
        response.on('error', function (e) {
            console.log('error=========' + e.message);
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
module.exports = router;
