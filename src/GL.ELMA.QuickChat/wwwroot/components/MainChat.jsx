var MainChat = React.createClass({
            
    getInitialState : function () {
        return {
            ChatHub: $.connection.MainHub
        };
    },

    componentWillMount: function () {

    },

    render: function () {
        return (<ChatUsers chathub={this.state.ChatHub} />);
    }
        
});