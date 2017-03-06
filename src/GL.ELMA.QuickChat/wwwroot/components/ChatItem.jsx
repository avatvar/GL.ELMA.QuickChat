var ChatItem = React.createClass({
    
    render: function () {
        var messageDataStyle = (this.props.source === 'client') ? 'message-data align-right' : 'message-data';
        var messageStyle = (this.props.source === 'client') ? 'message other-message float-right' : 'message my-message';
        var data = (this.props.source === 'client') ? this.props.datetime : this.props.username;
        var userName = (this.props.source === 'client') ? this.props.username : this.props.datetime;
        var circle = (this.props.source === 'client') ? 'fa fa-circle me' : 'fa fa-circle online';
        var messageDataTime = (this.props.source === 'client') ? 'message-data-time' : 'message-data-name';
        var messageDataName = (this.props.source === 'client') ? 'message-data-name' : 'message-data-time';
        var liClassName = '';
        if (this.props.liIndex === 0) {
            liClassName = 'clearfix';
        } else if (this.props.liIndex % 2 === 0) {
            liClassName = '';
        } else {
            liClassName = 'clearfix';
        }

        return (<li className={liClassName}>
                    <div className={messageDataStyle}>
                        <span className={messageDataTime}>{data}</span> &nbsp; &nbsp;
                        <span className={messageDataName}>{userName}</span> <i className={circle}></i>

                    </div>
                    <div className={messageStyle}>
                        {this.props.text}
                    </div>
                </li>);
    }

});