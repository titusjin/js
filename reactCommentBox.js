/** @jsx React.DOM */
var initialData = [
	{familyName: "Pete Hunt", cellphone: "0922333555"},
	{familyName: "Jordan Walke", cellphone: "0988555666"}
];

var fetchURL = "Dream/DreamJsonAction_queryACWebService.action";

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function(){
	this.loadInitialData();
  },
  loadInitialData : function(){
	var comp = this;
	$.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
	  cache: false,
      success: function(data) {
        comp.setState({data: data});
      },
      error: function(xhr, status, err) {
        console.error(comp.props.url, status, err.toString());
      }
    });
  },
  componentDidMount : function(){
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  },
  handleCancelSubmit : function(){
      this.state.data.pop();
      this.setState({data : this.state.data});
  },
  render: function() {
	console.log('commetbox render start');  
	  
    if(!this.state.data){
    	this.loadInitialData();
    }
    
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
        <CancelForm onCancelSubmit={this.handleCancelSubmit}/>
      </div>
    );
    
    console.log('commetbox render stop');
  }
});

var CommentList = React.createClass({
  render: function() {
	var commentNodes;
	if(this.props.data){
		commentNodes = this.props.data.map(function (comment) {
		      return (
		        <Comment author={comment.familyName}>
		          {comment.cellphone}
		        </Comment>
		      );
		});
	}
    return (
      <div className="commentList">
          {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
	  render: function() {
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return (
	      <div className="comment">
	        <h2 className="commentAuthor">
	          {this.props.author}
	        </h2>
	        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
	      </div>
	    );
	 }
});


var CancelForm = React.createClass({
    handleCancelSubmit : function(e){
         console.log('in handlecancel ');
         e.preventDefault();
         this.props.onCancelSubmit();
    },
    render:function(){
        return (
          <form className="commentForm" onSubmit={this.handleCancelSubmit}>
            <input type="submit" value="remove last comment" />
          </form>   
        );
    }
});


var CommentForm = React.createClass({
  handleSubmit : function(e){
       e.preventDefault();
       
       var author = React.findDOMNode(this.refs.author).value.trim();
	   var text = React.findDOMNode(this.refs.text).value.trim();
	   // this can also be make by var author =
		// React.findDOMNode(this.refs.author).value.trim();
	   // cause getDOMNode is deprecated. since version 0.13
	  
       if(!author && !text){
          return;
	   }
       this.props.onCommentSubmit({familyName: author, cellphone: text});
       
	   React.findDOMNode(this.refs.author).value='';
	   React.findDOMNode(this.refs.text).value='';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" /><br />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>   
    );
  }
});


React.render(
  <CommentBox url={this.fetchURL} />, document.getElementById('reactJSEx')
);
