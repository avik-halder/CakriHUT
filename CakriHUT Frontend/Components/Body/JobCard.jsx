import React from "react";
import logo from "../../Assests/1.png";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const JobCard = ({ jobId, title, location, company, salary }) => {
  return (
    <Col>
      <Card className="cardB" style={{ borderRadius: "20px" }}>
        <Card.Img
          style={{ width: "30%", height: "30%" }}
          variant="top"
          src={logo}
          alt="company-logo"
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Company: {company}</Card.Text>
          <Card.Text>Job Location: {location}</Card.Text>
          <Card.Text>Salary: {salary}</Card.Text>
          <Link to={`/jobs/${jobId}`} className="btn btn-primary">
            Apply Now
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default JobCard;
