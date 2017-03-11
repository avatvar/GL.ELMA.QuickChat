import Axios from 'axios';

export const getUsers = () => dispatch => {
        dispatch({
            type: 'GETUSERS_LOADING'
        });
        Axios.get('./Chat/GetUsers/', {dataType: 'json'})
            .then(function(response) {
                dispatch({
                    type: 'GETUSERS_LOADED',
                    payload: JSON.parse(response.data)
                });
            })
            .catch(function(error) {
                dispatch({
                    type: 'GETUSERS_FAILED',
                    errors: new Error('Ошибка при загрузке пользователей' + error)
                });
            });
}

