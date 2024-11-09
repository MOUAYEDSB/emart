// src/redux/action/action.js

export const ADD_CART = 'ADD_CART';
export const DEL_CART = 'DEL_CART';
export const CLEAR_CART = 'CLEAR_CART'; // Add CLEAR_CART action type
export const SET_CART = 'SET_CART';

export const addCart = (item) => {
  return {
    type: ADD_CART,
    payload: item,
  };
};

export const delCart = (itemId) => {
  return {
    type: DEL_CART,
    payload: itemId, // Only pass the item's ID to delete
  };
};

// Add the action creator for clearing the cart
export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

