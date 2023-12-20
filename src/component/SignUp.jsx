import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../Assets/logo-4.gif"; //importing image

const SignUp = () => {
  const [contactname, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!contactname || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must match");
      return;
    }

    const signUpData = {
      contactname,
      email,
      password,
    };

    try {
      const response = await fetch(
        "http://65.20.74.140:8080/ReactJsGoogleMapWeb/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        }
      );
      console.log(signUpData);
      console.log("response status:", response.status);
      console.log("response body:", response);
      if (response.status === 409) {
        // HTTP status 409 indicates user already exist
        toast.error(`User with email ${email} already exists`);
      } else if (response.ok) {
        toast.success("Sign up successful! You can now login.", {
          onClose: () => {
            // Redirect to the login page after the toast is closed
            handleLoginRedirect();
          },
        });
      } else {
        // Sign up failed
        toast.error("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("Error during sign up");
    }
  };
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleKeyPress = (e) => {
    // Trigger handleSignUp on Enter key press
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  return (
    <div className="outer-container">
      <header className="signup-header">
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
              <Link to="/RegistrationForm">Registration</Link>
            </li>
          </ul>
        </nav>
        <div class="buttons-container">
          <button onClick={handleLoginRedirect}>LogIn</button>
        </div>
      </header>
      <div className="signup-container">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          interval={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
          role="alert"
        />
        <div className="profile-container">
          <h1>Sign Up</h1>
          <input
            type="text"
            placeholder="Enter Name"
            value={contactname}
            onChange={(e) => setContactName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            enterKeyHint=""
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={handleKeyPress} //key press event
          />
          <button id="btn" onClick={handleSignUp}>
            Sign Up
          </button>
          <p className="login-link" onClick={handleLoginRedirect}>
            Already have an account? Login here.
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

export default SignUp;
