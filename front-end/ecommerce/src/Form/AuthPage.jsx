// AuthPage.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import './AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container fluid className="auth-hero-gradient d-flex flex-column align-items-center justify-content-center">
      <Row className="text-center mb-4">
        <h1 className="auth-title">{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h1>
      </Row>
      <Row className="w-100 text-center mb-4">
        <Col>
          <ButtonGroup>
            <Button 
              variant={isLogin ? "eco-green" : "outline-eco-green"} 
              className={`toggle-button ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
            <Button 
              variant={!isLogin ? "eco-green" : "outline-eco-green"} 
              className={`toggle-button ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="auth-card">
        <Col md={{ span: 6, offset: 3 }}>
          {isLogin ? <Login /> : <Register />}
        </Col>
      </Row>
    </Container>
  );
}

export default AuthPage;
