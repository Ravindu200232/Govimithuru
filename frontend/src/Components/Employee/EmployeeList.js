import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import './Employeecss/emplist.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        department: '',
        phoneNumber: '',
        nic: '',
        drivingNic: '',
        birthday: '',
        profileImageBase64: ''
    });
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

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setFormData({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            position: employee.position,
            department: employee.department,
            phoneNumber: employee.phoneNumber,
            nic: employee.nic,
            drivingNic: employee.drivingNic,
            birthday: employee.birthday || '',
            profileImageBase64: employee.profileImageBase64 || ''
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/employee/update/${selectedEmployee._id}`, formData);
            setEmployees(employees.map(emp => (emp._id === selectedEmployee._id ? { ...emp, ...formData } : emp)));
            setSelectedEmployee(null);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                position: '',
                department: '',
                phoneNumber: '',
                nic: '',
                drivingNic: '',
                birthday: '',
                profileImageBase64: ''
            });
            alert("Employee updated successfully");
        } catch (err) {
            alert(err.message);
        }
    };

    const generatePDF = (employee) => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Employee Details", 20, 20);
        doc.setFontSize(12);
        doc.text(`Employee ID: ${employee._id}`, 20, 40);
        doc.text(`First Name: ${employee.firstName}`, 20, 50);
        doc.text(`Last Name: ${employee.lastName}`, 20, 60);
        doc.text(`Email: ${employee.email}`, 20, 70);
        doc.text(`Position: ${employee.position}`, 20, 80);
        doc.text(`Department: ${employee.department}`, 20, 90);
        doc.text(`Phone Number: ${employee.phoneNumber}`, 20, 100);
        doc.text(`NIC: ${employee.nic}`, 20, 110);
        doc.text(`Driving NIC: ${employee.drivingNic}`, 20, 120);
        doc.text(`Birthday: ${employee.birthday ? new Date(employee.birthday).toLocaleDateString() : 'No Birthday'}`, 20, 130);

        if (employee.profileImageBase64) {
            const imgData = `data:image/jpeg;base64,${employee.profileImageBase64}`;
            doc.addImage(imgData, 'JPEG', 20, 140, 50, 50);
        }

        doc.save(`Employee_${employee._id}.pdf`);
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
                        <th>Birthday</th>
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
                                <td>{employee.birthday ? new Date(employee.birthday).toLocaleDateString() : 'No Birthday'}</td>
                                <td>{employee.profileImageBase64 ? <img src={`data:image/jpeg;base64,${employee.profileImageBase64}`} alt={`${employee.firstName} ${employee.lastName}`} className="employee-image" /> : 'No Image'}</td>
                                <td>
                                   
                                    <br></br>
                                    <button className="delete-btn" onClick={() => handleDelete(employee._id)}>Delete</button>
                                    <br></br>
                                    <button className="pdf-btn" onClick={() => generatePDF(employee)}>Download PDF</button>
                                    <br></br><br></br>
                                    <button className="edit-btn" onClick={() => handleEdit(employee)}>Edit</button>
                                    
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12">No employees available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedEmployee && (
                <form onSubmit={handleUpdate} className="edit-employee-form">
                    <h3>Edit Employee</h3>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Position"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="NIC"
                        value={formData.nic}
                        onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Driving NIC"
                        value={formData.drivingNic}
                        onChange={(e) => setFormData({ ...formData, drivingNic: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Birthday"
                        value={formData.birthday}
                        onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    />
                    <button type="submit">Update Employee</button>
                    <button type="button" onClick={() => setSelectedEmployee(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
}

export default EmployeeList;
