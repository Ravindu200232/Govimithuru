import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Dashboard.css';

function Carts() {
    const [cardItems, setCardItems] = useState([]);

    useEffect(() => {
        // Fetch all card items from the backend
        axios.get('http://localhost:8090/card')
            .then((res) => {
                // Set the card items in state
                setCardItems(res.data);
            })
            .catch((err) => {
                console.error('Error fetching card items:', err);
            });
    }, []);

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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cardItems.length > 0 ? (
                        cardItems.map((item) => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.itemNamec}</td>
                                <td>{item.categoryc}</td>
                                <td>${item.pricec.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No items in the cart.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Carts;
