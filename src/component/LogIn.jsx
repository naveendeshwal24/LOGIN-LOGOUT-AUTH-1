import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./AuthProvider";
import "../Styles/LogIn.css";
import logo from "../Assets/logo-4.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken, setIsLoggedin } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      const response = await fetch(
        "http://65.20.74.140:8080/ReactJsGoogleMapWeb/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.accessToken;

        // Store token in localStorage
        localStorage.setItem("token", jwtToken);

        // Update context values
        setIsLoggedin(true);
        setToken(jwtToken);

        toast.success("Login successful!", {
          onClose: () => {
            navigate("/MasterList");
          },
        });
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Error during login");
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/signup");
  };

  const handleKeyPress = (e) => {
    // Trigger handleLogin on Enter key press
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="outer-container">
      <header className="login-header">
        <div className="logo-container">
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
        <div className="buttons-container">
          <button onClick={handleSignUpRedirect}>SignUp</button>
        </div>
      </header>
      <div className="login-container">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="profile-container">
          <div className="label-container">
            <label htmlFor="head">LogIn</label>
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button id="btn" onClick={handleLogin}>
            Submit
          </button>
          <p className="signup-link" onClick={handleSignUpRedirect}>
            Don't have an account? Sign up here.
          </p>
          <p className="forgot-password-link">
            <Link to="/ForgotPassword">Forgot Password?</Link>
          </p>
          {/* <button onClick={handleLogout}>Logout</button> */}
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

export default Login;
