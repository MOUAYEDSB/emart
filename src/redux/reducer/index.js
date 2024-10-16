import { combineReducers } from 'redux';
import handleCart from './handleCart'; // Your existing cart reducer
import registerReducer from './registerReducer'; // Register reducer
import loginReducer from './loginReducer'; // Login reducer

const rootReducer = combineReducers({
    handleCart,
    register: registerReducer,
    login: loginReducer, // Add login reducer
});

export default rootReducer;
