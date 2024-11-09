import axios from "axios";

export const fetchCart = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/cart");
    dispatch({ type: "FETCH_CART_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_CART_FAILURE", payload: error.message });
  }
};

export const addCart = (product) => async (dispatch) => {
  try {
    const response = await axios.post("/api/cart/add", { product });
    dispatch({ type: "ADD_CART_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "ADD_CART_FAILURE", payload: error.message });
  }
};

export const updateCartQuantity = (productId, quantity) => async (dispatch) => {
  try {
    const response = await axios.post("/api/cart/update", {
      productId,
      quantity,
    });
    dispatch({ type: "UPDATE_CART_QUANTITY_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "UPDATE_CART_QUANTITY_FAILURE", payload: error.message });
  }
};

export const delCart = (productId) => async (dispatch) => {
  try {
    const response = await axios.post("/api/cart/remove", { productId });
    dispatch({ type: "REMOVE_CART_ITEM_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "REMOVE_CART_ITEM_FAILURE", payload: error.message });
  }
};
