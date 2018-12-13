export const fetchMessages = {
    path: '/api/v001/messages',
    method: 'GET'
};

export const createMessages = {
    path: '/api/v001/messages',
    method: 'POST'
};

export const fetchMessagesFromChats = {
    path: '/api/v001/chats/f1f87db0abd2f/messages',
    method: 'GET'
};

export const createMessagesFromChats = {
    path: '/api/v001/chats/f1f87db0abd2f/messages',
    method: 'POST'
};

export const highlightMessage = {
    //TODO: переделать в удаление
    path: '/api/v001/chats/f1f87db0abd2f/',
    method: 'PATCH'
};

export const updateMessages = {
    path: '/api/v001/events/new-messages/',
    method: 'GET'
};
