import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action"; // Ensure this is correct
import { getProductById } from "../redux/action/productActions"; // Ensure the import path is correct
import { useParams, NavLink } from "react-router-dom";
import { Spinner, Modal, Carousel } from "react-bootstrap";
import defaultImage from './defaultImage.jpg'; // Default image import

const OneProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Access product and loading state from Redux
  const { product, loading } = useSelector((state) => ({
    product: state.product.product,
    loading: state.product.loading,
  }));

  const [showModal, setShowModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleAddToCart = (product) => {
    dispatch(addCart(product)); // Dispatch the addCart action
  };

  useEffect(() => {
    dispatch(getProductById(id)); // Dispatch action to fetch product details
  }, [dispatch, id]);

  // Render images safely
  const renderImages = (imgSrc) => {
    const imageUrl = imgSrc ? `http://localhost:5000/${imgSrc.replace(/\\/g, '/')}` : defaultImage;
    return (
      <img
        src={imageUrl}
        alt={product.title}
        height="400px"
        width="400px"
        className="mb-3"
        onClick={() => openModal(0)} // Open modal on click
        style={{ cursor: "pointer" }}
        onError={(e) => {
          e.target.onerror = null; // Prevent looping
          e.target.src = defaultImage; // Use default image on error
        }}
      />
    );
  };

  const openModal = (index) => {
    setCarouselIndex(index);
    setShowModal(true);
  };

  const handleSelect = (selectedIndex) => {
    setCarouselIndex(selectedIndex);
  };

  // Check if product is available
  const images = product && product.images ? product.images : [];

  return (
    <div>
      <div className="container py-5">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <>
            {product ? (
              <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                  {/* Thumbnails on the Left */}
                  <div className="d-flex flex-column align-items-center me-3">
                    {images.map((img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5000/${img.replace(/\\/g, '/')}`}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        height="100px"
                        width="100px"
                        onClick={() => openModal(index)}
                        className="mb-2 thumbnail"
                        style={{
                          cursor: "pointer",
                          border: product.images[0] === img ? "2px solid black" : "none",
                        }}
                        onError={(e) => {
                          e.target.onerror = null; // Prevent looping
                          e.target.src = defaultImage; // Use default image on error
                        }}
                      />
                    ))}
                  </div>

                  {/* Main Image */}
                  {renderImages(product.images[0])}
                </div>

                <div className="col-md-6">
                  <h4 className="text-uppercase text-black-50">{product.category}</h4>
                  <h1 className="display-5">{product.title}</h1>
                  <p className="lead">
                    Rating {product.rating && product.rating.rate}
                    <i className="fa fa-star"></i>
                  </p>
                  <h3 className="display-6 fw-bold my-4">${product.price}</h3>
                  <p className="lead">{product.description}</p>
                  <button
                    className="btn btn-outline-dark px-4 py-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>
                  <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
                    Go to Cart
                  </NavLink>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2>Product not found</h2>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal with Carousel for displaying larger images */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <Carousel activeIndex={carouselIndex} onSelect={handleSelect}>
            {images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={`http://localhost:5000/${img.replace(/\\/g, '/')}`}
                  alt={`Slide ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent looping
                    e.target.src = defaultImage; // Use default image on error
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OneProduct;
