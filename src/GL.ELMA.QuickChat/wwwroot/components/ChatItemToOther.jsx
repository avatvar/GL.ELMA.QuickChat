var ChatItemToOther = React.createClass({
    
    render: function () {
        var messageDate = this.props.datetime;
        var messageAuthor = this.props.username;

        return (<li className={'clearfix'}>
                    <div className={'message-data align-right'}>
                        <span className={'message-data-time' }>{messageDate}</span> &nbsp; &nbsp;
                        <span className={'message-data-name' }>{messageAuthor}</span> <i className={'fa fa-circle me'}></i>
                    </div>
                    <div className={'message other-message float-right'}>
                        {this.props.text}
                    </div>
                </li>);
    }

});