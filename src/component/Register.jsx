import React, { useState, useEffect } from "react";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/action/userActions";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { loading, error, success } = useSelector((state) => state.register); // Access loading, error, and success from the register reducer

  // Local state for form inputs
  const [formData, setFormData] = useState({
    name: "",
    prenom: "",
    email: "",
    password: "",
    phone: "",
  });

  const { name, prenom, email, password, phone } = formData;

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch registerUser action with form data
    dispatch(registerUser({ name, prenom, email, password, phone }));
  };

  // Redirect to login page if registration is successful
  useEffect(() => {
    if (success) {
      navigate("/Login");
    }
  }, [success, navigate]); // Dependency array includes success and navigate

  return (
    <section className="register">
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-start"
        style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
      >
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Register and Elevate Your Style <br />
                <span className="text-primary"> Exclusively</span>
              </h1>
              <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                Create an account to enjoy a personalized shopping experience and fast checkout.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="form3Example1">
                            First Name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example2"
                            className="form-control"
                            name="prenom"
                            value={prenom}
                            onChange={handleChange}
                            required
                          />
                          <label className="form-label" htmlFor="form3Example2">
                            Last Name
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="form3Example3">
                        Email Address
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="tel"
                        id="form3Example5"
                        className="form-control"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="form3Example5">
                        Phone Number
                      </label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        className="form-check-input-dark me-2"
                        type="checkbox"
                        value=""
                        id="form2Example33"
                        checked
                      />
                      <label className="form-check-label" htmlFor="form2Example33">
                        Subscribe to our newsletter
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-dark btn-block mb-4"
                      disabled={loading} // Disable button if loading
                    >
                      {loading ? 'Registering...' : 'Register'}
                    </button>

                    {error && <p className="text-danger">{error}</p>} {/* Show error message */}
                    {success && <p className="text-success">Registration successful! Redirecting...</p>} {/* Show success message */}

                    <div className="text-center">
                      <p>or sign up with:</p>
                      <button
                        type="button"
                        className="btn btn-link-dark btn-floating mx-1"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link-dark btn-floating mx-1"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
