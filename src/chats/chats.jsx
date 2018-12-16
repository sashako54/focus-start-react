import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ChatName from '../chat-name/chat-name';
import createRequest from '../core/create-request';
import { fetchChats } from '../core/api-config';
import getCookie from '../core/getCookie';

class Chats extends Component {
    state = {
        id: getCookie('id'),
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
    render() {
        const { chats } = this.state;
        return (
            <div className='sidebar'>
                <h3 className='sidebar-title'>Chats</h3>
                {chats.map(chat => (
                    <Link key={chat.chatId} to='/users/chat'>
                        <ChatName chat={chat} />
                    </Link>
                ))}
            </div>
        );
    }
}

export default Chats;
