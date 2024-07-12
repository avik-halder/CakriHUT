import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import FooterDiv from '../../Components/FooterDiv/FooterDiv'
import EditProfile from '../../Components/Dashboard/EditProfile'

const UserEditProfile = () => {
  return (
    <div>
      <Navbar/>
      <EditProfile/>
      <FooterDiv/>
    </div>
  )
}

export default UserEditProfile
