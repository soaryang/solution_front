/**
 * Created by admin on 2017/12/26.
 */
var pageSize = 10;
var urlnewQuestion = "/v1/api/question/listById/";
var url = "";
var pageNo=1;

$(".tab1").click(function(){
    init(1,1);
})

$(".tab2").click(function(){
    init(1,2);
})

var initTag = function(){
    soaryang.getAjax("/v1/api/tag/"+$(".tagId").val(), {}, function (data) {
        if(data.code==200){
            $(".tagName").html(data.data.name);
            init(1, 1);
        }
    },function (data) {

    });
}
var init = function (index, type) {
    for(var i=1; i<=3; i++){
        if(i==type){
            $("#tab"+i).show();
            $(".tab"+i).addClass("am-active");
        }else{
            $("#tab"+i).hide();
            $(".tab"+i).removeClass("am-active");
        }
    }
    url = urlnewQuestion+pageNo+"/"+pageSize+"/"+$(".tagId").val();

    console.log(url);
    soaryang.getAjax(url, {}, function (data) {
        console.log(data);
        var html = "";
        if (data != null) {
            var count = data.total;
            if(count==0){
                return;
            }
            var questionArray = data.rows;
            if (questionArray != null) {
                //$(".question_" + type).html("");
                $("#tab"+type).html("");
                $("#pagePlugId").html("");
                var array = questionArray.slice((index - 1) * pageSize, index * pageSize);
                for (var i = 0; i < array.length; i++) {
                    var questionObject = array[i];
                    html+='<div class="questionItem">';
                    html+='<img src="http://www.yangtengfei.cn/images/wechat.jpg" width="70" height="70" alt="" style="float: left;"/>';
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
initTag();