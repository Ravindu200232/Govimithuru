import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import './css/inventryAll.css';

function AllInventory() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/inventoryitem/")
            .then((res) => {
                setItems(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleView = (id) => {
        navigate(`/supplyupdate/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/inventoryitem/delete/${id}`)
            .then((res) => {
                alert(res.data.status);
                setItems((prevItems) => prevItems.filter(item => item._id !== id));
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleAggregate = () => {
        axios.post("http://localhost:8000/availableitem/aggregate")
            .then((res) => {
                alert(res.data.message);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text('Inventory List', 20, 20);
        
        // Define the columns for the table
        const columns = [
            { header: "ID", dataKey: "id" },
            { header: "Name", dataKey: "name" },
            { header: "Supplier Name", dataKey: "supName" },
            { header: "Description", dataKey: "description" },
            { header: "Category", dataKey: "category" },
            { header: "Unit", dataKey: "unit" },
            { header: "Quantity Available", dataKey: "quantityAvailable" },
            { header: "Supply Date", dataKey: "supplyDate" }
        ];
        
        // Prepare the data for the table
        const rows = items.map((item, index) => ({
            id: index + 1,
            name: item.name,
            supName: item.supName,
            description: item.description,
            category: item.category,
            unit: item.unit,
            quantityAvailable: item.quantityAvailable,
            supplyDate: item.supplyDate
        }));

        // Generate the table
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: rows.map(row => columns.map(col => row[col.dataKey])),
            startY: 30,
            theme: 'striped' // Optional: you can set a theme for the table
        });

        doc.save('inventory_list.pdf');
    };

    return (
        <div>
            <h2 className="inventory-list-title">Inventory List</h2>
            <div className="search-bar">
                <input type="text" placeholder="Search ID, User and Contact" />
                <button className="search-btn">Search</button>
            </div>
            <button className="aggregate-btn" onClick={handleAggregate}>Aggregate Items</button>
            <button className="download-btn" onClick={downloadPDF}>Download Full Inventory PDF</button>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>SupName</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Unit</th>
                        <th>Quantity Available</th>
                        <th>Supply Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.supName}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td>{item.unit}</td>
                            <td>{item.quantityAvailable}</td>
                            <td>{item.supplyDate}</td>
                            <td>
                                <button className="view-btn" onClick={() => handleView(item._id)}>View</button>
                                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllInventory;
