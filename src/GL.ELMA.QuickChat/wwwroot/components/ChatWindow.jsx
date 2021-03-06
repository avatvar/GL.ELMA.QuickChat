﻿var ChatWindow = React.createClass({
    
    getInitialState: function () {
        return {
            UserId: this.props.userid,
            UserName: this.props.username,
            ChatHub: this.props.chathub,
            Messages: [],
            CurrentUserId: this.props.currentUser,
            CurrentUserName: this.props.currentUserName
        };
    },

    pushNewMessage: function (id, authorId, authorName, message, dateTime) {
        var messages = this.state.Messages;
        messages.push({
            Id: id,
            AuthorId: authorId,
            AuthorName: authorName,
            Message: message,
            DateTime: dateTime
        });
        this.setState({
            Messages: messages
        });
    },

    componentWillMount: function () {
        this.state.ChatHub.client.pushNewMessage = this.pushNewMessage;
        $.connection.hub.start();
    },

    componentWillUpdate: function() {
        $.connection.hub.start();
    },

    onPressEnter: function (e) {
        var code = e.keyCode || e.which;
        if (code === 13) {
            this.sendMessage();
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
        var messageInput = document.getElementById('message-to-send' + this.state.UserId);
        var message = messageInput.value;
        if (message !== "") {
            var messageObj = {
                Id: this.createGuid(),
                ReceiverId: this.state.UserId,
                ReceiverName: this.state.UserName,
                AuthorId: this.state.CurrentUserId,
                AuthorName: this.state.CurrentUserName,
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
            var elem = $('#message-to-send' + this.state.UserId);
            elem.blur();
            elem.val("");
            setTimeout(function () {
                elem.focus();
            }, 0);
        }
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
                userId = this.state.Messages[i].AuthorId;
                var date = dateFormat(new Date(this.state.Messages[i].DateTime), 'h:MM:ss TT, mmmm dS');
                if (userId !== this.state.CurrentUserId) {
                    items.push(<ChatItemToMe 
                                username={this.state.Messages[i].AuthorName}
                                datetime={date}  
                                text={this.state.Messages[i].Message} key={i} 
                            />);
                } else {
                    items.push(<ChatItemToOther
                                datetime={date}  
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
                      <div ref={'chatHistory'} className={"chat-history"}>
                          <ul> {items} </ul>
                      </div>
                      <div className={"chat-message clearfix"}>
                        <textarea onKeyPress={this.onPressEnter} name={"message-to-send"} id={"message-to-send" + this.state.UserId} placeholder={"Type your message"} rows={"3"}></textarea>
                
                        <i className={"fa fa-file-o"}></i> &nbsp;&nbsp;&nbsp;
                        <i className={"fa fa-file-image-o"}></i>
        
                        <button onClick={this.sendMessage}>Send</button>

                      </div>
                  </div>
            );
    }

});