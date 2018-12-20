import React, { Component } from 'react';
import ChatName from '../chat-name/chat-name';
import createRequest from '../core/create-request';
import { fetchChats } from '../core/api-config';
import getCookie from '../core/getCookie';

class Chats extends Component {
    state = {
        id: getCookie('id'),
        myName: getCookie('name'),
        isLoading: true,
        chats: []
    };

    componentDidMount() {
        createRequest(fetchChats).then(({ status, data }) => {
            if (status === 'OK') {
                this.setState({
                    isLoading: false,
                    chats: data
                });
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { newChatId, newUserName } = this.props;
        const { myName } = this.state;

        if (prevProps.newChatId !== newChatId) {
            const newChat = {};
            newChat.chatId = newChatId;
            newChat.users = [newUserName, myName];
            this.setState(({ chats }) => ({
                chats: chats.concat(newChat)
            }));
        }
    }

    openChat = event => {
        const { openChat } = this.props;
        openChat(event);
    };

    render() {
        const { chats } = this.state;
        const { chatId, numNewMessages } = this.props;
        console.log('render chats', 'numNewMessages', numNewMessages);
        return (
            <div className='sidebar'>
                <h3 className='sidebar-title'>Chats</h3>
                <ul className='sidebar-list'>
                    {chats.map(chat => (
                        <ChatName
                            numNewMessages={numNewMessages}
                            openChat={this.openChat}
                            key={chat.chatId}
                            chatId={chatId}
                            chat={chat}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Chats;
