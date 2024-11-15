// ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Pagination, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import Header from '../Home/Header/Header';
import Footer from '../Home/Footer/Footer';
import './ProductsPage.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Limit products per page

  // Fetch products (simulated here; replace with real API call)
  useEffect(() => {
    const fetchProducts = async () => {
      const productData = [
        { id: 1, name: 'Eco-Friendly Bottle', price: 15, category: 'Home' },
        { id: 2, name: 'Organic T-Shirt', price: 25, category: 'Fashion' },
        { id: 3, name: 'Recycled Notebook', price: 10, category: 'Office' },
        // Add more products here
      ];
      setProducts(productData);
      setFilteredProducts(productData);
    };
    fetchProducts();
  }, []);

  // Handle filtering and searching
  useEffect(() => {
    let updatedProducts = products;

    // Filter by category
    if (category !== 'All') {
      updatedProducts = updatedProducts.filter((product) => product.category === category);
    }

    // Filter by search term
    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOrder === 'price-asc') {
      updatedProducts = [...updatedProducts].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      updatedProducts = [...updatedProducts].sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'name') {
      updatedProducts = [...updatedProducts].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(updatedProducts);
  }, [category, searchTerm, sortOrder, products]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <Header />
    <Container className="products-page mt-5">
      <h2 className="products-title text-center mb-4">Our Products</h2>

      {/* Filters */}
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


      {/* Product List */}
      <Row>
        {currentProducts.map((product) => (
          <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
            <Card className="product-card">
              <Card.Img variant="top" src={`path/to/image/${product.id}.jpg`} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price.toFixed(2)}</Card.Text>
                <Button variant="eco-green">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
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
    <Footer/>
    </>
  );
}

export default ProductsPage;
