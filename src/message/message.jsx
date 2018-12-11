import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Message extends PureComponent {
    // shouldComponentUpdate(nextProps) {
    //     const { isMyMessage } = this.props.message;

    //     return nextProps.message.isMyMessage !== isMyMessage;
    // }

    static propTypes = {
        highlightMessage: PropTypes.func.isRequired
    };

    highlightMessage = event => {
        const { highlightMessage } = this.props;
        highlightMessage(event);
    };

    render() {
        const { message } = this.props;

        console.log(`render message-${message.id}`);
        console.log('message.isHighlight', message.isHighlight);
        console.log(
            'message.isHighlight chat',
            message.isHighlight['4469047b78ce']
        );
        return (
            <div
                className={`message-wrapper ${
                    message.isHighlight['4469047b78ce']
                        ? 'message-wrapper_my'
                        : ''
                }`}
                onClick={this.highlightMessage}
                data-id={message.id}
            >
                <p
                    className={`message ${
                        message.isHighlight ? 'message_my' : ''
                    }`}
                >
                    {message.text}
                </p>
            </div>
        );
    }
}

export default Message;
