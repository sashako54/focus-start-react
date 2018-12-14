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
                className='delete-messages__button'
                type='submit'
                value=''
                onClick={this.onClick}
            />
        );
    }
}

export default DeleteMessages;
