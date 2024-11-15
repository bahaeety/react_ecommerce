// FullForm.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './AuthPage.css';

function AuthPage() {
  const [isRegister, setIsRegister] = useState(true); // Toggle between Register and Login
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    homeAddress: '',
    billingAddress: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      console.log('Register Data:', formData);
    } else {
      console.log('Login Data:', { email: formData.email, password: formData.password });
    }
  };

  return (
    <Container className="full-form mt-5">
      <h2 className="form-title mb-4">{isRegister ? 'Register' : 'Login'}</h2>
      <Form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose a username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="homeAddress">
                  <Form.Label>Home Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your home address"
                    name="homeAddress"
                    value={formData.homeAddress}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="billingAddress">
                  <Form.Label>Billing Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your billing address"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        )}

        {/* Common fields for both Register and Login */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="success" type="submit" className="mt-3">
          {isRegister ? 'Register' : 'Login'}
        </Button>

        <p className="toggle-link mt-3" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : 'Don’t have an account? Register'}
        </p>
      </Form>
    </Container>
  );
}

export default AuthPage;
