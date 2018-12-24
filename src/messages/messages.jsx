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
import AddMessage from '../add-message/add-message';
import DeleteMessages from '../delete-messages/delete-messages';
import getCookie from '../core/getCookie';

class Messages extends Component {
    state = {
        id: getCookie('id'),
        isLoading: true,
        messages: [],
        chatName: '',
        numNewMessages: {}
    };

    listRef = createRef();

    componentDidMount() {
        const { chatId } = this.props.match.params;
        createRequest(fetchMessages, { chatId }).then(({ status, data }) => {
            if (status === 'OK') {
                this.setState({
                    isLoading: false,
                    messages: data.messages,
                    chatName: data.chatName.join(', ')
                });
            }
        });
        this.updateMessages(chatId);
        this.pingInterval = setInterval(() => {
            this.updateMessages(chatId);
        }, 5000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { chatId } = this.props.match.params;
        if (snapshot !== null) {
            const list = this.listRef.current;
            list.scrollTop = list.scrollHeight - snapshot;
        }

        if (prevProps.match.params.chatId !== chatId) {
            createRequest(fetchMessages, { chatId }).then(
                ({ status, data }) => {
                    if (status === 'OK') {
                        this.setState({
                            isLoading: false,
                            messages: data.messages,
                            chatName: data.chatName.join(', ')
                        });
                    }
                }
            );
        }
        clearInterval(this.pingInterval);
        this.pingInterval = setInterval(() => {
            this.updateMessages(chatId);
        }, 5000);
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
        prevMessages.forEach(message => {
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
                        for (const prop of highlightMessagesList) {
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

    updateMessages = chatId => {
        const { getNumNewMessages } = this.props;
        const prevMessages = this.state.messages;
        createRequest(updateMessages, { chatId })
            .then(({ status, data }) => {
                if (status === 'OK') {
                    const alreadyDraw = data.newMessagesUpdate.filter(
                        message => {
                            const findMessage = prevMessages.find(item => {
                                if (item.id === message.id) {
                                    return true;
                                }
                            });
                            if (findMessage) return true;
                        }
                    );
                    if (alreadyDraw.length === 0) {
                        this.setState(({ messages }) => ({
                            messages: messages.concat(data.newMessagesUpdate),
                            numNewMessages: data.numNewMessages
                        }));
                    } else {
                        this.setState(() => ({
                            numNewMessages: data.numNewMessages
                        }));
                    }
                }
            })
            .then(() => {
                getNumNewMessages(this.state.numNewMessages);
            });
    };

    render() {
        const { messages, isLoading, chatName } = this.state;

        return (
            <div className='messages-wrapper'>
                <div className='messages-info-wrapper'>
                    <p className='messages-title'>{chatName}</p>
                    <DeleteMessages deleteMessages={this.deleteMessages} />
                </div>
                <div className='messages' ref={this.listRef}>
                    {isLoading ? (
                        <div className='messages__preloader-wrapper'>
                            <div className='messages__preloader' />
                        </div>
                    ) : (
                        ''
                    )}
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
    match: PropTypes.shape({
        params: PropTypes.shape({
            chatId: PropTypes.string
        }).isRequired
    }).isRequired,
    getNumNewMessages: PropTypes.func.isRequired
};

export default Messages;
