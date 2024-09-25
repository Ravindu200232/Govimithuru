import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Employeecss/emplist.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/employee/')
            .then((res) => {
                setEmployees(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch employees. Please try again.');
                setLoading(false);
            });
    }, []);

    const handleView = (id) => {
        navigate(`/employee/view/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            axios.delete(`http://localhost:8000/employee/delete/${id}`)
                .then(() => {
                    setEmployees(employees.filter(emp => emp._id !== id));
                    alert('Employee Deleted');
                })
                .catch((err) => {
                    setError('Failed to delete employee. Please try again.');
                });
        }
    };

    const handleAddNew = () => {
        navigate('/admin/employee/EmployeeForm');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="employee-list-container">
            <h2 className="employee-list-title">Employee List</h2>
            <button className="add-new-btn" onClick={handleAddNew}>Add New Employee</button>
            {error && <p className="error-message">{error}</p>}
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th>Department</th>
                        <th>Phone Number</th>
                        <th>NIC</th>
                        <th>Driving NIC</th>
                        <th>Birthday</th> {/* Added column for Birthday */}
                        <th>Profile Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr key={employee._id}>
                                <td>{index + 1}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.position}</td>
                                <td>{employee.department}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.nic}</td>
                                <td>{employee.drivingNic}</td>
                                <td>
                                    {employee.birthday ? (
                                        new Date(employee.birthday).toLocaleDateString() // Format the date
                                    ) : (
                                        'No Birthday'
                                    )}
                                </td>
                                <td>
                                    {employee.profileImageBase64 ? (
                                        <img
                                            src={`data:image/jpeg;base64,${employee.profileImageBase64}`} // Image handling logic
                                            alt={`${employee.firstName} ${employee.lastName}`}
                                            className="employee-image"
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td>
                                    <button className="view-btn" onClick={() => handleView(employee._id)}>View</button>
                                    <button className="delete-btn" onClick={() => handleDelete(employee._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12">No employees available</td> {/* Updated colspan to 12 */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
