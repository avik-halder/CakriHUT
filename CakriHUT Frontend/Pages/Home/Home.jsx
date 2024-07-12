import React from 'react'
import Body from '../../Components/Body/Body'
import Navbar from '../../Components/Navbar/Navbar'
import FooterDiv from '../../Components/FooterDiv/FooterDiv'
import SearchBar from '../../Components/SearchBar/SearchBar'

const Home = () => {
  return (
    <div>
        <Navbar/>
        {/* <SearchBar/> */}
        <Body/>
        <FooterDiv/>
    </div>
  )
}

export default Home
