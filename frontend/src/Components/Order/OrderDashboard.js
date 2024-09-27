import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import './css/dashboard.css';
import logo from '../ui/img/logo.png';

function OrderDashboard() {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:8000/orders/');
                setOrders(res.data);
            } catch (err) {
                alert('Error fetching orders: ' + err.message);
            }
        };
        fetchOrders();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredOrders = orders.filter((order) =>
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.productDetails.some(detail => detail.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await axios.delete(`http://localhost:8000/orders/delete/${id}`);
                alert('Order deleted successfully');
                setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
            } catch (err) {
                alert('Error deleting order: ' + err.message);
            }
        }
    };

    const handleConfirm = async (id) => {
        try {
            await axios.put(`http://localhost:8000/orders/update/${id}`, { status: 'Confirmed' });
            alert('Order confirmed successfully');
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === id ? { ...order, status: 'Confirmed' } : order
                )
            );
        } catch (err) {
            alert('Error confirming order: ' + err.message);
        }
    };

    const handleUpdate = async (id) => {
        const newStatus = prompt("Enter new status:", "Pending");
        if (newStatus) {
            try {
                const orderToUpdate = orders.find(order => order._id === id);
                if (orderToUpdate) {
                    const updatedOrder = {
                        ...orderToUpdate,
                        status: newStatus
                    };

                    const res = await axios.put(`http://localhost:8000/orders/update/${id}`, updatedOrder);
                    if (res.status === 200) {
                        alert('Order updated successfully');
                        setOrders(prevOrders =>
                            prevOrders.map(order =>
                                order._id === id ? { ...order, status: newStatus } : order
                            )
                        );
                    } else {
                        alert('Failed to update order');
                    }
                }
            } catch (err) {
                alert('Error updating order: ' + err.message);
            }
        }
    };

    const handleDownloadPDF = (order, index) => {
        const doc = new jsPDF();

        // Add logo
        doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Adjust size and position

        // Add company details
        doc.setFontSize(10);
        doc.text("Govimithu Pvt Limited", 14, 40);
        doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
        doc.text("Phone Number: 0789840996", 14, 50);

        // Order details
        doc.setFontSize(12);
        doc.text(`Order ID: ${index + 1}`, 10, 60); // Display as (1, 2, 3, ...)
        doc.text(`Customer Name: ${order.customerName}`, 10, 70);
        doc.text(`Sale Date: ${new Date(order.saleDate).toLocaleDateString()}`, 10, 80);
        doc.text(`Status: ${order.status}`, 10, 90);
        doc.text(`Address: ${order.address}`, 10, 100);
        doc.text(`Postal Code: ${order.postalCode}`, 10, 110);
        doc.text(`Email: ${order.email}`, 10, 120);
        doc.text(`Phone Number: ${order.phoneNumber}`, 10, 130);
        doc.text(`Payment Type: ${order.paymentType}`, 10, 140);
        doc.text("Product Details:", 10, 150);

        // Product details
        order.productDetails.forEach((detail, detailIndex) => {
            doc.text(`${detailIndex + 1}. ${detail.itemName} - Qty: ${detail.quantitySold}, Price: ₹${detail.itemPrice}, Total: ₹${detail.totalPrice}`, 10, 160 + (detailIndex * 10));
        });

        doc.save(`Order_${index + 1}.pdf`);
    };

    return (
        <div>
            <h2 className="order-list-title">Order Dashboard</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Customer Name or Item"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button className="search-btn">Search</button>
            </div>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Product Details</th>
                        <th>Sale Date</th>
                        <th>Status</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Payment Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order, index) => (
                        <tr key={order._id}>
                            <td>{index + 1}</td> {/* Fake ID Display */}
                            <td>{order.customerName}</td>
                            <td>
                                <button 
                                    className="details-btn" 
                                    onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
                                >
                                    {expandedOrderId === order._id ? 'Hide Details' : 'Show Details'}
                                </button>
                                {expandedOrderId === order._id && (
                                    <div className="order-details">
                                        {order.productDetails.map((detail, detailIndex) => (
                                            <div key={detailIndex} className="product-detail">
                                                {detail.itemName} - Qty: {detail.quantitySold}, Price: Rs:{detail.itemPrice}, Total: Rs:{detail.totalPrice}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </td>
                            <td>{new Date(order.saleDate).toLocaleDateString()}</td>
                            <td>{order.status}</td>
                            <td>{order.address}</td>
                            <td>{order.postalCode}</td>
                            <td>{order.email}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.paymentType}</td>
                            <td>
                                <button className="update-btn" onClick={() => handleUpdate(order._id)}>Update</button>
                                <button className="delete-btn" onClick={() => handleDelete(order._id)}>Delete</button>
                                <button className="download-btn" onClick={() => handleDownloadPDF(order, index)}>Download PDF</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderDashboard;
