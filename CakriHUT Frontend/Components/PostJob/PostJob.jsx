import React from "react";
import Navbar from "../Navbar/Navbar";
import FooterDiv from "../FooterDiv/FooterDiv";
import CreateJob from "../CreateJob/CreateJob";

const PostJob = () => {

  return (
    <div>
      <Navbar />
      <CreateJob/>
      <FooterDiv />
    </div>
  );
};

export default PostJob;
