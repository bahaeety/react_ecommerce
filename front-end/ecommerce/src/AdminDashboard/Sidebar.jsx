import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav className="flex-column">
                <Nav.Link href="/admin" className="text-light">
                    <i className="bi bi-speedometer2"></i> <span>Dashboard</span>
                </Nav.Link>
                <Nav.Link href="/admin/products" className="text-light">
                    <i className="bi bi-box-seam"></i> <span>Products</span>
                </Nav.Link>
                <Nav.Link href="/admin/users" className="text-light">
                    <i className="bi bi-people"></i> <span>Users</span>
                </Nav.Link>
                <Nav.Link href="/admin/settings" className="text-light">
                    <i className="bi bi-gear"></i> <span>Settings</span>
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
