import React, { useState } from "react";
import "../Styles/ForgotPassword.css";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../Assets/logo-4.gif"; //importing gif

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!email) {
      setMessage("Email is required");
      return;
    }

    const APIURL =
      "http://65.20.74.140:8080/ReactJsGoogleMapWeb/api/forgot_password";

    try {
      const response = await fetch(APIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Password reset instructions sent to your email", {
          onClose: () => {
            navigate("/LogIn");
          },
        });
      } else {
        toast.error("Failed to send password reset instructions");
      }
    } catch (error) {
      toast.error("Error during password reset");
    }
  };

  const handleLogin = () => {
    navigate("/LogIn");
  };
  const handelSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <div className="forgot-container">
      <header className="forgot-header">
        <div class="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/LandingPage">Home</Link>
            </li>
            <li>
              <Link to="/LandingPage">About</Link>
            </li>
            <li>
              <Link to="/RegistrationForm">List</Link>
            </li>
          </ul>
        </nav>
        <div class="buttons-container">
          <button onClick={handelSignUp}>SignUp</button>
        </div>
      </header>
      <ToastContainer
        position="top-right"
        autoClose={1000} // Set to false for the toast to stay open
        interval={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="forgot-password-container">
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Enter registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {message && <p className="message">{message}</p>}
        <p className="reset-link" onClick={handleLogin}>
          Remember your password? Login here.
        </p>
        <button onClick={handleResetPassword}>Reset Password</button>
      </div>
      <footer className="login-footer">
        <div className="login-footer-content">
          <div className="social-icons">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPassword;
