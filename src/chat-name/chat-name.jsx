import React, { Component } from 'react';
import classNames from '../core/class-names/class-names';

class ChatName extends Component {
    openChat = event => {
        const { openChat } = this.props;
        openChat(event);
    };

    render() {
        const { chat, chatId, numNewMessages } = this.props;
        console.log('render chat-name', 'numNewMessages', numNewMessages);
        console.log('chatId', chat.chatId);
        console.log('numNewMessages[chatId]', numNewMessages[chat.chatId]);
        return (
            <li
                className={classNames('sidebar-item', {
                    active: chatId === chat.chatId
                })}
                data-chatid={chat.chatId}
                onClick={this.openChat}
            >
                {chat.users.join(', ')}
                {numNewMessages[chat.chatId] ? (
                    <div className='sidebar-item__num-new-messages'>
                        {numNewMessages[chat.chatId]}
                    </div>
                ) : (
                    ''
                )}
            </li>
        );
    }
}

export default ChatName;
