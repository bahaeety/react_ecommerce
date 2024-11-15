// ContactUs.js
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './ContactUs.css';
import Header from '../Home/Header/Header';
import Footer from '../Home/Footer/Footer';
function ContactUs() {
  return (
    <>
    <Header />
    <div className="contact-page eco-body">
      {/* Hero Section */}
      <section className="contact-hero-section">
        <Container className="text-center py-5">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            We'd love to hear from you! Whether you have a question about our products, need support, or just want to say hello, feel free to reach out.
          </p>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <h2 className="section-title text-center">Get in Touch</h2>
              <Form className="contact-form">
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" required />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" required />
                </Form.Group>
                <Form.Group controlId="formSubject" className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Subject of your message" required />
                </Form.Group>
                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Type your message here..." required />
                </Form.Group>
                <Button type="submit" className="contact-button w-100">
                  Send Message
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info-section py-5">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <h4 className="info-title">Email Us</h4>
              <p className="info-detail">contact@ecocart.com</p>
            </Col>
            <Col md={4} className="mb-4">
              <h4 className="info-title">Call Us</h4>
              <p className="info-detail">+1 (234) 567-890</p>
            </Col>
            <Col md={4} className="mb-4">
              <h4 className="info-title">Visit Us</h4>
              <p className="info-detail">123 Greenway Drive, Eco City, EC 12345</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Optional Map Section */}
      <section className="map-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44716.4509014715!2d-73.58034618378902!3d45.53466913899266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91b92de11a6b1%3A0xf00059d2f2ea0094!2sTeccart%20Institute!5e0!3m2!1sen!2sca!4v1731531683262!5m2!1sen!2sca" width="100%" height="400" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
    <Footer/>
    </>
  );
}

export default ContactUs;
