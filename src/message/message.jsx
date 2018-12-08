import React, { PureComponent } from 'react';

class Message extends PureComponent {
    // shouldComponentUpdate(nextProps) {
    //     const { isMyMessage } = this.props.message;

    //     return nextProps.message.isMyMessage !== isMyMessage;
    // }

    render() {
        const { message, toggleMessage } = this.props;

        console.log(`render message-${message.id}`);
        return (
            <div
                className={`message-wrapper ${
                    message.isMyMessage ? 'message-wrapper_my' : ''
                }`}
                onClick={toggleMessage}
                data-id={message.id}
            >
                <p
                    className={`message ${
                        message.isMyMessage ? 'message_my' : ''
                    }`}
                >
                    {message.text}
                </p>
            </div>
        );
    }
}

export default Message;
