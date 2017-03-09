import {
  GETCURRENTUSER_REQUESTED,
  GETCURRENTUSER_SUCCESS,
  GETCURRENTUSER_FAIL
} from '../constants/User'

const defaultState = { loading: false, info: null, errors: null };

export default function info(state = defaultState, action) {
    switch (action.type) {

        case GETCURRENTUSER_REQUESTED:
            return {...state, loading: true };

        case GETCURRENTUSER_SUCCESS:
            return {...state, loading: false, info: action.payload, errors: null };

        case GETCURRENTUSER_FAIL:
            return {...state, loading: false, info: null, errors: action.errors };

        default:
            return state;
    }
}