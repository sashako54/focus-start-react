import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatName from '../chat-name/chat-name';
import createRequest from '../core/create-request';
import { fetchChats } from '../core/api-config';
import getCookie from '../core/getCookie';

class Chats extends Component {
    state = {
        myName: getCookie('name'),
        chats: []
    };

    componentDidMount() {
        createRequest(fetchChats).then(({ status, data }) => {
            if (status === 'OK') {
                this.setState({
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

Chats.propTypes = {
    chatId: PropTypes.string.isRequired,
    numNewMessages: PropTypes.shape({
        message: PropTypes.string
    }).isRequired,
    openChat: PropTypes.func.isRequired,
    newChatId: PropTypes.string.isRequired,
    newUserName: PropTypes.string.isRequired
};

export default Chats;
