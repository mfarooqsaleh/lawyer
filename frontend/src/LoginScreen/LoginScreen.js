import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './LoginScreen.css';
import Header from "../Header/Header.js";
import { login } from "../actions/userActions";


import ErrorMessage from "./ErrorMessage";

const LoginScreen = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error,setError] = useState(false)

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
 
    return (
      <div className="loginContainer">
        <Header/>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}


      <Form onSubmit={submitHandler} >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
             value={email}
              placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            />


          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <input  type="password"
              value={password}
            
              onChange={(e) => setPassword(e.target.value)}  className="form-control" placeholder="Enter password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
        </div>
    )
}

export default LoginScreen;
