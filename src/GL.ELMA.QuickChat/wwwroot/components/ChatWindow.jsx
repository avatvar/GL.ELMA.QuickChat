﻿var ChatWindow = React.createClass({
    
    getInitialState: function () {
        return {
            UserId: this.props.userid,
            UserName: this.props.username,
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
        var $messageInput = document.getElementById('message-to-send');
        var message = $messageInput.value;
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
        $messageInput.value = '';
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
                if (userId === this.state.CurrentUser) {
                    items.push(<ChatItemToOther 
                                username={this.state.Messages[i].UserName}
                                datetime={this.state.Messages[i].DateTime}  
                                text={this.state.Messages[i].Message} key={i} 
                            />);
                } else {
                    items.push(<ChatItemToMe
                                username={this.state.Messages[i].UserName}
                                datetime={this.state.Messages[i].DateTime}  
                                text={this.state.Messages[i].Message} key={i} 
                            />);
                }
                
            }
        }
                
        return (<div className={'chat-userContainer'} id={this.props.userid}>
                    <div className={"chat-header clearfix"}>
                        <img src={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"} alt={"avatar"}/>   
                        <div className={"chat-about"}>
                          <div className={"chat-with"}>Chat with {this.state.UserName}</div>
                          <div className={"chat-num-messages"}>already 1 902 messages</div>
                        </div>
                        <i className={"fa fa-star"}></i>
                      </div>
                      <div className={"chat-history"}>
                          <ul> {items} </ul>
                      </div>
                      <div className={"chat-message clearfix"}>
                        <textarea name={"message-to-send"} id={"message-to-send"} placeholder={"Type your message"} rows={"3"}></textarea>
                
                        <i className={"fa fa-file-o"}></i> &nbsp;&nbsp;&nbsp;
                        <i className={"fa fa-file-image-o"}></i>
        
                        <button onClick={this.sendMessage}>Send</button>

                      </div>
                  </div>
            );
    }

});