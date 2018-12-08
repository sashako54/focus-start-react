import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import MessagesPage from '../messagesPage/messagesPage';
import Authorization from '../authorization/authorization';

function Root() {
    return (
        <BrowserRouter>
            <div>
                <Link to="/">messagesPage</Link>
                <Link to="/authorization">authorization</Link>
                <Route exact path="/" component={MessagesPage} />
                <Route path="/authorization" component={Authorization} />
            </div>
        </BrowserRouter>
    );
}

export default Root;
