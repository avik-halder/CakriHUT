import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./OTP.css";
import Navbar from "../../Components/Navbar/Navbar";
import FooterDiv from "../../Components/FooterDiv/FooterDiv";
import img from "../../Assests/mobile.png";

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [error, setError] = useState("");
  
  const email = location.state?.email || "*****@gmail.com";

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
    return () => clearInterval(interval);
  }, [seconds, minutes]);

  const handleVerify = async () => {
    try {
      const response = await fetch(API_URL + `/user_verify_otp/${email}/${otp}`);
      const data = await response.json();
      if (response.status === 200) {
        if (data.detail === "OTP used") {
          alert("User has been verified.");
          navigate("/login");
        } else {
          setError(data.detail);
        }
      } else {
        setError(data.detail);
      }
    } catch (error) {
      setError("An error occurred during OTP verification. Please try again.");
    }
  };
  
  const resendOTP = async () => {
    try {
      const response = await fetch(API_URL + `/user_resend_otp/${email}`);
      const data = await response.json();
      if (response.status === 200) {
        setMinutes(1);
        setSeconds(30);
        setError("");
      } else {
        setError(data.detail);
      }
    } catch (error) {
      setError("An error occurred while resending OTP. Please try again.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleVerify();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [otp, email]);

  return (
    <div>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card text-center">
          <div className="card-header p-4 m-2" style={{ borderRadius: "25px 25px 15px 15px" }}>
            <img src={img} alt="OTP Verification" />
            <h4 className="mb-2">OTP VERIFICATION</h4>
            <div>
              <small>An OTP has been sent to {email}</small>
            </div>
          </div>

          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={({ target }) => setOtp(target.value)}
          />
          {error && <p className="text-danger">{error}</p>}
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
            <Button variant="primary verify-btn" onClick={handleVerify}>
              Verify
            </Button>
          </div>
        </div>
      </div>
      <FooterDiv />
    </div>
  );
};

export default OTP;