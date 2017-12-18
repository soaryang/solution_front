var  initMarkdownplug =function (id) {
    return editormd(id, {
        //width   : "90%",
        height  : 640,
        syncScrolling : "single",
        path    : "/plug/markdown/lib/",
        imageUpload : false,
        imageFormats   : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL : "/v1/api/question/upload",
        saveHTMLToTextarea:true,
        watch : false,
        toolbarIcons : function() {
            return [
                "undo"
                ,"|","redo"
                ,"|","bold"
                ,"|","italic"
                ,"|","quote"
                ,"|","ucwords"
                ,"|","h1"
                ,"|","h2"
                ,"|","h3"
                ,"|","h4"
                ,"|","h5"
                ,"|","h6"
                ,"|","list-ul"
                ,"|","list-ol"
                ,"|","link"
                ,"|","reference-link"
                ,"|","image"
                ,"|","code"
                ,"|","preformatted-text"
                ,"|","code-block"

            ]
        }
    });
}