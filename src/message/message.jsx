import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from '../core/class-names/class-names';
import getTime from '../core/getTime';

class Message extends PureComponent {
    static propTypes = {
        highlightMessage: PropTypes.func.isRequired
    };

    highlightMessage = event => {
        const { highlightMessage } = this.props;
        highlightMessage(event);
    };

    render() {
        const { message, myId } = this.props;

        return (
            <div
                className={classNames('message-wrapper', {
                    highlight: message.isHighlight[myId],
                    my: message.userId === myId
                })}
                onClick={this.highlightMessage}
                data-id={message.id}
            >
                <div
                    className={classNames('message', {
                        my: message.userId === myId
                    })}
                >
                    {message.userId !== myId ? (
                        <p className='message-title'>{`${message.name}:`}</p>
                    ) : (
                        ''
                    )}
                    <p className='message-text'>{message.text}</p>
                    <time className='message-date'>
                        {getTime(message.date)}
                    </time>
                </div>
            </div>
        );
    }
}

export default Message;
