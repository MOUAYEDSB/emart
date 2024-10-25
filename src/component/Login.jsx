import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/action/userActions";
import { NavLink, useNavigate } from "react-router-dom"; // Correct import statement

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const loginState = useSelector((state) => state.login);
  const { loading, error } = loginState;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .then(() => {
        // Check the role after a successful login
        const userRole = localStorage.getItem("userRole");
        if (userRole === "client") {
          navigate("/client_dashboard"); // Redirect to client dashboard
        } else {
          navigate("/dashboard"); // Redirect to another dashboard or home
        }
      })
      .catch((err) => {
        // Handle login failure, if necessary
        console.error(err);
      });
  };

  return (
    <section className="login">
      <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                WELCOME BACK <br />
                <span className="text-primary"> LET'S LOG IN </span>
              </h1>
              <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleLogin}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required // Make the input required
                      />
                      <label className="form-label" htmlFor="form3Example3">
                        Email address
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required // Make the input required
                      />
                      <label className="form-label" htmlFor="form3Example4">
                        Password
                      </label>
                    </div>

                    {loading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}

                    <button type="submit" className="btn btn-dark btn-block mb-4">
                      Log In
                    </button>

                    <div className="text-center">
                      <p>or sign in with:</p>
                      <button type="button" className="btn btn-link-dark btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                      </button>
                      <button type="button" className="btn btn-link-dark btn-floating mx-1">
                        <i className="fab fa-google"></i>
                      </button>
                      <button type="button" className="btn btn-link-dark btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                      </button>
                      <button type="button" className="btn btn-link-dark btn-floating mx-1">
                        <i className="fab fa-github"></i>
                      </button>
                    </div>

                    {/* Register Button */}
                    <div className="text-center mt-4">
                      <p>
                        Don't have an account?{" "}
                        <NavLink to="/register" className="text-primary">
                          Register here
                        </NavLink>
                      </p>
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

export default Login;
