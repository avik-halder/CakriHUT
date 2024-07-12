import React, { useEffect  } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    // if (!token) {
    //   navigate("/");
    // }
    try {
      const user = jwtDecode(token);

      if ((!user.is_admin && !user.super_admin)) {
        navigate("/User");
      }
      else if(user.is_admin){
        // if(location.pathname === "/jobList" || location.pathname === "/createJobAdmin"){
        //   return;
        // }
        // else if(location.pathname === "/manageUser"){
        //   navigate("/Admin");
        // }
        if(location.pathname === "/manageUser"){
          navigate("/Admin");
        }
      }
    } catch (error) {
      
    }
  }, [location, navigate]);

  return children;
};

export default PrivateRoute;