import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/UserDashboard.css';

function UserDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/user/")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/user/delete/${id}`)
            .then(() => {
                setUsers(users.filter(user => user._id !== id));
                alert("User deleted successfully");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <div>
            <h2 className="user-dashboard-title">User Dashboard</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserDashboard;
