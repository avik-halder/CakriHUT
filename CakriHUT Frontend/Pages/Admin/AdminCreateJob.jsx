import React, { useState } from "react";
import "./Admin.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../Components/PostJob/PostJob.css";
import CreateJob from "../../Components/CreateJob/CreateJob";



function AdminCreateJob() {
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
        <span style={{margin: "0"}}>
          <CreateJob />
        </span>
      </div>
    </div>
  );
}

export default AdminCreateJob;
