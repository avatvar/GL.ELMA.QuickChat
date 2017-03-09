import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ChatUsers from 'ChatUsers'
import * as UserActions from '../actions/UserActions'

class MainChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ChatHub: $.connection.MainHub,
            Users
        };
    }

    componentDidMount(){
        const { getUsers } = this.props.UserActions;
        getUsers();
        this.setState({ 
            kind: data.kind, 
            data: data.data.children
        });
    }

    render() {
        const { loading, users, errors } = this.props;

        if (loading) { return (<div>Loading</div>) }
        if (errors != null) { return (<div>Error!</div>) }
        return (<ChatUsers users={users} chathub={this.state.ChatHub} />);
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainChat)