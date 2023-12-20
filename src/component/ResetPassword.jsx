import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/ResetPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../Assets/logo-4.gif"; //importing image

const ResetPasswordPage = () => {
  //getting token to reidrect the user to the reset password page
  const authResult = new URLSearchParams(window.location.search);
  const token = authResult.get("token");
  console.log(token);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setJwtToken(token);
  }, [token]);

  const [jwtToken, setJwtToken] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const API_URL =
      "http://65.20.74.140:8080/ReactJsGoogleMapWeb/api/reset_password";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        toast.success("Password reset successful", {
          onClose: () => {
            navigate("/LogIn");
          },
        });
      } else {
        toast.error("Password reset failed");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred while resetting the password");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  const handelLogIn = () => {
    navigate("/LogIn");
  };

  return (
    <div className="reset-outerContainer">
      <header>
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
          <button onClick={handelLogIn}>LogIn</button>
        </div>
      </header>
      <div className="reset-container">
        <ToastContainer
          position="top-right"
          autoClose={1000}
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
        <div className="password-profile-container">
          <div className="password-label-container">
            <label htmlFor="head">Reset Password</label>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            className="reset-password"
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            className="reset-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button id="btn" onClick={handleSubmit}>
            Change Password
          </button>
          <p className="forgot-password-link">
            <Link to="/LogIn">Return to Login Page</Link>
          </p>
        </div>
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

export default ResetPasswordPage;
