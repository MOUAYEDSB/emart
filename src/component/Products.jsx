import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/action/productActions'; 
import defaultImage from './defaultImage.jpg'; 
const ProductsComponent = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      console.log("Fetched Products: ", products); // Log fetched products
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const productSpring = useSpring({
    opacity: scrollY >= 70 ? 1 : 0,
    transform: `translateY(${scrollY > 100 ? 5 : 0}px)`,
    config: { mass: 0.5, tension: 200, friction: 100 },
  });

  const filterProducts = (productCategory) => {
    if (productCategory === "all") {
      setFilteredProducts(products);
    } else {
      const updatedList = products.filter((x) => x.category === productCategory);
      setFilteredProducts(updatedList);
    }
  };

  const renderImages = (product) => {
    const imageSrc = `http://localhost:5000/${product.images[0]?.replace(/\\/g, '/') || './defaultImage.jpg'}`;
    console.log("Image Source: ", imageSrc); // Log the image source
    
    return (
      <img
        className="card-img-top"
        src={imageSrc}
        alt={product.title}
        height="250px"
        onError={(e) => {
          console.error("Image load error for URL: ", e.target.src); // Log the error with the image URL
          e.target.onerror = null; // Prevent looping
          e.target.src = defaultImage; // Use the imported default image
        }}
      />
    );
  };

  return (
    <div>
      <animated.div className="container my-5 py-5" style={productSpring}>
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="buttons d-flex justify-content-center mb-5 pb-5">
            <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("all")}>
              All
            </button>
            <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("men's clothing")}>
              Men's Clothing
            </button>
            <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("women's clothing")}>
              Women's Clothing
            </button>
            <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("kids")}>
              Kids
            </button>
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="dark" />
            </div>
          ) : error ? (
            <div className="text-center text-danger">
              <p>{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center">
              <p>No products found.</p>
            </div>
          ) : (
            <animated.div className="row" style={productSpring}>
              {filteredProducts.map((product) => (
                <div key={product._id} className="col-md-3 mb-4">
                  <div className="card h-100 text-center p-4">
                    {renderImages(product)}
                    <div className="card-body">
                      <h5 className="card-title mb-0">
                        {product.title.substring(0, 12)}...
                      </h5>
                      <p className="card-text lead fw-bold">${product.price}</p>
                      <NavLink
                        to={`/products/${product._id}`}
                        className="btn btn-outline-dark"
                      >
                        Buy Now
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </animated.div>
          )}
        </div>
      </animated.div>
    </div>
  );
};

export default ProductsComponent;
