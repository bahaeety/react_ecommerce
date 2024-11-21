import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './AboutUs.css';
import Header from '../Home/Header/Header';
import Footer from '../Home/Footer/Footer';
import { useNavigate } from 'react-router-dom';
function AboutUs() {
  const navigate = useNavigate();
  return (
    <>
    <Header />
    <div className="about-page eco-body">
      <section className="about-hero-section">
        <Container className="text-center py-5">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            At EcoCart, we believe in sustainable shopping and empowering eco-conscious consumers.
          </p>
        </Container>
      </section>

      <section className="mission-section">
        <Container>
          <Row className="justify-content-center text-center py-5">
            <Col md={8}>
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-text">
                Our mission is to provide high-quality, eco-friendly products that help reduce waste and
                promote a sustainable lifestyle. We are committed to environmental responsibility and aim to make
                green shopping convenient and accessible to everyone.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="team-section">
        <Container>
          <h2 className="section-title text-center my-5">Meet the Team</h2>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <Card className="team-card text-center shadow-sm">
                <Card.Img variant="top" src="path/to/photo1.jpg" alt="Team Member 1" className="team-photo" />
                <Card.Body>
                  <Card.Title className="team-name">Jane Doe</Card.Title>
                  <Card.Text className="team-role">CEO & Founder</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="team-card text-center shadow-sm">
                <Card.Img variant="top" src="path/to/photo2.jpg" alt="Team Member 2" className="team-photo" />
                <Card.Body>
                  <Card.Title className="team-name">John Smith</Card.Title>
                  <Card.Text className="team-role">CTO & Co-Founder</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="team-card text-center shadow-sm">
                <Card.Img variant="top" src="path/to/photo3.jpg" alt="Team Member 3" className="team-photo" />
                <Card.Body>
                  <Card.Title className="team-name">Emily Johnson</Card.Title>
                  <Card.Text className="team-role">Head of Marketing</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cta-section text-center py-5">
        <Container>
          <h2 className="cta-title">Join Us on Our Eco-Friendly Journey!</h2>
          <Button onClick={()=>{navigate('/products')}} variant="eco-green" className="cta-button mt-4">
            Explore Our Products
          </Button>
        </Container>
      </section>
    </div>
    <Footer/>
    </>
  );
}

export default AboutUs;
