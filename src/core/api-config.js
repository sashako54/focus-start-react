export const fetchUsers = {
    path: '/api/v001/users',
    method: 'GET'
};

export const createUsers = {
    path: '/api/v001/users',
    method: 'POST'
};

export const fetchMessagesFromChats = {
    path: '/api/v001/chats/:chatId/messages',
    method: 'GET'
};

export const createMessagesFromChats = {
    path: '/api/v001/chats/:chatId/messages',
    method: 'POST'
};

export const deleteMessages = {
    path: '/api/v001/chats/:chatId/messages',
    method: 'PATCH'
};

export const updateMessages = {
    path: '/api/v001/events/new-messages/',
    method: 'GET'
};
