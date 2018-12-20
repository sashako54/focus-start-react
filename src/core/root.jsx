import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AddUser from '../add-user/add-user';
import MainPage from '../main-page/main-page';
import getCookie from './getCookie';

class Root extends Component {
    state = {
        userName: getCookie('name')
    };

    render() {
        const { userName } = this.state;
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <div className='header'>
                        <div className='nav-wrapper cover'>
                            <Link className='nav-wrapper__link' to='/'>
                                Главная
                            </Link>
                            {userName ? (
                                <div className='nav-wrapper__name'>{`Ваш ник: ${userName}`}</div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <Route exact path='/' component={AddUser} />
                    <Route path='/users' component={MainPage} />
                </div>
            </BrowserRouter>
        );
    }
}

export default Root;
