import React from "react";
import { FaSignInAlt, FaUserPlus, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

import "./navbar.css";
import { NavLink } from "react-router-dom";


function Navbar() {
  const state = useSelector((state)=> state.handleCart)
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-white py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4" to="/">
            MJN COLLECTION
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active fw-bold fs-6"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold fs-6" to="/Products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold fs-6" to="/About">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold fs-6" to="/Contact">
                  {" "}
                  {/* Fix the path */}
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="buttons">
              <NavLink to="/LoginPage" className="btn me-3 icon-btn" title="login">
                <FaSignInAlt className="icon" /> {/* Login icon */}
                <span className="icon-name">Login</span>
              </NavLink>
              <NavLink
                to="/Register"
                className="btn me-3 icon-btn"
                title="Register"
              >
                <FaUserPlus className="icon" /> {/* Register icon */}
                <span className="icon-name">Register</span>
              </NavLink>
              <NavLink
                to="/cart"
                className="btn me-3 icon-btn"
                title="Cart (0)"
              >
                <FaShoppingCart /> ({state.length}) {/* Cart icon */}
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
