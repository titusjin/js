/** @jsx React.DOM */
var HelloDate = React.createClass({
	getInitialState : function(){
		return {date: new Date()};
	},
	makeDateString : function(){
		this.setState({date: new Date()});
	},
	componentDidMount : function(){
		this.interval = setInterval(this.makeDateString,1000);
	},
	render: function() {
		return (
				<p>
				Hello, <input type="text" placeholder="Your name here" />!
				It is {this.state.date.toTimeString()}
				</p>
		);
	}
});


React.render(
		<HelloDate />,
		document.getElementById('example')
);
