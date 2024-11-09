// src/redux/reducers/productReducer.js
import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
} from '../action/productActions'; // Corrected path


const initialState = {
    products: [],
    loading: false,
    error: null,
    product: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case GET_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case GET_PRODUCTS_FAIL:
            return { ...state, loading: false, error: action.payload };
        case GET_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case GET_PRODUCT_SUCCESS:
            return { ...state, loading: false, product: action.payload };
        case GET_PRODUCT_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CREATE_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case CREATE_PRODUCT_SUCCESS:
            return { ...state, loading: false, products: [...state.products, action.payload] };
        case CREATE_PRODUCT_FAIL:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.map((product) =>
                    product._id === action.payload._id ? action.payload : product
                ),
            };
        case UPDATE_PRODUCT_FAIL:
            return { ...state, loading: false, error: action.payload };
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter((product) => product._id !== action.payload),
            };
        case DELETE_PRODUCT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default productReducer;
