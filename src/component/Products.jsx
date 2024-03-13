import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NoItemsAlert from "./noItemsAlert";
import { useSpring, animated } from "react-spring";

const ProductsComponent = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasItems, setHasItems] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const productSpring = useSpring({
    opacity: scrollY >= 70 ? 1 : 0,
    transform: `translateY(${scrollY > 100 ? 5 : 5}px)`,
    config: { mass: 0.5, tension: 200, friction: 100 },
  });

  const filterProduct = (productCategory) => {
    const updatedList = data.filter((x) => x.category === productCategory);

    if (updatedList.length !== 0) {
      setHasItems(true);
      setFilter(updatedList);
    } else {
      setHasItems(false);
    }
  };

  useEffect(() => {
    let componentMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        if (componentMounted) {
          setData(products);
          setFilter(products);
          setLoading(false);
          if (products.length !== 0) {
            setHasItems(true);
          } else {
            setHasItems(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      componentMounted = false;
    };
  }, []);

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
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => setFilter(data)}
            >
              All
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => filterProduct("men's clothing")}
            >
              Men's Clothing
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => filterProduct("women's clothing")}
            >
              Women's Clothing
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => filterProduct("kids")}
            >
              Kids
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => filterProduct("electronics")}
            >
              Electronics
            </button>
            <button
              className="btn btn-outline-dark me-2"
              onClick={() => filterProduct("jewelery")}
            >
              Jewelry
            </button>
          </div>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="dark" />
            </div>
          ) : hasItems === false ? (
            <div className="text-center">
              <NoItemsAlert />
            </div>
          ) : (
            <animated.div className="row" style={productSpring}>
              {filter.map((product) => (
                <div key={product.id} className="col-md-3 mb-4">
                  <div className="card h-100 text-center p-4">
                    <img
                      className="card-img-top"
                      src={product.image}
                      alt={product.title}
                      height="250px"
                    />
                    <div className="card-body">
                      <h5 className="card-title mb-0">
                        {product.title.substring(0, 12)}...
                      </h5>
                      <p className="card-text lead fw-bold">${product.price}</p>
                      <NavLink
                        to={`/products/${product.id}`}
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
