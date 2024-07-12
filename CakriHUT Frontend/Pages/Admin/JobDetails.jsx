import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const JobDetails = ({ jobId, onClose }) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJobDetails(jobId);
  }, [jobId]);

  const fetchJobDetails = async (id) => {
    try {
      const response = await axios.get(API_URL + `/jobDetails/${id}`);
      setJob(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = format(new Date(dateString), 'dd-MM-yyyy');
    const time = format(new Date(dateString), 'HH:mm:ss');
    return { date, time };
  };

  if (!job) return null;

  const { date, time } = formatDate(job.created_at);

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content"  style={{backgroundColor: "rgb(203, 211, 240)"}}>
          <div className="modal-header" style={{backgroundColor: "#00246b"}}>
            <h3 className="modal-title" style={{color: "white"}}>{job.title}</h3>
            <button type="button" className="btn-close custom-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Company :</strong> {job.company}</p>
            <p><strong>Location :</strong> {job.location}</p>
            <p><strong>Salary :</strong> {job.salary}</p>
            <p><strong>Job Description :</strong> {job.description}</p>
            <p><strong>Posted by : </strong> {job.user_name}</p>
            <p><strong>Creation Date : </strong> <span className="date">{date}</span> <span className='big-space'></span><strong>, Time:</strong> <span className="time">{time}</span> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;