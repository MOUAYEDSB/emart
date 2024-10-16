import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

// Action Types for Registration
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const RESET_REGISTER_STATE = 'RESET_REGISTER_STATE';

// Action Types for Login
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

// Action Creators for Registration
export const registerRequest = createAction(REGISTER_REQUEST);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFail = createAction(REGISTER_FAIL);
export const resetRegisterState = createAction(RESET_REGISTER_STATE);

// Action Creators for Login
export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFail = createAction(LOGIN_FAIL);

// Async Action for Registration
export const registerUser = (userData) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', userData);
        dispatch(registerSuccess(response.data));
    } catch (error) {
        dispatch(registerFail(error.response ? error.response.data.message : error.message));
    }
};

// Async Action for Login
export const loginUser = (userCredentials) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', userCredentials);
        const { token, user } = response.data; // Extract token and user details from the response
        const { id, name, role } = user;

        // Store token, id, name, and role in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('userName', name);
        localStorage.setItem('userRole', role);

        // Dispatch success action with user data
        dispatch(loginSuccess({ id, name, role, token }));
    } catch (error) {
        dispatch(loginFail(error.response ? error.response.data.message : error.message));
    }
};
