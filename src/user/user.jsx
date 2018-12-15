import React, { Component } from 'react';

class User extends Component {
    render() {
        const { user } = this.props;
        return <div className='user-wrapper'>{user.name}</div>;
    }
}

export default User;
