import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import createLogger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default function initMainStore() {
    const logger = createLogger();
    const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)));

    return store;
}