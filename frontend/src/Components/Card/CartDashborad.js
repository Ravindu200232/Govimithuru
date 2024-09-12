import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';

function Carts() {
    const [cardItems, setCardItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all card items from the backend
        axios.get('http://localhost:8000/card')
            .then((res) => {
                // Set the card items in state
                setCardItems(res.data);
            })
            .catch((err) => {
                console.error('Error fetching card items:', err);
            });
    }, []);

    // Handle delete operation
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/card/delete/${id}`)
            .then((res) => {
                // Refresh the card items
                setCardItems(cardItems.filter(item => item._id !== id));
            })
            .catch((err) => {
                console.error('Error deleting card item:', err);
            });
    };

    // Handle view operation
    const handleView = (id) => {
        navigate(`/card/${id}`); // Navigate to a detailed view page (you'll need to set up this route separately)
    };

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Cart Dashboard</h1>
            <div className="search-bar">
                <input type="text" placeholder="Search by Name, Category, or Price" />
                <button className="search-btn">Search</button>
            </div>
            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>ID</th> {/* Sequential ID */}
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cardItems.length > 0 ? (
                        cardItems.map((item, index) => ( // Add index here
                            <tr key={item._id}>
                                <td>{index + 1}</td> {/* Display sequential ID */}
                                <td>
                                    <img 
                                        src={`data:image/jpeg;base64,${item.imagec}`} 
                                        alt={item.itemNamec} 
                                        className="cart-item-image" // You can define CSS to style this
                                    />
                                </td>
                                <td>{item.itemNamec}</td>
                                <td>{item.categoryc}</td>
                                <td>₹{item.pricec.toFixed(2)}</td>
                                <td>{item.available}</td>
                                <td>{item.quantityc}</td>
                                <td>
                                    <button onClick={() => handleView(item._id)}>View</button>
                                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No items in the cart.</td> {/* Adjusted colspan for the extra column */}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Carts;
