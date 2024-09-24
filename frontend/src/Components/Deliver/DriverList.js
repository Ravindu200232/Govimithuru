import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingDriverId, setEditingDriverId] = useState(null);
    const [status, setStatus] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/drivers/');
            setDrivers(response.data);
        } catch (error) {
            setError('Error fetching drivers. Please try again.');
            console.error('Error fetching drivers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (driverId, currentStatus) => {
        setEditingDriverId(driverId);
        setStatus(currentStatus);
    };

    const handleStatusChange = async () => {
        if (!editingDriverId) return;
    
        try {
            console.log(`Updating driver ID: ${editingDriverId} to status: ${status}`); // Debugging log
            await axios.put(`http://localhost:8000/drivers/update/${editingDriverId}`, { status });
            fetchDrivers(); // Refresh the driver list
            setEditingDriverId(null); // Reset the editing driver
            setStatus(''); // Reset the status input
        } catch (error) {
            setError('Error updating status. Please try again.');
            console.error('Error updating status:', error);
        }
    };
    

    const handleDelete = async (driverId) => {
        if (window.confirm('Are you sure you want to delete this driver?')) {
            try {
                await axios.delete(`http://localhost:8000/drivers/delete/${driverId}`);
                fetchDrivers();
            } catch (error) {
                setError('Error deleting driver. Please try again.');
                console.error('Error deleting driver:', error);
            }
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:8000/employee/position/driver');
            if (Array.isArray(response.data)) {
                await axios.delete('http://localhost:8000/drivers/deleteAll');
                await Promise.all(response.data.map(async (employee) => {
                    const newDriver = {
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        email: employee.email,
                        department: employee.department,
                        phoneNumber: employee.phoneNumber,
                        nic: employee.nic,
                        drivingNic: employee.drivingNic,
                        birthday: employee.birthday ? new Date(employee.birthday) : undefined,
                    };
                    await axios.post('http://localhost:8000/drivers/add', newDriver);
                }));
                alert('Drivers stored successfully!');
                fetchDrivers();
            } else {
                setError('Unexpected response format.');
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            setError('Error refreshing driver data. Please try again.');
            console.error('Error refreshing driver data:', error.response ? error.response.data : error.message);
        } finally {
            setRefreshing(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Driver List</h1>
            <button onClick={handleRefresh} disabled={refreshing}>
                {refreshing ? 'Refreshing...' : 'Refresh Drivers'}
            </button>
            {error && <div className="error">{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Phone Number</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map(driver => (
                        <tr key={driver._id}>
                            <td>{driver.firstName}</td>
                            <td>{driver.lastName}</td>
                            <td>{driver.email}</td>
                            <td>{driver.department}</td>
                            <td>{driver.phoneNumber}</td>
                            <td>
                                <select
                                    value={editingDriverId === driver._id ? status : driver.status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    disabled={editingDriverId !== driver._id}
                                >
                                    <option value="available">Available</option>
                                    <option value="unavailable">Unavailable</option>
                                </select>
                            </td>
                            <td>
                                {editingDriverId === driver._id ? (
                                    <button onClick={handleStatusChange}>Update</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(driver._id, driver.status)}>Edit</button>
                                        <button onClick={() => handleDelete(driver._id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DriverList;
