import Axios from 'axios';

export const getCurrentUser = () => dispatch => {
    dispatch({
        type: 'GETCURRENTUSER_LOADING'
    });
    Axios.get('./Chat/GetCurrentUser/')
        .then(function(response) {
            dispatch({
                type: 'GETCURRENTUSER_LOADED',
                payload: response.data
            });
        })
        .catch(function(error) {
            dispatch({
                type: 'GETCURRENTUSER_FAILED',
                errors: new Error('Ошибка при загрузке текущего пользователя' + error)
            });
        });
}