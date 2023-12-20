import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/RegistrationForm.css";
import "react-toastify/dist/ReactToastify.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../Assets/logo-4.gif"; //importing image

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    email: "",
    mobileNo: "",
    phoneNo: "",
    state: "",
    city: "",
    hobbies: "",
    photo: null,
    lat: null,
    lng: null,
    location: "DELHI",
    agreeTerms: false,
  });

  // State for setting geo coordinates based on searches
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [map, setMap] = useState(null);
  const [searchText, setSearchText] = useState("");
  const states = ["UP", "Delhi"];
  const cities = {
    UP: ["Noida", "Lucknow"],
    Delhi: ["New Delhi"],
  };

  const isFormComplete = () => {
    const requiredFields = [
      "name",
      "gender",
      "dob",
      "email",
      "mobileNo",
      "phoneNo",
      "state",
      "city",
      "hobbies",
      "photo",
      "location",
    ];

    // Validating that all the required fields are filled
    for (const field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (
      !validateContactNo(formData.mobileNo) ||
      !validateContactNo(formData.phoneNo)
    ) {
      alert("Please enter valid contact numbers.");
      return;
    }

    if (!isFormComplete()) {
      alert("Please fill in all required fields.");
      return;
    }

    handleFormSubmission();
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox" && name !== "agreeTerms") {
      const updatedHobbies = checked
        ? formData.hobbies
          ? `${formData.hobbies},${name}`
          : name
        : formData.hobbies
            .split(",")
            .filter((h) => h !== name)
            .join(",");
      setFormData((prevData) => ({
        ...prevData,
        hobbies: updatedHobbies,
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else if (name === "dob") {
      const currentDate = new Date();
      const selectedDate = new Date(value);

      if (selectedDate > currentDate) {
        alert("Please select a valid Date of Birth.");
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Handle agreeTerms separately
    if (name === "agreeTerms") {
      setFormData((prevData) => ({
        ...prevData,
        agreeTerms: checked,
      }));
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateContactNo = (contactNo) => {
    const regex = /^\d+$/;
    return regex.test(contactNo);
  };

  const handleFormSubmission = async () => {
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "photo" && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Checking whether the browser is offline or online
    const isOffline = !navigator.onLine;

    try {
      const APIURL =
        "http://65.20.74.140:8080/ReactJsGoogleMapWebRestApi/api/users";

      const response = await fetch(APIURL, {
        method: "POST",
        body: formDataToSend,
      });

      if (isOffline) {
        toast.error("You are Offline");
      } else if (response.ok) {
        toast.success("Record added successfully");
        navigate("/MasterList");
      } else {
        console.error("Error adding record. Status:", response.status);
        const errorMessage = await response.text();
        toast.error(`Error Details: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  // Map Loader
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCdAoXQ2RWPZZF71oywO6Zfc0RwXdPN57A",
    libraries: ["places"],
  });

  // Map Integration
  const mapContainerStyle = {
    width: "30vw",
    height: "50vh",
  };

  const center = {
    lat: 28.6139,
    lng: 77.209,
  };

  // Handling the search filter
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Handling Offline/Online popup
  useEffect(() => {
    const handleOnline = () => {
      toast.info("You are Connected to the Network");
    };

    const handleOffline = () => {
      toast.error("You are not connected to the Network");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const handleAutocomplete = () => {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        { input: searchText },
        (predictions, status) => {
          if (status === "OK" && predictions) {
            setAutocompleteResults(predictions);
          } else {
            setAutocompleteResults([]);
          }
        }
      );
    };

    if (searchText) {
      handleAutocomplete([]);
    }
  }, [searchText]);

  //for testing purpose

  useEffect(() => {
    console.log("formData.lat:", formData.lat);
    console.log("formData.lng:", formData.lng);
  }, [formData]);

  // Handling map loading
  const handleMapLoad = (map) => {
    setMap(map);
  };
  const handleLogIn = () => {
    navigate("/LogIn");
  };

  const handleAutocompleteSelect = (placeId) => {
    const service = new window.google.maps.places.PlacesService(map);

    service.getDetails({ placeId }, (place, status) => {
      if (
        status === "OK" &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
        const location = place.geometry.location;

        // Ensure that lat and lng are numbers
        const lat = parseFloat(location.lat());
        const lng = parseFloat(location.lng());

        if (!isNaN(lat) && !isNaN(lng)) {
          setFormData((prevData) => ({
            ...prevData,
            lat: lat.toString(),
            lng: lng.toString(),
          }));

          if (map) {
            map.panTo({ lat, lng });
          }

          setAutocompleteResults([]);
        } else {
          console.error("Invalid latitude or longitude values:", lat, lng);
        }
      } else {
        console.error("Error fetching place details:", status);
      }
    });
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="outer-container">
      <header className="registrationform-header">
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
          <button onClick={handleLogIn}>LogIn</button>
        </div>
      </header>
      <div className="registration-container">
        <ToastContainer
          position="top-left"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <form onSubmit={handleSubmit}>
          <h1 className="register-heading">Registration Form</h1>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={25}
          />
          <div className="gender-container">
            <label>Gender:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]} // restrict the future dates
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="contactContainer">
            <label htmlFor="mobileNo">Contact No:</label>
            <input
              type="tel"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              required
              maxLength={10}
              placeholder="mobile"
            />
            <input
              type="tel"
              id="phoneNo"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              required
              maxLength={10}
              placeholder="phone"
            />
          </div>
          <label htmlFor="state">State:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select State
            </option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <label htmlFor="city">City:</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select City
            </option>
            {formData.state &&
              cities[formData.state].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          <label>Hobbies:</label>
          <div className="hobbies-container">
            {["cricket", "football", "chess", "hockey"].map((hobby) => (
              <label key={hobby} className="checkbox-label">
                <input
                  type="checkbox"
                  name={hobby}
                  checked={formData.hobbies.includes(hobby)}
                  onChange={handleChange}
                />
                {hobby.charAt(0).toUpperCase() + hobby.slice(1)}
              </label>
            ))}
          </div>
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleChange}
            accept="image/*"
            required
          />
          {/* Map integration */}
          <label className="textLabel" htmlFor="googleMap">
            Find Location
          </label>
          <input
            list="locations"
            id="location"
            type="text"
            placeholder="Enter location"
            value={searchText}
            onChange={(e) => handleSearchChange(e)}
          />
          {/* dataList below to show the location based on the search data */}
          <datalist id="locations">
            {autocompleteResults.map((result) => (
              <option
                key={result.place_id}
                value={result.description}
                onClick={() => handleAutocompleteSelect(result.place_id)}
              >
                {result.description}
              </option>
            ))}
          </datalist>
          <div className="google-container">
            <GoogleMap
              key={`${formData.lat}-${formData.lng}`}
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={{
                lat: formData.lat !== null ? formData.lat : center.lat,
                lng: formData.lng !== null ? formData.lng : center.lng,
              }}
              onLoad={handleMapLoad}
            >
              {/* setting dynamic values to the position of marker if values are not fetched then center the location*/}
              <Marker
                position={{
                  lat: formData.lat !== null ? formData.lat : center.lat,
                  lng: formData.lng !== null ? formData.lng : center.lng,
                }}
              />
            </GoogleMap>
          </div>
          <label className="checkbox-label" htmlFor="agreeTerms">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              disabled={!isFormComplete()}
            />
            I agree to the terms and conditions
          </label>
          <button type="submit">Submit</button>
        </form>
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

export default RegistrationForm;
