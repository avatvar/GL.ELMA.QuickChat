import { Component } from 'react'

class ChatItemToOther extends Component {
    render() {
            var messageDate = this.props.datetime;

            return (<li className={'clearfix'}>
                        <div className={'message-data align-right'}>
                            <span className={'message-data-time' }>{messageDate}</span> &nbsp; &nbsp;
                            <span className={'message-data-name' }></span> <i className = {'fa fa-circle me'}></i>
                        </div>
                        <div className={'message other-message float-right'}>
                        {this.props.text}
                        </div>
                    </li>);
            }
}
export default ChatItemToOther
