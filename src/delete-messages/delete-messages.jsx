import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class DeleteMessages extends PureComponent {
    static propTypes = {
        deleteMessages: PropTypes.func.isRequired
    };

    onClick = () => {
        const { deleteMessages } = this.props;
        deleteMessages();
    };

    render() {
        return (
            <input
                className='add-message__button'
                value='удалить сообщения'
                onClick={this.onClick}
            />
        );
    }
}

export default DeleteMessages;
