import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Modal,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);



  const makePatient = async () => {
    try {
      const userId = selectedUser._id;
      const token = localStorage.getItem("token");
      const cleanedToken = token.substring(1, token.length - 1);
      const result = await fetch(`http://localhost:8000/patient/make/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
      });
      if (result.ok) {
        // First API call was successful, proceed with the second API call
        const creation = await fetch(`http://localhost:8000/patient/${userId}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: cleanedToken,
          },
          body: JSON.stringify({
            username : selectedUser.username
          }),
        });
  
        // Process the response of the second API call
        const data2 = await creation.json();
        console.log(data2);
        if (data2) {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedUser._id));
        }        // Do something with the data2
      } else {
        console.log("Error calling the first API");
      }
      
    } catch (error) {
      console.log("Error updating user:", error);
    } finally {
      setShowEditModal(false);
    }
  };
  const makeSecretary = async () => {
    try {
      const userId = selectedUser._id;
      const token = localStorage.getItem("token");
      const cleanedToken = token.substring(1, token.length - 1);
      const result = await fetch(`http://localhost:8000/secretary/make/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
      });
      if (result.ok) {
        // First API call was successful, proceed with the second API call
        const creation = await fetch(`http://localhost:8000/secretary/${userId}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: cleanedToken,
          },
          body: JSON.stringify({
            cin : "CIN",
            salary:"0"

          }),
         
        });
  
        // Process the response of the second API call
        const data2 = await creation.json();
        console.log(data2);
        if (data2) {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedUser._id));
        }
        // Do something with the data2
      } else {
        console.log("Error calling the first API");
      }
      
    } catch (error) {
      console.log("Error updating user:", error);
    } finally {
      setShowEditModal(false);
    }
  };
  const fetchUserList = async () => {
    try {
      const token = localStorage.getItem("token");
      const cleanedToken = token.substring(1, token.length - 1);
      const result = await fetch("http://localhost:8000/user/user/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
      });
      const data = await result.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = async () => {
    try {
      const userId = selectedUser._id;
      const token = localStorage.getItem("token");
      const cleanedToken = token.substring(1, token.length - 1);
      const result = await fetch(`http://localhost:8000/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
      });
      if (result.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedUser._id));
      } else {
        console.log("Error deleting user");
      }
    } catch (error) {
      console.log("Error deleting user:", error);
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
                <Card.Title as="h4">User List</Card.Title>
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
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">First Name</th>
                      <th className="border-0">Last Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Phone Number</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users
                      .filter((user) => {
                        const fullName = `${user.firstName} ${user.lastName}`;
                        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
                      })
                      .map((user) => (
                        <tr key={user._id}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>{user.telephone}</td>
                          <td>
                          <Button
                              className="btn btn-alert"
                              onClick={() => handleEditClick(user)}
                              key={user._id}
                            >
                              Edit
                            </Button>
                            <Button
                              className="btn btn-danger"
                              onClick={() => handleDeleteClick(user)}
                              key={user._id}
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

{/* edit User Modal */}
      <Modal
          className="modal modal-primary"
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          style={{ right: "20px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>Update User Role here </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() =>setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={makePatient}>
              Make Patient
            </Button>
            <Button variant="primary" onClick={makeSecretary}>
              Make Secretary
            </Button>
          </Modal.Footer>
        </Modal>
      {/* Delete User Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}

export default UserList;
