var OneTag =  React.createClass({
    render:function () {
        return <li className="tagCell">
                    <a href={"/questionList/"+this.props.data.id}>
                        <div className="am-thumbnail tagImageDiv">
                            <img className="tagImage" src={"http://www.yangtengfei.cn/images"+this.props.data.imagePath} />
                        </div>
                    </a>
                </li>
    }
});
var TagPlug = React.createClass({
    getInitialState: function() {
        return{
            tagList:[]
        }
    },
    componentDidMount:function () {
        $.get('/cachedata/indexCacheFile', function (result) {
            console.log(result.length);
            var array = JSON.parse(result);
            if(array!=null && array.length>0) {
                var tagList = [];
                for (var i = 0; i < array.length; i++) {
                    var object = array[i];
                    tagList.push(object);
                }
                this.setState({
                    tagList:tagList
                });
            }
        }.bind(this));
    },
    render: function() {
        var array = this.state.tagList;
        var options = [];
        if(array!=null && array.length>0){
            for(var i=0; i<array.length; i++){
                options.push(<OneTag data={array[i]}/>)
            }
        }
        options.push(<li className="tagCell">
                        <a href="/tagList">
                            <div className="am-thumbnail tagImageDiv">
                                <img className="tagImage" src="http://www.yangtengfei.cn/images/common/more.jpg" />
                            </div>
                        </a>
                    </li>)
        return <ul className="am-avg-sm-2 am-avg-md-3 am-avg-lg-6 am-thumbnails tagList">
            {options}
                </ul>;
    }
});
ReactDOM.render(<TagPlug />,document.getElementById('tag'));