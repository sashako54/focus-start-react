import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from '../core/class-names/class-names';

class Message extends PureComponent {
    // shouldComponentUpdate(nextProps) {
    //     const { isMyMessage } = this.props.message;

    //     return nextProps.message.isMyMessage !== isMyMessage;
    // }

    static propTypes = {
        highlightMessage: PropTypes.func.isRequired
    };

    highlightMessage = event => {
        const { highlightMessage } = this.props;
        highlightMessage(event);
    };

    render() {
        const { message, myId } = this.props;

        // console.log(`render message-${message.id}`);

        return (
            <div
                className={classNames('message-wrapper', {
                    highlight: message.isHighlight[myId],
                    my: message.userId === myId
                })}
                onClick={this.highlightMessage}
                data-id={message.id}
            >
                <p className='message'>{message.text}</p>
            </div>
        );
    }
}

export default Message;
