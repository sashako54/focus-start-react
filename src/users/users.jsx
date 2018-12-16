import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserName from '../user-name/user-name';
import createRequest from '../core/create-request';
import { fetchUsers } from '../core/api-config';
import getCookie from '../core/getCookie';

class Users extends Component {
    state = {
        id: getCookie('id'),
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
            <div className='sidebar'>
                <h3 className='sidebar-title'>Users</h3>
                {users.map(user => (
                    <Link key={user.id} to='/users/chat'>
                        <UserName user={user} />
                    </Link>
                ))}
            </div>
        );
    }
}

export default Users;
