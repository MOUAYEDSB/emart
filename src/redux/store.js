import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Import 'thunk' as a named import
import rootReducer from './reducer/index'; // Ensure the path to your reducer is correct

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Apply redux-thunk middleware
);

export default store;
