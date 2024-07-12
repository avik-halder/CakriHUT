import React, {useState} from 'react'
import "../Admin/Admin.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import EditProfile from '../../Components/Dashboard/EditProfile';

const AdminProfileEdit = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
      };
    
  return (
    <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <div className='col main-container'>
            <EditProfile/>
        </div>
      
    </div>
  )
}

export default AdminProfileEdit
