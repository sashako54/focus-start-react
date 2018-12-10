import React, { Component } from 'react';
import Message from '../message/message';
import PropTypes from 'prop-types';
import createRequest from '../core/create-request';
import {
    fetchMessagesFromChats,
    createMessagesFromChats
} from '../core/api-config';
import classNames from '../core/class-names/class-names';
import AddMessage from '../add-message/add-message';

class Messages extends Component {
    state = {
        isLoading: true,
        messages: []
    };
    componentDidMount() {
        createRequest(fetchMessagesFromChats).then(response => {
            if (response.status === 'OK') {
                this.setState({
                    isLoading: false,
                    messages: response.data
                });
            }
        });
    }

    addMessage = text => {
        this.setState({ isLoading: true });
        console.log('text', text);
        createRequest(createMessagesFromChats, null, { text }).then(
            ({ status, data }) => {
                if (status === 'OK') {
                    this.setState(({ messages }) => ({
                        isLoading: false,
                        messages: messages.concat(data)
                    }));
                }
            }
        );
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
        const { messages, isLoading } = this.state;

        return (
            // <div className="messages cover">
            <div className={classNames('messages', { loading: isLoading })}>
                {messages.map(message => (
                    <Message
                        message={message}
                        key={message.id}
                        toggleMessage={this.toggleMessage}
                    />
                ))}
                <AddMessage addMessage={this.addMessage} />
            </div>
        );
    }
}

Messages.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool
    }).isRequired,
    toggleMessage: PropTypes.func
};

export default Messages;
