var MainChat = React.createClass({
            
    getInitialState : function () {
        return {
            ChatHub: $.connection.MainHub
        };
    },

    componentWillMount: function () {

    },

    render: function () {
        return (<div> <ChatUsers chathub={this.state.ChatHub} />
                       <div className={'chat'} id="ChatWindowContainer"></div>
                    </div>);
    }
        
});