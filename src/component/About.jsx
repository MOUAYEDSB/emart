import React from "react";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div id="about-us">
      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-black fw-bold mb-4">About Us</h1>
            <p className="lead mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
              molestiae earum rem doloremque, nihil delectus ullam error
              consectetur? Dicta, non exercitationem in consectetur totam
              dolorum at voluptate laudantium aliquam, officiis perspiciatis
              molestias reiciendis consequuntur ullam perferendis velit
              blanditiis distinctio assumenda a maxime reprehenderit atque. Nam
              eius rerum distinctio, a illo earum, optio molestias nostrum
            </p>
            <NavLink to="/contact" className="btn btn-outline-dark px-3">
              Contact Us
            </NavLink>
          </div>
          <div className="col-md-6 d-flex justify-content-center p-4">
            <img
              src="/assets/about.png"
              alt="About Us"
              height="300px"
              width="300px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
