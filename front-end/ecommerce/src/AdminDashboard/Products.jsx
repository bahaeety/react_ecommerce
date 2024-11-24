import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Badge, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import "./Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', price: '', image: '', category: '' });
    const [editingProduct, setEditingProduct] = useState(null);

    // Fetch products on component mount
    useEffect(() => {
        axios.get('/produits/all')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData({ name: '', price: '', image: '', category: '' }); // Reset form
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Add or Update
    const handleSave = () => {
        if (editingProduct) {
            // Update product
            axios.put(`/produits/${editingProduct._id}`, formData)
                .then(() => {
                    setProducts(products.map(p => (p._id === editingProduct._id ? { ...formData, _id: editingProduct._id } : p)));
                    handleModalClose();
                })
                .catch(error => console.error('Error updating product:', error));
        } else {
            // Add new product
            axios.post('/produits/', formData)
                .then(response => {
                    setProducts([...products, response.data]);
                    handleModalClose();
                })
                .catch(error => console.error('Error adding product:', error));
        }
    };

    // Handle Delete
    const handleDelete = (id) => {
        axios.delete(`/produits/${id}`)
            .then(() => setProducts(products.filter(p => p._id !== id)))
            .catch(error => console.error('Error deleting product:', error));
    };

    // Handle Edit
    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({ name: product.name, price: product.price, image: product.image, category: product.category });
        setShowModal(true);
    };


    return (
        <Container fluid className="mt-4">
        {/* Header */}
        <Row className="mb-4 align-items-center">
            <Col>
                <h3 className="page-title">Products</h3>
            </Col>
            <Col className="text-end">
                <Button variant="primary" onClick={handleModalShow}>
                    <i className="bi bi-plus-circle me-2"></i>{editingProduct ? 'Edit Product' : 'Add Product'}
                </Button>
            </Col>
        </Row>

        {/* Modern Styled Table */}
        <div className="table-wrapper">
            <Table className="modern-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Edit Product</Tooltip>}
                                >
                                    <Button variant="warning" className="action-btn" onClick={() => handleEdit(product)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Delete Product</Tooltip>}
                                >
                                    <Button variant="danger" className="action-btn" onClick={() => handleDelete(product._id)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </OverlayTrigger>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

        {/* Add/Edit Product Modal */}
        <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editingProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter product name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    {editingProduct ? 'Update Product' : 'Save Product'}
                </Button>
            </Modal.Footer>
        </Modal>
    </Container>
    );
};

export default Products;
