import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import FooterDiv from '../../Components/FooterDiv/FooterDiv'
import Dashboard from '../../Components/Dashboard/Dashboard'
import { useLocation } from 'react-router-dom'

const Profile = () => {
  return (
    <div>
      <Navbar/>
      <Dashboard/>
      <FooterDiv/>
    </div>
  )
}

export default Profile
