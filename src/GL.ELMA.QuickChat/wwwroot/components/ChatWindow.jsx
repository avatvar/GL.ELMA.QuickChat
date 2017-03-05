var ChatWindow = React.createClass({
    
    getInitialState: function () {
        return {
            UserId: this.props.userId,
            UserName: this.props.username,
            SendMessage: this.props.sendmessage,
            ChatHub: this.props.chathub,
            Messages: [],
            CurrentUser: this.props.currentUser
        };
    },

    pushNewMessage: function (id, userId, userName, message, dateTime) {
        var msgs = this.state.Messages;
        msgs.push({
            Id: id,
            UserId: userId,
            UserName: userName,
            Message: message,
            DateTime: dateTime
        });
        this.setState({
            Messages: msgs
        });
    },

    componentWillMount: function () {
        this.state.ChatHub.client.pushNewMessage = this.pushNewMessage;
        if ($.connection.hub && $.connection.hub.state === $.signalR.connectionState.disconnected) {
            $.connection.hub.qs = { "currentUserId": this.state.CurrentUser };
            $.connection.hub.start();
        }
    },

    createGuid: function ()  
    {  
       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
           var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
           return v.toString(16);  
       });  
    },

    sendMessage: function () {
        var $messageInput = $(ReactDOM.findDOMNode(this)).find('input[data-message]');
        var message = $messageInput.val();
        var messageObj = {
            Id: this.createGuid(),
            ReceiverId: this.state.UserId,
            UserId: this.state.CurrentUser,
            UserName: this.state.UserName,
            Message: message,
            DateTime: new Date()
        };
        $.ajax({
            method: 'POST',
            url: './Chat/PostChat',
            data: JSON.stringify(messageObj),
            dataType: "json",
            contentType: "application/json; charset=utf-8"
        });
        $messageInput.val('');
    },            

	componentDidUpdate: function () {
		var $messageInput = $(ReactDOM.findDOMNode(this)).find('div[data-messages]');
		if($messageInput.length) {			
			$messageInput[0].scrollTop = $messageInput[0].scrollHeight;
		}		
	},

    render: function () {
        var items = [];
        var i = 0;
        var userId;    
        if (this.state.Messages.length) {
            for (; i < this.state.Messages.length; i++) {
                userId = this.state.Messages[i].UserId;
                items.push(<ChatItem 
                                username={this.state.Messages[i].UserName}
                                datetime={this.state.Messages[i].DateTime} 
                                source={(userId === this.state.CurrentUser) ? 'client' : 'server'} 
                                text={this.state.Messages[i].Message} key={i} 
                            />);
            }
        }
                
        return ( <div id={this.props.userid} style={{display: 'block'}}>
					<div style={{overflow:'hidden'}}> 
						<div data-messages className={'messagesDiv'}>{items}</div>
                        <div style={{ display: 'block', width: '84%' } }><input type='text' style={{width: 'inherit'}} data-message /> &nbsp; <a onClick={this.sendMessage} href='#'>Отправить</a></div> 
					</div>
                </div>
            );
    }

});