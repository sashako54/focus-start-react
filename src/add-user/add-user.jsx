import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { fetchAllUsers, createUsers } from '../core/api-config';
import getCookie from '../core/getCookie';
import createRequest from '../core/create-request';

class AddUser extends Component {
    state = {
        id: getCookie('id'),
        isLoading: true,
        users: []
    };

    userNameRef = createRef();

    static propTypes = {
        addUser: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { id } = this.state;
        createRequest(fetchAllUsers).then(({ status, data }) => {
            if (status === 'OK') {
                this.setState({
                    isLoading: false,
                    users: data
                });
                const { users } = this.state;
                console.log('users', users);
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
        console.log('users update', users);

        console.log('id update', id);
        const condition = users.some(user => {
            if (user.id === id) {
                return true;
            }
        });
        if (condition) {
            this.props.history.push('/users');
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
                    isLoading: false,
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

export default AddUser;
