import React, { useState } from "react";
import { useUser } from "../../hooks/userHook";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "../PostJob/PostJob.css";
import { Form, Button, FloatingLabel } from "react-bootstrap";

const CreateJob = () => {
  const { sub, is_admin, super_admin } = useUser();
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [currency, setCurrency] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let salaryWithCurrency = `${currency} ${salary}`;

    const jobData = {
      title: jobTitle,
      company: companyName,
      location: location,
      category: jobCategory,
      salary: salaryWithCurrency,
      description: jobDescription,
      user_name: sub
    };
    console.log(jobData);
    console.log(JSON.stringify(jobData));

    try {
      setLoading(true);
      const response = await fetch(API_URL + "/user_create_job/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();
      console.log("Response from API:", data);
      if (data.detail == "Job posted") {
        setLoading(false);
        alert("Job posted successfully.");
        setJobTitle("");
        setCompanyName("");
        setLocation("");
        setSalary("");
        setJobDescription("");
        setJobCategory("");
        setCurrency("");
        if(!is_admin && !super_admin){
          navigate("/User");
        }
      } else {
        setError(data.detail);
      }
    } catch (error) {
      console.error("Error occurred while posting job:", error);
      setError("An error occurred while posting the job. Please try again.");
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center col-md-6">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div
          className="card-header p-3"
          style={{ borderRadius: "25px 25px 15px 15px" }}
        >
          <h2 className="mb-2">Create Job!</h2>
          <div>
            <small>Help us to enrich our Job Database</small>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Job Title"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Company Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingSelect"
            label="Location"
            className="mb-3"
          >
            <Form.Select
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select location</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Faridpur">Faridpur</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Khulna">Khulna</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Barisal">Barisal</option>
              <option value="Comilla">Comilla</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Cox's Bazar">Cox's Bazar</option>
              <option value="Jessore">Jessore</option>
              <option value="London">London</option>
              <option value="New York">New York</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Singapore">Singapore</option>
              <option value="Sydney">Sydney</option>
              {/* Add more options as needed */}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingSelect"
            label="Job Category"
            className="mb-3"
          >
            <Form.Select
              value={jobCategory}
              onChange={(e) => setJobCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Web Development">Web Development</option>
              <option value="Software Development">Software Development</option>
              <option value="Education">Education</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Sales">Sales</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Finance">Finance</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Healthcare">Healthcare</option>
              {/* Add more options as needed */}
            </Form.Select>
          </FloatingLabel>

          {/* <FloatingLabel
              controlId="floatingInput"
              label="Salary"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </FloatingLabel> */}

          <div className="salary-currency-container mb-4">
            <FloatingLabel
              controlId="floatingInput"
              label="Salary"
              className="salary-floating-label mt-2"
            >
              <Form.Control
                type="text"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="salaryLebel"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingSelect"
              label="Currency"
              className="currency-floating-label mt-1"
            >
              <Form.Select value={currency} onChange={handleCurrencyChange}>
                <option value="">Currency</option>
                <option value="৳">Taka (৳)</option>
                <option value="$">Dollar ($)</option>
                <option value="£">Pound (£)</option>
              </Form.Select>
            </FloatingLabel>
          </div>

          <FloatingLabel controlId="floatingTextarea2" label="Job Description">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </FloatingLabel>
          {error && <p className="text-danger">{error}</p>}
          <div className="mt-5 mb-3 submitjob">
            <Button className="btn btn-primary" variant="primary" type="submit">
              {isLoading ? "Submitting Job" : "Submit"} {isLoading && <Spinner size="sm" animation="border" />}
              {/* <span className="postjob">
              </span> */}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateJob;
