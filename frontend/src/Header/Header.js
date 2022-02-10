import React, { useEffect } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

function Header() {

  
  

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/register">Register</Navbar.Brand>
        <Navbar.Brand href="/login">Login</Navbar.Brand>

       
      </Container>
    </Navbar>
  );
}

export default Header;
