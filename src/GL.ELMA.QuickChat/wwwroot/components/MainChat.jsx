var MainChat = React.createClass({
            
    getInitialState : function () {
        return {
            ChatHub: $.connection.MainHub
        };
    },

    componentWillMount: function () {

    },

    render: function () {
        return (<div>
                       <ChatUsers chathub={this.state.ChatHub} />
                       <div id="ChatWindowContainer"></div>
                   </div>);
    }
        
});