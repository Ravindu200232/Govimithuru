import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/deliverAll.css';

function Deliveries() {
    const [deliveries, setDeliveries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8090/delivery/")
            .then((res) => {
                setDeliveries(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleView = (id) => {
        navigate(`/deliveryview/${id}`);
    };

    const handleDelete = (id) => {
        navigate(`/deliverydelete/${id}`);
    };

    return (
        <div>
            <h2 className="deliveries-list-title">Deliveries List</h2>
            <div className="search-bar">
                <input type="text" placeholder="Search Deliver ID, Order ID or Address" />
                <button className="search-btn">Search</button>
            </div>
            <table className="deliveries-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order ID</th>
                        <th>Deliver Date</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries.map((delivery, index) => (
                        <tr key={delivery._id}>
                            <td>{index + 1}</td>
                            <td>{delivery.orderID}</td>
                            <td>{delivery.deliverDate}</td>
                            <td>{delivery.address}</td>
                            <td>{delivery.status}</td>
                            <td>
                                <button className="view-btn" onClick={() => handleView(delivery._id)}>View</button>
                                <button className="delete-btn" onClick={() => handleDelete(delivery._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Deliveries;
