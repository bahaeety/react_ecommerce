import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "./Testimonials.css"

function Testimonials() {
  return (
    <Container fluid className="eco-body mt-4">

      <section className="testimonials-section text-center mb-5">
        <h2 className="text-success mb-4">What Our Customers Say</h2>
        <Row className="justify-content-center">
          {[
            {
              name: 'Alice M.',
              text: 'EcoCart has completely changed the way I shop. I feel good about my purchases!',
              image: 'https://via.placeholder.com/80',
            },
            {
              name: 'John D.',
              text: 'High-quality products with an eco-friendly touch. Love this store!',
              image: 'https://via.placeholder.com/80',
            },
            {
              name: 'Sarah K.',
              text: 'Finally a store that values sustainability as much as I do! Much support',
              image: 'https://via.placeholder.com/80',
            },
          ].map((testimonial, index) => (
            <Col xs={12} md={4} key={index} className="mb-4">
              <Card className="testimonial-card shadow-sm">
                <Card.Body>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-circle mb-3"
                    style={{ width: '80px', height: '80px' }}
                  />
                  <Card.Text className="testimonial-text">{testimonial.text}</Card.Text>
                  <Card.Subtitle className="mt-3 text-muted">- {testimonial.name}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}

export default Testimonials;
