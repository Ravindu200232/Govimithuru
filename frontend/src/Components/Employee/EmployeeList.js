import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Employeecss/emplist.css'; // Include the CSS file for styling

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:8090/employee/");
                setEmployees(response.data);
            } catch (error) {
                console.error("There was an error fetching the employees:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleView = (id) => navigate(`/employee/view/${id}`);
    const handleUpdate = (id) => navigate(`/employee/update/${id}`);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            axios.delete(`http://localhost:8090/employee/delete/${id}`)
                .then(() => setEmployees(employees.filter(emp => emp._id !== id)))
                .catch((err) => alert("Error deleting employee: " + err.message));
        }
    };

    const handleSearch = () => {
        // Implement search functionality based on `searchQuery`
        // For now, it filters client-side
        const filteredEmployees = employees.filter(emp =>
            emp.employeeId.includes(searchQuery) ||
            emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setEmployees(filteredEmployees);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="employee-list-title">Employee List</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by ID, Name, or Email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Phone Number</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>ETF</th>
                        <th>Actions</th>
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
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.department}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.ETF}</td>
                                <td>
                                    <button className="view-btn" onClick={() => handleView(employee._id)}>View</button>
                                    <button className="update-btn" onClick={() => handleUpdate(employee._id)}>Update</button>
                                    <button className="delete-btn" onClick={() => handleDelete(employee._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
