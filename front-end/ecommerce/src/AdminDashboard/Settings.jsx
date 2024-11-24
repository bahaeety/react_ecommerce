import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Tab,
    Tabs,
} from 'react-bootstrap';
import './Settings.css';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('notifications');

    const handleSave = (e) => {
        e.preventDefault();
        alert('Settings saved!');
    };

    return (
        <Container fluid className="mt-4 settings-container">
            <Row>
                <Col>
                    <h3 className="page-title">Settings</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs
                        id="settings-tabs"
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="mb-4 settings-tabs"
                    >
                        
                        <Tab eventKey="notifications" title="Notifications">
                            <Form onSubmit={handleSave}>
                                <Form.Check
                                    type="switch"
                                    id="email-notifications"
                                    label="Enable Email Notifications"
                                    className="mb-3"
                                />
                                <Form.Check
                                    type="switch"
                                    id="sms-notifications"
                                    label="Enable SMS Notifications"
                                    className="mb-3"
                                />
                                <Form.Check
                                    type="switch"
                                    id="app-notifications"
                                    label="Enable App Notifications"
                                    className="mb-3"
                                />
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        </Tab>
                        <Tab eventKey="preferences" title="Preferences">
                            <Form onSubmit={handleSave}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control as="select">
                                        <option>English</option>
                                        <option>Spanish</option>
                                        <option>French</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Time Zone</Form.Label>
                                    <Form.Control as="select">
                                        <option>GMT</option>
                                        <option>EST</option>
                                        <option>PST</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    );
};

export default Settings;
