import { createStore, combineReducers } from 'redux';
import actions from './reducers/index';

let reducers = combineReducers(actions);
let store = createStore(
    reducers,/* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;