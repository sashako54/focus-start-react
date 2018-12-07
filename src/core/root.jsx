import React from 'react';
import Messages from '../messages/messages';
import { MessageInput, MessageSendButton } from '../messageInput/messageInput';

function Root() {
    return (
        <div className="messages-wrapper cover">
            <Messages />
            <div className="input-wrapper">
                <MessageInput />
                <MessageSendButton />
            </div>
        </div>
    );
}

export default Root;
