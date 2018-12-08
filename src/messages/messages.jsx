import React, { Component } from 'react';
import Message from '../message/message';
import PropTypes from 'prop-types';

class Messages extends Component {
    state = {
        messages: [
            {
                id: '1',
                text: 'Привет, 100 лет не переписывались',
                isMyMessage: true
            },
            { id: '2', text: 'ага, как дела?', isMyMessage: false },
            {
                id: '3',
                text: 'Отлично, когда деньги вернешь?',
                isMyMessage: true
            },
            { id: '4', text: 'у меня тоже', isMyMessage: false },
            { id: '5', text: 'не игнорируй меня!', isMyMessage: true },
            {
                id: '6',
                text: 'я тебе перевел на телефон, пришли?',
                isMyMessage: false
            },
            { id: '7', text: 'НЕТ!', isMyMessage: true }
        ]
    };
    toggleMessage = event => {
        const { id } = event.currentTarget.dataset;
        // const id = event.currentTarget.dataset.id то же самое
        console.log(`update message-${id}`);

        this.setState(state => ({
            messages: state.messages.map(data => {
                if (data.id === id) {
                    return { ...data, isMyMessage: !data.isMyMessage };
                }
                return data;
            })
        }));
    };

    render() {
        const { messages } = this.state;

        return (
            <div className="messages cover">
                {messages.map(message => (
                    <Message
                        message={message}
                        key={message.id}
                        toggleMessage={this.toggleMessage}
                    />
                ))}
            </div>
        );
    }
}

Messages.propTypes = {
    // data: PropTypes.object.isRequired
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool
    }).isRequired,
    toggleMessage: PropTypes.func
};

export default Messages;
