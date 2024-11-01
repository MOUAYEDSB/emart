import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./component/Home";
import ProductsComponent from "./component/Products";
import OneProduct from "./component/OneProductPage";
import Login from "./component/Login";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Cart from "./component/CartPage";
import Dashboard from "./component/dashboard/Dashboard";
import Register from "./component/Register";
import ClientDashboard from "./component/client_dashboard/dashboard";
import ProfilePage from "./component/client_dashboard/ClientProfile/ProfilePage"; // Import the ProfilePage component
import Layout from "./component/Layout"; // Import the Layout component

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
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/products" element={<Layout><ProductsComponent /></Layout>} />
        <Route path="/products/:id" element={<Layout><OneProduct /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/client_dashboard" element={isClientLoggedIn() ? <ClientDashboard />: <Navigate to="/login" />} />
        <Route path="/profile" element={isClientLoggedIn() ? <Layout> <ProfilePage /></Layout> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
