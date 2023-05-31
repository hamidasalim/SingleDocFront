import React, { useState, useEffect } from "react";

// react-bootstrap components
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
import { useHistory } from "react-router-dom";

function SecretaryList() {
  const history = useHistory();

  const [secretarys, setSecretarys] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New searchQuery state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSecretary, setSelectedSecretary] = useState(null);
  const [cin, setCin] = useState("");
  const [salary, setSalary] = useState("");



  const fetchSecretaryList = async () => {
    try {
      const token = localStorage.getItem("token");
      const cleanedToken = token.substring(1, token.length - 1);
      const result = await fetch("http://localhost:8000/secretary", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
      });
      const data = await result.json();
      setSecretarys(data);
    } catch (error) {
      console.log("Error fetching secretary list:", error);
    }
  };

  const handleSecretarySelect = (secretary) => {
    setSelectedSecretary(secretary);
  };

  const handleRedirect = () => {
    history.push("/admin/list/user");
  };

  useEffect(() => {
    fetchSecretaryList();
  }, []);

  const handleDeleteClick = (secretary) => {
    setSelectedSecretary(secretary);
    setShowDeleteModal(true);
  };
  const handleEditClick = (secretary) => {
    handleSecretarySelect(secretary);
    setShowEditModal(true);
  };

  const handleEditSecretary = async () => {
    try {
      const secData = {
        cin: cin,
        salary : salary      
      };
      const secretaryId = selectedSecretary._id;
      const editUrl = `http://localhost:8000/secretary/${secretaryId}`;
      const token = localStorage.getItem("token");
      const cleanedToken = token.substring(1, token.length - 1);
      const response = await fetch(editUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
        body: JSON.stringify(secData),
      });
      console.log(JSON.stringify(secData));
      if (!response.ok) {
        throw new Error("Failed to update secretary");
      }

      setShowEditModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating secretary:", error);
    }
  };

  const handleDeleteSecretary = async () => {
    try {
      const secretaryId = selectedSecretary._id;
      const token = localStorage.getItem("token");
      const cleanedToken = token.substring(1, token.length - 1);
      const result = await fetch(
        `http://localhost:8000/secretary/${secretaryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: cleanedToken,
          },
        }
      );
      if (result.ok) {
        setSecretarys((prevSecretarys) =>
          prevSecretarys.filter(
            (secretary) => secretary._id !== selectedSecretary._id
          )
        );
      } else {
        console.log("Error deleting secretary");
      }
    } catch (error) {
      console.log("Error deleting secretary:", error);
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
                <Card.Title as="h4">Secretary List</Card.Title>
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
                      <th className="border-0">Secretary Name</th>
                      <th className="border-0">Phone Number</th>
                      <th className="border-0">CIN</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {secretarys
                      .filter((secretary) => {
                        const fullName = `${secretary.profil.firstName} ${secretary.profil.lastName} ${secretary.profil.email} } `;
                        return (
                          searchQuery === "" ||
                          fullName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        );
                      })
                      .map((secretary) => (
                        <tr key={secretary._id}>
                          <td>
                            {secretary.profil.lastName}{" "}
                            {secretary.profil.firstName}
                          </td>

                          <td>{secretary.profil.phoneNumber}</td>
                          <td>{secretary.cin}</td>
                          <td>{secretary.salary}</td>

                          <td>
                            <Button
                              className="btn btn-alert"
                              onClick={() => handleEditClick(secretary)}
                             
                            >
                              Edit
                            </Button>
                            <Button
                              className="btn btn-danger"
                              onClick={() => handleDeleteClick(secretary)}
                           
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
          <Modal.Title>Delete Secretary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this secretary?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteSecretary}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* edit sec Modal */}
      <Modal
          className="modal modal-primary"
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          style={{ right: "20px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Secretary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleEditSecretary}>
          <div style={{ marginBottom: "10px" }}>
                <label htmlFor="cin">Cin:</label>
                <input
                  type="text"
                  id="cin"
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="salary">Salary :</label>
                <input
                  type="text"
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </div>
          </form>
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() =>setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditSecretary}>
              Save Changes
            </Button>
            
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default SecretaryList;
