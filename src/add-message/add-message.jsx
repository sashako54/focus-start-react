import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class AddMessage extends Component {
    textRef = createRef();

    static propTypes = {
        addMessage: PropTypes.func.isRequired
    };

    onSubmit = event => {
        const { addMessage } = this.props;
        console.log('props:', this.props.addMessage);
        event.preventDefault();

        addMessage(this.textRef.current.value);
        this.textRef.current.value = '';
    };

    render() {
        return (
            <form className="add-message" onSubmit={this.onSubmit}>
                <input
                    className="add-message_field"
                    type="text"
                    name="text"
                    ref={this.textRef}
                />
                <input
                    className="add-message_button"
                    type="submit"
                    value="Добавить"
                />
            </form>
        );
    }
}

export default AddMessage;