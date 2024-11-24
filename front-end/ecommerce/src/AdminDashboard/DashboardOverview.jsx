import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './DashboardOverview.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardOverview = () => {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Sales',
                data: [1000, 2000, 1500, 3000, 2500, 4000],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
        },
    };

    return (
        <div>
            <Row className="g-4">
                <Col lg={4}>
                    <Card className="stats-card text-center shadow-sm">
                        <Card.Body>
                            <h5>Total Sales</h5>
                            <h2 className="text-primary">$15,000</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="stats-card text-center shadow-sm">
                        <Card.Body>
                            <h5>Total Orders</h5>
                            <h2 className="text-success">1,200</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="stats-card text-center shadow-sm">
                        <Card.Body>
                            <h5>New Users</h5>
                            <h2 className="text-info">350</h2>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5>Sales Over Time</h5>
                            <Line data={chartData} options={chartOptions} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardOverview;
