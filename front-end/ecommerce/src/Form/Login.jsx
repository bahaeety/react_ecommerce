import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="p-4 shadow eco-auth-card">
      <Card.Body>
        <h3 className="text-center mb-4" style={{ color: 'var(--eco-green)' }}>Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter email"
              required 
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password"
              required 
            />
          </Form.Group>
          <Button type="submit" className="auth-button w-100">Login</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
