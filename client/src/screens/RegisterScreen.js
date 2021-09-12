import React from "react";
import { Container, Button, Form } from "react-bootstrap";

const RegisterScreen = ({ history }) => {
  return (
    <Container className="py-5 m-auto">
      <Button
        size="sm"
        className="my-2"
        variant="secondary"
        onClick={() => history.push("/")}
      >
        Go Back
      </Button>
      <h1>Register</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Enter Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          Register
        </Button>
      </Form>
      <a href="/login">Already have an account? Login</a>
    </Container>
  );
};

export default RegisterScreen;
