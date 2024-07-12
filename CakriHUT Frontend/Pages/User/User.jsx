import React from "react";
import Body from "../../Components/Body/Body";
import Navbar from "../../Components/Navbar/Navbar";
import FooterDiv from "../../Components/FooterDiv/FooterDiv";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUser } from "../../hooks/userHook";
import ApplyJob from "./ApplyJob";

const User = () => {
  const { sub } = useUser();
  
  return (
    <div>
      <Navbar />
      {/* <SearchBar /> */}
      <Body>
      </Body>
      <FooterDiv />
    </div>
  );
};
export default User;
