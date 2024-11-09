// reducers/rootReducer.js
import { combineReducers } from 'redux';
import handleCart from './handleCart'; // Your existing cart reducer
import registerReducer from './registerReducer'; // Register reducer
import loginReducer from './loginReducer'; // Login reducer
import userReducer from './userReducer'; // New user reducer for profile updates
import productReducer from './productReducer';

const rootReducer = combineReducers({
    handleCart,
    register: registerReducer,
    login: loginReducer,
    user: userReducer, // Add the user reducer here
    product: productReducer,
});

export default rootReducer;
