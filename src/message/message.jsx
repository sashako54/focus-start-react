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
        const { message, userId } = this.props;

        console.log(`render message-${message.id}`);
        console.log('message.isHighlight', message.isHighlight);
        console.log('message.isHighlight chat', message.isHighlight[userId]);
        return (
            <div
                className={`message-wrapper ${
                    message.isHighlight[userId]
                        ? 'message-wrapper_highlight'
                        : ''
                }`}
                onClick={this.highlightMessage}
                data-id={message.id}
            >
                <p
                    className={`message`}
                    // message.toggle ? 'message_my' : '' //TODO: добавить смещение влево, если сообщение моё
                >
                    {message.text}
                </p>
            </div>
        );
    }
}

export default Message;
