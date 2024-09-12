import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/InventoryDashboard.css';

function InventoryDashboard() {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        axios.get("http://localhost:8000/availableitem/")
            .then((res) => {
                setItems(res.data);
            })
            .catch((err) => {
                alert("Error fetching data: " + err.message);
            });
    };

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            fetchItems();
        } else {
            const filteredItems = items.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setItems(filteredItems);
        }
    };

    return (
        <div>
            <h2 className="inventory-list-title">Available Inventory Dashboard</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Name or Category"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Supplier Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Unit</th>
                        <th>Available Item</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.supName}</td>
                                <td>{item.description}</td>
                                <td>{item.category}</td>
                                <td>{item.unit}</td>
                                <td>{item.availableItem}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                                No items found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryDashboard;
