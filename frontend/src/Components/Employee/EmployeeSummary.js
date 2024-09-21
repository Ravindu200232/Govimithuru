// src/components/EmployeeSummary.js

import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import { Card, Row, Col, Table } from 'react-bootstrap';

// Register components
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const EmployeeSummary = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [salaryData, setSalaryData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const employeeResponse = await axios.get('http://localhost:8000/employees');
                const salaryResponse = await axios.get('http://localhost:8000/salaries'); // Adjust API URL as needed

                setEmployeeData(employeeResponse.data);
                setSalaryData(salaryResponse.data);
                prepareChartData(employeeResponse.data);
                prepareTableData(salaryResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchEmployeeData();
    }, []);

    const prepareChartData = (data) => {
        const departmentSummary = data.reduce((acc, employee) => {
            acc[employee.department] = (acc[employee.department] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(departmentSummary);
        const values = Object.values(departmentSummary);

        setChartData({
            pie: {
                labels: labels,
                datasets: [
                    {
                        label: 'Employee Distribution by Department',
                        data: values,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
                    },
                ],
            },
            bar: {
                labels: labels,
                datasets: [
                    {
                        label: 'Employee Count by Department',
                        data: values,
                        backgroundColor: '#36A2EB',
                    },
                ],
            },
        });
    };

    const prepareTableData = (salaries) => {
        const formattedTableData = salaries.map((salary) => ({
            employeeId: salary.employeeId,
            name: salary.name,
            position: salary.position,
            totalSalary: salary.totalSalary,
            payday: new Date(salary.payday).toLocaleDateString(), // Format date
        }));

        setTableData(formattedTableData);
    };

    return (
        <Card className="my-4">
            <Card.Body>
                <Card.Title>Employee Summary</Card.Title>
                <Row>
                    <Col md={6}>
                        <h5>Department Distribution (Pie Chart)</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {chartData.pie && chartData.pie.labels && chartData.pie.labels.length > 0 ? (
                                <Pie data={chartData.pie} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <h5>Employee Count by Department (Bar Chart)</h5>
                        <div style={{ width: '100%', height: '300px' }}>
                            {chartData.bar && chartData.bar.labels && chartData.bar.labels.length > 0 ? (
                                <Bar data={chartData.bar} />
                            ) : (
                                <p>No data available.</p>
                            )}
                        </div>
                    </Col>
                </Row>
                <h5 className="mt-4">Salary Summary Table</h5>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Total Salary</th>
                            <th>Payday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length > 0 ? (
                            tableData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.employeeId}</td>
                                    <td>{row.name}</td>
                                    <td>{row.position}</td>
                                    <td>{row.totalSalary}</td>
                                    <td>{row.payday}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default EmployeeSummary;
