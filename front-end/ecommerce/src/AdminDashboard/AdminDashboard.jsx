import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Badge, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };
    const handleLogout = async () => {
        const logout = await axios.get('/user/logout');
        if(logout){
          console.log(logout)
          navigate('/auth')
        }
          
        };

    return (
        <div className={`admin-dashboard ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
            {sidebarVisible && <Sidebar />}
            
            <div className="dashboard-content">
                <Navbar className="dashboard-navbar shadow-sm px-3">
                    <i
                        className={`bi ${sidebarVisible ? 'bi-arrow-left-square' : 'bi-arrow-right-square'} toggle-icon`}
                        onClick={toggleSidebar}
                        title={sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
                    ></i>
                    <Navbar.Brand className="fw-bold text-light ms-3">EcoCart Admin</Navbar.Brand>
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link href="#" className="text-light">
                            <i className="bi bi-bell"></i>
                            <Badge bg="danger" className="ms-1">3</Badge>
                        </Nav.Link>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="light" className="profile-dropdown">
                                <i className="bi bi-person-circle"></i> Admin
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                            <Dropdown.Item href="/admin/profile">My Profile</Dropdown.Item>
                            <Dropdown.Item href="/admin/settings">Settings</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Navbar>

                <Container fluid className="dashboard-main mt-4">
                    <Outlet />
                </Container>
            </div>
        </div>
    );
};

export default AdminDashboard;
