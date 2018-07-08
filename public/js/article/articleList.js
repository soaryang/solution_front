
var index = 1 ;
var size = 10;
var tagListUr = "/v1/api/article/page/";
var data = {
    sum:100,
    rows:[
        {name:'name1'},
        {name:'name2'},
        {name:'name3'},
        {name:'name1'},
        {name:'name4'},
        {name:'name5'},
        {name:'name6'},
        {name:'name7'},
        {name:'name8'},
        {name:'name9'},
        {name:'name10'},
        {name:'name11'}
    ]
};
var init = function () {
    /*url = tagListUr+pageNo+"/"+pageSize;
    console.log(url);
    soaryang.getAjax(url, {}, function (data) {

    });*/

    $("#pagination").append(initList(data));
}

var nextPage = function(){
    index = index+1;
    $("#pagination").empty().append(initList(data));
};

var prePage = function(){
    index = index-1;
    $("#pagination").empty().append(initList(data));
};

var restPagination = function(page){
    index = page;
    $("#pagination").empty().append(initList(data));
}



var initList = function(data){
    var html  = "";

    var url ='/v1/api/article/page';
    var data = {
        "tagId":$("#tagId").val(),
        "pageNumber":index,
        "pageSize":size
    };
    soaryang.getAjax(url,data,function (data) {
        if(data.code==200){
            ///window.location.href="/article/"+$("#tagId").val();
            console.log(data.data.rows);
            for(var i=0;i<data.data.rows.length; i++){
                html +='<li class="am-panel" onclick="jump(\''+data.data.rows[i].id+'\')">';
                html +='<a data-am-collapse="{parent: \'#collapase-nav-1\'}" ><i class="am-icon-home am-margin-left-sm"></i>&nbsp;&nbsp;'+data.data.rows[i].articleName+'</a>';
                html +='</li>';
            }
            //return html + initPagnation(html,data.data.total);
            $("#collapase-nav-1").empty().append(html);
            $("#pagination").empty().append(initPagnation(data.data.total));
        }
    },function (data) {

    })
}

function jump(id) {
    window.location = "/article/info/"+id;
}

var  initPagnation = function(sum){
    var html ="";
    if(sum==0){
        return html;
    }
    totalPage = sum % size > 0 ? parseInt((sum/size))+1 : parseInt((sum/size));

    if(index == 1){
        html +='<li class="am-pagination-first am-active" > <a href="#" >第一页</a> </li>';
        html +='<li class="am-pagination-prev am-active" > <a href="#" >上一页</a> </li>';
    }else{
        html +='<li class="am-pagination-first " onclick="restPagination(1);"> <a href="#" class="">第一页</a> </li>';
        html +='<li class="am-pagination-prev" onclick="restPagination('+(index -1)+');"> <a href="#" >上一页</a> </li>';
    }

    if(totalPage<=10){
        for(var i= 1 ; i<=totalPage ; i++){
            if(i==index){
                html +='<li class="am-active"><a href="#" class="">'+i+'</a></li>';
            }else{
                html +='<li class="" onclick="restPagination('+i+');"><a href="#" class="">'+i+'</a></li>';
            }
        }
    }else{
        if(index <= 5){
            for(var i= 1 ; i<=5 ; i++){
                if(i==index){
                    html +='<li class="am-active"><a href="#" class="">'+i+'</a></li>';
                }else{
                    html +='<li class="" onclick="restPagination('+i+');"><a href="#" class="">'+i+'</a></li>';
                }
            }
        }else if(index>=totalPage-3){
            for(var i=totalPage-4 ; i<=totalPage ; i++){
                if(i==index){
                    html +='<li class="am-active"><a href="#" class="">'+i+'</a></li>';
                }else{
                    html +='<li class="" onclick="restPagination('+i+');"><a href="#" class="">'+i+'</a></li>';
                }
            }
        }else{
            for(var i= index-2 ; i<=index+2 ; i++){
                if(i==index){
                    html +='<li class="am-active"><a href="#" class="">'+i+'</a></li>';
                }else{
                    html +='<li class="" onclick="restPagination('+i+');"><a href="#" class="">'+i+'</a></li>';
                }
            }
        }
    }
    if(index == totalPage){
        html +='<li class="am-pagination-next am-active"> <a href="#" class="am-active">下一页</a> </li>';
        html +='<li class="am-pagination-last am-active"> <a href="#" class="am-active">第末页</a> </li>';
    }else{
        html +='<li class="am-pagination-next" onclick="restPagination('+(index +1)+');"> <a href="#" class="">下一页</a> </li>';
        html +='<li class="am-pagination-last" onclick="restPagination('+totalPage+');"> <a href="#" class="">第末页</a> </li>';
    }
    return html;
}
init();