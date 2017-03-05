var MainChat = React.createClass({
            
    getInitialState : function () {
        return {
            ChatHub: $.connection.MainHub,
            Messages: [], 
            UserName:'', 
            UserId:'00000000-0000-0000-0000-000000000000'
        };
    },

	initializeUser: function () {
	    var component = this;
	    $.getJSON('./Chat/GetCurrentUser/').then(function (data) {
	        component.setState({
	            UserName: data.UserName,
	            UserId: data.Id
	        });
	    });
	},

	componentWillMount: function () {
        this.initializeUser();
    },

    render: function () {
        return (<div>
                       <ChatUsers chathub={this.state.ChatHub} sendmessage={this.sendMessage} currentUser={this.state.UserId} />
                       <div id="ChatWindowContainer"></div>
                   </div>);
    }
        
});