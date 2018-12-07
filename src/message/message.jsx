import React from 'react';

function Message({ data }) {
    return (
        <div
            className={`message-wrapper ${
                data.isMyMessage ? 'message-wrapper_my' : ''
            }`}
        >
            <p className={`message ${data.isMyMessage ? 'message_my' : ''}`}>
                {data.text}
            </p>
        </div>
    );
}

export default Message;
