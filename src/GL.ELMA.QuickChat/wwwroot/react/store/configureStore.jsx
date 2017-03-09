import { createStore, applyMiddleware } from 'redux'
import RootReducer from '../reducers'
import CreateLogger from 'redux-logger'
import Thunk from 'redux-thunk'


export default function configureStore(initialState) {
    const logger = CreateLogger();
    const store = createStore(
        RootReducer,
        initialState,
        applyMiddleware(Thunk, logger));

    if (module.hot) {
        module.hot.accept('../reducers',
            () => {
                const nextRootReducer = require('../reducers');
                store.replaceReducer(nextRootReducer);
            });
    }

    return store;
}