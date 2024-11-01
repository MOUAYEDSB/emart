// src/component/Layout.js
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarClient from "./client_dashboard/NavbarClient";

const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/register";

  // Determine the user role
  const userRole = localStorage.getItem("userRole");
  console.log("User role:", userRole); // Debugging output

  return (
    <>
      {showNavbar && (userRole === "client" ? <NavbarClient /> : <Navbar />)}
      {children}
    </>
  );
};

export default Layout;
