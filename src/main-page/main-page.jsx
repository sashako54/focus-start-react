import React, { Component } from 'react';
import Users from '../users/users';

class MainPage extends Component {
    render() {
        return (
            <div className='mainpage-wrapper cover'>
                <Users />
            </div>
        );
    }
}

export default MainPage;
