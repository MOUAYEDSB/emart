// Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { delCart } from "../redux/action"; // Ensure the import path is correct
import defaultImage from './defaultImage.jpg'; // Default image import
import './Cartpage.css'; // Add custom CSS file for additional styles

const Cart = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const handleClose = (itemId) => {
    dispatch(delCart(itemId));
  };

  const handleQuantityChange = (itemId, increment) => {
    const item = cartItems.find(item => item._id === itemId);
    if (item) {
      const newQuantity = increment ? item.qty + 1 : item.qty - 1;

      if (newQuantity > 0) {
        dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: itemId, qty: newQuantity } });
      } else {
        handleClose(itemId);
      }
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => {
        const itemPrice = item.price || 0;
        const itemQty = item.qty || 0;
        return acc + itemPrice * itemQty;
      }, 0)
      .toFixed(2);
  };

  const renderCartItemImage = (item) => {
    const imageUrl = item.images && item.images.length > 0
      ? `http://localhost:5000/${item.images[0].replace(/\\/g, '/')}`
      : defaultImage;

    return (
      <img
        src={imageUrl}
        alt="Product"
        className="img-fluid" // Bootstrap class for responsive images
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = defaultImage; // Use default image on error
        }}
      />
    );
  };

  const renderCartItem = (item) => {
    const itemPrice = item.price || 0;
    const itemQty = item.qty || 0;
    const totalPrice = (itemPrice * itemQty).toFixed(2);

    return (
      <div className="cart-item d-flex align-items-center border-bottom py-3" key={item._id}>
        <div className="me-3">{renderCartItemImage(item)}</div>
        <div className="flex-grow-1">
          <h5 className="mb-1">{item.title}</h5>
          <p className="lead mb-0">
            ${itemPrice} x {itemQty} = ${totalPrice}
          </p>
          <div className="mt-2">
            <button className="btn btn-outline-secondary me-1" onClick={() => handleQuantityChange(item._id, false)}>-</button>
            <span>{itemQty}</span>
            <button className="btn btn-outline-secondary ms-1" onClick={() => handleQuantityChange(item._id, true)}>+</button>
            <button
              onClick={() => handleClose(item._id)}
              className="btn btn-danger float-end ms-2"
              aria-label="Remove item"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  };

  const emptyCart = () => (
    <div className="text-center my-5">
      <h3>Your Cart is Empty</h3>
      <NavLink to="/" className="btn btn-primary mt-3">Continue Shopping</NavLink>
    </div>
  );

  const checkoutButton = () => (
    <div className="text-center my-4">
      <NavLink to="/checkout" className="btn btn-dark w-50">
        Proceed To Checkout
      </NavLink>
    </div>
  );

  return (
    <div className="container">
      {cartItems?.length === 0 && emptyCart()}
      {cartItems?.length > 0 && (
        <>
          <h2 className="text-center my-4">Shopping Cart</h2>
          <div className="total-summary text-end mb-4">
            <h4>Total: ${calculateTotal()}</h4>
          </div>
          {cartItems.map(renderCartItem)}
          {checkoutButton()}
        </>
      )}
    </div>
  );
};

export default Cart;
