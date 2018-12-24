export const fetchAllUsers = {
    path: '/api/v001/users/all',
    method: 'GET'
};

// Запрос на всех юзеров, кроме самого себя
export const fetchUsers = {
    path: '/api/v001/users',
    method: 'GET'
};

export const createUsers = {
    path: '/api/v001/users',
    method: 'POST'
};

export const fetchChats = {
    path: '/api/v001/chats',
    method: 'GET'
};

export const fetchChatByUserId = {
    path: '/api/v001/chats/:userId',
    method: 'GET'
};

export const createChatByUserId = {
    path: '/api/v001/chats/:userId',
    method: 'POST'
};

export const fetchMessages = {
    path: '/api/v001/chats/:chatId/messages',
    method: 'GET'
};

export const createMessage = {
    path: '/api/v001/chats/:chatId/messages',
    method: 'POST'
};

export const deleteMessages = {
    path: '/api/v001/chats/:chatId/messages',
    method: 'PATCH'
};

export const updateMessages = {
    path: '/api/v001/events/new-messages/:chatId',
    method: 'GET'
};
