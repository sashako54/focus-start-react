import React from 'react';

function MessageInput() {
    return <textarea className="input" type="text" />;
}

function MessageSendButton() {
    return <button className="button" type="submit" value="Отправить" />;
}

export { MessageInput, MessageSendButton };
