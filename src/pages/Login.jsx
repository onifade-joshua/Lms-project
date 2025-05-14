import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/cu-logo.jpg";
import { CircularProgress } from "@mui/material";
import { FaUser, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login method from AuthContext

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dummyUser = {
    email: "developer@example.com",
    password: "password123",
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Dummy auth logic
    if (
      formData.email === dummyUser.email &&
      formData.password === dummyUser.password
    ) {
      setTimeout(() => {
        localStorage.setItem("authToken", "fake-jwt-token");
        localStorage.setItem("userEmail", formData.email);
        login({ email: formData.email }); // Use login method from context
        navigate("/dashboard");
        setLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setErrorMessage("Invalid email or password.");
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="container-fluid login-page">
      <div className="row vh-100">
        {/* Left Section */}
        <div className="col-md-6 d-flex flex-column justify-content-center p-5 bg-light position-relative">
          {/* Logo */}
          <div className="logo-container position-absolute top-0 start-0 p-4">
            <img src={logo} alt="Logo" className="logo" style={{ width: "40px" }} />
          </div>

          <h2 className="fw-bold text-center mt-5" style={{ color: "#1d1b44" }}>LOGIN</h2>
          <p className="text-muted text-center">Welcome back! Please login to continue.</p>

          {errorMessage && (
            <div className="alert alert-danger text-center w-75 mx-auto mb-3">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-75 mx-auto">
            <div className="mb-3 input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="Email"
                required
                disabled={loading}
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-1 input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                required
                disabled={loading}
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Forgot Password */}
            <div className="text-end mb-3">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Logging in...
                </>
              ) : (
                "Login Now"
              )}
            </button>
          </form>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-dark fw-bold">Sign Up</Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="col-md-6 d-flex image-container justify-content-center align-items-center">
          <img src={logo} alt="Illustration" className="info-image" style={{ maxWidth: "80%", maxHeight: "80%" }} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
