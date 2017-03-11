const defaultState = { loading: false, users: [], errors: null };

export default function users(state = defaultState, action) {
    switch (action.type) {
        case 'GETUSERS_LOADING':
            return {...state, loading: true };

        case 'GETUSERS_LOADED':
            return {...state, loading: false, users: action.payload, errors: null };

        case 'GETUSERS_FAILED':
            return {...state, loading: false, users: null, errors: action.errors };

        default:
            return state;
    }
}