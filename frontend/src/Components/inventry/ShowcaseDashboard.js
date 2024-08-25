import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/ShowcaseDashboard.css';

function ShowcaseDashboard() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8090/showcase/")
            .then((res) => {
                setItems(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleView = (id) => {
        navigate(`/showcase/view/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            axios.delete(`http://localhost:8090/showcase/delete/${id}`)
                .then(() => {
                    alert("Showcase Item Deleted");
                    setItems(items.filter(item => item._id !== id));
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    };

    return (
        <div className="showcase-dashboard-container">
            <h2 className="showcase-dashboard-title">Showcase Dashboard</h2>
            <table className="showcase-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Unit</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.description}</td>
                            <td>{item.unit}</td>
                            <td>{item.price}</td>
                            <td>
                                <img
                                    src={`data:image/jpeg;base64,${item.imageBase64}`}
                                    alt={item.name}
                                    className="showcase-image"
                                />
                            </td>
                            <td>
                                <button className="view-btn" onClick={() => handleView(item._id)}>View</button>
                                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowcaseDashboard;
