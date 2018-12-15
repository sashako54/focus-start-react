import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Messages from '../messages/messages';
import User from '../user/user';
import createRequest from '../core/create-request';
import { fetchUsers } from '../core/api-config';

class Users extends Component {
    state = {
        id: document.cookie.split('=')[1],
        isLoading: true,
        users: []
    };

    componentDidMount() {
        createRequest(fetchUsers).then(({ status, data }) => {
            if (status === 'OK') {
                this.setState({
                    isLoading: false,
                    users: data
                });
            }
        });
    }
    render() {
        const { users } = this.state;
        return (
            // <BrowserRouter>
            <div className='users-wrapper'>
                <h3 className='users-title'>Users</h3>
                {users.map(user => (
                    <Link to='/chat'>
                        <User user={user} key={user.id} />
                    </Link>
                ))}
            </div>
            // </BrowserRouter>
        );
    }
}

export default Users;
