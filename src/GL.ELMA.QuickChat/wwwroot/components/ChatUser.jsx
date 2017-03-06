var ChatUser = React.createClass({

    getInitialState: function () {
        return {
            UserId: this.props.userId,
            UserName: this.props.username,
            ChatHub: this.props.chathub,
            CurrentUser: this.props.currentUser
        };
    },

    componentDidMount: function () {
        var li = ReactDOM.findDOMNode(this);
        li.addEventListener('click', function (e) {
            if (e.target.tagName === 'LI') {
                this.addMessageWindow();
            }
        }.bind(this));
    },

    addMessageWindow: function () {
        var chatWindow = document.getElementById(this.state.UserId);
        if (chatWindow == null) {
            var windowContainer = document.getElementById('chatWindowDiv');
            ReactDOM.render(<ChatWindow username={this.state.UserName}
                                        userid={this.state.UserId}
                                        sendmessage={this.state.SendMessage}
                                        chathub={this.state.ChatHub}
                                        currentUser={this.state.CurrentUser}/>,
                windowContainer);
        } else {
            if ($(chatWindow).css('display') === 'none') {
                $(chatWindow).css('display', 'block');
            } else {
                $(chatWindow).css('display', 'none');
            }
        }
    },

    render: function () {
        return (<li id={'userLi'+ this.state.UserId} onclick={this.addMessageWindow} key={$.guid++} className={'clearfix'}>
                    <img src={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"} alt={'avatar'}/>
                    <div className={"about"}>
                        <div className={"name"}>{this.state.UserName}</div>
                        <div className={"status"}>
                          <i className={"fa fa-circle online"}></i> online</div>
                    </div>
                </li>);
    }

});