import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Messages from '../messages/messages';
// import { MessageInput, MessageSendButton } from '../messageInput/messageInput';
import { Authorization } from '../authorization/authorization';

function Root() {
    return (
        <BrowserRouter>
            <div className="messages-wrapper cover">
                <Link to="/">messages</Link>
                <Link to="/authorization">authorization</Link>
                <Route exact path="/" component={Messages} />
                <Route path="/authorization" component={Authorization} />
            </div>
            {/* <div className="input-wrapper">
                    <MessageInput />
                    <MessageSendButton />
                </div> */}
        </BrowserRouter>
    );
}

export default Root;
