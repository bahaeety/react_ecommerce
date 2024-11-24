import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './AuthPage.css';

function AuthPage() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        const response = await axios.post('/user/register', {
          Name: formData.name,
          Username: formData.username,
          Tel: formData.phone,
          Email: formData.email,
          Password: formData.password,
          HomeAddress: formData.homeAddress,
          BillingAddress: formData.billingAddress,
        });

        console.log('Register Response:', response.data);
      } else {
        const response = await axios.post('/user/login', {
          Email: formData.email,
          Password: formData.password,

        })
        console.log('Login Response:', response.data);

        if(response.data.role === "admin"){
          navigate('/admin')
        }
        else{
          navigate('/')

        }
      
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert(error.response?.data.message || 'An error occurred. Please try again.');
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
