// src/redux/reducer/index.js
import { combineReducers } from 'redux';
import handleCart from './handleCart';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    handleCart,
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
    product: productReducer,
});

export default rootReducer;
