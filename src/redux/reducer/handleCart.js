// src/redux/reducer/handleCart.js
import { ADD_CART, DEL_CART } from '../action';

const getUserCart = () => {
  const userId = localStorage.getItem('userId'); // Get the current user's ID
  const cartKey = `cart_${userId}`;
  const storedCart = localStorage.getItem(cartKey);
  return storedCart ? JSON.parse(storedCart) : []; // Initialize with user-specific cart or empty
};

// Define initial state as the user-specific cart
const initialState = getUserCart();

const cartReducer = (state = initialState, action) => {
  const userId = localStorage.getItem('userId');
  const cartKey = `cart_${userId}`;

  switch (action.type) {
    case ADD_CART:
      const existingItem = state.find(item => item._id === action.payload._id);
      if (existingItem) {
        const updatedState = state.map(item =>
          item._id === action.payload._id ? { ...item, qty: item.qty + 1 } : item
        );
        localStorage.setItem(cartKey, JSON.stringify(updatedState));
        return updatedState;
      }
      const updatedAddState = [...state, { ...action.payload, qty: 1 }];
      localStorage.setItem(cartKey, JSON.stringify(updatedAddState));
      return updatedAddState;

    case DEL_CART:
      const updatedDelState = state.filter(item => item._id !== action.payload);
      localStorage.setItem(cartKey, JSON.stringify(updatedDelState));
      return updatedDelState;

    case 'UPDATE_CART_QUANTITY':
      const updatedQtyState = state.map(item =>
        item._id === action.payload.id ? { ...item, qty: action.payload.qty } : item
      );
      localStorage.setItem(cartKey, JSON.stringify(updatedQtyState));
      return updatedQtyState;

    case 'CLEAR_CART':
      localStorage.removeItem(cartKey);
      return [];

    default:
      return state;
  }
};

export default cartReducer;
