import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import img from "../../Assests/mobile.png";
import "../../Pages/OTP/OTP.css";
import { jwtDecode } from "jwt-decode";

const ChangePass = ({ onCloseModal }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [password, setPass] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [showOtp, setShowOtp] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const user = jwtDecode(token);
        setEmail(user.email);
        sendOtp(user.email).then(() => setOtpSent(true));
    }
    else{
      handleSubmit();
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpSent) {
      await sendOtp(email);
      setOtpSent(true);
    } else {
      alert("OTP is already sent to your email. Check it!");
    }
  };
  
  
  const route = () => {
    const token = localStorage.getItem("access_token");
    const user = jwtDecode(token);
    if (!token) {
      navigate("/Login");
    } else if (token) {
      if (!user.is_admin && !user.super_admin) {
        navigate("/Profile");
      } else if (user.is_admin || user.super_admin) {
        onCloseModal();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const sendOtp = async (email) => {
    setLoading(true);
    const response = await fetch(`http://127.0.0.1:8000/send/otp/${email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    
    setLoading(false);
    const responseData = await response.json();
    console.log("Response data:", responseData);

    if (responseData.detail === "OTP Sent") {
      alert("Check Your Email, We Sent an OTP");
      setShowOtp(true);
      setIsSubmitted(true);
      setIsEditable(false);
      setMinutes(1);
      setSeconds(59);
      return Promise.resolve();
    } else if (responseData.detail === "Not Registered") {
      alert("You Are Not Registered. Create Account atfirst.");
    } else if (responseData.detail === "Email already exists") {
      alert("OTP is already sent to your Email. Check it!");
      setShowOtp(true);
      setIsSubmitted(true);
      return Promise.resolve();
    } else {
      alert("Something Went Wrong!! Try Again Later");
      return Promise.reject();
    }
  };
  
  


  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      otp,
    };
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    const response = await fetch(API_URL + `/change/password/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const resData = await response.json();
    if (resData.detail === "Changed") {
      alert("Password Changed Successfully");
      route();
    } else {
      alert("Password doesn't Changed.");
    }
  };

  const resendOTP = async () => {
    try {
      const response = await fetch(API_URL + `/user_resend_otp/${email}`);
      const data = await response.json();
      if (response.status === 200) {
        setMinutes(1);
        setSeconds(30);
      } else {
        alert(data.detail);
      }
    } catch (error) {
      alert("An error occurred while resending OTP. Please try again.");
    }
  };

  const handleEnterPress = (e, actionFunction) => {
    if (e.key === "Enter") {
      e.preventDefault();
      actionFunction(e);
    }
  };

  return (

      <div className="d-flex justify-content-center align-items-center">
        <div className="card text-center">
          <div className="card-header p-4 m-2" style={{ borderRadius: "25px 25px 15px 15px" }}>
            <img src={img} style={{ width: "120px" }} alt="mobile icon" />
            <h4 className="mb-2">Change Password!</h4>
            <div>
              <small>Set a new password to login into your account.</small>
            </div>
          </div>

          {!isEditable ? (
            <input type="email" value={email} readOnly />
          ) : (
            <input
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => handleEnterPress(e, handleSubmit)}
              readOnly={!isEditable}
              required
            />
          )}

          {!isSubmitted && (
            <div className="mt-3 mb-3">
              <Button variant="primary verify-btn" onClick={handleSubmit}>
                {isLoading ? "Sending OTP" : "Send OTP"} {isLoading && <Spinner size="sm" animation="border" />}
              </Button>{" "}
            </div>
          )}

          {showOtp && (
            <div>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                onKeyDown={(e) => handleEnterPress(e, handleVerifyOTP)}
                placeholder="Enter OTP"
                required
              />
              <br />
              <input
                type="password"
                id="pass"
                name="pass"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Set Your New Password"
                required
              />
              <br />
              <input
                type="password"
                id="confirmPass"
                name="confirmPass"
                value={confirmPassword}
                onChange={(e) => setConfirmPass(e.target.value)}
                onKeyDown={(e) => handleEnterPress(e, handleVerifyOTP)}
                placeholder="Confirm New Password"
                required
              />
              <div className="countdown-text">
                <p>
                  Time Remaining:{" "}
                  <span style={{ fontWeight: 600 }}>
                    {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </span>
                </p>
                <button
                  disabled={seconds > 0 || minutes > 0}
                  style={{
                    color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5638",
                  }}
                  onClick={resendOTP}
                >
                  Resend OTP
                </button>
              </div>
              <div className="mt-3 mb-3">
                <Button variant="primary verify-btn" onClick={handleVerifyOTP} style={{ width: "100%" }}>
                  Change Password {isLoading && <Spinner size="sm" animation="border" />}
                </Button>{" "}
              </div>
            </div>
          )}
        </div>
      </div>

  );
};

export default ChangePass;