import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = (props) => {

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">{props.user.email}</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;