import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.css";

import logo from "../../Assests/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const Home = () => {
    if (location.pathname !== "/Contact" && 
        location.pathname !== "/Admin" && 
        location.pathname !== "/fp" &&
        !location.pathname.startsWith("/jobs/")) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to={getHomeLink()}>
            <i className="fas fa-home"></i> Home
          </Link>
        </li>
        // <div className="nav-item">
        //   <button className="nav-link" onClick={() => navigate(getHomeLink())}>
        //     Home
        //   </button>
        // </div>
      );
    }
    return null;
  };

  const getHomeLink = () => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
      return "/";
    } else if (currentPath === "/User" || currentPath === "/PostJob" || currentPath === "/Profile" || currentPath.startsWith("/jobs/") || currentPath === "/userProfileEdit") {
      return "/User";
    } else if (currentPath === "/Contact" || currentPath === "/fp") {
      return null;
    } else if (currentPath === "/Admin") return "/Admin";
    return "/";
  };

  const renderLoginLink = () => {
    if (
      location.pathname !== "/Login" &&
      location.pathname !== "/SignUp" &&
      location.pathname !== "/User" &&
      location.pathname !== "/Contact" &&
      location.pathname !== "/OTP" &&
      location.pathname !== "/PostJob" &&
      location.pathname !== "/fp" &&
      location.pathname !== "/Profile" &&
      !location.pathname.startsWith("/jobs/") &&
      location.pathname !== "/userProfileEdit"
    ) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/Login">
            <i className="fas fa-user"></i> Login/SignUp
          </Link>
        </li>
      );
    }
    return null;
  };

  const contact = () => {
    const currentPath = window.location.pathname;
    if (
      location.pathname !== "/Contact" &&
      location.pathname !== "/PostJob"
    ) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/Contact">
            <i className="fas fa-phone"></i> Contact
          </Link>
        </li>
      );
    }
    return null;
  };

  const checkPostJob = () => {
    // const currentPath = window.location.pathname;
    // if (currentPath === "/") {
    //   return "/Login";
    // } else if (currentPath === "/User" || currentPath === "/Profile" || currentPath.startsWith("/jobs/")) {
    //   return "/PostJob";
    // }
    // return "/Login";
    return "/PostJob";
  };

  const PostJob = () => {
    if (
      location.pathname !== "/Contact" &&
      location.pathname !== "/PostJob" &&
      location.pathname !== "/fp" &&
      location.pathname !== "/Admin"
    ) {
      return (
        <li>
          <Link className="btn btn-primary" to={checkPostJob()} role="button">
            <i className="far fa-edit"></i> <strong>Post Job</strong>
          </Link>
        </li>
        // <button className="btn btn-primary" onClick={checkPostJob()}><i className="far fa-edit"/> Post Job</button>
      );
    }
    return null;
  };

  const renderProfile = () => {
    const navigate = useNavigate()
    if (location.pathname === "/User" || location.pathname === "/PostJob" || location.pathname === "/Profile" || location.pathname === "/userProfileEdit") {
      return (
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={{
              color: "#00246b",
              border: "3px solid white",
              borderRadius: "50px",
              backgroundColor: "#729bec",
            }}
          >
            <i className="fa-regular fa-user"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as="div" onClick={() => {navigate('/Profile')}}>
              <i className="fa-solid fa-user"></i> Profile
            </Dropdown.Item>
            <Dropdown.Item as="div"
              onClick={() => {
                localStorage.removeItem("access_token")
                navigate('/')
              }}
            >
              <i className="fa-solid fa-right-from-bracket" />Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };
  const templates = () => {
    if (location.pathname !== "/Admin") {
      return (
        <NavDropdown
          title={
            <span>
              <i className="fas fa-address-card"></i> Tempaltes
            </span>
          }
          id="collapsible-nav-dropdown"
        >
          <NavDropdown.Item href="/dash">CV Templates</NavDropdown.Item>
          <NavDropdown.Item href="/createJob">Resume Template</NavDropdown.Item>
        </NavDropdown>
      );
    }
    return null;
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to={getHomeLink()} className="navbar-brand">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon custom-close"
            style={{ color: "white !important" }}
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {Home()}
            {renderLoginLink()}
            {templates()}
            {contact()}
            {PostJob()}
            {renderProfile()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
