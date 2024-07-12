import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import "./Admin.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Table from 'react-bootstrap/Table';
import JobDetails from './JobDetails';
import { FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faFileCircleCheck, faFileCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Job_list = ({ OpenSidebar, openSidebarToggle }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [approvedJobs, setApprovedJobs] = useState(0);
  const [jobsPerCategory, setJobsPerCategory] = useState({});
  const [jobsPerDayPerCategory, setJobsPerDayPerCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showJobs, setShowJobs] = useState(false);


  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(API_URL + '/jobs/', {
        headers: { Authorization: "Bearer " + localStorage.getItem("access_token") }
      });
      const jobsData = response.data;
      setJobs(jobsData);
      setFilteredJobs(jobsData); // Initialize filteredJobs with all jobs
      setTotalJobs(jobsData.length);
      setApprovedJobs(jobsData.filter(job => job.is_approved).length);
      setJobsPerCategory(calculateJobsPerCategory(jobsData));
      setJobsPerDayPerCategory(calculateJobsPerDayPerCategory(jobsData));
      setShowJobs(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const calculateJobsPerCategory = (jobs) => {
    const jobsByCategory = {};
    jobs.forEach(job => {
      const category = job.category;
      jobsByCategory[category] = (jobsByCategory[category] || 0) + 1;
    });

    return jobsByCategory;
  };

  const calculateJobsPerDayPerCategory = (jobs) => {
    const jobsByDay = {};
    jobs.forEach(job => {
      const date = new Date(job.created_at).toLocaleDateString();
      if (!jobsByDay[date]) {
        jobsByDay[date] = {};
      }
      if (!jobsByDay[date][job.category]) {
        jobsByDay[date][job.category] = 0;
      }
      jobsByDay[date][job.category]++;
    });

    return jobsByDay;
  };

  const handleApproveJob = async (jobId) => {
    try {
      await axios.put(API_URL + `/approve_job/${jobId}`);
      fetchJobs(); // Refresh job list after approval
    } catch (error) {
      console.error('Error approving job:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(API_URL + `/delete_job/${jobId}`);
      fetchJobs(); // Refresh job list after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleShowJobDetails = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleCloseModal = () => {
    setSelectedJobId(null);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = jobs.filter(job => {
      return (
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query)
      );
    });

    setFilteredJobs(filtered);
  };

  // Define fixed colors for categories
  const categoryColors = ['brown', 'seagreen', '#735ae5', '#00c9c9', 'hotpink', '#FFA500', '#800080'];

  const CategorybarChartData = {
    labels: Object.keys(jobsPerCategory),
    datasets: [{
      label: 'Total Jobs per category',
      data: Object.values(jobsPerCategory),
      backgroundColor: categoryColors.slice(0, Object.keys(jobsPerCategory).length),
      borderColor: categoryColors.slice(0, Object.keys(jobsPerCategory).length),
      borderWidth: 1,
    }]
  };

  const LineChartData = {
    labels: Object.keys(jobsPerDayPerCategory).sort((a, b) => new Date(a) - new Date(b)),
    datasets: Object.keys(jobsPerCategory).filter(category => selectedCategory === null || category === selectedCategory).map((category, index) => ({
      label: category,
      data: Object.keys(jobsPerDayPerCategory).sort((a, b) => new Date(a) - new Date(b)).map(date => jobsPerDayPerCategory[date][category] || 0),
      fill: false,
      borderColor: categoryColors[index % categoryColors.length],
      tension: 0.1
    }))
  };

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const category = CategorybarChartData.labels[index];
      setSelectedCategory(category === selectedCategory ? null : category);
    }
  };

  const handleTotalJobs = () => {
    setShowJobs(true);
    setFilteredJobs(jobs);
    const tableElement = document.getElementById('jobTable');
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleShowApprovedJobs = () => {
    setShowJobs(true);
    setFilteredJobs(jobs.filter(job => job.is_approved));
    const tableElement = document.getElementById('jobTable');
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePendingJobs = () => {
    setShowJobs(true);
    setFilteredJobs(jobs.filter(job => !job.is_approved));
    const tableElement = document.getElementById('jobTable');
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className='col main-container'>
        <h1 className="text-center mt-2 mb-3">Job Descriptions</h1>
        
        <Grid container spacing={2} className="stats-container">
          <Grid item xs={12} sm={6} md={4}>
            <Card className="stat-card totaljobs" onClick={handleTotalJobs} >
              <CardContent>
                <Typography variant="h6">
                  <span>Total Jobs <FontAwesomeIcon icon={faBriefcase}/></span>
                </Typography>
                <Typography variant="h4" component="div"><strong>{totalJobs}</strong></Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className="stat-card approvedjobs" onClick={handleShowApprovedJobs}>
              <CardContent>
                  <Typography variant="h6">
                    <span>Approved Jobs <FontAwesomeIcon icon={faFileCircleCheck} /></span>
                  </Typography>
                <Typography variant="h4" component="div"><strong>{approvedJobs}</strong></Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className="stat-card pendingjobs" onClick={handlePendingJobs} >
              <CardContent>
                <Typography variant="h6">
                  <span>Pending Jobs <FontAwesomeIcon icon={faFileCircleQuestion} bounce /></span>
                </Typography>
                <Typography variant="h4" component="div"><strong>{totalJobs - approvedJobs}</strong></Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        

        <div className="row mt-4 mb-5">
          <div className="col-lg-5 col-sm-5 chart-container BarChart">
            <div className="chart-container">
            <h4 className='text-center'>Total Jobs per Category</h4>
              <Bar 
                className='Bar'
                data={CategorybarChartData} 
                options={{ 
                  onClick: handleBarClick,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const category = context.label;
                          const totalJobs = context.raw;
                          return `Total Jobs in ${category}: ${totalJobs}`;
                        }
                      }
                    }
                  },
                  maintainAspectRatio: false, // Add this to allow height adjustment
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }} 
              />
            </div>
          </div>
          <div className="col-lg-7 col-sm-7 chart-container">
            <div className="chart-container">
            <h4 className='text-center'>Job Creation Per Day</h4>
              <Line 
                className='Line'
                data={LineChartData} 
                options={{
                  maintainAspectRatio: false, // Add this to allow height adjustment
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="search-container" style={{ marginBottom: "3px" }}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, company, or category"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        {/* Job Table */}
        <div className="table-responsive" id="jobTable">
          <Table striped bordered hover className='tableForJobList'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Category</th>
                <th>Job Details</th>
                <th>Approved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map(job => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.category}</td>
                  <td>
                    <button onClick={() => handleShowJobDetails(job.id)} className="btn btn-primary" id="joblist">
                      Show Details
                    </button>
                  </td>
                  <td>{job.is_approved ? 'Yes' : 'No'}</td>
                  <td>
                    {!job.is_approved && (
                      <button onClick={() => handleApproveJob(job.id)} className="btn btn-primary" id="joblist" style={{ backgroundColor: "seagreen" }}> Approve </button>
                    )}
                    <button onClick={() => handleDeleteJob(job.id)} className="btn btn-primary" id="joblist" style={{ backgroundColor: "darkred" }}> Delete </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {selectedJobId && <JobDetails jobId={selectedJobId} onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default Job_list;