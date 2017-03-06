var ChatItem = React.createClass({
    
    render: function () {
        var messageDataStyle = (this.props.source === 'client') ? 'message-data align-right' : 'message-data';
        var messageStyle = (this.props.source === 'client') ? 'message other-message float-right' : 'message my-message';
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
                        <span className={"message-data-time"}>this.props.datetime</span> &nbsp; &nbsp;
                        <span className={"message-data-name"}>this.props.username</span> <i className={"fa fa-circle me"}></i>

                    </div>
                    <div className={messageStyle}>
                        this.props.text
                    </div>
                </li>);
    }

});