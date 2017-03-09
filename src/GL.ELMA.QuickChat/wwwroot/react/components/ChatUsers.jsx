var ChatUsers = React.createClass({

    getInitialState: function () {
        return {
            ChatHub: this.props.chathub,
            Users: this.props.users,
            CurrentUserId: "",
            CurrentUserName: ""
        };
    },

    pushUserList: function () {

    },

    componentWillMount: function () {
        this.state.ChatHub.client.pushUserList = this.pushUserList;
        /*var component = this;
        $.ajax({
            type: 'GET',
            url: './Chat/GetUsers/',
            dataType: 'json',
            success: function (data) {
                var users = JSON.parse(data);
                $.ajax({
                    type: 'GET',
                    url: './Chat/GetCurrentUser/',
                    dataType: 'json',
                    success: function (currentUserData) {
                        var currentUserName = currentUserData.UserName;
                        var currentUserId = currentUserData.Id;
                        component.setState({
                            Users: users,
                            CurrentUserName: currentUserName,
                            CurrentUserId: currentUserId
                        });
                    },
                    data: {},
                    async: true
                });
            },
            data: {},
            async: true
        });*/
    },

    componentDidUpdate: function (prevProps, prevState) {
        var userSelector = $(ReactDOM.findDOMNode(this)).find("div[id^=userSelector]")[0];
        if (userSelector != undefined) {
            userSelector.click();
        }
    },

    componentDidMount: function () {

    },

	render : function () {
	    var userLi = [];
		var i = 0;

		for (; i < this.state.Users.length; i++) {
		    var user = this.state.Users[i];
		    userLi.push(<ChatUser key={i} username={user.UserName} userId={user.UserId} currentUser={this.state.CurrentUserId} currentUserName={this.state.CurrentUserName} chathub={this.state.ChatHub}/>);
		}
        
		return ( <div className={'people-list'} id={'people-list'}>
					<div className={'search'}>
                        <input type={'text'} placeholder={'search'}/>
                          <i className={'fa fa-search'}></i>
					</div>
                    <ul className={"list"}>
                        {userLi}
                    </ul>
				 </div> );
	}

});