var ChatUsers = React.createClass({

    getInitialState: function () {
        return {
            ChatHub: this.props.chathub,
            Users: [],
            CurrentUserId: "",
            CurrentUserName: ""
        };
    },

    initializeUser: function () {
        var component = this;
        $.getJSON('./Chat/GetCurrentUser/').then(function (data) {
            component.setState({
                CurrentUserName: data.UserName,
                CurrentUserId: data.Id
            });
        });
    },

    pushUserList: function () {

    },

    componentWillMount: function () {
        this.initializeUser();
        this.state.ChatHub.client.pushUserList = this.pushUserList;
        var component = this;
        $.getJSON('./Chat/GetUsers/').then(function (data) {
            var users = JSON.parse(data);
            component.setState({
                Users: users
            });
           
        });
    },

    componentDidUpdate: function (prevProps, prevState) {
        var firstBtn = ReactDOM.findDOMNode(this).lastChild;
        if (firstBtn != undefined) {
            firstBtn.click();
        }
    },

    componentDidMount: function () {

    },

	render : function () {
		var userDivs = [];
		var i = 0;

		for (; i < this.state.Users.length; i++) {
		    var user = this.state.Users[i];
		    userDivs.push(<ChatUser key={i} username={user.UserName} userId={user.UserId} currentUser={this.state.CurrentUserId} chathub={this.state.ChatHub}/>);
		}
        
		return ( <div style={{overflow:'hidden', display:'block', float:'left', padding:'2px'}}>
					<h4>Пользователи</h4>
					{userDivs}
				 </div> );
	}

});