import React, { Component, createRef } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Messages from '../messages/messages';
import Users from '../users/users';
import Chats from '../chats/chats';
// import PropTypes from 'prop-types';
import createRequest from '../core/create-request';
import { fetchChatByUserId, createChatByUserId } from '../core/api-config';
// import classNames from '../core/class-names/class-names';
// import getCookie from '../core/getCookie';

class MainPage extends Component {
    state = {
        // id: getCookie('id'),
        chatId: ''
    };

    openChat = event => {
        const { chatid } = event.currentTarget.dataset;
        this.setState(() => ({ chatId: chatid }));
        this.props.history.push(`/users/chat/${chatid}`);
    };

    openChatByUserId = event => {
        const { userid } = event.currentTarget.dataset;
        console.log('userId', userid);
        createRequest(fetchChatByUserId, { userId: userid })
            .then(({ status, data }) => {
                console.log('data', data);
                if (status === 'OK' && data) {
                    this.setState(() => ({
                        chatId: data.chatId
                    }));
                } else {
                    createRequest(createChatByUserId, { userId: userid }).then(
                        ({ status, data }) => {
                            console.log('createChatByUserId DATA', data);
                            if (status === 'OK') {
                                this.setState(() => ({
                                    chatId: data.chatId
                                }));
                            }
                        }
                    );
                }
            })
            .then(() => {
                this.props.history.push(`/users/chat/${this.state.chatId}`);
            });
    };

    render() {
        const { chatId } = this.state;
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
                            <Chats openChat={this.openChat} chatId={chatId} />
                        )}
                    />
                </div>
                <Route path='/users/chat/:chatId' component={Messages} />
            </div>
        );
    }
}

export default MainPage;
