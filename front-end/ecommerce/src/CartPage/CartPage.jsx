import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Header from '../Home/Header/Header';
import Footer from '../Home/Footer/Footer';
import axios from 'axios';
import session_cheker from '../Protected_routes/session-cheker';
import './CartPage.css';

function CartPage() {
  const [cart, setCart] = useState([]);

  const fetchCartData = async () => {
    try {
      const response_id = await session_cheker();
      const id = response_id.user_id;

      const response = await axios.get(`/panier/get-cart/${id}`);
      setCart(response.data.items || []); // Set items or default to empty array
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setCart([]); // Fallback to empty cart
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response_id = await session_cheker();
      const id = response_id.user_id;

      // Call the backend to remove the product
      const response = await axios.delete('/panier/remove-from-cart', {
        data: {
          userId: id,
          productId,
        },
      });

      // Update the cart in the state
      setCart(response.data.items);
    } catch (error) {
      console.error('Error removing item from cart:', error.response?.data || error.message);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent invalid quantities

    try {
      const response_id = await session_cheker();
      const id = response_id.user_id;

      const response = await axios.put('/panier/update-cart', {
        userId: id,
        productId,
        quantity: newQuantity,
      });

      // Update the cart with the new quantity
      setCart(response.data.items);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

 


  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      <Header />
      <Container className="cart-page mt-5">
        <h2 className="cart-title text-center mb-4">Shopping Cart</h2>
        <Row className="mt-4">
          <Col md={{ span: 4, offset: 8 }}>
            <Card className="cart-summary">
              <Card.Body>
                <h5 className="summary-title">Order Summary</h5>
                <p className="summary-total">Total: ${totalPrice.toFixed(2)}</p>
                <Button
                  variant="eco-green"
                  className="checkout-button"
                  disabled={cart.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br></br>
        <Row>
          {cart.map((item) => (
            <Col key={item.product._id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card className="cart-item small-card">
                <Card.Img
                  variant="top"
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <Card.Body>
                  <Card.Title className="cart-item-title">{item.product.name}</Card.Title>
                  <Card.Text className="cart-item-price">${item.product.price.toFixed(2)}</Card.Text>
                  <Form.Control
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.product._id, parseInt(e.target.value, 10))
                    }
                    className="cart-item-quantity-input"
                  />
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="cart-item-remove-button mt-2"
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      
      </Container> 
      <Footer />
    </>
  );
}

export default CartPage;
