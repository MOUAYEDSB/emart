import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

// Action Types
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const RESET_REGISTER_STATE = 'RESET_REGISTER_STATE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL';

// Action Creators
export const registerRequest = createAction(REGISTER_REQUEST);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFail = createAction(REGISTER_FAIL);
export const resetRegisterState = createAction(RESET_REGISTER_STATE);
export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFail = createAction(LOGIN_FAIL);
export const logout = createAction(LOGOUT);
export const updateProfileRequest = createAction(UPDATE_PROFILE_REQUEST);
export const updateProfileSuccess = createAction(UPDATE_PROFILE_SUCCESS);
export const updateProfileFail = createAction(UPDATE_PROFILE_FAIL);

// Async Actions
export const registerUser = (userData) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', userData);
        dispatch(registerSuccess(response.data));
    } catch (error) {
        dispatch(registerFail(error.response?.data.message || 'Registration failed. Please try again.'));
    }
};

export const loginUser = (userCredentials) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', userCredentials);
        const { token, user } = response.data;
        const { id, name, role } = user;

        console.log("Login Response:", response.data); // Check login response data
        console.log("User ID:", id); // Check user ID

        localStorage.setItem('token', token);
        localStorage.setItem('userId', id); // Verify if userId is correctly stored
        localStorage.setItem('userName', name);
        localStorage.setItem('userRole', role);

        dispatch(loginSuccess({ id, name, role, token }));
    } catch (error) {
        console.error("Login Error:", error);
        dispatch(loginFail(error.response?.data.message || 'Login failed. Please try again.'));
    }
};


export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');

    dispatch(logout());
};

export const updateUserProfile = (userData, userId) => async (dispatch) => {
    dispatch(updateProfileRequest());

    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
            `http://localhost:5000/api/auth/update/${userId}`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch(updateProfileSuccess(response.data));
    } catch (error) {
        dispatch(updateProfileFail(error.response?.data.message || 'Update failed. Please try again.'));
    }
};
