import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaLeaf, FaRecycle, FaSeedling, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import "./Intro.css"

function Intro() {
  return (
    <Container fluid className="eco-body mt-4">
      <section   className="hero-section text-center mb-5"
        style={{
          backgroundImage: "url(/images/02d400b8-f374-4f54-94ee-0d6e31616c1e.webp)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          color: '#ffffff',
          textAlign: 'center',
          padding: '80px 20px', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
        }}>
        <h1 className="display-4">Welcome to EcoCart</h1>
        <p className="lead">Shop sustainably with our curated selection of eco-friendly products.</p>
        <Link to="/products">
         <Button variant="success" className="mt-3 px-5 py-2">Shop Now</Button>
        </Link>
      </section>

      {/* Categories Section */}
      <section className="categories-section mb-5">
        <h2 className="text-center text-success mb-4">Shop by Category</h2>
        <Row>
          {[
            { name: 'Eco-Friendly', icon: <FaLeaf /> },
            { name: 'Recycled', icon: <FaRecycle /> },
            { name: 'Organic', icon: <FaSeedling /> },
            { name: 'Sustainable', icon: <FaGlobe /> },
          ].map((category, index) => (
            <Col xs={6} md={3} key={index} className="mb-4">
              <Card className="category-card text-center shadow-sm">
                <Card.Body>
                  <div className="category-icon">{category.icon}</div>
                  <Card.Title className="mt-2">{category.name}</Card.Title>
                  <Button variant="outline-success" className="mt-3">Explore</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section mb-5">
        <h2 className="text-center text-success mb-4">Featured Products</h2>
        <Row>
          {[1, 2, 3, 4].map((product) => (
            <Col xs={12} md={6} lg={3} key={product} className="mb-4">
              <Card className="product-card shadow-sm">
                <Card.Img variant="top" src={`https://via.placeholder.com/300`} alt="Product Image" />
                <Card.Body>
                  <Card.Title>Eco-Friendly Product {product}</Card.Title>
                  <Card.Text>Made from sustainable materials, perfect for eco-conscious shoppers.</Card.Text>
                  <h5 className="product-price text-success">$29.99</h5>
                  <Button variant="success" className="mt-2 w-100">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}

export default Intro;
