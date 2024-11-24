import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import './Profile.css';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        name: 'Admin Name',
        email: 'admin@example.com',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
    };

    return (
        <Container fluid className="mt-4 profile-container">
            <Row>
                <Col>
                    <h3 className="page-title">My Profile</h3>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col >
                    <Card className="profile-card shadow-lg">
                        <Card.Body>
                            <Form onSubmit={handleSaveChanges}>
                                <Form.Group className="mb-4">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Save Changes
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
