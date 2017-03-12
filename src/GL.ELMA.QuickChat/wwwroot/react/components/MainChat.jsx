import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ChatUsers from './ChatUsers'
import * as UserActions from '../actions/users'
import * as CurrentUserActions from '../actions/currentUser'

class MainChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ChatHub: $.connection.MainHub
        };
    }

    componentDidMount(){
        const { getUsers } = this.props.usersActions;
        const { getCurrentUser } = this.props.currentUserActions;
        getUsers();
        getCurrentUser();
    }

    render() {
        if (this.props.loading || this.props.currentUser == null || this.props.users == null) { return (<div className={"loader"}></div>) }
        if (this.props.errors != null) { return (<div>Error!</div>) }
        return (<div>
                    <ChatUsers users={this.props.users} chathub={this.state.ChatHub} currentUser={this.props.currentUser}/>
                    <div id={"chatWindowDiv"} className={'chat'}></div>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        users: state.users.users,
        currentUser: state.currentUser.currentUser,
        loading: state.currentUser.loading && state.users.loading,
        errors: state.currentUser.loading.errors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        usersActions: bindActionCreators(UserActions, dispatch),
        currentUserActions: bindActionCreators(CurrentUserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainChat)