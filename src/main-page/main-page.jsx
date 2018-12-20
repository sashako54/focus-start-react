import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Messages from '../messages/messages';
import Users from '../users/users';
import Chats from '../chats/chats';
import createRequest from '../core/create-request';
import { fetchChatByUserId, createChatByUserId } from '../core/api-config';

class MainPage extends Component {
    state = {
        chatId: '',
        numNewMessages: {},
        newChatId: '',
        newUserName: ''
    };

    getNumNewMessages = numNewMessages => {
        this.setState(() => ({ numNewMessages }));
    };

    openChat = event => {
        const { chatid } = event.currentTarget.dataset;
        this.setState(() => ({ chatId: chatid }));
        this.props.history.push(`/users/chat/${chatid}`);
    };

    openChatByUserId = event => {
        const { userid, username } = event.currentTarget.dataset;
        createRequest(fetchChatByUserId, { userId: userid })
            .then(({ status, data }) => {
                if (status === 'OK' && data) {
                    this.setState(() => ({
                        chatId: data.chatId
                    }));
                } else {
                    createRequest(createChatByUserId, { userId: userid })
                        .then(({ status, data }) => {
                            if (status === 'OK') {
                                this.setState(() => ({
                                    chatId: data.chatId,
                                    newChatId: data.chatId,
                                    newUserName: username
                                }));
                            }
                        })
                        .then(() => {
                            this.props.history.push(
                                `/users/chat/${this.state.chatId}`
                            );
                        });
                }
            })
            .then(() => {
                this.props.history.push(`/users/chat/${this.state.chatId}`);
            });
    };

    render() {
        const { chatId, newChatId, newUserName, numNewMessages } = this.state;
        return (
            <div className='mainpage-wrapper cover'>
                <div className='sidebar-wrapper'>
                    <Route
                        path='/users'
                        render={() => (
                            <Users openChatByUserId={this.openChatByUserId} />
                        )}
                    />
                    <Route
                        path='/users'
                        render={() => (
                            <Chats
                                numNewMessages={numNewMessages}
                                openChat={this.openChat}
                                chatId={chatId}
                                newChatId={newChatId}
                                newUserName={newUserName}
                            />
                        )}
                    />
                </div>
                <Route
                    path='/users/chat/:chatId'
                    render={props => (
                        <Messages
                            {...props}
                            getNumNewMessages={this.getNumNewMessages}
                        />
                    )}
                />
            </div>
        );
    }
}

export default MainPage;
