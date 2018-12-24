import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                data-username={user.name}
                onClick={this.openChatByUserId}
            >
                {user.name}
            </li>
        );
    }
}

UserName.propTypes = {
    openChatByUserId: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    }).isRequired
};

export default UserName;
