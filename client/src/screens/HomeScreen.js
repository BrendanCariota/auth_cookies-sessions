import React, { useEffect, useState } from "react";
import { Alert, Container, Nav, Navbar, Button } from "react-bootstrap";
import axios from "axios";

const HomeScreen = () => {
  axios.defaults.withCredentials = true;

  const [loggedIn, setLoggedIn] = useState(false);

  const checkAuth = () => {
    axios
      .get("http://localhost:5000/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((res) => {
      if (res.data.loggedIn === true) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
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
      {loggedIn ? (
        <Container>
          <Alert variant="success">You're Logged In</Alert>
          <Button onClick={checkAuth}>Check Profile</Button>
        </Container>
      ) : null}
    </Container>
  );
};

export default HomeScreen;
