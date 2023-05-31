import React from "react";
import { useContext, useEffect, useState } from "react";

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

function AppointmentListUser() {
  const storedUser = localStorage.getItem("user");
  const parsedUser = JSON.parse(storedUser);


  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState(0);
  const [patient, setPatient] = useState("");
  const [type, setType] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const calculatePrice = (selectedDate, start, end) => {
    if (selectedDate && start && end) {
      const startParts = start.split(":");
      const endParts = end.split(":");
      const startHour = parseInt(startParts[0]);
      const endHour = parseInt(endParts[0]);
      const duration = endHour - startHour;
      const calculatedPrice = duration * 70;
      setPrice(calculatedPrice);
    }
  };


      useEffect(() => {
        appointmentsList();

      }, []);

    const appointmentsList = async () => {
      const token = localStorage.getItem("token");
      const cleanedToken = token.substring(1, token.length - 1);
      let result = await fetch("http://localhost:8000/rendezvous/get/myrdv", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
        
      });
      result = await result.json();
      setAppointments(result);

    };

    console.log(appointments);

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDeleteModal(true);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    const cleanedToken = token.substring(1, token.length - 1);

    try {
      const editUrl = `http://localhost:8000/rendezvous/${selectedAppointment._id}`;

      // Create a new object with only the necessary properties
      const appointmentData = {
        date: date,
        startTime: startTime,
        endTime: endTime,
        price: price,
        type: type,
      };

      // Call your edit API endpoint with the new appointmentData object
      const response = await fetch(editUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }

      setShowEditModal(false);
      window.location.reload();

    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleCancelEdit = () => {
    // Close the edit modal
    setShowEditModal(false);
  };
  const handleCancelDelete = () => {
    // Close the edit modal
    setShowDeleteModal(false);
  };

  const handleDeleteAppointment = async () => {
    const token = localStorage.getItem("token");
    const cleanedToken = token.substring(1, token.length - 1);
    try {
      const deleteUrl = `http://localhost:8000/rendezvous/${selectedAppointment._id}`;

      const response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: cleanedToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }

      setShowDeleteModal(false);
      window.location.reload();

    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  
  const createRdvPat = async () => {
    const token = localStorage.getItem("token");
    const cleanedToken = token.substring(1, token.length - 1);
    if (parsedUser.role == "patient") {
      setPatient(parsedUser._id);
    }
    let result = await fetch("http://localhost:8000/rendezvous/", {
      method: "post",
      body: JSON.stringify({
        date,
        startTime,
        endTime,
        type,
        price,
      
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanedToken,
      },
    });
    result = result.json();
    window.location.reload();

  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    calculatePrice(date, e.target.value, endTime);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    calculatePrice(date, startTime, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission, e.g., send data to server or perform validation
    console.log("Form submitted:", {
      date,
      startTime,
      endTime,
      price,
      patient,
      type,
    });

    // Reset form fields
    setDate("");
    setStartTime("");
    setEndTime("");
    setPrice(0);
    setPatient("");
    setType("");
    setShowModal(false);
  };



  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Appointment List</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Container class="searchbar">
                  <i className="nc-icon nc-zoom-split"></i>
                  <span className="d-lg-block"> Search</span>
                  <input type="text" name="search"></input>
                </Container>
                <a
                  class="btn btn-alert"
                  onClick={() => setShowModal(true)}
                  style={{ marginLeft: 90 + "%" }}
                >
                  New
                </a>
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Date</th>
                      <th className="border-0">Time</th>
                      <th className="border-0">Type</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>{appointment.date.slice(0, 10)}</td> {/* Extract only the date part */}
                        <td>{appointment.startTime}</td>
                        <td>{appointment.type}</td>
                        <td>
                          <Button className="btn btn-alert" onClick={() => handleEditClick(appointment)}>
                            Edit
                          </Button>
                          <Button className="btn btn-danger"
                            onClick={() => handleDeleteClick(appointment)}
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
        <Modal
          className="modal modal-primary"
          show={showModal}
          onHide={() => setShowModal(false)}
          style={{ right: "50px" }}
        >
          <div style={{ marginLeft: "25px", marginRight: "25px" }}>
            <h1>Book Appointment</h1>
            <form className="register-form" onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="startTime">Start Time:</label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="endTime">End Time:</label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input type="text" id="price" value={price} readOnly />
              </div>

              <div>
                <label htmlFor="type">Type:</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="viaApp">Via App</option>
                  <option value="localVisit">Local Visit</option>
                </select>
                <div>
                  {parsedUser && // Check if user is not null
                    (parsedUser.role === "doctor" ||
                    parsedUser.role === "secretary" ? (
                      <>
                        <label htmlFor="patient">Patient:</label>
                        <input
                          type="text"
                          id="patient"
                          name="patient"
                          value={patient}
                          onChange={(e) => setPatient(e.target.value)}
                          required
                          placeholder="patient email"
                        />
                      </>
                    ) : (
                      // Handle other cases if needed
                      <p>See you Soon</p>
                    ))}
                </div>
              </div>

              <div className="modal-footer">
                <Button
                  className="btn-simple"
                  type="button"
                  variant="link"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
                {parsedUser && // Check if user is not null
                  (parsedUser.role === "doctor" ||
                  parsedUser.role === "secretary" ? (
                    <>
                      <Button
                        className="btn-simple"
                        type="submit"
                        variant="link"
                        onClick={createRdvStaff}
                      >
                        Book Appointment
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="btn-simple"
                        type="submit"
                        variant="link"
                        onClick={createRdvPat}
                      >
                        Book Appointment
                      </Button>
                    </>
                  ))}
              </div>
            </form>
          </div>
        </Modal>

        <Modal
          className="modal modal-primary"
          show={showEditModal}
          onHide={() => handleCancelEdit(false)}
          style={{ right: "20px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="register-form" onSubmit={handleSaveChanges}>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  value={date.slice(0,10)}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="startTime">Start Time:</label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="endTime">End Time:</label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
         

              <div>
                <label htmlFor="type">Type:</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="viaApp">Via App</option>
                  <option value="localVisit">Local Visit</option>
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleCancelEdit(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          className="modal modal-primary"
          show={showDeleteModal}
          onHide={() => setShowModalDelete(false)}
          style={{ right: "20px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this appointment?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleCancelDelete(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAppointment}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default AppointmentListUser;
