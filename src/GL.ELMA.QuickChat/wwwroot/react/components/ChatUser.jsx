import { Component } from 'react'
import { render } from 'react-dom'
import ChatWindow from './ChatWindow'

class ChatUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: this.props.userId,
            UserName: this.props.username,
            ChatHub: this.props.chathub,
            CurrentUser: this.props.currentUser,
            CurrentUserName: this.props.currentUserName
        };
    }

    componentDidMount() {
       
    }

    addMessageWindow() {
        var chatWindow = document.getElementById(this.props.userId);
        if (chatWindow == null) {
            var windowContainer = document.getElementById('chatWindowDiv');
            render(<ChatWindow username={this.props.username}
                                        userid={this.props.userId}
                                        chathub={this.props.chathub}
                                        currentUser={this.props.currentUser}
                                        currentUserName={this.props.currentUserName}/>,
                windowContainer);
        } else {
            if ($(chatWindow).css('display') === 'none') {
                $(chatWindow).css('display', 'block');
            } else {
                $(chatWindow).css('display', 'none');
            }
        }
    }

    render() {
        return (<li key={$.guid++} className={'clearfix'}>
                    <div onClick={::this.addMessageWindow} id={'userSelector' + this.state.UserId}>
                        <img src={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"} alt={'avatar'} />
                        <div className={"about"}>
                            <div className={"name"}>{this.state.UserName}</div>
                            <div className={"status"}><i className={"fa fa-circle online"}></i> 
                                online
                            </div>
                        </div>
                    </div>
                </li>);
    }
}

export default ChatUser
