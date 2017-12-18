
var tagList = [];
$( "#tagInput" ).autocomplete({
    //source: availableTags
    source: function(request, response){

        var url = '/v1/api/question/page/'+ request.term ;
        soaryang.getAjax(url,null,function (data) {

            var array = data.rows;
            //response(dataObj); //将数据交给autocomplete去展示
            if(array==null || array.length==0){
                $(".ui-autocomplete").hide();
                listenerTagCount();
                return;
            }else{
                $(".ui-autocomplete").show();
                response( $.map(array, function( item ) {
                    return {
                        label: item.name,
                        value: item.id,
                    }
                }));
            }
        },function (error) {

        })
    },
    focus:function (event, ui) {
        $(this).val(ui.item.label);
        event.preventDefault();
    },
    select: function(event, ui){
        //alert(ui.item.label);
        var object = ui;
        if(!checkTagIsSelectOrNot(object.item.value,object.item.label)){
            //$(this).val(object.item.label);

            var tagObject = {
                id:object.item.value,
                name:object.item.label
            }
            var content = '<span class="am-btn am-btn-primary am-btn-sm tagName" spanValue="'+object.item.value+'">'+object.item.label;
            content+='<input type="hidden" name="tagInfo" class="tagInfo" value=\''+JSON.stringify(tagObject)+'\'/>';
            content+='<span class="am-icon-remove tagRemove" onclick="removeTag(\''+0+'\',\''+object.item.label+'\',this)"></span></span>';



            $(content).insertBefore($(".tagInput"));
            //$("#tagId").val(object.item.value);
            clearTagInput();
            addToTagList(object.item.value,object.item.label);
        }else{
            alert('标签你已经选过了！！！');
        }
        clearTagInput();

        event.preventDefault();
    },
    blur:function (event) {
        event.preventDefault();
    },
    change :function (event, ui) {

    }
});


$(".addCustomeTag").click(function () {
    var value= $(".tagInput").val();

    if(value=='' || value==undefined || value==null){
        return;
    }

    if(!checkTagIsSelectOrNot(0,value)){
        var object = JSON.stringify({
            id:0,
            name:value
        });

        var content = '<span class="am-btn am-btn-primary am-btn-sm tagName" spanValue="'+value+'">'+value;
        content+='<input type="hidden" name="tagInfo" class="tagInfo" value=\''+object+'\'/>';
        content+='<span class="am-icon-remove tagRemove" onclick="removeTag(\''+0+'\',\''+value+'\',this)"></span></span>';
        $(content).insertBefore($(".tagInput"));
        clearTagInput();
    }else{
        alert('标签你已经选过了！！！');
        clearTagInput();
        return;
    }

    addToTagList(0,value);
});

testEditor = initMarkdownplug('txtblogcontent');

$(".saveQuestionBtn").click(function () {
    soaryang.postAjax('/v1/api/user/question/save',$('#questionForm').serialize(),function (data) {

    },function (error) {

    })
});

var checkTagIsSelectOrNot = function (id,name) {
    if(tagList!=null &&  tagList.length>0) {
        for (var i = 0; i < tagList.length; i++) {
            var object = tagList[i];
            if (object.id == id && object.name == name) {
                return true;
            }
        }
    }
    return false;
}

var listenerTagCount = function () {
    if(tagList!=null && tagList.length==3){
        $("#tagInput").hide();
        $(".addCustomeTag").hide();
    }else{
        $(".tagInput").show();

        if($("#tagInput").val()!=null && $("#tagInput").val()!=""){
            $(".addCustomeTag").show();
        }else{
            $(".addCustomeTag").hide();
        }

    }
}
var addToTagList = function (id,name) {
    var object = {
        id:id,
        name:name
    }
    tagList.push(object);
    listenerTagCount();
    setTagList();
}
var removeFromTagList = function (id,name) {
    var tempArray =[];
    if(tagList!=null && tagList.length>0){
        for(var i=0; i<tagList.length; i++){
            var object = tagList[i];
            if(object.id != id || object.name !=name){
                tempArray.push(object);
            }
        }
        tagList = tempArray;
        listenerTagCount();
        setTagList();
    }
}

var setTagList = function () {
    $("#tagList").val(JSON.stringify(tagList))
}

var clearTagInput = function () {
    $( "#tagInput" ).val('');
}
var removeTag = function (id,name,object) {
    //移除当前标签
    $(object).parent().remove();
    removeFromTagList(id,name);
}