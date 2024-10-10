// index.js (or rootReducer.js)
import { combineReducers } from "redux";
import handleCart from "./handleCart"; // Your existing cart reducer
import registerReducer from "./registerReducer"; // New register reducer

const rootReducer = combineReducers({
  handleCart,
  register: registerReducer, // Register reducer
});

export default rootReducer;
