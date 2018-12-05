import React from 'react';
import Message from '../message/message';
import PropTypes from 'prop-types';

const messages = [
    { id: '1', text: 'Привет', isCompleted: true },
    { id: '2', text: 'как дела?', isCompleted: true },
    { id: '3', text: 'Отлично', isCompleted: true },
    { id: '4', text: 'у меня тоже', isCompleted: false },
    { id: '5', text: 'хорошо', isCompleted: false },
    { id: '6', text: 'давай', isCompleted: false },
    { id: '7', text: 'пока', isCompleted: false }
];

function Messages() {
    return (
        <div className="messages">
            {messages.map(data => (
                <Message data={data} key={data.id} />
            ))}
        </div>
    );
}

Messages.propTypes = {
    // data: PropTypes.object.isRequired
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool
    }).isRequired
};

export default Messages;
