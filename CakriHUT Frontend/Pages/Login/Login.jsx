import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Badge from 'react-bootstrap/Badge';

import "./Login.css";
import Navbar from "../../Components/Navbar/Navbar";
import FooterDiv from "../../Components/FooterDiv/FooterDiv";
import login from "../../Assests/login.png";
import google from "../../Assests/google.png";

const Login = () => {
  const navigate = useNavigate();

  const [user_name, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername");
    if (savedUsername) {
      setEmail(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your sign-in logic here
    const data = {
      user_name,
      password,
    };

    setLoading(true);
    try{
    const response = await fetch(API_URL + "/user_login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    const responseData = await response.json();
    
    // console.log(responseData);

    if (responseData.token_type == "bearer") {
      const token = responseData.access_token;
      document.cookie = `token=${token}`;
      localStorage.setItem("access_token", token);
      if (responseData.is_admin || responseData.super_admin) {
        navigate("/Admin");
      } else {
        navigate("/User");
      }
      // if (rememberMe) {
      //   localStorage.setItem("savedUsername", user_name);
      // } else {
      //   localStorage.removeItem("savedUsername");
      // }


    } else if (responseData.detail == "Please do the registration first") {
      alert("Please do the registration first");
    } else if (responseData.detail == "Activate your account by using OTP") {
      alert("Activate your account by using OTP");
    }
    else {
      alert("Invalid Username or Password.");
    }
  } catch (error) {
      alert("Failed to login. Please try again later.");
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
                src={login}
                className="img-fluid"
                style={{ width: "250px" }}
                alt="Login"
              />
            </div>
            <p
              className="text-white fs-2"
              style={{
                fontFamily: "Courier New, Courier, monospace",
                fontWeight: "600",
              }}
            >
              Be Verified
            </p>
            <small
              className="text-white text-wrap text-center"
              style={{
                width: "17rem",
                fontFamily: "Courier New, Courier, monospace",
              }}
            >
              Join experienced Designers on this platform.
            </small>
          </div>

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-3">
                <h2>Hello, Again</h2>
                <p>We are happy to have you back.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-1">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Username"
                    id="user_name"
                    value={user_name.toLowerCase()}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group mb-2">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input-group mb-5 d-flex justify-content-between">
                  <div className="form-check">
                    {/* <input
                      type="checkbox"
                      className="form-check-input"
                      id="formCheck"
                    /> */}
                    
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="formCheck"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />


                    <label
                      htmlFor="formCheck"
                      className="form-check-label text-secondary"
                    >
                      <small>Remember Me</small>
                    </label>
                  </div>
                  <div className="forgot">
                    <small>
                      <Link to="/fp">Forgot Password?</Link>
                    </small>
                  </div>
                </div>
                <div className="input-group mb-1">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100 fs-6"
                  >
                    {isLoading ? "Logging in" : "Log in"} {isLoading && <Spinner size="sm" animation="border" />}
                  </button>
                </div>
              </form>
              {/* <div className="input-group mb-3">
                <button
                  className="btn btn-lg btn-light w-100 fs-6"
                  style={{
                    background: "transparent",
                    border: "1px solid black",
                  }}
                >
                  <img
                    src={google}
                    alt="Google Logo"
                    style={{ width: "20px" }}
                    className="me-2"
                  />
                  <small>Sign In with Google</small>
                </button>
              </div> */}
              <div className="row">
                <small>
                  {/* Don't have an account? <Link to="/SignUp"> Sign Up</Link> */}
                  Don't have an account? <Link to="/SignUp"> <Badge bg="success" style={{color: "white", textDecoration: "none"}}> Sign Up </Badge></Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterDiv />
    </div>
  );
};

export default Login;