
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
            var id = "test-editormd-view";
            /*var contentDiv= '<div id="'+id+'" style="border: 1px solid rgb(221, 221, 221);">' +
                '<textarea style="display:none;" name="test-editormd-markdown-doc">###Hello world!</textarea>' +
                '</div>'
            var questionAnswerDiv = $("#questionAnswerDiv");
            questionAnswerDiv.append($(contentDiv));*/
            var solutionArray = jsonObject.solutionViewList;
            var solutionListDiv = $(".solutionList");
            for(var i=0; i<solutionArray.length; i++){
                var id = "test-editormd-view"+i;
                var contentDiv= '<div id="'+id+'" style="border: 1px solid rgb(221, 221, 221);"></div>'
                solutionListDiv.append($(contentDiv));
                initEdit(id,solutionArray[i].content);
            }

            /*var solutionArray = jsonObject.solutionViewList;
            var html="";
            if(solutionArray!=null) {

                for (var i = 0; i < solutionArray.length; i++) {

                    var id = "test-editormd-view"+i;
                    var contentDiv= '<div id="'+id+'" style="border: 1px solid rgb(221, 221, 221);">' +
                        '<textarea style="display:none;" name="test-editormd-markdown-doc">###Hello world!</textarea>' +
                        '</div>'
                    var questionAnswerDiv = $("#questionAnswerDiv");
                    questionAnswerDiv.append($(contentDiv))
                    var testEditormdView1 =function () {
                        return editormd(id, {
                            width        : "90%",
                            height       : 720
                        });
                    }

                    testEditormdView1 =editormd.markdownToHTML(id,{
                        markdown: solutionArray[i].content,//+ "\r\n" + $("#append-test").text(),
                        //htmlDecode:false,       // 开启 HTML 标签解析，为了安全性，默认不开启
                        //htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
                        //toc             : false,
                        tocm            : true,    // Using [TOCM]
                        //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
                        //gfm             : false,
                        //tocDropdown     : true,
                        markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
                        emoji           : true,
                        taskList        : true,
                        tex             : true,  // 默认不解析
                        flowChart       : true,  // 默认不解析
                        sequenceDiagram : true,  // 默认不解析
                        theme:"dark"
                    });
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
        markdown: content,//+ "\r\n" + $("#append-test").text(),
        //htmlDecode:false,       // 开启 HTML 标签解析，为了安全性，默认不开启
        //htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
        //toc             : false,
        tocm            : true,    // Using [TOCM]
        //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
        //gfm             : false,
        //tocDropdown     : true,
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

