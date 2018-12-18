import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Message from '../message/message';
import createRequest from '../core/create-request';
import {
    fetchMessages,
    createMessage,
    updateMessages,
    deleteMessages
} from '../core/api-config';
import classNames from '../core/class-names/class-names';
import AddMessage from '../add-message/add-message';
import DeleteMessages from '../delete-messages/delete-messages';
import getCookie from '../core/getCookie';

class Messages extends Component {
    state = {
        id: getCookie('id'),
        isLoading: true,
        messages: []
    };

    listRef = createRef();

    componentDidMount() {
        console.log('this.props', this.props);
        const { chatId } = this.props.match.params;
        createRequest(fetchMessages, { chatId }).then(response => {
            if (response.status === 'OK') {
                this.setState({
                    isLoading: false,
                    messages: response.data
                });
            }
        });

        this.pingInterval = setInterval(() => {
            const prevMessages = this.state.messages;
            createRequest(updateMessages, { chatId }).then(
                ({ status, data }) => {
                    if (status === 'OK') {
                        const alreadyDraw = data.filter(message => {
                            const findMessage = prevMessages.find(item => {
                                if (item.id === message.id) {
                                    return true;
                                }
                            });
                            if (findMessage) return true;
                        });
                        if (alreadyDraw.length === 0) {
                            this.setState(({ messages }) => ({
                                messages: messages.concat(data)
                            }));
                        }
                    }
                }
            );
        }, 5000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {
            const list = this.listRef.current;
            list.scrollTop = list.scrollHeight - snapshot;
        }

        if (prevProps.match.params.chatId !== this.props.match.params.chatId) {
            const { chatId } = this.props.match.params;
            createRequest(fetchMessages, { chatId }).then(response => {
                if (response.status === 'OK') {
                    this.setState({
                        isLoading: false,
                        messages: response.data
                    });
                }
            });
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (this.listRef.current.children.length < this.state.messages.length) {
            const list = this.listRef.current;
            return list.scrollHeight - list.scrollTop;
        }
        return null;
    }

    addMessage = text => {
        const { chatId } = this.props.match.params;
        this.setState({ isLoading: true });
        createRequest(createMessage, { chatId }, { text }).then(
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

    deleteMessages = () => {
        const { chatId } = this.props.match.params;
        this.setState({ isLoading: true });
        // список id выделенных сообщений ['id_1', 'id_3'...]
        const prevMessages = this.state.messages;
        const myId = this.state.id;
        const highlightMessagesList = [];
        prevMessages.map(message => {
            if (message.isHighlight[myId] === true) {
                highlightMessagesList.push(message.id);
            }
        });
        createRequest(
            deleteMessages,
            { chatId },
            { highlightMessagesList }
        ).then(({ status }) => {
            if (status === 'OK') {
                this.setState(({ messages }) => ({
                    isLoading: false,
                    messages: messages.reduce((prev, message, index) => {
                        const messagesObj = prev;
                        for (let prop of highlightMessagesList) {
                            if (message.id === prop) {
                                return prev;
                            }
                        }
                        messagesObj.push(message);
                        return messagesObj;
                    }, [])
                }));
            }
        });
    };

    highlightMessage = event => {
        const myId = this.state.id;
        const { id } = event.currentTarget.dataset;
        this.setState(state => ({
            messages: state.messages.map(data => {
                if (data.id === id) {
                    const { isHighlight } = data;
                    isHighlight[myId] = !isHighlight[myId];
                    return {
                        ...data,
                        isHighlight
                    };
                }
                return data;
            })
        }));
    };

    render() {
        const { messages, isLoading } = this.state;

        return (
            <div className='messages-wrapper'>
                <div className='messages-info-wrapper'>
                    <DeleteMessages deleteMessages={this.deleteMessages} />
                </div>
                <div
                    ref={this.listRef}
                    className={classNames('messages', { loading: isLoading })}
                >
                    {messages.map(message => (
                        <Message
                            message={message}
                            key={message.id}
                            highlightMessage={this.highlightMessage}
                            myId={this.state.id}
                        />
                    ))}
                </div>
                <AddMessage addMessage={this.addMessage} />
            </div>
        );
    }
}

Messages.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isHighlight: PropTypes.object
    }).isRequired,
    highlightMessage: PropTypes.func
};

export default Messages;
