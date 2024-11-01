import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSignOutAlt, FaUser, FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/action/userActions";
import "./navbarclient.css";

function NavbarClient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.handleCart);

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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
              <NavLink className="nav-link active fw-bold fs-6" aria-current="page" to="/client_dashboard">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold fs-6" to="#">Offers</NavLink>
            </li>
          </ul>
          <div className="buttons d-flex align-items-center">
            <NavLink to="/cart" className="btn me-3 icon-btn" title="Cart">
              <FaShoppingCart /> ({cartState.length})
            </NavLink>

            {isLoggedIn && (
              <div className="dropdown">
                <button 
                  className="btn icon-btn" 
                  onClick={toggleDropdown} 
                  title="Account"
                  aria-haspopup="true" 
                  aria-expanded={isDropdownOpen}
                >
                  <FaUser className="icon" /> {localStorage.getItem("userName")}
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu show">
                    <NavLink className="dropdown-item" to="/profile">
                      <FaUserCircle className="icon me-2" /> Profile
                    </NavLink>
                    <NavLink className="dropdown-item" to="/sitting">
                      <FaUserCircle className="icon me-2" /> Sitting
                    </NavLink>
                    <button onClick={handleLogout} className="dropdown-item">
                      <FaSignOutAlt className="icon me-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarClient;
