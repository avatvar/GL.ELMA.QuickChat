const defaultState = { loading: false, currentUser: null, errors: null };

export default function currentUser(state = defaultState, action) {
    switch (action.type) {
        case 'GETCURRENTUSER_LOADING':
            return {...state, loading: true };

        case 'GETCURRENTUSER_LOADED':
            return {...state, loading: false, currentUser: action.payload, errors: null };

        case 'GETCURRENTUSER_FAILED':
            return {...state, loading: false, currentUser: null, errors: action.errors };

        default:
            return state;
    }
}