var ChatUsers = React.createClass({

    getInitialState: function () {
        return {
            ChatHub: this.props.chathub,
            Users: [],
            SendMessage: this.props.sendmessage,
            CurrentUser: this.props.currentUser
        };
    },

    pushUserList: function () {

    },

    componentWillMount: function () {
        this.state.ChatHub.client.pushUserList = this.pushUserList;
        var component = this;
        $.getJSON('./Chat/GetUsers/').then(function (data) {
            var users = JSON.parse(data);
            component.setState({
                Users: users
            });
        });
    },

	render : function () {
		var userDivs = [];
		var i = 0;

		for (; i < this.state.Users.length; i++) {
		    var user = this.state.Users[i];
		    userDivs.push(<ChatUser key={i} username={user.UserName} userId={user.UserId} currentUser={this.state.CurrentUser} chathub={this.state.ChatHub}/>);
		}
        
		return ( <div style={{overflow:'hidden', display:'block', float:'left', padding:'2px'}}>
					<h4>Пользователи</h4>
					{userDivs}
				 </div> );
	}

});