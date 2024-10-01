import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import './css/deliverAll.css';
import logo from '../ui/img/logo.png';

function DeliveryDashboard() {
    const [deliveries, setDeliveries] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedDeliveryId, setExpandedDeliveryId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const res = await axios.get('http://localhost:8000/delivery/');
                setDeliveries(res.data);
            } catch (err) {
                alert('Error fetching deliveries: ' + err.message);
            }
        };
        fetchDeliveries();
    }, []);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const res = await axios.get('http://localhost:8000/drivers/status/available');
                setDrivers(res.data);
            } catch (err) {
                alert('Error fetching drivers: ' + err.message);
            }
        };
        fetchDrivers();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredDeliveries = deliveries.filter((delivery) =>
        delivery.deliveryPersonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.deliveryDetails.some(detail => detail.itemName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleView = (id) => {
        navigate(`/delivery/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this delivery?')) {
            try {
                await axios.delete(`http://localhost:8000/delivery/delete/${id}`);
                alert('Delivery deleted successfully');
                setDeliveries(prevDeliveries => prevDeliveries.filter(delivery => delivery._id !== id));
            } catch (err) {
                alert('Error deleting delivery: ' + err.message);
            }
        }
    };

    const handleConfirm = async (id) => {
        try {
            await axios.put(`http://localhost:8000/delivery/update/${id}`, { status: 'Delivered' });
            alert('Delivery confirmed successfully');
            setDeliveries(prevDeliveries =>
                prevDeliveries.map(delivery =>
                    delivery._id === id ? { ...delivery, status: 'Delivered' } : delivery
                )
            );
        } catch (err) {
            alert('Error confirming delivery: ' + err.message);
        }
    };

    const handleAssignDriver = async (deliveryId, driverId) => {
        if (driverId) {
            const driver = drivers.find(driver => driver._id === driverId);
            const driverName = driver ? `${driver.firstName} ${driver.lastName}` : "";

            try {
                await axios.put(`http://localhost:8000/delivery/update/${deliveryId}`, { driverName });
                alert('Driver assigned successfully');
                setDeliveries(prevDeliveries =>
                    prevDeliveries.map(delivery =>
                        delivery._id === deliveryId ? { ...delivery, driverName } : delivery
                    )
                );
            } catch (err) {
                alert('Error assigning driver: ' + err.message);
            }
        } else {
            alert('Please select a driver');
        }
    };

    // New function to generate PDF
    const generatePDF = (delivery) => {
        const doc = new jsPDF();

        // Add logo
        doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Adjust size and position as needed

        // Add company details
        doc.setFontSize(10);
        doc.text("Govimithu Pvt Limited", 14, 40);
        doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
        doc.text("Phone Number: 0789840996", 14, 50);
        doc.text("Delivery Receipt", 20, 70); // Title

        // Add delivery details
        doc.setFontSize(12);
        doc.text(`Delivery ID: ${delivery._id}`, 20, 90);
        doc.text(`Delivery Person: ${delivery.deliveryPersonName}`, 20, 100);
        doc.text(`Delivery Date: ${new Date(delivery.deliveryDate).toLocaleDateString()}`, 20, 110);
        doc.text(`Status: ${delivery.status}`, 20, 120);
        doc.text(`Address: ${delivery.address}`, 20, 130);
        doc.text(`Postal Code: ${delivery.postalCode}`, 20, 140);
        doc.text(`Email: ${delivery.email}`, 20, 150);
        doc.text(`Phone Number: ${delivery.phoneNumber}`, 20, 160);
        doc.text(`Delivery Type: ${delivery.deliveryType}`, 20, 170);

        // Add delivery details items
        doc.text("Delivery Details:", 20, 190);
        delivery.deliveryDetails.forEach((detail, index) => {
            const y = 200 + (index * 10);
            doc.text(`${detail.itemName} - Qty: ${detail.quantity}, Price: ₹${detail.itemPrice}, Total: ₹${detail.totalPrice}`, 20, y);
        });

        doc.save(`Delivery_${delivery._id}.pdf`);
    };

    return (
        <div>
            <h2 className="delivery-list-title">Delivery Dashboard</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Delivery Person Name or Item"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button className="search-btn">Search</button>
            </div>
            <table className="delivery-table">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Order Details</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Delivery Type</th>
                        <th>Select Driver</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDeliveries.map((delivery, index) => (
                        <tr key={delivery._id}>
                            <td>{`D${index + 1}`}</td>
                            <td>{delivery.deliveryPersonName}</td>
                            <td>
                                <button
                                    className="details-btn"
                                    onClick={() => setExpandedDeliveryId(expandedDeliveryId === delivery._id ? null : delivery._id)}
                                >
                                    {expandedDeliveryId === delivery._id ? 'Hide Details' : 'Show Details'}
                                </button>
                                {expandedDeliveryId === delivery._id && (
                                    <div className="delivery-details">
                                        {delivery.deliveryDetails.map((detail, index) => (
                                            <div key={index} className="product-detail">
                                                {detail.itemName} - Qty: {detail.quantity}, Price: Rs:{detail.itemPrice}, Total: Rs:{detail.totalPrice}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </td>
                            <td>{new Date(delivery.deliveryDate).toLocaleDateString()}</td>
                            <td>{delivery.status}</td>
                            <td>{delivery.address}</td>
                            <td>{delivery.postalCode}</td>
                            <td>{delivery.email}</td>
                            <td>{delivery.phoneNumber}</td>
                            <td>{delivery.deliveryType}</td>
                            <td>
                                <select
                                    onChange={(e) => handleAssignDriver(delivery._id, e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select a driver</option>
                                    {drivers.map((driver) => (
                                        <option key={driver._id} value={driver._id}>
                                            {driver.firstName} {driver.lastName}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(delivery._id)}>Delete</button>
                                {delivery.status !== 'Delivered' && (
                                    <button className="confirm-btn" onClick={() => handleConfirm(delivery._id)}>Confirm</button>
                                )}
                                <button className="pdf-btn" onClick={() => generatePDF(delivery)}>Download PDF</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DeliveryDashboard;
