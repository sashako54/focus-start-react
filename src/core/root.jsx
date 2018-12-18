import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AddUser from '../add-user/add-user';
import MainPage from '../main-page/main-page';

function Root() {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <div className='header'>
                    <div className='nav-wrapper cover'>
                        <Link className='nav-wrapper__link' to='/'>
                            Главная
                        </Link>
                    </div>
                </div>
                <Route exact path='/' component={AddUser} />
                <Route path='/users' component={MainPage} />
            </div>
        </BrowserRouter>
    );
}

export default Root;
