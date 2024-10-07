import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import autoTable
import './css/UserDashboard.css';
import logo from '../ui/img/logo.png';

function UserDashboard() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({ firstname: '', lastname: '', username: '', email: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8000/user/");
            setUsers(res.data);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/user/delete/${id}`);
            setUsers(users.filter(user => user._id !== id));
            alert("User deleted successfully");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/user/update/${selectedUser._id}`, formData);
            fetchUsers();
            setSelectedUser(null);
            setFormData({ firstname: '', lastname: '', username: '', email: '' });
            alert("User updated successfully");
        } catch (err) {
            alert(err.message);
        }
    };

    // Function to generate PDF of all users
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Add logo
        doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Adjust size and position as needed

        // Company details
        doc.setFontSize(10);
        doc.text("Govimithu Pvt Limited", 14, 40);
        doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
        doc.text("Phone Number: 0789840996", 14, 50);
        
        doc.setFontSize(20);
        doc.text("User List", 20, 70); // Adjust Y position after company info
        doc.setFontSize(12);

        // Table headers
        const headers = [["Name", "Email"]];
        const data = users.map(user => [user.firstname + ' ' + user.lastname, user.email]);

        // Create the table
        doc.autoTable({
            head: headers,
            body: data,
            startY: 80, // Start below the title
        });

        doc.save("UserList.pdf");
    };

    return (
        <div>
            <h2 className="user-dashboard-title">User Dashboard</h2>

            <button onClick={generatePDF} className="download-pdf-btn">Download PDF</button>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <form onSubmit={handleUpdate}>
                    <h3>Edit User</h3>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstname}
                        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <button type="submit">Update User</button>
                    <button type="button" onClick={() => setSelectedUser(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
}

export default UserDashboard;
