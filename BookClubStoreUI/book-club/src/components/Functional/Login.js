import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { loginThunk } from "../../redux/reducers/authReducer";

const Login = (props) => {
  var dispatch = useDispatch();

  var navigate = useNavigate();

  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const login = () => {
    dispatch(loginThunk(email, password));
    navigate("/main/books");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center align-items-center">
        <Col md={5}>
          <Form>
            <h2>Sign In</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={handleEmail}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={handlePassword}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              or <Link to={"/register"}>register</Link>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
                onClick={() => login()} //</NavLink>onClick={
                //  () => login()
                //}
                variant="info"
              >
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
