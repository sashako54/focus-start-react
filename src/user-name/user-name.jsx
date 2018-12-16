import React, { Component } from 'react';

class UserName extends Component {
    render() {
        const { user } = this.props;
        return <div className='sidebar-item'>{user.name}</div>;
    }
}

export default UserName;
