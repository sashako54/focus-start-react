import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Messages from '../messages/messages';
import Authorization from '../authorization/authorization';

function Root() {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Link to="/">messagesPage</Link>
                <Link to="/authorization">authorization</Link>
                <Route exact path="/" component={Messages} />
                <Route path="/authorization" component={Authorization} />
            </div>
        </BrowserRouter>
    );
}

export default Root;
