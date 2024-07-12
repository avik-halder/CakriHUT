import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const UserRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    try {
      const user = jwtDecode(token);

      if ((user.is_admin || user.super_admin)) {
        navigate("/Admin");
      }
      else{
        return;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, [location, navigate]);

  return children;
};

export default UserRoute;