// userActions.js
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

// Action Types
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const RESET_REGISTER_STATE = 'RESET_REGISTER_STATE';

// Action Creators
export const registerRequest = createAction(REGISTER_REQUEST);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFail = createAction(REGISTER_FAIL);
export const resetRegisterState = createAction(RESET_REGISTER_STATE);

// Async Action for Registration
export const registerUser = (userData) => async (dispatch) => {
    dispatch(registerRequest()); // Dispatch the request action

    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', userData);
        dispatch(registerSuccess(response.data)); // Dispatch success action with user data
    } catch (error) {
        dispatch(registerFail(error.response ? error.response.data.message : error.message)); // Dispatch failure action with error message
    }
};
