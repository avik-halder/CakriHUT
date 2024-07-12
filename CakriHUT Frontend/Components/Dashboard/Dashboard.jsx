import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import user from "../../Assests/user.png";
import { useUser } from "../../hooks/userHook";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faKey } from '@fortawesome/free-solid-svg-icons';
import ChangePass from "../../Components/ChangePassword/ChangePass";
import "./Dashboard.css"

const Dashboard = () => {
  const { sub, email, is_admin, super_admin } = useUser();
  const navigate = useNavigate();
  const [showChangePassModal, setShowChangePassModal] = useState(false);

  const handleCloseModal = () => setShowChangePassModal(false);
  const handleShowModal = () => setShowChangePassModal(true);


  const handleChangePassword = () => {
    if (is_admin || super_admin) {
      handleShowModal();
    } else {
      navigate("/fp");
    }
  };

  const getRoleLabel = () => {
    if (super_admin) {
      return "Super Admin";
    } else if (is_admin) {
      return "Admin";
    } else {
      return "User";
    }
  };

  const edit = () =>{
    if(is_admin || super_admin){
      navigate("/AdminProfileEdit");
    }
    else{
      navigate("/userProfileEdit");
    }
  }

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-50">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-5 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#729bec" }}
          >
            <div className="featured-image mb-3">
              <img src={user} className="img-fluid user" alt="Login" />
            </div>
          </div>

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-3">
                <h2>Hello, {sub}!</h2>
                <p>We are happy to have you.</p>
              </div>
              <Table
                responsive="sm"
                className="dashTable"
              >
                <tbody>
                  <tr>
                    <td style={{ width: "30%" }}>Username:</td>
                    <td>{sub}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "30%" }}>Role:</td>
                    <td>{getRoleLabel()}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "30%" }}>Email:</td>
                    <td>{email}</td>
                  </tr>
                </tbody>
              </Table>
              <span style={{padding: "0"}}>
                <Button className="btn btn-primary" id="changePass" onClick={edit}><FontAwesomeIcon icon={faUserPen}/> Edit</Button>
                <Button id="changePass" onClick={handleChangePassword}>
                <FontAwesomeIcon icon={faKey} /> Change Password
                </Button>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showChangePassModal} onHide={handleCloseModal} centered className="edit-profile-modal">
        {/* <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <ChangePass onCloseModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;