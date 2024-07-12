import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import logo from "../../Assests/1.png";
import "../../Pages/Login/Login.css";
import Navbar from "../../Components/Navbar/Navbar";
import FooterDiv from "../../Components/FooterDiv/FooterDiv";
import { useUser } from "../../hooks/userHook";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ApplyJob = () => {
    const { sub } = useUser();
    const { id } = useParams();
    const [job, setJob] = useState();
    const [cvLink, setCvLink] = useState("");
    const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_URL + `/jobs/${id}`)
      .then((res) => setJob(res.data));
  }, []);


const handleApply = () => {
    axios
      .post(API_URL + `/user_apply_job/`, {
        user_name: sub, 
        link: cvLink,
        job_id: id
      })
      .then((response) => {
        console.log(response.data);
        alert("CV link sent successfully."); 
        setCvLink("");

      })
      .catch((error) => {
        console.error("Error applying for job:", error); // Handle error
      });
  };




  return (
    <div>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-5 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#729bec" }}
          >
            <div className="featured-image mb-3">
              <img src={logo} className="img-fluid user" alt="Login" />
            </div>
          </div>

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
            {job && (
              <div>
                <h1>{job.title}</h1>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Job Description:</strong> {job.description}</p>
              </div>
            )}
            </div>
            
            <input
              type="text"
              className="form-control form-control-lg bg-light fs-6"
              placeholder="CV link (drive link preferable)"
              value={cvLink}
              onChange={(e) => setCvLink(e.target.value)}
            />
            <Button variant="primary verify-btn" onClick={handleApply}>Apply Now</Button>{" "}
          </div>
        </div>
      </div>
      <FooterDiv />
    </div>
  );
};

export default ApplyJob;
