import React, { Component } from 'react';
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

    openChatByUserId = event => {
        const { openChatByUserId } = this.props;
        openChatByUserId(event);
    };

    render() {
        const { users } = this.state;
        return (
            <div className='sidebar'>
                <h3 className='sidebar-title'>Users</h3>
                <ul className='sidebar-list'>
                    {users.map(user => (
                        <UserName
                            key={user.id}
                            openChatByUserId={this.openChatByUserId}
                            user={user}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Users;
