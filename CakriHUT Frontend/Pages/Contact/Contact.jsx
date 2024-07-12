import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import signup from "../../Assests/sign-up.svg";
import contact from "../../Assests/contact.png";

import "../SignUp/SignUp.css";
import "./Contact.css";
import Navbar from "../../Components/Navbar/Navbar";
import FooterDiv from "../../Components/FooterDiv/FooterDiv";
import { useUser } from "../../hooks/userHook";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contactData = {
      email: email,
      message: message,
    };

    try {
      const response = await fetch(API_URL + "/contact_us/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setFormSubmitted(true);
      setError(null);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setError("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#00246B" }}
          >
            <div className="featured-image mb-3">
              <img
                src={contact}
                className="img-fluid"
                style={{ width: "400px", margin: "0" }}
                alt="Contact"
              />
            </div>
            <div style={{ color: "white" }}>
              <p>
                <i className="fa-solid fa-phone-volume"></i> +8801798709761
              </p>
              <p>
                <i className="fa-solid fa-envelope"></i> cakrihut@gmail.com
              </p>
              <p>
                <i className="fa-solid fa-paper-plane"></i> Kaliakoir, Gazipur
              </p>
            </div>
          </div>

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Contact Us</h2>
                <p>Get in touch with us.</p>
              </div>
              {formSubmitted ? (
                <div className="alert alert-success" role="alert">
                  Thanks for your feedback!
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Enter your Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Group>
                  {error && <div className="alert alert-danger" role="alert">{error}</div>}
                  <div className="input-group">
                    <button className="btn btn-lg btn-primary w-100 fs-6" type="submit">
                      Send
                    </button>
                  </div>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterDiv />
    </div>
  );
};

export default Contact;
