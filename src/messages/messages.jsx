import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Message from '../message/message';
import createRequest from '../core/create-request';
import {
    fetchMessagesFromChats,
    createMessagesFromChats,
    highlightMessage,
    updateMessages
} from '../core/api-config';
import classNames from '../core/class-names/class-names';
import AddMessage from '../add-message/add-message';

class Messages extends Component {
    state = {
        id: document.cookie.split('=')[1],
        isLoading: true,
        messages: []
    };

    listRef = createRef();

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

        this.pingInterval = setInterval(() => {
            createRequest(updateMessages).then(({ status, data }) => {
                if (status === 'OK') {
                    this.setState(({ messages }) => ({
                        messages: messages.concat(data)
                    }));
                }
            });
        }, 5000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot !== null) {
            const list = this.listRef.current;
            list.scrollTop = list.scrollHeight - snapshot;
            console.log('list', list);
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('this.state.messages.length', this.state.messages.length);
        console.log(
            'this.listRef.current.children.length',
            this.listRef.current.children.length
        );
        if (this.listRef.current.children.length < this.state.messages.length) {
            const list = this.listRef.current;
            console.log(
                'list.scrollHeight - list.scrollTop',
                list.scrollHeight - list.scrollTop
            );
            return list.scrollHeight - list.scrollTop;
        }
        return null;
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
        this.setState({ isLoading: true });
        const myId = this.state.id;
        const { id } = event.currentTarget.dataset;
        console.log(`update message-${id}`);

        createRequest(highlightMessage, { id, myId }).then(({ status }) => {
            if (status === 'OK') {
                this.setState(state => ({
                    isLoading: false,
                    messages: state.messages.map(data => {
                        if (data.id === id) {
                            console.log('isHighlight', data.isHighlight[myId]);

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
            }
        });
    };

    // highlightMessage = event => {
    //     const _stateId = this.state.id;
    //     console.log('_stateId ', _stateId);
    //     const getmyId = () => {
    //         return this.state.id;
    //     };
    //     const { id } = event.currentTarget.dataset;
    //     // const id = event.currentTarget.dataset.id то же самое
    //     console.log(`update message-${id}`);

    //     this.setState(state => ({
    //         messages: state.messages.map(data => {
    //             // console.log('data.id', data.id);
    //             if (data.id === id) {
    //                 // console.log('getmyId', getmyId());
    //                 // console.log(
    //                 //     'isHighlight _stateId ',
    //                 //     data.isHighlight[_stateId]
    //                 // );
    //                 console.log(
    //                     'isHighlight',
    //                     data.isHighlight['4469047b78ce']
    //                 );

    //                 const isHighlight = data.isHighlight;
    //                 isHighlight['4469047b78ce'] = !isHighlight['4469047b78ce'];

    //                 return {
    //                     ...data,
    //                     // isHighlight: !data.isHighlight['4469047b78ce']
    //                     isHighlight: isHighlight
    //                 };
    //             }
    //             return data;
    //         })
    //     }));
    // };

    render() {
        const { messages, isLoading } = this.state;

        console.log('messages after update', messages);

        return (
            // <div className="messages cover">
            <div className='messages-wrapper cover'>
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
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool
    }).isRequired,
    highlightMessage: PropTypes.func
};

export default Messages;
