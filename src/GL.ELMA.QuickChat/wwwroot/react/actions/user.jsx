import Axios from 'axios';

export const getUsers = () => dispatch => {
        dispatch({
            type: 'GETUSERS_LOADING'
        });
        Axios.get('./Chat/GetUsers/')
            .then(function(response) {
                var users = response.data;
                dispatch({
                    type: 'GETUSERS_LOADED',
                    payload: users
                });
            })
            .catch(function(error) {
                dispatch({
                    type: 'GETUSERS_FAILED',
                    errors: new Error('Ошибка при загрузке пользователей' + error)
                });
            });
}