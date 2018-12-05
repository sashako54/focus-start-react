import React from 'react';

function Message({ data }) {
    return (
        <div
            className={`message ${
                data.isCompleted ? 'message__completed' : ''
            }`}
        >
            {data.text}
        </div>
    );
}

export default Message;
