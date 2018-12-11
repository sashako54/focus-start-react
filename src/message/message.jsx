import React, { PureComponent } from 'react';

class Message extends PureComponent {
    // shouldComponentUpdate(nextProps) {
    //     const { isMyMessage } = this.props.message;

    //     return nextProps.message.isMyMessage !== isMyMessage;
    // }

    render() {
        const { message, highlightMessage } = this.props;

        console.log(`render message-${message.id}`);
        console.log('message.isHighlight', message.isHighlight);
        return (
            <div
                className={`message-wrapper ${
                    message.isHighlight['4469047b78ce']
                        ? 'message-wrapper_my'
                        : ''
                }`}
                onClick={highlightMessage}
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
