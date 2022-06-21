import {combineReducers, createStore, applyMiddleware} from 'redux';
import authReducer from './reducers/authReducer'
import thunk from 'redux-thunk';
import booksReducer from './reducers/booksReducer';
import authorsReducer from './reducers/authorsReducer';
import cartReducer from './reducers/cartReducer';
import ordersReducer from './reducers/ordersReducer'

let reducers = combineReducers({
    auth: authReducer,
    books: booksReducer,
    authors: authorsReducer,
    cart: cartReducer,
    orders: ordersReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;