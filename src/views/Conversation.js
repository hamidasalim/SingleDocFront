import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
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

function Conversation() {
  const storedUser = localStorage.getItem("user");

  const parsedUser = JSON.parse(storedUser);

  const [conversations, setConversations] = useState([]);
  const [messages, setmessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState([]);
  const [mess, setMess] = useState("");

  useEffect(() => {
    conversationList();
  }, []);

  const handleConvoClick = async (conversation) => {
    setSelectedConversation(conversation);
    const token = localStorage.getItem("token");
    const cleanedToken = token.substring(1, token.length - 1);
    const editUrl = `http://localhost:8000/message/${conversation._id}`;

    let result = await fetch(editUrl, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanedToken,
      },
    });
    result = await result.json();
    setmessages(result);
  };

  const sendMessage = async () => {
    const token = localStorage.getItem("token");
    const cleanedToken = token.substring(1, token.length - 1);
    const editUrl = `http://localhost:8000/message/${selectedConversation._id}`;
    const messageBody = {
      message: mess,
    };
    let result = await fetch(editUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanedToken,
      },
      body: JSON.stringify(messageBody),
    });
    handleConvoClick(selectedConversation);
    setMess("");

  };

  const conversationList = async () => {
    const token = localStorage.getItem("token");
    const cleanedToken = token.substring(1, token.length - 1);
    let result = await fetch("http://localhost:8000/conversation", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: cleanedToken,
      },
    });
    result = await result.json();
    setConversations(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleButtonClick = () => {
    const url = "https://demos.openvidu.io/openvidu-call/#/";
    window.open(url, "_blank");
  };

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Conversations
          </h5>
          <MDBCard>
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">
                {conversations.map((conversation) => (
                  <li
                    key={conversation.id}
                    className="p-2 border-bottom"
                    style={{ backgroundColor: "#eee" }}
                    onClick={() => handleConvoClick(conversation)}
                  >
                    <a href="#!" className="d-flex justify-content-between">
                      <div className="d-flex flex-row">
                        <div className="pt-1">
                          <p className="fw-bold mb-0">{conversation.name}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {selectedConversation && (
          <MDBCol md="6" lg="7" xl="8">
            <MDBTypography listUnStyled>
              <MDBCard>
                <MDBCardHeader className="d-flex justify-content-between p-3">
                  <p className="fw-bold mb-0">{selectedConversation.name}</p>
                  {parsedUser && // Check if user is not null
                    (parsedUser.role === "doctor" ? (
                      <>
                        <Button
                          className="btn-simple"
                          variant="link"
                          onClick={handleButtonClick}
                        >
                          Call
                        </Button>
                      </>
                    ) : (
                      <></>
                    ))}
                </MDBCardHeader>
                <MDBCardBody>
                  {}
                  {messages.map((message) => (
                    <p key={message.id} className="mb-0">
                      {message.senderId.username} : {message.content}
                    </p>
                  ))}
                </MDBCardBody>
              </MDBCard>

              <form onSubmit={handleSubmit}>
                <li className="bg-white mb-3">
                  <MDBTextArea
                    placeholder="Type message here"
                    id="mess"
                    value={mess}
                    rows={1}
                    onChange={(e) => setMess(e.target.value)}
                  />
                </li>
              </form>
              <MDBBtn
                color="success"
                rounded
                className="float-end"
                onClick={sendMessage}
              >
                Send
              </MDBBtn>
            </MDBTypography>
          </MDBCol>
        )}
      </MDBRow>
    </MDBContainer>
  );
}

export default Conversation;
