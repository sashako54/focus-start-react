import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class AddUser extends Component {
    userNameRef = createRef();

    static propTypes = {
        addUser: PropTypes.func.isRequired
    };

    onSubmit = event => {
        const { addUser } = this.props;
        event.preventDefault();
        if (this.userNameRef.current.value === '') {
            return;
        }
        addUser(this.userNameRef.current.value);
        this.userNameRef.current.value = '';
    };

    render() {
        return (
            <form className='add-user' onSubmit={this.onSubmit}>
                <input
                    className='add-user__field'
                    type='text'
                    name='text'
                    ref={this.userNameRef}
                />
                <input className='add-user__button' type='submit' value='' />
            </form>
        );
    }
}

export default AddUser;
