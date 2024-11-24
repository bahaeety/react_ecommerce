import { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Form, Modal, ListGroup, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBoxOpen, faAddressBook, faCog, faEdit, faTrash, faLock } from '@fortawesome/free-solid-svg-icons';
import './Account.css';
import Header from '../Home/Header/Header';
import Footer from '../Home/Footer/Footer';
import session_cheker from '../Protected_routes/session-cheker';
import axios from 'axios';
function Account() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    homeadresse: '',
    billingadresse: '',
    phone_number: ''
  })
  const [editProfileData, setEditProfileData] = useState({
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
  });
  const [editAddressData, setEditAddressData] = useState({
    homeadresse: user.homeadresse,
    billingadresse: user.billingadresse,
  });


  const [showEditProfile, setShowEditProfile] = useState(false);
  const handleCloseEditProfile = () => setShowEditProfile(false);
  const handleShowEditProfile = () => setShowEditProfile(true);

  const [showEditAddress, setShowEditAddress] = useState(false);
  const handleCloseEditAddress = () => setShowEditAddress(false);
  const handleShowEditAddress = () => setShowEditAddress(true);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const handleCloseChangePassword = () => setShowChangePassword(false);
  const handleShowChangePassword = () => setShowChangePassword(true);

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSaveProfileChanges = async () => {
    try {
      console.log('Updating profile with:', editProfileData); // Log data
      const response = await axios.put('/user/update-profile', {
        ...editProfileData,
      });
      alert('Profile updated successfully!');
      setUser((prevUser) => ({
        ...prevUser,
        ...editProfileData,
      }));
      handleCloseEditProfile();
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      alert('Failed to update profile.');
    }
  };
  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setEditAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSaveAddressChanges = async () => {
    try {
      const response_id = await session_cheker(); 
      const userId = response_id.user_id;
  
      const payload = {
        userId,
        homeadresse: editAddressData.homeadresse,
        billingadresse: editAddressData.billingadresse,
      };
  
      console.log('Sending address update payload:', payload);
  
      const response = await axios.put('/user/update-address', payload);
      alert('Address updated successfully!');
      setUser((prevUser) => ({
        ...prevUser,
        ...editAddressData,
      }));
      handleCloseEditAddress();
    } catch (error) {
      console.error('Error updating address:', error.response?.data || error.message);
      alert('Failed to update address.');
    }
  };
  
  

  useEffect(() => {
    const getUser = async () => {
      const response = await session_cheker();
      console.log(response)
      if (response) {
        setUser({
          name: response.name,
          email: response.email,
          password: response.password,
          homeadresse: response.homeaddress,
          billingadresse: response.billingaddress,
          phone_number: response.phonenumber
        })
        console.log(user)
      }
    }
    getUser();
  }, [])

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
                <Tab.Pane eventKey="profile">
                  <h3><FontAwesomeIcon icon={faUser} /> Profile Information</h3>
                  <Card className="profile-card shadow-sm p-4">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> +{user.phone_number}</p>
                    <Button variant="eco-green" onClick={handleShowEditProfile} className="mt-3">
                      <FontAwesomeIcon icon={faEdit} /> Edit Profile
                    </Button>
                  </Card>

                  <Modal show={showEditProfile} onHide={handleCloseEditProfile}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="formName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={editProfileData.name}
                            onChange={handleProfileInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={editProfileData.email}
                            onChange={handleProfileInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="formPhone" className="mt-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            name="phone_number"
                            placeholder="Enter phone number"
                            value={editProfileData.phone_number}
                            onChange={handleProfileInputChange}
                          />
                        </Form.Group>
                        <Button
                          variant="eco-green"
                          onClick={handleSaveProfileChanges}
                          className="mt-3 w-100"
                        >
                          Save Changes
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>

                </Tab.Pane>

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

                <Tab.Pane eventKey="addresses">
                  <h3><FontAwesomeIcon icon={faAddressBook} /> Address Book</h3>
                  <Card className="address-card shadow-sm p-4">
                    <p><strong>Home Address:</strong> {user.homeadresse}</p>
                    <p><strong>Billing Address:</strong> {user.billingadresse}</p>
                    <Button variant="eco-green" onClick={handleShowEditAddress} className="mt-3">
                      <FontAwesomeIcon icon={faEdit} /> Edit Addresses
                    </Button>
                  </Card>

                  <Modal show={showEditAddress} onHide={handleCloseEditAddress}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="formHomeAddress">
                          <Form.Label>Home Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="homeadresse"
                            placeholder="Enter home address"
                            value={editAddressData.homeadresse}
                            onChange={handleAddressInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="formBillingAddress" className="mt-3">
                          <Form.Label>Billing Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="billingadresse"
                            placeholder="Enter billing address"
                            value={editAddressData.billingadresse}
                            onChange={handleAddressInputChange}
                          />
                        </Form.Group>
                        <Button
                          variant="eco-green"
                          onClick={handleSaveAddressChanges}
                          className="mt-3 w-100"
                        >
                          Save Address
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>

                </Tab.Pane>

                <Tab.Pane eventKey="settings">
                  <h3><FontAwesomeIcon icon={faCog} /> Account Settings</h3>
                  <Button variant="eco-green" onClick={handleShowChangePassword} className="mt-3">
                    <FontAwesomeIcon icon={faLock} /> Change Password
                  </Button>
                  <Button variant="danger" className="mt-3">
                    <FontAwesomeIcon icon={faTrash} /> Delete Account
                  </Button>

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
      <Footer />
    </>
  );
}

export default Account;
