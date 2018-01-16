
$(".githublogin").click(function (e) {
    window.location="https://github.com/login/oauth/authorize?client_id=61588e68df498cf1d5e1&redirect_uri=http://www.yangtengfei.cn/login/githubLogin&scope=user&state=any";
    //https://github.com/login/oauth/authorize?client_id=4a96512cf6320c146918&redirect_uri=http://www.spring4all.com/login/github&scope=user&state=any
    /*var url ="https://github.com/login/oauth/authorize?client_id=a5a36494dfb0fa76a60b&redirect_uri=http://www.yangtengfei.cn/v1/github/vaild&scope=user&state=any";
    soaryang.getAjax(url, {}, function (data) {
        console.log(data);
    });*/
})