import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Badge, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        username: '',
        role: 'user',
        phone_number: '',
        homeadresse: '',
        billingadresse: ''
        });
    const [editingUser, setEditingUser] = useState(null);

    // Fetch users from the backend on component mount
    useEffect(() => {
        axios.get('/user')
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    const handleModalShow = () => setShowModal(true);
    const handleModalClose = () => {
        setShowModal(false);
        setEditingUser(null);
        setFormData({
            name: '',
            email: '',
            role: 'user',
            phone_number: '',
            password: '',
            username: '',
            homeadresse: '',
            billingadresse: '',
            status: 'Active',
        });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // Validate formData
        const { name, username, email, password, role, phone_number } = formData;
    
        if (!name || !username || !email || !password || !role || !phone_number) {
            console.error('Error: All required fields must be filled.');
            console.log(name,username,email,password,role,phone_number)
            return;
        }
    
    
        // Send request to backend
        const url = editingUser ? `/user/${editingUser._id}` : '/user';
        const method = editingUser ? 'put' : 'post';
    
        axios({
            method,
            url,
            data: formData,
        })
            .then((response) => {
                if (editingUser) {
                    setUsers(users.map((u) => (u._id === editingUser._id ? response.data : u)));
                } else {
                    setUsers([...users, response.data]);
                }
                handleModalClose();
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Backend error:', error.response.data);
                } else {
                    console.error('Unexpected error:', error.message);
                }
            });
    };
    
    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            phone_number: user.phone_number,
            username: user.username,
            password: "empty for security",
            homeadresse: user.homeadresse,
            billingadresse: user.billingadresse
                });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        axios.delete(`/user/${id}`)
            .then(() => setUsers(users.filter((u) => u._id !== id)))
            .catch((error) => console.error('Error deleting user:', error));
    };

    return (
        <Container fluid className="mt-4">
            {/* Header */}
            <Row className="mb-4 align-items-center">
                <Col>
                    <h3 className="page-title">Users</h3>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={handleModalShow}>
                        <i className="bi bi-plus-circle me-2"></i>Add User
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
                            <th>Email</th>
                            <th>Username</th>

                            <th>Role</th>
                            <th>Phone Number</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.phone_number}</td>
                                <td>
                                        {user.Password}
                                
                                </td>
                                <td>
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit User</Tooltip>}>
                                        <Button variant="warning" className="action-btn" onClick={() => handleEdit(user)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete User</Tooltip>}>
                                        <Button variant="danger" className="action-btn" onClick={() => handleDelete(user._id)}>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Add/Edit User Modal */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingUser ? 'Edit User' : 'Add New User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select name="role" value={formData.role} onChange={handleInputChange}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Home Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter home address"
                                name="homeadresse"
                                value={formData.homeadresse}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Billing Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter billing address"
                                name="billingadresse"
                                value={formData.billingadresse}
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
                        {editingUser ? 'Update User' : 'Save User'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Users;
