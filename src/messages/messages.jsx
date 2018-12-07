import React from 'react';
import Message from '../message/message';
import PropTypes from 'prop-types';

const messages = [
    { id: '7', text: 'НЕТ!', isMyMessage: true },
    { id: '6', text: 'я тебе перевел на телефон, пришли?', isMyMessage: false },
    { id: '5', text: 'не игнорируй меня!', isMyMessage: true },
    { id: '4', text: 'у меня тоже', isMyMessage: false },
    { id: '3', text: 'Отлично, когда деньги вернешь?', isMyMessage: true },
    { id: '2', text: 'ага, как дела?', isMyMessage: false },
    { id: '1', text: 'Привет, 100 лет не переписывались', isMyMessage: true }
];

function Messages() {
    return (
        <div className="messages cover">
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
