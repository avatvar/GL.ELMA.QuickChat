import fetch from 'isomorphic-fetch';

export function getUsers() {
    return fetch('./Chat/GetUsers/')
    .then((r) => r.json());
}