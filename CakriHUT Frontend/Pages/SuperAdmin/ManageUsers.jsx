import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Admin/Admin.css";
import Header from "../Admin/Header";
import Sidebar from "../Admin/Sidebar";
import Table from 'react-bootstrap/Table';

import { FaSearch } from 'react-icons/fa';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [selectedLine, setSelectedLine] = useState('All');  // State to manage the selected line

  useEffect(() => {
    fetchUsers();
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL + '/users/', {
        headers: { Authorization: "Bearer " + localStorage.getItem("access_token") }
      });
      const sortedUsers = response.data.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
      setUsers(sortedUsers);
      setFilteredUsers(sortedUsers);
      countRoles(sortedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleMakeSuperAdmin = async (userName) => {
    try {
      await axios.put(API_URL + `/make_super_admin/${userName}`, {}, {
        headers: { Authorization: "Bearer " + localStorage.getItem("access_token") }
      });
      fetchUsers(); 
    } catch (error) {
      console.error('Error making super admin:', error);
    }
  };

  const handleMakeAdmin = async (userName) => {
    try {
      await axios.put(API_URL + `/make_admin/${userName}`, {}, {
        headers: { Authorization: "Bearer " + localStorage.getItem("access_token") }
      });
      fetchUsers(); 
    } catch (error) {
      console.error('Error making admin:', error);
    }
  };

  const handleMakeUser = async (userName) => {
    try {
      await axios.put(API_URL + `/make_user/${userName}`, {}, {
        headers: { Authorization: "Bearer " + localStorage.getItem("access_token") }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error making user:', error);
    }
  };

  const handleDeleteUser = async (userName) => {
    try {
      await axios.delete(API_URL + `/delete_user/${userName}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("access_token") }
      });
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const countRoles = (users) => {
    let userCount = 0;
    let adminCount = 0;
    let superAdminCount = 0;
    
    users.forEach(user => {
      if (user.super_admin) {
        superAdminCount++;
      } else if (user.is_admin) {
        adminCount++;
      } else {
        userCount++;
      }
    });

    const countsByDate = {};
    users.forEach(user => {
      const date = new Date(user.creation_date).toLocaleDateString();
      if (!countsByDate[date]) {
        countsByDate[date] = { date, userCount: 0, adminCount: 0, superAdminCount: 0 };
      }
      if (user.super_admin) {
        countsByDate[date].superAdminCount++;
      } else if (user.is_admin) {
        countsByDate[date].adminCount++;
      } else {
        countsByDate[date].userCount++;
      }
    });

    const chartData = Object.values(countsByDate).map(({ date, userCount, adminCount, superAdminCount }) => ({
      name: date,
      Users: userCount,
      Admins: adminCount,
      'Super Admins': superAdminCount
    }));
    setChartData(chartData);

    const pieData = [
      { name: 'Users', value: userCount },
      { name: 'Admins', value: adminCount },
      { name: 'Super Admins', value: superAdminCount }
    ];
    setPieData(pieData);
  };

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(user => {
      const role = user.super_admin ? 'super admin' : user.is_admin ? 'admin' : 'user';
      return (
        user.user_name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.mobile_number.toLowerCase().includes(query) ||
        role.toLowerCase().includes(query)
      );
    });
    
    setFilteredUsers(filtered);
  };

  const handleLegendClick = (dataKey) => {
    setSelectedLine(prevSelectedLine => (prevSelectedLine === dataKey ? 'All' : dataKey));
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className='col main-container'>
        <h1 className="text-center Title">User Management</h1>

        <div className="row mt-4" style={{justifyContent: "center"}}>
          <div className="col-lg-5 col-sm-5 chart-container">
            
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
          </div>

          <div className="col-lg-6 col-sm-12 chart-container">
            <div className='charts'>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="name" allowDuplicatedCategory={false} style={{fontSize: "12px"}}/>
                  <YAxis allowDataOverflow={false} style={{fontSize: "12px"}}/>
                  <Tooltip />
                  <Legend onClick={(e) => handleLegendClick(e.dataKey)} />
                  {(selectedLine === 'All' || selectedLine === 'Users') && (
                    <Line type="monotone" dataKey="Users" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={3} />
                  )}
                  {(selectedLine === 'All' || selectedLine === 'Admins') && (
                    <Line type="monotone" dataKey="Admins" stroke="#82ca9d" strokeWidth={3} />
                  )}
                  {(selectedLine === 'All' || selectedLine === 'Super Admins') && (
                    <Line type="monotone" dataKey="Super Admins" stroke="#ffc658" strokeWidth={3} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="search-container" style={{marginBottom: "3px"}}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by username, email, mobile number, or role"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        
        <div className="table-responsive">
          <Table striped bordered hover className='tableForJobList'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.user_name}>
                  <td>{user.user_name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile_number}</td>
                  <td>
                    {user.super_admin ? 'Super Admin' : user.is_admin ? 'Admin' : 'User'}
                  </td>
                  <td>
                    {!user.super_admin && (
                      <button onClick={() => handleMakeSuperAdmin(user.user_name)} className="btn btn-primary" id="joblist" style={{ backgroundColor: "orange", color: "black" }}>
                        Make Super Admin
                      </button>
                    )}
                    {!user.is_admin && (
                      <button onClick={() => handleMakeAdmin(user.user_name)} className="btn btn-primary" id="joblist" style={{ backgroundColor: "seagreen" }}>
                        Make Admin
                      </button>
                    )}
                    {(user.super_admin || user.is_admin) && (
                      <button onClick={() => handleMakeUser(user.user_name)} className="btn btn-primary" id="joblist" style={{ backgroundColor: "#8884d8" }}>
                        Make User
                      </button>
                    )}
                    <button onClick={() => handleDeleteUser(user.user_name)} className="btn btn-primary" id="joblist" style={{ backgroundColor: "brown" }}>
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;