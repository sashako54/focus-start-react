import React, { Component } from 'react';

class UserName extends Component {
    openChatByUserId = event => {
        const { openChatByUserId } = this.props;
        openChatByUserId(event);
    };

    render() {
        const { user } = this.props;
        return (
            <li
                className='sidebar-item'
                data-userid={user.id}
                onClick={this.openChatByUserId}
            >
                {user.name}
            </li>
        );
    }
}

export default UserName;
