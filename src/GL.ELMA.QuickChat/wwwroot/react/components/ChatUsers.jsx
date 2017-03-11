import { Component } from 'react'
import ChatUser from './ChatUser'

class ChatUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ChatHub: this.props.chathub, 
            Users: this.props.users, 
            CurrentUserId: this.props.currentUser.Id, 
            CurrentUserName: this.props.currentUser.UserName 
        };
    }

    pushUserList(){

    }

    componentWillMount(){

    }

    componentDidUpdate(prevProps, prevState){
        var firstChatUserBtn = document.querySelectorAll('div[id^=userSelector]')[0];
        if (firstChatUserBtn != undefined) {
            firstChatUserBtn.click();
        }
    }

    componentDidMount(){

    }

    render(){
        var users = [];
        var i = 0;

        for (; i < this.props.users.length; i++) {
            var user = this.props.users[i];
            users.push(<ChatUser key={i}
                                 username={user.UserName}
                                 userId={user.UserId}
                                 currentUser={this.props.currentUser.Id}
                                 currentUserName={this.props.currentUser.UserName}
                                 chathub={this.props.chathub}/>);
        }
        
    return (<div className={'people-list'} id={'people-list'}>
                <div className={'search'}>
                    <input type={'text'} placeholder={'search'}/>
                      <i className={'fa fa-search'}></i>
                </div>
                <ul className={"list"}>
                      {users}
                </ul>
             </div> );
    }
}

export default ChatUsers