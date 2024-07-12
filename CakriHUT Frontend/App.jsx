import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import User from "./Pages/User/User";
import OTP from "./Pages/OTP/OTP";
import Contact from "./Pages/Contact/Contact";
import PostJob from "./Components/PostJob/PostJob";
import Admin from "./Pages/Admin/Admin";
import Profile from "./Pages/User/Profile";
import ForgetPassword from "./Pages/OTP/ForgetPassword";
import ApplyJob from "./Pages/User/ApplyJob";
import Job_list from "./Pages/Admin/Job_list";
import JobDetails from "./Pages/Admin/JobDetails";
import AdminCreateJob from "./Pages/Admin/AdminCreateJob";
import ManageUsers from "./Pages/SuperAdmin/ManageUsers";
import PrivateRoute from "./hooks/PrivateRoute";
import AdminChangePass from "./Pages/Admin/AdminChangePass";
import UserRoute from "./hooks/UserRoute";
import EditProfile from "./Components/Dashboard/EditProfile";
import UserEditProfile from "./Pages/User/UserEditProfile";
import AdminProfileEdit from "./Pages/Admin/AdminProfileEdit";

const App = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false); // Added state for sidebar toggle

  const handleSidebarToggle = () => { // Added function to toggle sidebar state
    setOpenSidebarToggle(prevState => !prevState);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/OTP" element={<OTP />} />
          <Route exact path="/ep" element={<EditProfile/>} />

          {/* User part starts */}

          <Route exact path="/User" element={<UserRoute> <User /> </UserRoute> } />
          <Route exact path="/PostJob" element={<UserRoute> <PostJob /> </UserRoute>} />
          <Route exact path="/Profile" element={<UserRoute> <Profile /> </UserRoute>} />
          <Route exact path="/fp" element={<UserRoute> <ForgetPassword /> </UserRoute>} />
          <Route exact path="/jobs/:id" element={<UserRoute> <ApplyJob /> </UserRoute>} />
          <Route exact path="/userProfileEdit" element={<UserRoute> <UserEditProfile/> </UserRoute>} />

          {/* User part starts */}
          
          
          {/* Admin Part Starts */}

          <Route exact path="/jobList" element={<PrivateRoute> <Job_list OpenSidebar={handleSidebarToggle} openSidebarToggle={openSidebarToggle}/> </PrivateRoute>} />
          <Route exact path="/jobDetails/:id" element={<PrivateRoute> <JobDetails/> </PrivateRoute>} />
          <Route exact path="/createJobAdmin" element={<PrivateRoute> <AdminCreateJob/> </PrivateRoute>} />
          <Route exact path="/manageUser" element={<PrivateRoute> <ManageUsers/> </PrivateRoute>} />
          <Route exact path="/Admin" element={<PrivateRoute> <Admin /> </PrivateRoute>}/>
          <Route exact path="/AdminCngPass" element={<PrivateRoute> <AdminChangePass/> </PrivateRoute>}/>
          <Route exact path="/AdminProfileEdit" element={<PrivateRoute> <AdminProfileEdit/> </PrivateRoute>}/>

          {/* Admin Part Ends */}

        </Routes>
      </Router>
    </div>
  );
};

export default App;
