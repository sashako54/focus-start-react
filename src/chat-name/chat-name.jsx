import React, { Component } from 'react';
import classNames from '../core/class-names/class-names';

class ChatName extends Component {
    render() {
        const { chat, chatId } = this.props;
        return (
            <div
                data-chatid={chat.chatId}
                className={classNames('sidebar-item', {
                    active: chatId === chat.chatId
                })}
            >
                {chat.users.join(', ')}
            </div>
        );
    }
}

export default ChatName;
