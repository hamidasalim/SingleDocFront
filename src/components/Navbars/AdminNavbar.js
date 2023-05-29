import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Button,
  Modal,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import routes from "routes.js";

export const Header = () => {
  const status = localStorage.getItem("user");
  const history = useHistory();
  const [showModalLogin, setShowModalLogin] = React.useState(false);
  const [showModalRegister, setShowModalRegister] = React.useState(false);

  const [loginInfo, setLoginInfo] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [telephone, setPhoneNumber] = useState("");

  const handleLogin = async () => {
    let result = await fetch("http://localhost:8000/auth/login", {
      method: "post",
      body: JSON.stringify({ loginInfo, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      localStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("user", JSON.stringify(result.user));
    } else {
      alert("Login credentials are wrong");
    }
    history.push("/");

  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setShowModalRegister(false);
    setPassword("");
    setEmail("");

    setShowModalLogin(false);

    history.push("/");


  };
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setUsername("");
    setGender("");
    setPhoneNumber("");
    setPassword("");
    setEmail("");
    setShowModalRegister(false);
    history.push("/");


  };

  const collectData = async () => {
    //console.log(email,password,firstName,lastName,DateOfBirth,Gender,phone);
    let result = await fetch("http://localhost:8000/auth/register", {
      method: "post",
      body: JSON.stringify({ firstName,lastName,email, password, gender,dateOfBirth,telephone,username, }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = result.json();

  };

  const handleLogout = () => {
    localStorage.clear();
    // Additional logout logic if needed
    history.push("/");
  };

  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link
                data-toggle="dropdown"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="m-0"
              >
                <i className="nc-icon nc-palette"></i>
                <span className="d-lg-none ml-1">Dashboard</span>
              </Nav.Link>
            </Nav.Item>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                as={Nav.Link}
                data-toggle="dropdown"
                id="dropdown-67443507"
                variant="default"
                className="m-0"
              >
                <i className="nc-icon nc-planet"></i>
                <span className="notification">5</span>
                <span className="d-lg-none ml-1">Notification</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Notification 1
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Notification 2
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Notification 3
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Notification 4
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Another notification
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Nav className="ml-auto" navbar>
            {status === null ? (
              <Nav.Item>
                <Nav.Link
                  class="btn btn-alert"
                  onClick={() => setShowModalLogin(true)}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  class="btn btn-alert"
                  onClick={() => setShowModalRegister(true)}
                >
                  Register
                </Nav.Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Nav.Link class="btn btn-alert" onClick={handleLogout}>
                  logout
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>

        <Modal
          className="modal modal-primary"
          show={showModalLogin}
          onHide={() => setShowModalLogin(false)}
          style={{ right: "20px" }}
        >
          <h1 style={{ marginLeft: "25px" }}>Login</h1>
          <form className="login-form" onSubmit={handleSubmitLogin}>
            <div div style={{ marginLeft: "25px" }}>
              <div>
                <label htmlFor="loginInfo">Email:</label>
                <input
                  value={loginInfo}
                  onChange={(e) => setLoginInfo(e.target.value)}
                  type="email"
                  placeholder="youremail@gmail.com"
                  id="loginInfo"
                  name="loginInfo"
                />
              </div>

              <div>
                <label htmlFor="password">Password:</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="password"
                  id="password"
                  name="password"
                />
              </div>
            </div>

            <div className="modal-footer">
              <Button
                className="btn-simple"
                type="button"
                variant="link"
                onClick={() => setShowModalLogin(false)}
              >
                Close
              </Button>
              <Button
                className="btn-simple"
                type="submit"
                variant="link"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </form>
        </Modal>

        <Modal
          className="modal modal-primary"
          show={showModalRegister}
          onHide={() => setShowModalRegister(false)}
          style={{ right: "50px" }}
        >
          <div style={{ marginLeft: "25px", marginRight: "25px" }}>
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleSubmitRegister}>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  name="firstName"

                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  name="lastName"

                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  name="username"

                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  name="email"

                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  name="password"

                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  name="dateOfBirth"

                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  name="gender"

                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="telephone">Phone Number:</label>
                <input
                  type="tel"
                  id="telephone"
                  value={telephone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  name="telephone"

                />
              </div>

              <div className="modal-footer">
                <Button
                  className="btn-simple"
                  type="button"
                  variant="link"
                  onClick={() => setShowModalRegister(false)}
                >
                  Close
                </Button>
                <Button
                  className="btn-simple"
                  type="submit"
                  variant="link"
                  onClick={collectData}             
                >
                  Register
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default Header;
