import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

 import './Admin.css'

 import logo from "../../Assests/logo.png"
const Header = ({OpenSidebar}) => {

  return (
    <header className='header'>
        <div className='menu-icon'>
            {/* <i className="fa-solid fa-bars" onClick={OpenSidebar} style={{color: "#ffffff"}}/> */}
            <FontAwesomeIcon icon={faBars} onClick={OpenSidebar} style={{color: "#ffffff"}}/>
        </div>
        <img className="logo" id="headLogo" src={logo} alt="Logo"/>
    </header>
  )
}

export default Header;