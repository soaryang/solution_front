/*var TableHead = React.createClass({
	render : function(){
		var options = [];
		for(var i=0; i<this.props.title.length; i++){
			var object = this.props.title[i];
			options.push(<th>{object.title}</th>)
		}
		return	<tr>
					{options}
				</tr>
	}
});

var TableTd = React.createClass({
	render : function(){
		var options = [];
		for (var key in this.props.content){
			  options.push(<td>{this.props.content[key]}</td>)
		}
		return	<tr>
					{options}
				</tr>
	}
});
var TableTr =  React.createClass({
	render : function(){
		var page = this.props.page;
		if(this.props.content!=null && this.props.content.length>0){
			var rows=[];
			var sum = this.props.content.length;
			if(this.props.pageType){
				var pageSize = this.props.pageSize;
				var index = (page-1)*pageSize;
				var length =(index + pageSize > sum ?sum:index + pageSize)
				for(var i=index; i<length; i++){
					rows.push(<TableTd content={this.props.content[i]}/>);
				}
			}else{
				for(var i=0; i<sum; i++){
					rows.push(<TableTd content={this.props.content[i]}/>);
				}
			}
			return	<tbody>
						{rows}
					</tbody>
		}
		return	<tr>
					<td>{"没有数据"}</td>
				</tr>
	}
});

var TagbleTag = React.createClass({
	getInitialState: function() {
	  return {
		url: this.props.url,
		page: 1,
		title:this.props.title,
		rows:[],
		pageType:false,
		pageSize:10,
		totalPage:0
	  };
	},
	componentWillMount:function(){
		console.log('componentWillMount');
	},
	componentDidMount: function() {
		$.get(this.props.url, function (result) {
			console.log(result);
			var total =0;
			var sum = result.length;
			var pageSize = this.state.pageSize;
			if(parseInt(sum%pageSize)==0){
				total = parseInt(sum / pageSize);
			}else{
				total = parseInt(sum / pageSize) + 1;
			}
			this.setState({
				rows:result,
				sum:result.length,
				totalPage:total
			})
		}.bind(this));
	},
	componentWillReceiveProps:function(){
		console.log('componentDidMount');
	},
	componentWillUpdate:function(){

	},
	componentDidUpdate :function(){
		//设置page标签状态
		this.pageButtonState();
	},
	componentWillReceiveProps:function(){
		//console.log('componentWillReceiveProps');
	},
	componentWillUnmount: function() {
	  this.serverRequest.abort();
	},
	firstPageClick: function () {	
		this.setState(function(state) {
		  return {page: 1};
		});
	},
	prePageClick: function () {
		this.setState(function(state) {
		  return {page: state.page>1?state.page-1:1};
		});
	},
	nextPageClick: function () {
		this.setState(function(state) {  
			return {
				page: state.page + 1
			};
		});
	},
	lastPageClick: function () {
		this.setState(function(state) {
		  return {page: this.state.totalPage};
		});
	},
	pageButtonState:function(){
		if(this.state.page==1 && this.state.totalPage==1){
			$(".firstPage").addClass("disabled").attr("disabled", true) ;
			$(".prePage").addClass("disabled").attr("disabled", true);
			$(".nextPage").addClass("disabled").attr("disabled", true);
			$(".lastPage").addClass("disabled").attr("disabled", true);
		}else if(this.state.page==1){
			$(".firstPage").addClass("disabled").attr("disabled", true);
			$(".prePage").addClass("disabled").attr("disabled", true);
			$(".nextPage").removeClass("disabled").removeAttr("disabled");
			$(".lastPage").removeClass("disabled").removeAttr("disabled");
		}else if(this.state.page == this.state.totalPage){
			$(".firstPage").removeClass("disabled").removeAttr("disabled");
			$(".prePage").removeClass("disabled").removeAttr("disabled");
			$(".nextPage").addClass("disabled").attr("disabled", true);
			$(".lastPage").addClass("disabled").attr("disabled", true);
		}else{
			$(".firstPage").removeClass("disabled").removeAttr("disabled");
			$(".prePage").removeClass("disabled").removeAttr("disabled");
			$(".nextPage").removeClass("disabled").removeAttr("disabled");
			$(".lastPage").removeClass("disabled").removeAttr("disabled");
		}
	},
	render: function() {
	  return (
			<div>
				<table>
					<TableHead title={this.state.title}/>
					<TableTr content={this.state.rows}  pageType={this.state.pageType} pageSize={this.state.pageSize} page={this.state.page}/>
				</table>
				<div className="page">
					<button className="firstPage"  onClick={this.firstPageClick}>首页</button>
					<button className="prePage" onClick={this.prePageClick}>&lt;上一页</button>
					<span>第{this.state.page}页</span>
					<button className="nextPage" onClick={this.nextPageClick}>下一页&gt;</button>
					<button className="lastPage" onClick={this.lastPageClick}>末页</button>
				</div>
			</div>
	  );
	}
});



var init2 =function(){
	var title= [
		{field: 'id',title: '编号',align: 'center'},
		{field: 'name',title: '名称',align: 'center'},
		{field: 'value',title: '值',align: 'center'},
	];
	ReactDOM.render(
		<TagbleTag url="http://localhost/static/table/tablejson.json" title={title}/>,
		document.getElementById('main')
	);
}

init2();*/