import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel"; // Import FloatingLabel if not already imported
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/userHook";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css'

const EditProfile = () => {
  const { sub, email, mobile_number } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: sub,
    email: email,
    mobile_number: mobile_number,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("access_token");
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.put(
        API_URL + "/user_update/",
        formData,
        config
      );
     
      if (response.data.detail === "User updated successfully") {
        // if (response.data.access_token) {
        //   localStorage.setItem("access_token", response.data.access_token);
        // }
        localStorage.setItem("access_token", response.data.access_token);
        alert("Profile updated successfully!");
      } else if(response.data.detail === "Username already taken"){
        console.log(response.data.detail);
        alert("Username is already taken.");
      } else if(response.data.detail === "Email already in use"){
        console.log(response.data.detail);
        alert("Email is already taken.");
      } else if(response.data.detail === "Mobile number already in use"){
        console.log(response.data.detail);
        alert("Mobile Number is already taken.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
      localStorage.setItem("access_token", token);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center col-md-6">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div className="card-header p-3" style={{ borderRadius: "25px 25px 8px 8px" }}>
          {/* <h2 className="mb-2">Edit Profile!</h2> */}
          {/* <div className="featured-image">
              <img src={user} className="img-fluid user" alt="Login" />
            </div> */}
            <FontAwesomeIcon icon={faUserPen} style={{fontSize: "3rem", marginLeft: "20px"}} className="mb-2"/>
          <div>
              <small>Edit your details.</small>
            </div>
        </div>
        <Form onSubmit={handleSubmit} className="p-3">
          <FloatingLabel controlId="formUserName" label="Username" className="mb-3">
            <Form.Control
              type="text"
              name="user_name"
              value={formData.user_name.toLowerCase()}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="formEmail" label="Email" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="formMobileNumber" label="Mobile Number" className="mb-3">
            <Form.Control
              type="text"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />
          </FloatingLabel>

          <div className="editprofilebtn">
            <Button className="btn btn-primary" variant="primary" type="submit">
              Update Profile
            </Button>{' '}
          </div>

          {message && <p className="text-danger">{message}</p>}
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;