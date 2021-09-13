import React, { useState } from "react";
import { Container, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const RegisterScreen = ({ history }) => {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [alert, setAlert] = useState("");

  const register = () => {
    axios
      .post("http://localhost:5000/register", {
        username: usernameReg,
        password: passwordReg,
      })
      .then((res) => {
        if (res.data.message) {
          setAlert(res.data.message);
        } else {
          setUsernameReg("");
          setPasswordReg("");
          setAlert("");
        }
      });
  };

  return (
    <Container className="py-5 m-auto">
      <Button size="sm" className="my-2" variant="secondary" onClick={() => history.push("/")}>
        Go Back
      </Button>
      <h1>Register</h1>
      {alert ? <Alert variant="danger">{alert}</Alert> : null}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={usernameReg}
            onChange={(e) => setUsernameReg(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={passwordReg}
            onChange={(e) => setPasswordReg(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" className="mb-3" onClick={register}>
          Register
        </Button>
      </Form>
      <a href="/login">Already have an account? Login</a>
    </Container>
  );
};

export default RegisterScreen;
