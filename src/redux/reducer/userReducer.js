// reducers/userReducer.js
import { createReducer } from '@reduxjs/toolkit';
import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
} from '../action/userActions';

const initialState = {
    loading: false,
    error: null,
    user: null, // To hold user data
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(UPDATE_PROFILE_REQUEST, (state) => {
            state.loading = true; // Set loading to true when the update starts
            state.error = null; // Reset error
        })
        .addCase(UPDATE_PROFILE_SUCCESS, (state, action) => {
            state.loading = false; // Set loading to false after update
            state.user = { ...state.user, ...action.payload }; // Update user data with the new data
        })
        .addCase(UPDATE_PROFILE_FAIL, (state, action) => {
            state.loading = false; // Set loading to false on failure
            state.error = action.payload; // Store the error message
        });
});

export default userReducer;
