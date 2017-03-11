import fetch from 'isomorphic-fetch';

export function getChatUsers() {
    return fetch('./Chat/GetUsers/');
}

export function getCurrentChatUser() {
    return fetch('./Chat/GetCurrentUser/');
}