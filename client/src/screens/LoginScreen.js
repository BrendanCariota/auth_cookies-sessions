import React, { useState, useEffect } from "react";
import { Container, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const LoginScreen = ({ history }) => {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  axios.defaults.withCredentials = true;

  const login = () => {
    axios
      .post("http://localhost:5000/login", {
        username: usernameLog,
        password: passwordLog,
      })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message) {
          setLoginStatus(res.data.message);
          return;
        } else {
          localStorage.setItem("token", res.data.token);
          setUsernameLog("");
          setPasswordLog("");
          history.push("/");
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Container className="py-5 m-auto">
      <Button size="sm" className="my-2" variant="secondary" onClick={() => history.push("/")}>
        Go Back
      </Button>
      <h1>Login</h1>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={usernameLog}
            onChange={(e) => setUsernameLog(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={passwordLog}
            onChange={(e) => setPasswordLog(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" className="mb-3" onClick={login}>
          Login
        </Button>
      </Form>
      {loginStatus ? <Alert variant="danger">{loginStatus}</Alert> : null}

      <a href="/register">Don't have an account? Register</a>
    </Container>
  );
};

export default LoginScreen;
