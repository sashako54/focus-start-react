import React, { Component, createRef } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Messages from '../messages/messages';
import Users from '../users/users';
import Chats from '../chats/chats';
// import PropTypes from 'prop-types';
// import createRequest from '../core/create-request';
// import {} from '../core/api-config';
// import classNames from '../core/class-names/class-names';
// import getCookie from '../core/getCookie';

class MainPage extends Component {
    state = {
        // id: getCookie('id'),
        chatId: 'f1f87db0abd2f'
    };

    render() {
        const { chatId } = this.state;
        return (
            <div className='mainpage-wrapper cover'>
                <div className='sidebar-wrapper'>
                    <Route path='/users' component={Users} />
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
