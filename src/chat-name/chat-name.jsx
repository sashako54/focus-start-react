import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../core/class-names/class-names';

class ChatName extends Component {
    openChat = event => {
        const { openChat } = this.props;
        openChat(event);
    };

    render() {
        const { chat, chatId, numNewMessages } = this.props;
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

ChatName.propTypes = {
    chat: PropTypes.shape({
        chatId: PropTypes.string,
        users: PropTypes.array
    }).isRequired,
    openChat: PropTypes.func.isRequired,
    chatId: PropTypes.string.isRequired,
    numNewMessages: PropTypes.shape({
        message: PropTypes.string
    }).isRequired
};

export default ChatName;
