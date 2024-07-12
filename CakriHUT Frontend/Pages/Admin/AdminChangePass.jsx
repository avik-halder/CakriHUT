import React, { useState } from "react";
import "./Admin.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../Components/PostJob/PostJob.css";
import ChangePass from "../../Components/ChangePassword/ChangePass";




function AdminChangePass() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <ChangePass/>
      </div>
    </div>
  );
}

export default AdminChangePass;
