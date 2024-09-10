import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/dashboard.css';

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
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

    // Handle search input change
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter orders based on search query
    const filteredOrders = orders.filter((order) => {
        return (
            order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.product.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleView = (id) => {
        navigate(`/order/${id}`); // Ensure you navigate to the correct path
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

    // Handle order confirmation
    const handleConfirm = (id) => {
        axios.put(`http://localhost:8090/orders/update/${id}`, { status: "Confirmed" })
            .then(() => {
                alert("Order confirmed successfully");
                setOrders(orders.map(order => 
                    order._id === id ? { ...order, status: "Confirmed" } : order
                ));
            })
            .catch((err) => {
                alert("Error confirming order: " + err.message);
            });
    };

    return (
        <div>
            <h2 className="order-list-title">Order List</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search Order, Customer, Product"
                    value={searchQuery} // Bind search query state
                    onChange={handleSearch} // Handle search input change
                />
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
                    {filteredOrders.map((order) => ( // Render filtered orders
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
                                <button className="confirm-btn" onClick={() => handleConfirm(order._id)}>Confirm</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderManagement;
