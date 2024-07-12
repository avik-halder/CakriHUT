import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import FooterDiv from "../../Components/FooterDiv/FooterDiv";
import ChangePass from "../../Components/ChangePassword/ChangePass";
import "./OTP.css";

const ForgetPassword = () => {

  return (
    <div>
      <Navbar />
      <ChangePass />
      <FooterDiv />
    </div>
  );
};

export default ForgetPassword;
