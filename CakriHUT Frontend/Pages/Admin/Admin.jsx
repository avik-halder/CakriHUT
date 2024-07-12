import { useState } from "react";
import "./Admin.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../../Components/Dashboard/Dashboard";



const Admin = () => {
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
      <div className="main-container"><Dashboard/></div>
    </div>
  );
}

export default Admin;
