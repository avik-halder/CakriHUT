import React from 'react'

const Copy_of_PostJob = () => {
  return (
    <div>
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
                type= "text"
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
              <FloatingLabel controlId="floatingInput" label="Salary" className="salary-floating-label mt-2">
                <Form.Control
                  type="text"
                  placeholder="Salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="salaryLebel"
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingSelect" label="Currency" className="currency-floating-label mt-1">
                <Form.Select
                  value={currency}
                  onChange={handleCurrencyChange}
                >
                  <option value="">Currency</option>
                  <option value="৳">Taka (৳)</option>
                  <option value="$">Dollar ($)</option>
                  <option value="£">Pound (£)</option>
                </Form.Select>
              </FloatingLabel>
            </div>


            <FloatingLabel
              controlId="floatingTextarea2"
              label="Job Description"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </FloatingLabel>
            {error && <p className="text-danger">{error}</p>}
            <div
              className="mt-5 mb-3 submitjob"
              
            >
              <Button className="btn btn-primary" variant="primary" type="submit">
                <span className="postjob">Submit</span>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Copy_of_PostJob
