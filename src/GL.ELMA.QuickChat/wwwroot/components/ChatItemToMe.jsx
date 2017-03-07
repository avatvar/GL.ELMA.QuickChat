var ChatItemToMe = React.createClass({
    
    render: function () {
        var messageDate = this.props.datetime;
        var messageAuthor = this.props.username;

        return (<li>
                    <div className={'message-data'}>
                        <span className={'message-data-name' }><i className={'fa fa-circle online'}></i>{messageAuthor}</span> &nbsp; &nbsp;
                        <span className={'message-data-time' }>{messageDate}</span> 

                    </div>
                    <div className={'message my-message'}>
                        {this.props.text}
                    </div>
                </li>);
    }

});