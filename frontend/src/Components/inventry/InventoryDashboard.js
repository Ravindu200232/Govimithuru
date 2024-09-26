import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import './css/InventoryDashboard.css';

function InventoryDashboard() {
    const [items, setItems] = useState([]); // Original item list
    const [filteredItems, setFilteredItems] = useState([]); // Filtered item list
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        axios.get("http://localhost:8000/availableitem/")
            .then((res) => {
                setItems(res.data);
                setFilteredItems(res.data); // Initialize filtered items
            })
            .catch((err) => {
                alert("Error fetching data: " + err.message);
            });
    };

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setFilteredItems(items); // Reset to original items if search query is empty
        } else {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = items.filter(
                (item) =>
                    item.name.toLowerCase().includes(lowerCaseQuery) ||
                    item.category.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredItems(filtered);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            axios.delete(`http://localhost:8000/availableitem/${id}`)
                .then(() => {
                    alert("Item deleted successfully");
                    fetchItems(); // Refresh the item list
                })
                .catch((err) => {
                    alert("Error deleting item: " + err.message);
                });
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text('Available Inventory Items', 20, 20);
        
        // Define the columns for the table
        const columns = [
            { header: "Name", dataKey: "name" },
            { header: "Supplier Name", dataKey: "supName" },
            { header: "Description", dataKey: "description" },
            { header: "Category", dataKey: "category" },
            { header: "Unit", dataKey: "unit" },
            { header: "Available Item", dataKey: "availableItem" }
        ];
        
        // Prepare the data for the table
        const rows = filteredItems.map(item => ({
            name: item.name,
            supName: item.supName,
            description: item.description,
            category: item.category,
            unit: item.unit,
            availableItem: item.availableItem
        }));

        // Generate the table
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: rows.map(row => columns.map(col => row[col.dataKey])),
            startY: 30,
        });

        doc.save('inventory_items.pdf');
    };

    const downloadItemPDF = (item) => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text('Item Details', 20, 20);
        doc.text(`Name: ${item.name}`, 20, 30);
        doc.text(`Supplier Name: ${item.supName}`, 20, 40);
        doc.text(`Description: ${item.description}`, 20, 50);
        doc.text(`Category: ${item.category}`, 20, 60);
        doc.text(`Unit: ${item.unit}`, 20, 70);
        doc.text(`Available Item: ${item.availableItem}`, 20, 80);
        
        doc.save(`${item.name}.pdf`); // Save with item name as file name
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
            <button className="download-btn" onClick={downloadPDF}>Download All Items as PDF</button>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Supplier Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Unit</th>
                        <th>Available Item</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.supName}</td>
                                <td>{item.description}</td>
                                <td>{item.category}</td>
                                <td>{item.unit}</td>
                                <td>{item.availableItem}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                                    <button className="download-btn" onClick={() => downloadItemPDF(item)}>Download PDF</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
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
