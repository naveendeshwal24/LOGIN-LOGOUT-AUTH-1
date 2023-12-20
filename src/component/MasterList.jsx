import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "../Styles/MasterList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../Assets/logo-4.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MasterList = () => {
  const initialFilters = { name: "", gender: "", state: "" };
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showNoRecordsPopup, setShowNoRecordsPopup] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(!!localStorage.getItem("token"));

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const APIURL = `http://62.171.153.83:8080/UserRegistrationForm/user/search1`;
    try {
      const response = await fetch(APIURL);
      const responseData = await response.json();

      const data = Array.isArray(responseData.data.users)
        ? responseData.data.users
        : [responseData.data.users];

      setOriginalData(data);
      setFilteredData(data);

      if (data.ok) {
        console.log("records fetched successfully");
      } else {
        console.log("error fetching the records", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = () => {
    const filteredResults = originalData.filter((data) => {
      const nameMatch = data.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const genderMatch =
        filters.gender === "" ||
        data.gender.toLowerCase() === filters.gender.toLowerCase();
      const stateMatch = filters.state === "" || data.state === filters.state;

      return nameMatch && genderMatch && stateMatch;
    });
    setFilteredData(filteredResults);

    setShowNoRecordsPopup(filteredResults.length === 0);
    setCurrentPage(1);
  };

  const closeNoRecordsPopup = () => {
    setShowNoRecordsPopup(false);
  };

  const handleEditClick = (id) => {
    navigate(`/EditList/${id}`);
  };

  const handleDeleteClick = async (id) => {
    const APIURL = `http://62.171.153.83:8080/UserRegistrationForm/user/${id}`;
    try {
      const response = await fetch(APIURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchData();
        alert("Record deleted successfully");
      } else {
        console.error("Error deleting record");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    if (!isLoggedin) {
      toast.success("LogOut Successfully");
    }
  }, [isLoggedin]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    toast.success("LogOut Successfully");
    navigate("/LogIn", { replace: true });
  };

  return (
    <div>
      <header className="registrationform-header">
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
              <Link to="/RegistrationForm">List</Link>
            </li>
          </ul>
        </nav>
        <div className="buttons-container">
          {isLoggedin ? (
            <button onClick={handleLogOut}>LogOut</button>
          ) : (
            <Link to="/LogIn">LogIn</Link>
          )}
        </div>
      </header>
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
      <div className="container">
        <label> Filters</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Enter Employee name"
        />
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          name="state"
          value={filters.state}
          onChange={handleFilterChange}
        >
          <option value="">Select State</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Delhi">Delhi</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>
        <button id="btnsrc" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="tableContainer">
        <h2>List of Registered Users</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Reg. No.</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Gender</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="5">No records found</td>
              </tr>
            ) : (
              currentItems.map((data) => (
                <tr key={data && data.id}>
                  <td>{data && data.id}</td>
                  <td>
                    <img
                      src={
                        data &&
                        data.productImages &&
                        data.productImages.imageUrl
                      }
                      alt={`Photo of ${data && data.name}`}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{data && data.name ? data.name : "N/A"}</td>
                  <td>{data && data.gender ? data.gender : "N/A"}</td>
                  <td>{data && data.state ? data.state : "N/A"}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleEditClick(data.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(data.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div>{/* Pagination and other components */}</div>
      {showNoRecordsPopup && (
        <div className="popup">
          <p>No records found.</p>
          <button onClick={closeNoRecordsPopup}>Close</button>
        </div>
      )}
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

export default MasterList;
