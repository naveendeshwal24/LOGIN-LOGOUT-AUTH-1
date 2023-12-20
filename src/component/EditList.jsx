import React, { useState, useEffect } from "react";
import "../Styles/EditList.css";
import { useNavigate, useParams } from "react-router-dom";

const EditList = () => {
  const { id } = useParams(); // Fetching the Id from the route parameters
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    state: "",
    gender: "",
    productImages: {
      imageUrl: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const APIURL = `http://62.171.153.83:8080/UserRegistrationForm/user/search1?id=${id}`;
        const response = await fetch(APIURL, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        // Check if key properties exist in responseData
        if (
          responseData &&
          responseData.data &&
          responseData.data.users &&
          responseData.data.users.length > 0
        ) {
          // Find the user with the matching
          const userId = Number(id);
          const userWithMatchingId = responseData.data.users.find(
            (user) => user.id === userId //convert ID to number
          );
          console.log("before sending data to API");
          setFormData({
            id: String(userWithMatchingId.id),
            name: userWithMatchingId.name,
            gender: userWithMatchingId.gender,
            state: userWithMatchingId.state,
            productImages: {
              imageUrl: userWithMatchingId.productImages?.imageUrl,
            },
          });
        } else {
          console.error(
            "Response data is empty or missing expected properties:",
            responseData
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // EditUdpate Logic
  const handleUpdateClick = async () => {
    const formDataToUpdate = {
      name: formData.name,
      gender: formData.gender,
      state: formData.state,
    };

    console.log("before API call", id);

    const APIURL = `http://62.171.153.83:8080/UserRegistrationForm/user/update/${id}`;

    try {
      const response = await fetch(APIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToUpdate),
      });

      console.log("data", formDataToUpdate);

      if (response.ok) {
        alert("Record updated successfully");
        navigate("/MasterList");
      } else {
        console.error("Error updating record");
      }
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  return (
    <div className="container">
      <h2>Update Record</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <label>ID:</label>
            </td>
            <td>
              <input type="text" name="id" value={formData.id} readOnly />
            </td>
          </tr>
          <tr>
            <td>
              <label>Photo:</label>
            </td>
            <td>
              <img
                src={formData.productImages.imageUrl}
                alt={`Photo of ${formData.name}`}
                style={{ width: "3rem", height: "3rem" }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Name:</label>
            </td>
            <td>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Gender:</label>
            </td>
            <td>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>State:</label>
            </td>
            <td>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleUpdateClick}>Submit</button>
    </div>
  );
};

export default EditList;
