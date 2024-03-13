import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { delCart } from "../redux/action"; // Adjust the import path as necessary

const Cart = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const handleClose = (item) => {
    dispatch(delCart(item));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  };

  const renderCartItem = (item) => (
    <div className="px-4 my-5 bg-light rounded-3" key={item.id}>
      <div className="container py-4">
        <button
          onClick={() => handleClose(item)}
          className="btn-close float-end"
          aria-label="Close"
        ></button>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <img
              src={item.image}
              alt={item.title}
              height="200px"
              width="180px"
            />
          </div>
          <div className="col-md-4">
            <h3>{item.title}</h3>
            <p className="lead fw-bold">
              ${item.price} x {item.qty}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const emptyCart = () => (
    <div className="px-4 my-5 bg-light rounded-3 py-5">
      <div className="container py-4">
        <div className="row">
          <h3>Your Cart is Empty</h3>
        </div>
      </div>
    </div>
  );

  const checkoutButton = () => (
    <div className="container">
      <div className="row">
        <NavLink
          to="/checkout"
          className="btn btn-outline-primary mb-5 w-25 mx-auto"
        >
          Proceed To Checkout
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {cartItems?.length === 0 && emptyCart()}
      {cartItems?.length > 0 && (
        <>
          <div className="container mb-4">
            <div className="row">
              <div className="col text-center">
                <h2>Total: ${calculateTotal()}</h2>
              </div>
            </div>
          </div>
          {checkoutButton()}
        </>
      )}
      {cartItems?.length > 0 && cartItems.map(renderCartItem)}
    </>
  );
};

export default Cart;
