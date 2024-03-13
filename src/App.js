import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import ProductsComponent from "./component/Products";
import OneProduct from "./component/OneProductPage";
import LoginPage from "./component/loginPage";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Cart from "./component/CartPage";
// import Footer from "./component/Footer"

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsComponent />} />
          <Route path="/products/:id" element={<OneProduct />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        {/* <Footer /> */}
      </>
    </Router>
  );
}

export default App;
