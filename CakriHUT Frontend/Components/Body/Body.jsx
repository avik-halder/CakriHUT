import React from "react";
import Row from "react-bootstrap/Row";
import "./Body.css";
import axios from "axios";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import SearchBar from "../SearchBar/SearchBar";

const Body = () => {
  const [jobs, setJobs] = useState();
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    axios.get(API_URL + "/jobs/", {
      headers: {Authorization: "Bearer " + localStorage.getItem("access_token")}
    }).then((res) => {
      const approvedJobs = res.data.filter(job => job.is_approved);
      const sortedJobs = approvedJobs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setJobs(sortedJobs);
      setFilteredJobs(sortedJobs.slice(0, 6)); // Initialize filteredJobs with all jobs
    })
    .catch((error) => {
      console.error("Error fetching jobs:", error);
    });
  }, []);

  const handleSearch = (category, location) => {
    if (category === "" && location === "") {
      // If both category and location are empty, show the latest 6 jobs
      setFilteredJobs(jobs.slice(0, 6));
    } else {
      // Filter jobs based on category and location
      const filtered = jobs.filter(
        (job) =>
          (category === "" || job.category === category) &&
          (location === "" || job.location === location)
      );
      setFilteredJobs(filtered);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="container">
        <h2 className="heading">Latest Job Listings</h2>
        <Row xs={1} md={3} className="g-4">
          {jobs &&
            filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  jobId={job.id}
                  title={job.title}
                  location={job.location}
                  company={job.company}
                  salary={job.salary}
                />
            ))}
        </Row>
      </div>
    </>
  );
};

export default Body;