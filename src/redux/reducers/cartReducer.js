const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CART_SUCCESS":
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
      };
    case "ADD_CART_SUCCESS":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        loading: false,
      };
    case "UPDATE_CART_QUANTITY_SUCCESS":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        loading: false,
      };
    case "REMOVE_CART_ITEM_SUCCESS":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
        loading: false,
      };
    case "FETCH_CART_FAILURE":
    case "ADD_CART_FAILURE":
    case "UPDATE_CART_QUANTITY_FAILURE":
    case "REMOVE_CART_ITEM_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
