var pageSize = 10;
var urlnewQuestion = "/cachedata/newquestioncache.json";
var urlhotQuestion = "/cachedata/hotquestioncache.json";
var indexTagData = "/cachedata/indexCacheFile";
var url = "";

$(".tab1").click(function(){
    init(1,1);
})

$(".tab2").click(function(){
    init(1,2);
})
var init = function (index, type) {
    //获取头像数据


    for(var i=1; i<=3; i++){
        if(i==type){
            $("#tab"+i).show();
            $(".tab"+i).addClass("am-active");
        }else{
            $("#tab"+i).hide();
            $(".tab"+i).removeClass("am-active");
        }
    }
    //加载tag数据
    soaryang.getAjax(indexTagData, {}, function (data) {
        if (data != null) {
            console.log(data);
            var html = "";
            for(var i=0; i<data.length; i++){
                var tempData = data[i];
                html+='<li>';
                html+='<a href="/questionList/'+data[i].id+'">';
                html+='<div class="am-thumbnail" style="margin-bottom: 0px;">';
                html+='<img  style="margin-bottom: 0px; height: 100px; width: 100px;" src="http://www.51jieguo.com/images'+tempData.imagePath+'" />';
                //html+=tempData.name;
                html+='</div>';
                html+='</a>';
                html+='</li>';
            }
            html+='<li>';
            html+='<a href="/tagList">';
            html+='<div class="am-thumbnail" style="margin-bottom: 0px;">';
            html+='<img  style="margin-bottom: 0px; height: 100px; width: 200px;" src="http://www.51jieguo.com/images/common/more.jpg" />';
            //html+=tempData.name;
            html+='</div>';
            html+='</a>';
            html+='</li>';
            $(".tagList").html(html);
        }
    },function (data) {

    });


    if (type == 1) {
        url = urlnewQuestion
    } else {
        if (type == 2) {
            url = urlhotQuestion
        }
    }
    soaryang.getAjax(url, {}, function (data) {
        console.log(data);
        var html = "";
        if (data != null) {
            var count = data.count;
            var questionArray = data.questionList;
            if (questionArray != null) {
                //$(".question_" + type).html("");
                $("#tab"+type).html("");
                $("#pagePlugId").html("");
                var array = questionArray.slice((index - 1) * pageSize, index * pageSize);
                for (var i = 0; i < array.length; i++) {
                    var questionObject = array[i];
                    html+='<div class="questionItem">';
                    html+='<img src="http://www.51jieguo.com/images/wechat.jpg" width="70" height="70" alt="" style="float: left;"/>';
                    html+='<div class="detail">';
                    html+='<h3 style="margin-left:80px;">';
                    html+='<a href="/question/'+questionObject.id+'">'+questionObject.name+'</a>';
                    html+='</h3>';
                    html+='<div style="margin-left:80px;" class="other">';
                    html+='<span class="from">FROM:管理员</span>';
                    html+='<span class="from am-btn-success">回答:'+questionObject.solutionCount+'</span>';
                    html+='<span class="from">访问:0</span>';
                    html+='<span class="from">关注:0</span>';
                    html+='<span class="from">日期:'+$.dateFormat(questionObject.createTime)+'</span>';
                    html+='</div>';
                    html+='<div style="margin-left:80px;margin-top:10px;">';
                    html+='<span class="tag">'+questionObject.tagName+'</span>';
                    html+='</div>';
                    html+='</div>';
                    html+='</div>';
                    //html+='<hr data-am-widget="divider" style="" class="am-divider am-divider-default"/>';
                }
                $("#tab"+type).html(html);
            }
        }
    }, function (data) {
    })
};
init(1, 1);