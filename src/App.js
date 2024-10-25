import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import ProductsComponent from "./component/Products";
import OneProduct from "./component/OneProductPage";
import Login from "./component/Login";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Cart from "./component/CartPage";
import Dashboard from "./component/dashboard/Dashboard";
import Register from "./component/Register";
import ClientDashboard from "./component/client_dashboard/dashboard";

const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

// Function to check if the user is a client and logged in
const isClientLoggedIn = () => {
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");
  return userRole === "client" && token !== null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductsComponent />
            </Layout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <Layout>
              <OneProduct />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/client_dashboard"
          element={
            isClientLoggedIn() ? (
              <ClientDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
