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

    openChatByUserId = event => {
        const { userid } = event.currentTarget.dataset;
        console.log('userId', userid);
        createRequest(fetchChatByUserId, { userId: userid })
            .then(({ status, data }) => {
                // TODO: если data - undefined, нужно добавить запрос, на то, чтоб сделать новый чат
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
                this.props.history.push('/users/chat');
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
                    <Route path='/users' component={Chats} />
                </div>
                <Route
                    exact
                    path='/users/chat'
                    render={() => <Messages chatId={chatId} />}
                />
            </div>
        );
    }
}

export default MainPage;
