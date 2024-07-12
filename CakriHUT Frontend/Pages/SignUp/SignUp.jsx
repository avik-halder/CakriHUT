// import React from 'react'
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import './SignUp.css'

// import Navbar from "../../Components/Navbar/Navbar";
// import FooterDiv from "../../Components/FooterDiv/FooterDiv";
// import google from "../../Assests/google.png"
// import signup from "../../Assests/sign-up.svg"

// const SignUp = () => {

//   const navigate = useNavigate();

//   return (
//     <div>
//       <Navbar/>
//       <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       <div className="row border rounded-5 p-3 bg-white shadow box-area">
//         <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#00246B' }}>
//           <div className="featured-image mb-3">
//             <img src={signup} className="img-fluid" style={{ width: '400px' , margin: '0'}} alt="SignUp" />
//           </div>
//           <p className="text-white fs-2" style={{ fontFamily: 'Courier New, Courier, monospace', fontWeight: '600'}}>Be Verified</p>
//           <small className="text-white text-wrap text-center" style={{ width: '17rem', fontFamily: 'Courier New, Courier, monospace' }}>Share details and start journey with us.</small>
//         </div>

//         <div className="col-md-6 right-box">
//           <div className="row align-items-center">
//             <div className="header-text mb-4">
//               <h2>Sign Up</h2>
//               <p>Please share necessary details.</p>
//             </div>
//             <div className="input-group mb-3">
//               <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Username" />
//             </div>
//             <div className="input-group mb-3">
//               <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" />
//             </div>
//             <div className="input-group mb-3">
//               <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Enter Password" />
//             </div>
//             <div className="input-group mb-4">
//               <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Confirm Password" />
//             </div>

//             <div className="input-group">
//               <button className="btn btn-lg btn-primary w-100 fs-6" onClick={()=> navigate("/OTP")}>Sign Up</button>
//             </div>
//             <div className="input-group mb-3">
//               <button className="btn btn-lg btn-light w-100 fs-6" style={{ background: 'transparent', border: '1px solid black'}}>
//                 <img src={google} alt="Google Logo" style={{ width: '20px' }} className="me-2" />
//                 <small>Sign Up with Google</small>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//       <FooterDiv/>
//     </div>
//   )
// }

// export default SignUp

//******************** */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import "./SignUp.css";

import Navbar from "../../Components/Navbar/Navbar";
import FooterDiv from "../../Components/FooterDiv/FooterDiv";
import google from "../../Assests/google.png";
import signup from "../../Assests/sign-up.svg";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(API_URL + "/user_registration/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: username.toLowerCase(),
          mobile_number: mobileNumber,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // navigate("/OTP", { state: { email: email } });
        if (data.detail === "OTP Sent") {
          navigate("/OTP", { state: { email: email } });
        } else {
          alert(data.detail);
        }
      } else {
        setError(data.detail);
      }
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
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
                src={signup}
                className="img-fluid"
                style={{ width: "400px", margin: "0" }}
                alt="SignUp"
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
              Share details and start journey with us.
            </small>
          </div>

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Sign Up</h2>
                <p>Please share necessary details.</p>
                {error && <p className="text-danger">{error}</p>}
              </div>
              <form onSubmit={handleSignUp}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Username"
                    value={username.toLowerCase()}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <button
                    className="btn btn-lg btn-primary w-100 fs-6"
                    type="submit"
                  >
                    Sign Up {isLoading ? "Signing Up" : "Sign Up"}{" "}
                    {isLoading && <Spinner size="sm" animation="border" />}
                  </button>
                </div>
              </form>
              {/* <div className="input-group mb-3">
                <button className="btn btn-lg btn-light w-100 fs-6" style={{ background: 'transparent', border: '1px solid black' }}>
                  <img src={google} alt="Google Logo" style={{ width: '20px' }} className="me-2" />
                  <small>Sign Up with Google</small>
                </button>
              </div> */}
              <div className="row">
                <small>
                  Already have an account?{" "}
                  <Link to="/Login">
                    {" "}
                    <Badge
                      bg="warning"
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {" "}
                      Log in{" "}
                    </Badge>{" "}
                  </Link>
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

export default SignUp;
