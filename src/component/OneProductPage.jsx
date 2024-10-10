import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { addCart } from "../redux/action";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const OneProduct = () => {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  return (
    <div>
      <div className="container py-5">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <>
            <div className="row pt-">
              <div className="col-md-6">
                <img
                  src={product.image}
                  alt={product.title}
                  height="400px"
                  width="400px"
                />
              </div>
              <div className="col-md-6">
                <h4 className="text-uppercase text-black-50">
                  {product.category}
                </h4>
                <h1 className="display-5">{product.title}</h1>
                <p className="lead">
                  Rating {product.rating && product.rating.rate}
                  <i className="fa fa-star"></i>
                </p>
                <h3 className="display-6 fw-blod my-4">${product.price}</h3>
                <p className="lead">{product.description}</p>
                <button className="btn btn-outline-dark px-4 py-2"
                onClick={()=>addProduct(product)}>
                  Add to cart
                </button>
                <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
                  Go to Cart
                </NavLink>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OneProduct;
