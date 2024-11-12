import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import "./Footer.css"

function Footer() {
  return (
    <footer className="eco-footer py-5">
      <Container>
        <Row className="text-center text-md-start align-items-start">
          {/* Logo et Description */}
          <Col md={3} className="mb-4">
            <h5 className="text-success">EcoCart</h5>
            <p className="text-muted small">
              Your go-to destination for sustainable, eco-friendly products that support a greener planet.
            </p>
          </Col>

          {/* Liens Utiles */}
          <Col md={3} className="mb-4">
            <h6 className="text-success">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/products" className="footer-link">Products</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
              <li><a href="/faq" className="footer-link">FAQ</a></li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col md={3} className="mb-4">
            <h6 className="text-success">Contact Us</h6>
            <p className="small text-muted">
              <FaEnvelope className="me-2" /> support@ecocart.com
            </p>
            <p className="small text-muted">
              <FaPhone className="me-2" /> +1 234 567 890
            </p>
          </Col>

          {/* Réseaux Sociaux */}
          <Col md={3} className="mb-4">
            <h6 className="text-success">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="https://facebook.com" className="social-link me-3"><FaFacebook size={28} /></a>
              <a href="https://instagram.com" className="social-link me-3"><FaInstagram size={28} /></a>
              <a href="https://twitter.com" className="social-link me-3"><FaTwitter size={28} /></a>
              <a href="https://linkedin.com" className="social-link"><FaLinkedin size={28} /></a>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-4">
          <Col className="text-center text-muted small">
            &copy; {new Date().getFullYear()} EcoCart. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
