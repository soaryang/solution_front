
$(document).bind("contextmenu",function(e){
    return false;
});
function doShowContent(){
    showSolution();
}

function showSolution() {
    var url ="/v1/api/article/info/"+$("#articleId").val();
    soaryang.getAjax(url, {}, function (data) {
        if(data.code ==200){

            $(".articleName").html(data.data.articleName)
            var id = "test-editormd-view";
            var solutionArray = data.data.content;

            $(".tagName").html(data.data.tagName);
            var solutionListDiv = $(".solutionList");
            var id = "test-editormd-view"+0;
            var contentDiv= '<div id="'+id+'" style="border: 1px solid rgb(221, 221, 221);"></div>'
            solutionListDiv.append($(contentDiv));
            initEdit(id,solutionArray);
            /*var solutionArray = data.data;
            var solutionListDiv = $(".solutionList");
            for(var i=0; i<solutionArray.length; i++){
                var converter = new showdown.Converter();
                solutionListDiv.append(converter.makeHtml(solutionArray[i].content));
                //console.log(html);
            }*/

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

