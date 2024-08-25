import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/dashboard.css';

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8090/orders/")
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleView = (id) => {
        navigate(`/order/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8090/orders/delete/${id}`)
            .then(() => {
                alert("Order deleted successfully");
                setOrders(orders.filter(order => order._id !== id));
            })
            .catch((err) => {
                alert("Error deleting order: " + err.message);
            });
    };

    return (
        <div>
            <h2 className="order-list-title">Order List</h2>
            <div className="search-bar">
                <input type="text" placeholder="Search Order, Customer, Product" />
                <button className="search-btn">Search</button>
            </div>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Product</th>
                        <th>Quantity Sold</th>
                        <th>Total Price</th>
                        <th>Sale Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order._id}>
                            <td>{order.orderId}</td>
                            <td>{order.customerName}</td>
                            <td>{order.product}</td>
                            <td>{order.quantitySold}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.saleDate}</td>
                            <td>{order.status}</td>
                            <td>
                                <button className="view-btn" onClick={() => handleView(order._id)}>View</button>
                                <button className="delete-btn" onClick={() => handleDelete(order._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderManagement;
