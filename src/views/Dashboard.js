import React from "react";


// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {
  const headingStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  };

  const paragraphStyle = {
    fontSize: '16px',
    marginBottom: '20px',
    lineHeight: '1.5'
  };

  const servicesListStyle = {
    fontSize: '16px',
    marginBottom: '20px',
    paddingLeft: '20px'
  };

  const contactInfoStyle = {
    fontSize: '16px',
    marginBottom: '20px',
    lineHeight: '1.5'
  };

  return (
    <div>
      <h1 style={headingStyle}>Welcome to My Psychologist Homepage</h1>
      <p style={paragraphStyle}>
        Are you struggling with stress, anxiety, or relationship issues? I'm here to help you navigate through your challenges and find the path to healing and personal growth.
      </p>
      <h2 style={headingStyle}>About Me</h2>
      <p style={paragraphStyle}>
        I am a licensed psychologist with years of experience in helping individuals overcome emotional difficulties and achieve mental well-being. My approach is client-centered, compassionate, and tailored to meet your unique needs.
      </p>
      <h2 style={headingStyle}>Services</h2>
      <ul style={servicesListStyle}>
        <li>Individual therapy</li>
        <li>Couples counseling</li>
        <li>Family therapy</li>
        <li>Stress management</li>
        <li>Anxiety and depression treatment</li>
        <li>Conflict resolution</li>
      </ul>
      <h2 style={headingStyle}>Contact Me</h2>
      <p style={contactInfoStyle}>
        To schedule an appointment or learn more about my services, please feel free to contact me at:
      </p>
      <p style={contactInfoStyle}>
        Email: yourname@psychologist.com<br />
        Phone: 123-456-7890<br />
        Address: 123 Main Street, City, State, ZIP
      </p>
    </div>
  );
};


export default Dashboard;
