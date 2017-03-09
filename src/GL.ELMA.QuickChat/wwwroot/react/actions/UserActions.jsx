import {
  GETCURRENTUSER_REQUESTED,
  GETCURRENTUSER_SUCCESS,
  GETCURRENTUSER_FAIL
  } from '../constants/User'
import Axios from 'axios';

export function getUsers() {
    return function(dispatch) {

        dispatch({
            type: GETCURRENTUSER_REQUESTED
        });

        Axios.get('./Chat/GetUsers/')
            .then(function(response) {
                var users = response.data;
                dispatch({
                    type: GETCURRENTUSER_SUCCESS,
                    payload: users
                });
            })
            .catch(function(error) {
                dispatch({
                    type: GETCURRENTUSER_FAIL,
                    errors: new Error('Ошибка при загрузке пользователей')
                });
            });

    }
}