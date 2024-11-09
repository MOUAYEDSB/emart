import axios from 'axios';

// Action Types
export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';
export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST';
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAIL = 'GET_PRODUCT_FAIL';
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAIL = 'CREATE_PRODUCT_FAIL';
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAIL = 'UPDATE_PRODUCT_FAIL';
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAIL = 'DELETE_PRODUCT_FAIL';

// Fetch all products
export const getProducts = (url = 'http://localhost:5000/api/products') => async (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    try {
        const response = await axios.get(url);
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FAIL, payload: error.message });
    }
};

// Fetch a single product by ID
export const getProductById = (id, url = 'http://localhost:5000/api/products') => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_REQUEST });
    try {
        const response = await axios.get(`${url}/${id}`);
        dispatch({ type: GET_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_PRODUCT_FAIL, payload: error.message });
    }
};

// Create a new product
export const createProduct = (productData, url = 'http://localhost:5000/api/products') => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    try {
        const response = await axios.post(url, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAIL, payload: error.message });
    }
};

// Update a product
export const updateProduct = (id, productData, url = 'http://localhost:5000/api/products') => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    try {
        const response = await axios.put(`${url}/${id}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.message });
    }
};

// Delete a product
export const deleteProduct = (id, url = 'http://localhost:5000/api/products') => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    try {
        await axios.delete(`${url}/${id}`);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
    }
};
