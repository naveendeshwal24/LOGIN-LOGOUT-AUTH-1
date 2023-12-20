import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import "../Styles/LandingPage.css";
import logo from "../Assets/logo-4.gif"; //importing image

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentBusinessImage, setCurrentBusinessImage] = useState(0);
  const [businessImages, setBusinessImages] = useState([]);
  const [currentCarouselImage, setCurrentCarouselImage] = useState(0);
  const [carouselImages, setCarouselImages] = useState([]);
  const carouselAutoplayInterval = 5000;

  useEffect(() => {
    const defaultBusinessImages = [
      "https://img.freepik.com/free-photo/rear-view-programmer-working-all-night-long_1098-18697.jpg?size=626&ext=jpg&ga=GA1.1.1968550463.1702876529&semt=ais",
      "https://img.freepik.com/free-photo/programming-background-collage_23-2149901774.jpg?size=626&ext=jpg&ga=GA1.1.1968550463.1702876529&semt=ais",
      "https://img.freepik.com/free-photo/person-with-futuristic-metaverse-avatar-mask_23-2149699831.jpg?size=626&ext=jpg&ga=GA1.1.1968550463.1702876529&semt=ais",
    ];

    setBusinessImages(defaultBusinessImages);

    const defaultCarouselImages = [
      "https://img.freepik.com/premium-photo/programming-background-with-person-working-with-codes-computer_23-2150010148.jpg?size=626&ext=jpg&ga=GA1.1.1968550463.1702876529&semt=ais",
      "https://img.freepik.com/free-photo/programming-background-collage_23-2149901783.jpg?size=626&ext=jpg&ga=GA1.1.1968550463.1702876529&semt=ais",
      "https://img.freepik.com/premium-photo/analyst-coding_236854-21688.jpg?size=626&ext=jpg&ga=GA1.1.1968550463.1702876529&semt=ais",
    ];

    setCarouselImages(defaultCarouselImages);
  }, []);

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      handleBusinessImageChange(currentBusinessImage + 1);
      handleCarouselImageChange(currentCarouselImage + 1);
    }, carouselAutoplayInterval);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [currentBusinessImage, currentCarouselImage]);

  const handleBusinessImageChange = (index) => {
    setCurrentBusinessImage(
      (index + businessImages.length) % businessImages.length
    );
  };

  const handleCarouselImageChange = (index) => {
    setCurrentCarouselImage(
      (index + carouselImages.length) % carouselImages.length
    );
  };

  const redirectToLogin = () => {
    navigate("/LogIn");
  };

  const redirectToSignup = () => {
    navigate("/SignUp");
  };

  return (
    <div className="landing-container">
      <header>
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
          <button onClick={redirectToLogin}>Login</button>
          <button onClick={redirectToSignup}>Sign Up</button>
        </div>
      </header>

      <main>
        <section className="carousel-section">
          <img
            src={carouselImages[currentCarouselImage]}
            alt="Carousel image"
            className="carousel-image"
          />
          <div
            className="arrow left"
            onClick={() => handleCarouselImageChange(currentCarouselImage - 1)}
          >
            &#8249;
          </div>
          <div
            className="arrow right"
            onClick={() => handleCarouselImageChange(currentCarouselImage + 1)}
          >
            &#8250;
          </div>
        </section>

        <section className="business-section">
          <h2>Data Testing</h2>
          <div className="business-images">
            {businessImages.map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  alt={`Business Image ${index + 1}`}
                  className="business-image"
                />
                <div className="business-text">
                  <p>
                    Uncover hidden patterns and trends within your data through
                    our advanced analysis techniques. {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-content">
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

export default LandingPage;
