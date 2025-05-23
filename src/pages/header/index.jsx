// src/components/header/Header.tsx
import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useAuthStore } from "../../zustand-store/auth/auth.store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logOutUser } = useAuthStore();
  const navigate = useNavigate();
  const onLogOut = () => {
    const res = logOutUser();
    const { status } = res;
    if (status === 201 || status === 200) {
      //   toast.success("User logged out successfully");
      console.log("User logged out successfully");
      navigate("/");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="app-header">
      <Container fluid>
        <Navbar.Brand href="#home">Job Portal</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
        </Nav>
        <Button variant="outline-light" onClick={onLogOut}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
