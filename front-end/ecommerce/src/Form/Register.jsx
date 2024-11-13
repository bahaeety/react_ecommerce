import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
  };

  return (
    <Card className="p-4 shadow eco-auth-card">
      <Card.Body>
        <h3 className="text-center mb-4" style={{ color: 'var(--eco-green)' }}>Register</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="registerEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter email"
              required 
            />
          </Form.Group>
          <Form.Group controlId="registerPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password"
              required 
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Confirm password"
              required 
            />
          </Form.Group>
          <Button type="submit" className="auth-button w-100">Register</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Register;
