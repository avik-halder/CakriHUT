import React from "react";
import {
  BsGrid1X2Fill,
  BsPeopleFill,
  BsListCheck,
  BsPencilSquare
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/userHook";
import logo from "../../Assests/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useSwipeable } from 'react-swipeable';

import Admin from "./Admin";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const { is_admin, super_admin } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");    
  };

  const handleClick = () => {
    if (openSidebarToggle) {
      OpenSidebar();
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (openSidebarToggle) {
        OpenSidebar();
      }
    },
    onSwipedRight: () => {
      if (!openSidebarToggle) {
        OpenSidebar();
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
      {...swipeHandlers}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <img
            className="logo"
            src={logo}
            alt="Logo"
            style={{ marginLeft: "30px", height: "120px", width: "120px" }}
          />
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </span>
      </div>

      <ul className="sidebar-list">
        <Link to="/Admin" className="sidebar-Link" onClick={handleClick}>
          <li className="sidebar-list-item">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </li>
        </Link>

        <Link to="/jobList" className="sidebar-Link" onClick={handleClick}>
          <li className="sidebar-list-item">
            <BsListCheck className="icon" /> Job List
          </li>
        </Link>

        <Link to="/createJobAdmin" className="sidebar-Link" onClick={handleClick}>
          <li className="sidebar-list-item">
            <BsPencilSquare className="icon" /> Create Job
          </li>
        </Link>

        {super_admin && (
          <Link to="/manageUser" className="sidebar-Link" onClick={handleClick}>
            <li className="sidebar-list-item">
              <BsPeopleFill className="icon" /> Manage Users
            </li>
          </Link>
        )}

        <Link to='/' onClick={() => {handleLogout(); handleClick();}} className="sidebar-Link">
          <li className="sidebar-list-item">
            <i className="fa-solid fa-right-from-bracket" /> Log Out
          </li>
        </Link>
      </ul>
    </aside>
  );
}

export default Sidebar;