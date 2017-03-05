var ChatUser = React.createClass({

    getInitialState: function () {
        return {
            UserId: this.props.userId,
            UserName: this.props.username,
            ChatHub: this.props.chathub,
            CurrentUser: this.props.currentUser
        };
    },

    addMessageWindow: function () {
        var chatWindow = document.getElementById(this.state.UserId);
        if (chatWindow == null) {
            ReactDOM.render(<ChatWindow username={this.state.UserName}
                                        userid={this.state.UserId}
                                        sendmessage={this.state.SendMessage}
                                        chathub={this.state.ChatHub}
                                        currentUser={this.state.CurrentUser}/>,
                document.getElementById('ChatWindowContainer'));
        } else {
            if ($(chatWindow).css('display') === 'none') {
                $(chatWindow).css('display', 'block');
            } else {
                $(chatWindow).css('display', 'none');
            }
        }
    },

    render: function () {
        return (<button id={'userBtn'+ this.state.UserId}  onClick={this.addMessageWindow} key={$.guid++} className={'userItem' }>{this.state.UserName}</button>);
    }

});