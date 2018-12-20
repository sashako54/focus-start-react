import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { fetchAllUsers, createUsers } from '../core/api-config';
import getCookie from '../core/getCookie';
import createRequest from '../core/create-request';

class AddUser extends Component {
    state = {
        id: getCookie('id'),
        users: []
    };

    userNameRef = createRef();

    componentDidMount() {
        const { id } = this.state;
        createRequest(fetchAllUsers).then(({ status, data }) => {
            if (status === 'OK') {
                this.setState({
                    users: data
                });
                const { users } = this.state;
                const condition = users.some(user => {
                    if (user.id === id) {
                        return true;
                    }
                });
                if (condition) {
                    this.props.history.push('/users');
                }
            }
        });
    }

    componentDidUpdate() {
        const { users, id } = this.state;
        const condition = users.some(user => {
            if (user.id === id) {
                return true;
            }
        });
        if (condition) {
            this.props.history.push('/users');
            console.log('props', this.props);
        }
    }

    onSubmit = event => {
        event.preventDefault();
        if (this.userNameRef.current.value === '') {
            return;
        }
        const name = this.userNameRef.current.value;
        createRequest(createUsers, null, { name }).then(({ status, data }) => {
            if (status === 'OK') {
                this.setState(({ users }) => ({
                    users: users.concat(data),
                    id: data.id
                }));
            }
        });
        this.userNameRef.current.value = '';
    };

    render() {
        return (
            <div className='add-user-body cover'>
                <div className='add-user-wrapper'>
                    <h3 className='add-user-title'>Введите имя</h3>
                    <form className='add-user' onSubmit={this.onSubmit}>
                        <input
                            className='add-user__field'
                            type='text'
                            name='text'
                            ref={this.userNameRef}
                            autoComplete='off'
                        />
                        <input
                            className='add-user__button'
                            type='submit'
                            value=''
                        />
                    </form>
                </div>
            </div>
        );
    }
}

AddUser.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired
};

export default AddUser;
