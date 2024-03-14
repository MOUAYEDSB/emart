import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import ProductsComponent from "./component/Products";
import OneProduct from "./component/OneProductPage";
import Login from "./component/Login";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Cart from "./component/CartPage";
// import Footer from "./component/Footer"

const Layout = ({ children }) => {
  const location = useLocation();

  const showNavbar = location.pathname !== "/login";

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
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
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
