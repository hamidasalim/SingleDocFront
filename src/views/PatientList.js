import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function PatientList() {
  const history = useHistory();

  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New searchQuery state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const fetchPatientList = async () => {
    try {
      const token = localStorage.getItem("token");
      const cleanedToken = token.substring(1, token.length - 1);
      const result = await fetch("http://localhost:8000/patient", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
      });
      const data = await result.json();
      setPatients(data);
    } catch (error) {
      console.log("Error fetching patient list:", error);
    }
  };



  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleRedirect = () => {
    history.push("/admin/list/patient");
  };

  useEffect(() => {
    fetchPatientList();
  }, []);







  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient);
    setShowDeleteModal(true);
  };
  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  const handleDeletePatient = async () => {
    try {
      const patientId = selectedPatient._id;
      const token = localStorage.getItem("token");
      const cleanedToken = token.substring(1, token.length - 1);
      const result = await fetch(`http://localhost:8000/patient/${patientId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
      });
      if (result.ok) {
        setPatients((prevPatients) => prevPatients.filter((patient) => patient._id !== selectedPatient._id));
      } else {
        console.log("Error deleting patient");
      }
    } catch (error) {
      console.log("Error deleting patient:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };













  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Patient List</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
              <Container className="searchbar">
                  <i className="nc-icon nc-zoom-split"></i>
                  <span className="d-lg-block"> Search</span>
                  <input
                    type="text"
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Container>
                <Button
                  className="btn btn-alert"
                  onClick={() => handleRedirect(true)}
                  style={{ marginLeft: "90%" }}
                >
                  New
                </Button>
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Patientname</th>  

                      <th className="border-0">Phone Number</th>
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients
                      .filter((patient) => {
                        const fullName = `${patient.profil.firstName} ${patient.profil.lastName} ${patient.profil.patientname} ${patient.profil.email} `;
                        return (
                          searchQuery === "" ||
                          fullName.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                      })
                      .map((patient) => (
                        <tr key={patient._id}>
                          <td>{patient.profil.lastName } {patient.profil.firstName }</td>     
                          <td>{patient.profil.phoneNumber}</td>
                          <td>
                          <Button
                              className="btn btn-alert"
                              onClick={() => handleEditClick(patient)}
                              key={patient._id}
                            >
                              Edit
                            </Button>
                            <Button
                              className="btn btn-danger"
                              onClick={() => handleDeleteClick(patient)}
                              key={patient._id}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this patient?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeletePatient}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PatientList;
