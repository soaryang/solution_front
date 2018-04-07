var express = require('express');
var router = express.Router();
var request = require('request');
var cookieParser = require('cookie-parser');
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
    //console.log('ClientID==========>'+process.env.ClientID);
    //console.log('ClientSecret==========>'+process.env.ClientSecret);
    /*var data = {
        'userInfo':{
            'data':'1231232122'
        }
    }
    httpUtil.post('127.0.0.1',80,'/v1/api/github/userAdd',data,'application/x-www-form-urlencoded')*/
    //res.cookie('name', "1211121212", {maxAge: 60*60 * 1000,path: '/',domain: 'www.yangtengfei.cn'});
    //res.cookie('avatar_url', "22222222222222222", {maxAge: 60*60 * 1000,path: '/',domain: 'www.yangtengfei.cn'});

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
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36'
                }
            }
            request(options2, function (error, response, resbody) {
                if (!error) {
                    console.log('==========='+resbody);
                    var data = JSON.parse(resbody);
                    data = require('querystring').stringify(data);
                    console.log(data);
                    var opt = {
                        method: "POST",
                        host: "localhost",
                        port: 80,
                        path: "/v1/api/github/userAdd",
                        headers: {
                            "Content-Type": 'application/x-www-form-urlencoded',
                            "Content-Length": data.length
                        }
                    };
                    var req = http.request(opt, function (feedback) {
                        if (feedback.statusCode == 200) {
                            var body = "";
                            feedback.on('data', function (data) {
                                body += data;
                            }).on('end', function () {
                                //response.send(200, body);
                                var result = JSON.parse(body);
                                console.log(result);


                                //res.cookie('name', result.data.nick, {maxAge: 60 * 1000,path: '/',domain: 'www.yangtengfei.cn'});
                                //res.cookie('avatar_url', result.data.avatar_url, {maxAge: 60 * 1000,path: '/',domain: 'www.yangtengfei.cn'});
                                res.cookie('auth_key', result.data.key, {maxAge: 60* 60* 24 * 7*1000,path: '/',domain: 'www.yangtengfei.cn'});
                                res.render('jump', {title: 'Express'});
                                //res.redirect("/")
                            });
                        }
                        else {
                            //response.send(500, "error");
                        }
                    });
                    req.write(data + "\n");
                    req.end();
                } else {
                    res.end(JSON.stringify({
                        msg: '获取用户信息失败',
                        status: 102
                    }));
                }
            })
        } else {
            console.log('error');
        }
    })
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
