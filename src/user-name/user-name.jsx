import React, { Component } from 'react';

class UserName extends Component {
    render() {
        const { user } = this.props;
        return (
            <div data-userId={user.id} className='sidebar-item'>
                {user.name}
            </div>
        );
    }
}

export default UserName;
