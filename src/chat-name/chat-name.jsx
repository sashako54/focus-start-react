import React, { Component } from 'react';

class ChatName extends Component {
    render() {
        const { chat } = this.props;
        return (
            <div data-chatId={chat.chatId} className='sidebar-item'>
                {chat.users.join(', ')}
            </div>
        );
    }
}

export default ChatName;
