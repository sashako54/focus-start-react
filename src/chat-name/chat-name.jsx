import React, { Component } from 'react';
import classNames from '../core/class-names/class-names';

class ChatName extends Component {
    openChat = event => {
        const { openChat } = this.props;
        openChat(event);
    };

    render() {
        const { chat, chatId } = this.props;
        return (
            <div
                className={classNames('sidebar-item', {
                    active: chatId === chat.chatId
                })}
                data-chatid={chat.chatId}
                onClick={this.openChat}
            >
                {chat.users.join(', ')}
            </div>
        );
    }
}

export default ChatName;
