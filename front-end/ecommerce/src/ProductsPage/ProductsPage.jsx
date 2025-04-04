import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Pagination, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import Header from '../Home/Header/Header';
import Footer from '../Home/Footer/Footer';
import session_cheker from "../Protected_routes/session-cheker";

import './ProductsPage.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromQuery = params.get('category');
    if (categoryFromQuery) {
      setCategory(categoryFromQuery);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/produits/all');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = products;

    if (category !== 'All') {
      updatedProducts = updatedProducts.filter((product) => product.category === category);
    }

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'price-asc') {
      updatedProducts = [...updatedProducts].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      updatedProducts = [...updatedProducts].sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'name') {
      updatedProducts = [...updatedProducts].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(updatedProducts);
  }, [category, searchTerm, sortOrder, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = async (productId) => {
    try {
      const response_id = await session_cheker();
      const id = response_id.user_id;
  
      if (!id) {
        alert('User not logged in. Please login to add items to the cart.');
        return;
      }
  
      console.log('Adding to cart with:', { userId: id, productId, quantity: 1 });
  
      const response = await axios.post('/panier/add-to-cart', {
        userId: id,
        productId,
        quantity: 1,
      });
  
    } catch (error) {
      console.error('Error adding product to cart:', error.response?.data || error.message);
      alert('Failed to add product to cart.');
    }
  };
  
  return (
    <>
      <Header />
      <Container className="products-page mt-5">
        <h2 className="products-title text-center mb-4">Our Products</h2>
        
        <Row className="filters mb-4">
          <h3 className="filters-title">Filters</h3>
          <Col md={4}>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Eco-Friendly">Eco-Friendly</option>
              <option value="Recycled">Recycled</option>
              <option value="Organic">Organic</option>
              <option value="Sustainable">Sustainable</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="">Sort By</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="name">Name</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          {currentProducts.map((product) => (
            <Col key={product._id} sm={6} md={4} lg={3} className="mb-4">
              <Card className="product-card">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price.toFixed(2)}</Card.Text>
                  <Button onClick={() => handleAddToCart(product._id)} variant="eco-green">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Pagination className="justify-content-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
      <Footer />
    </>
  );
}

export default ProductsPage;
