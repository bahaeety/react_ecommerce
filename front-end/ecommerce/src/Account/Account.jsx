// Account.js
import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Form, Modal, ListGroup, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBoxOpen, faAddressBook, faCog, faEdit, faTrash, faLock } from '@fortawesome/free-solid-svg-icons';
import './Account.css';
import Header from '../Home/Header/Header';
import Footer from '../Home/Footer/Footer';
function Account() {
  // State for Profile Edit Modal
  const [showEditProfile, setShowEditProfile] = useState(false);
  const handleCloseEditProfile = () => setShowEditProfile(false);
  const handleShowEditProfile = () => setShowEditProfile(true);

  // State for Address Edit Modal
  const [showEditAddress, setShowEditAddress] = useState(false);
  const handleCloseEditAddress = () => setShowEditAddress(false);
  const handleShowEditAddress = () => setShowEditAddress(true);

  // State for Password Change Modal
  const [showChangePassword, setShowChangePassword] = useState(false);
  const handleCloseChangePassword = () => setShowChangePassword(false);
  const handleShowChangePassword = () => setShowChangePassword(true);

  return (
    <>
    <Header />
    <Container className="account-page py-5">
      <h2 className="account-title text-center mb-5">My Account</h2>
      <Tab.Container defaultActiveKey="profile">
        <Row>
          <Col sm={3} className="mb-4">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="profile">
                  <FontAwesomeIcon icon={faUser} className="me-2" /> Profile Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders">
                  <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Order History
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="addresses">
                  <FontAwesomeIcon icon={faAddressBook} className="me-2" /> Address Book
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="settings">
                  <FontAwesomeIcon icon={faCog} className="me-2" /> Account Settings
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {/* Profile Information Section */}
              <Tab.Pane eventKey="profile">
                <h3><FontAwesomeIcon icon={faUser} /> Profile Information</h3>
                <Card className="profile-card shadow-sm p-4">
                  <p><strong>Name:</strong> John Doe</p>
                  <p><strong>Email:</strong> john.doe@example.com</p>
                  <p><strong>Phone:</strong> +1 234 567 890</p>
                  <Button variant="eco-green" onClick={handleShowEditProfile} className="mt-3">
                    <FontAwesomeIcon icon={faEdit} /> Edit Profile
                  </Button>
                </Card>

                {/* Edit Profile Modal */}
                <Modal show={showEditProfile} onHide={handleCloseEditProfile}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                      </Form.Group>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>
                      <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" placeholder="Enter phone number" />
                      </Form.Group>
                      <Button variant="eco-green" onClick={handleCloseEditProfile} className="mt-3 w-100">
                        Save Changes
                      </Button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </Tab.Pane>

              {/* Order History Section */}
              <Tab.Pane eventKey="orders">
                <h3><FontAwesomeIcon icon={faBoxOpen} /> Order History</h3>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Order #12345 - <span className="text-success">Completed</span> - $50.00
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Order #67890 - <span className="text-info">Shipped</span> - $120.00
                  </ListGroup.Item>
                </ListGroup>
              </Tab.Pane>

              {/* Address Book Section */}
              <Tab.Pane eventKey="addresses">
                <h3><FontAwesomeIcon icon={faAddressBook} /> Address Book</h3>
                <Card className="address-card shadow-sm p-4">
                  <p><strong>Home Address:</strong> 123 Greenway Drive, Eco City, EC 12345</p>
                  <p><strong>Billing Address:</strong> 456 Earth Avenue, Eco City, EC 67890</p>
                  <Button variant="eco-green" onClick={handleShowEditAddress} className="mt-3">
                    <FontAwesomeIcon icon={faEdit} /> Edit Addresses
                  </Button>
                </Card>

                {/* Edit Address Modal */}
                <Modal show={showEditAddress} onHide={handleCloseEditAddress}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Address</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formHomeAddress">
                        <Form.Label>Home Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter home address" />
                      </Form.Group>
                      <Form.Group controlId="formBillingAddress" className="mt-3">
                        <Form.Label>Billing Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter billing address" />
                      </Form.Group>
                      <Button variant="eco-green" onClick={handleCloseEditAddress} className="mt-3 w-100">
                        Save Address
                      </Button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </Tab.Pane>

              {/* Account Settings Section */}
              <Tab.Pane eventKey="settings">
                <h3><FontAwesomeIcon icon={faCog} /> Account Settings</h3>
                <Button variant="eco-green" onClick={handleShowChangePassword} className="mt-3">
                  <FontAwesomeIcon icon={faLock} /> Change Password
                </Button>
                <Button variant="danger" className="mt-3">
                  <FontAwesomeIcon icon={faTrash} /> Delete Account
                </Button>

                {/* Change Password Modal */}
                <Modal show={showChangePassword} onHide={handleCloseChangePassword}>
                  <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formCurrentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter current password" />
                      </Form.Group>
                      <Form.Group controlId="formNewPassword" className="mt-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter new password" />
                      </Form.Group>
                      <Form.Group controlId="formConfirmNewPassword" className="mt-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm new password" />
                      </Form.Group>
                      <Button variant="eco-green" onClick={handleCloseChangePassword} className="mt-3 w-100">
                        Update Password
                      </Button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
    <Footer/>
    </>
  );
}

export default Account;
