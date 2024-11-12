import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaLeaf, FaShoppingCart, FaUser, FaHome } from 'react-icons/fa';
import "./Header.css"

function Header() {
  return (
    <Navbar expand="md" className="shadow-sm eco-navbar">
      <Container>
        <Navbar.Brand href="/" className="text-success fs-3 font-weight-bold d-flex align-items-center">
          <FaLeaf className="me-2" /> EcoCart
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link href="/" className="nav-icon text-dark d-flex align-items-center">
              <FaHome className="me-2" /> Home
            </Nav.Link>
            <Nav.Link href="/products" className="nav-icon text-dark d-flex align-items-center">
              <FaLeaf className="me-2" /> Products
            </Nav.Link>
            <Nav.Link href="/about" className="nav-icon text-dark d-flex align-items-center">
              About Us
            </Nav.Link>
            <Nav.Link href="/contact" className="nav-icon text-dark d-flex align-items-center">
              Contact
            </Nav.Link>
            <Nav.Link href="/account" className="nav-icon text-dark d-flex align-items-center">
              <FaUser className="me-2" /> Account
            </Nav.Link>
            <Nav.Link href="/cart" className="nav-icon text-dark d-flex align-items-center">
              <FaShoppingCart className="me-2" /> Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
