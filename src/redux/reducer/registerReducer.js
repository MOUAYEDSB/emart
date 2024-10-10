// reducers/registerReducer.js
import { createReducer } from '@reduxjs/toolkit';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_REGISTER_STATE,
} from '../action/userActions';

const initialState = {
  loading: false,
  error: null,
  success: false, // New success flag to manage success state
};

const registerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(REGISTER_REQUEST, (state) => {
      state.loading = true;
      state.success = false; // Reset success on new request
      state.error = null; // Reset error
    })
    .addCase(REGISTER_SUCCESS, (state) => {
      state.loading = false;
      state.success = true; // Set success to true on successful registration
    })
    .addCase(REGISTER_FAIL, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Capture the error message
      state.success = false; // Ensure success is false on error
    })
    .addCase(RESET_REGISTER_STATE, (state) => {
      state.loading = false;
      state.error = null;
      state.success = false; // Reset state when needed
    });
});

export default registerReducer;
