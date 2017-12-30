/**
 * Created by admin on 2017/12/27.
 */
var pageSize = 20;
var pageNo = 1;
var tagListUr = "/v1/api/tag/page/"
var init = function () {
    url = tagListUr+pageNo+"/"+pageSize;
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
                for (var i = 0; i < questionArray.length; i++) {
                    var object  = questionArray[i];
                    html+='<div class="am-u-lg-4" style="padding-left: 0px;">';
                    html+='<div class="tagInfo">';
                    html+='<span style="font-size: 10pt;color: #00a8c6;"><a href="/questionList/'+object.id+'">';
                    html+=object.name;
                    html+='</a></span>';
                    html+='<p class="tagDescribe">';
                    html+=getDescribe(object.describe);
                    html+='</p>';
                    html+='<div style="border-top: 1px solid lightgray; margin-top: 10px;padding-top: 5px;">';
                    html+='<span >问题:200</span>';
                    html+='<span style="margin-left: 10px;">文章:200</span>';
                    html+='</div>';
                    html+='</div>';
                    html+='</div>';
                    //html+='<hr data-am-widget="divider" style="" class="am-divider am-divider-default"/>';
                }
                $("#tagList").html(html);
            }
        }
    }, function (data) {
    })
};

function getDescribe(content) {
    var describe = content==undefined || content ==null ? "暂无描述":content;
    if(describe.length>50){
        return describe.substr(0,50);
    }
    return describe;
}
init();