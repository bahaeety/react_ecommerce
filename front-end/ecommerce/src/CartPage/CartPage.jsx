// CartPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Header from '../Home/Header/Header';
import Footer from '../Home/Footer/Footer';
import './CartPage.css';

function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Eco-Friendly Bottle', price: 15, quantity: 2 },
    { id: 2, name: 'Organic T-Shirt', price: 25, quantity: 1 },
    { id: 3, name: 'Recycled Notebook', price: 10, quantity: 3 },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
    <Header/>
    <Container className="cart-page mt-5">
      <h2 className="cart-title text-center mb-4">Shopping Cart</h2>
      <Row>
        {/* Cart Items Section */}
        <Col md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} className="cart-item mb-3">
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="item-price">${item.price.toFixed(2)}</Card.Text>
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="quantity-input"
                    />
                  </Col>
                  <Col md={3} className="text-end">
                    <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Summary Section */}
        <Col md={4}>
          <Card className="cart-summary">
            <Card.Body>
              <h5 className="summary-title">Order Summary</h5>
              <p className="summary-total">Total: ${totalPrice.toFixed(2)}</p>
              <Button variant="eco-green" className="checkout-button" disabled={cartItems.length === 0}>
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
}

export default CartPage;
