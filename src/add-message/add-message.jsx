import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class AddMessage extends Component {
    textRef = createRef();

    onSubmit = event => {
        const { addMessage } = this.props;
        event.preventDefault();
        if (this.textRef.current.value === '') {
            return;
        }
        addMessage(this.textRef.current.value);
        this.textRef.current.value = '';
    };

    render() {
        return (
            <div>
                <form className='add-message' onSubmit={this.onSubmit}>
                    <input
                        className='add-message__field'
                        type='text'
                        name='text'
                        ref={this.textRef}
                        autoComplete='off'
                    />
                    <input
                        className='add-message__button'
                        type='submit'
                        value=''
                    />
                </form>
            </div>
        );
    }
}

AddMessage.propTypes = {
    addMessage: PropTypes.func.isRequired
};

export default AddMessage;
