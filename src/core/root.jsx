import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Messages from '../messages/messages';
import Users from '../users/users';
import AddUser from '../add-user/add-user';

function Root() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <div className='header'>
                    <div className='nav-wrapper cover'>
                        <Link className='nav-wrapper__link' to='/'>
                            Главная
                        </Link>
                        <Link className='nav-wrapper__link' to='/chat'>
                            Чат
                        </Link>
                    </div>
                </div>
                <div className='mainpage-wrapper cover'>
                    <Route path='/' component={Users} />
                    <Route path='/' component={AddUser} />
                    <Route exact path='/chat' component={Messages} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default Root;
