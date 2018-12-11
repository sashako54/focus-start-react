import React, { Component } from 'react';
import Message from '../message/message';
import PropTypes from 'prop-types';
import createRequest from '../core/create-request';
import {
    fetchMessagesFromChats,
    createMessagesFromChats,
    updateMessage
} from '../core/api-config';
import classNames from '../core/class-names/class-names';
import AddMessage from '../add-message/add-message';

class Messages extends Component {
    state = {
        id: document.cookie.split('=')[1],
        isLoading: true,
        messages: []
    };

    componentDidMount() {
        console.log('state.id', this.state.id);
        createRequest(fetchMessagesFromChats).then(response => {
            if (response.status === 'OK') {
                this.setState({
                    isLoading: false,
                    messages: response.data
                });
            }
        });
    }

    getUserId = () => {
        return this.state.id;
    };

    updateMessage = (chatId, id) => {
        this.setState({ isLoading: true });
        console.log('text', text);
        createRequest(updateMessage, { chatId, id }).then(
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

    // toggleMessage = event => {
    //     const { id } = event.currentTarget.dataset;
    //     // const id = event.currentTarget.dataset.id то же самое
    //     console.log(`update message-${id}`);

    //     this.setState(state => ({
    //         messages: state.messages.map(data => {
    //             if (data.id === id) {
    //                 return { ...data, isMyMessage: !data.isMyMessage };
    //             }
    //             return data;
    //         })
    //     }));
    // };

    highlightMessage = event => {
        const _stateId = this.state.id;
        console.log('_stateId ', _stateId);
        const getUserId = () => {
            return this.state.id;
        };
        const { id } = event.currentTarget.dataset;
        // const id = event.currentTarget.dataset.id то же самое
        console.log(`update message-${id}`);

        this.setState(state => ({
            messages: state.messages.map(data => {
                // console.log('data.id', data.id);
                if (data.id === id) {
                    // console.log('getuserId', getUserId());
                    // console.log(
                    //     'isHighlight _stateId ',
                    //     data.isHighlight[_stateId]
                    // );
                    console.log(
                        'isHighlight',
                        data.isHighlight['4469047b78ce']
                    );

                    const isHighlight = data.isHighlight;
                    isHighlight['4469047b78ce'] = !isHighlight['4469047b78ce'];

                    return {
                        ...data,
                        // isHighlight: !data.isHighlight['4469047b78ce']
                        isHighlight: isHighlight
                    };
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
                        highlightMessage={this.highlightMessage}
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
    highlightMessage: PropTypes.func
};

export default Messages;
