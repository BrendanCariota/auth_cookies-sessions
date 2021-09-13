import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import axios from "axios";

const HomeScreen = () => {
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Authenticator</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1>Welcome Home!</h1>
    </Container>
  );
};

export default HomeScreen;
