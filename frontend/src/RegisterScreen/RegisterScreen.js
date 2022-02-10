import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, File } from "react-bootstrap";
import ErrorMessage from "../LoginScreen/ErrorMessage.js";
import axios from "axios"
import Header from "../Header/Header.js";







function RegisterScreen() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [error, setError] = useState(false);

    const submitHandler= async(e)=>{
     e.preventDefault();
if(password !== confirmpassword){
  setMessage("Password don not Match");
}else{
 setMessage(null)
 try {
  const config = {
    headers: { 
      "Content-Type": "application/json",
    },
  };
  
  
  const { data } = await axios.post(
    "/api/users",
    {
    email,password,name,pic
  },config
  );
  console.log(data);
  localStorage.setItem("userInfo",JSON.stringify(data));
  
  
  
  
  
  } catch (error) {
    setError(error.response.data.message)
    
  }





}
    };
  






  return (
    <div className="loginContainer">
          <Header/>

       {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

       {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
    <Form onSubmit={submitHandler}>
      <Form.Group  controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
         value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

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
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
{/*picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
)*/}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <input
          
           // onChange={(e) => postDetails(e.target.files[0])}
            id="custom-file"
            type="file"
            label="Upload Profile Picture"
            custom

            />          
          </Form.Group>


          <Button variant="primary" type="submit">
            Register
          </Button>
          </Form>
          
          <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>

          </div>


  )
}

export default RegisterScreen;
