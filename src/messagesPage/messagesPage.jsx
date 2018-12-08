import React, { Component } from 'react';
import Messages from '../messages/messages';
import { MessageInput, MessageSendButton } from '../messageInput/messageInput';

class MessagesPage extends Component {
    render() {
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
}

export default MessagesPage;
