import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/deliverAll.css'; // Assuming you have similar CSS

function DeliveryDashboard() {
    const [deliveries, setDeliveries] = useState([]);
    const [drivers, setDrivers] = useState([]); // State to store drivers
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedDeliveryId, setExpandedDeliveryId] = useState(null);
    const navigate = useNavigate();

    // Fetch deliveries
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

    // Fetch drivers with position 'Driver'
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const res = await axios.get('http://localhost:8000/employee/position/driver');
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
        try {
            await axios.put(`http://localhost:8000/delivery/update/${deliveryId}`, { assignedDriver: driverId });
            alert('Driver assigned successfully');
            // Optionally update the UI
        } catch (err) {
            alert('Error assigning driver: ' + err.message);
        }
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
                        <th>Delivery ID</th>
                        <th>Delivery Person Name</th>
                        <th>Delivery Details</th>
                        <th>Delivery Date</th>
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
                            <td>{`D${index + 1}`}</td> {/* Format Delivery ID as D1, D2, etc. */}
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
                                                {detail.itemName} - Qty: {detail.quantity}, Price: ₹{detail.itemPrice}, Total: ₹{detail.totalPrice}
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
                                    defaultValue="" // Optionally set default value based on delivery.assignedDriver
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
                                <button className="view-btn" onClick={() => handleView(delivery._id)}>View</button>
                                <button className="delete-btn" onClick={() => handleDelete(delivery._id)}>Delete</button>
                                {delivery.status !== 'Delivered' && (
                                    <button className="confirm-btn" onClick={() => handleConfirm(delivery._id)}>Confirm</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DeliveryDashboard;
