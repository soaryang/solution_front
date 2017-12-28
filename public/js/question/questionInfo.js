
$(document).bind("contextmenu",function(e){
    return false;
});
function doShowContent(){
    var url ="/v1/api/question/findById?id="+$("#questionId").val();
    soaryang.getAjax(url, {}, function (data) {
        if(data.code ==200){
            var jsonObject = data.data;
            $(".questionName").html(jsonObject.name);
            $(".tagName").html(jsonObject.tagName);
            showSolution($("#questionId").val());
            /*var id = "test-editormd-view";
            var solutionArray = jsonObject.solutionViewList;
            var solutionListDiv = $(".solutionList");
            for(var i=0; i<solutionArray.length; i++){
                var id = "test-editormd-view"+i;
                var contentDiv= '<div id="'+id+'" style="border: 1px solid rgb(221, 221, 221);"></div>'
                solutionListDiv.append($(contentDiv));
                initEdit(id,solutionArray[i].content);
            }*/
        }
    },function (data) {

    });
}

function showSolution(questionId) {
    var url ="/v1/api/solution/findQuetionId/"+questionId;
    soaryang.getAjax(url, {}, function (data) {
        if(data.code ==200){

            var id = "test-editormd-view";
             var solutionArray = data.data;
             var solutionListDiv = $(".solutionList");
             for(var i=0; i<solutionArray.length; i++){
                 var id = "test-editormd-view"+i;
                 var contentDiv= '<div id="'+id+'" style="border: 1px solid rgb(221, 221, 221);"></div>'
                 solutionListDiv.append($(contentDiv));
                 initEdit(id,solutionArray[i].content);
             }
        }
    },function (data) {

    });
}

function initEdit(id,content) {
    var testEditormdView =function () {
        return editormd(id, {
            width        : "90%",
            height       : 720
        });
    }

    testEditormdView =editormd.markdownToHTML(id,{
        markdown: content,//
        tocm            : true,    // Using [TOCM]
        markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
        emoji           : true,
        taskList        : true,
        tex             : true,  // 默认不解析
        flowChart       : true,  // 默认不解析
        sequenceDiagram : true,  // 默认不解析
        theme:"dark"
    });
}

doShowContent();

