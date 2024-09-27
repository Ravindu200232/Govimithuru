import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { Card, Row, Col, Table } from 'react-bootstrap';

// Register components
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const EmployeeSummary = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [positionChartData, setPositionChartData] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8000/employee/');
                setEmployees(response.data);
                setLoading(false);
                preparePositionChartData(response.data);
                prepareTableData(response.data);
            } catch (err) {
                setError('Failed to fetch employees. Please try again.');
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const preparePositionChartData = (data) => {
        const positionSummary = data.reduce((acc, employee) => {
            acc[employee.position] = (acc[employee.position] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(positionSummary);
        const values = Object.values(positionSummary);

        setPositionChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Employee Distribution by Position',
                    data: values,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
                },
            ],
        });
    };

    const prepareTableData = (data) => {
        const formattedTableData = data.map(employee => ({
            id: employee._id,
            name: `${employee.firstName} ${employee.lastName}`,
            email: employee.email,
            position: employee.position,
            department: employee.department,
            phone: employee.phoneNumber,
            nic: employee.nic,
            drivingNic: employee.drivingNic,
            birthday: employee.birthday ? new Date(employee.birthday).toLocaleDateString() : 'No Birthday',
            profileImage: employee.profileImageBase64 ? `data:image/jpeg;base64,${employee.profileImageBase64}` : 'No Image',
        }));

        setTableData(formattedTableData);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <Card className="my-4">
            <Card.Body>
                <Card.Title>Employee Summary</Card.Title>
                {error && <p className="error-message">{error}</p>}
                <Row>
                    <Col md={6}>
                        <h5>Employee Distribution by Position (Pie Chart)</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {positionChartData.labels && positionChartData.labels.length > 0 ? (
                                <Pie data={positionChartData} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <h5>Employee Count by Position (Bar Chart)</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {positionChartData.labels && positionChartData.labels.length > 0 ? (
                                <Bar data={positionChartData} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                </Row>
                <h5 className="mt-4">Employee Details Table</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Phone</th>
                            <th>NIC</th>
                            <th>Driving NIC</th>
                            <th>Birthday</th>
                            <th>Profile Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length > 0 ? (
                            tableData.map((row, index) => (
                                <tr key={row.id}>
                                    <td>{index + 1}</td>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.position}</td>
                                    <td>{row.department}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.nic}</td>
                                    <td>{row.drivingNic}</td>
                                    <td>{row.birthday}</td>
                                    <td>
                                        {row.profileImage !== 'No Image' ? (
                                            <img src={row.profileImage} alt="Profile" className="employee-image" />
                                        ) : (
                                            row.profileImage
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center">No employees available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default EmployeeSummary;
