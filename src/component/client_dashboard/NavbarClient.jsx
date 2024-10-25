import React, { useState, useEffect } from "react"; // Import useState and useEffect
import {  FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/action/userActions"; // Correct the import
import "./navbarclient.css";

function NavbarClient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.handleCart);
  
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    // Monitor localStorage changes (especially after logout)
    const handleStorageChange = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsLoggedIn(false); // Update state
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-white py-3 shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">MJN COLLECTION</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active fw-bold fs-6" aria-current="page" to="#">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold fs-6" to="#">Offeres</NavLink>
            </li>
          </ul>
          <div className="buttons">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="btn me-3 icon-btn" title="Logout">
                <FaSignOutAlt className="icon" />
                <span className="icon-name">Logout</span>
              </button>
            ) : (
              <>
               
                
              </>
            )}
            <NavLink to="/cart" className="btn me-3 icon-btn" title="Cart">
              <FaShoppingCart /> ({cartState.length})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarClient;
