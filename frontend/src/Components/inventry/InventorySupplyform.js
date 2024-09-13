import React, { useState } from 'react';
import './css/InventorySupplyform.css';
import axios from "axios";

function InventorySupplyform() {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState(""); // Renamed
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [packetSize, setPacketSize] = useState(1); // Added packet size
  const [unit, setUnit] = useState("kg"); // Default unit
  const [quantityAvailable, setQuantityAvailable] = useState("");
  const [supplyDate, setSupplyDate] = useState("");

  function sendDate(e) {
    e.preventDefault();
    const finalUnit = `${packetSize}${unit}`; // Concatenate packet size and unit
    const formattedName = `${name} (${finalUnit})`; // Format item name

    const newSupItem = {
      name: formattedName, // Use formatted name
      supName: companyName, // Renamed in the payload
      description,
      category,
      unit: finalUnit, // Store the concatenated unit
      quantityAvailable: Number(quantityAvailable),
      supplyDate
    };

    axios.post("http://localhost:8000/inventoryitem/add", newSupItem)
      .then(() => {
        alert("Item Added");
        // Reset form fields
        setName("");
        setCompanyName("");
        setDescription("");
        setCategory("");
        setPacketSize(1); // Reset packet size
        setUnit("kg"); // Reset unit
        setQuantityAvailable("");
        setSupplyDate("");
      })
      .catch((err) => {
        alert("Error adding item: " + err.message);
      });
  }

  return (
    <div className="inventory-supply-form-container">
      <h2>Add Supply Item</h2>
      <form className="inventory-supply-form" onSubmit={sendDate}>
        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input
            type="text"
            id="itemName"
            placeholder="Enter Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label> {/* Renamed */}
          <input
            type="text"
            id="companyName"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Seeds">Seeds</option>
            <option value="Growth Promoters">Growth Promoters</option>
            <option value="Remedies">Remedies</option>
            <option value="Organic Farming">Organic Farming</option>
            <option value="EQUIPMENTS">EQUIPMENTS</option>
            <option value="FERTILIZERS">FERTILIZERS</option>
            <option value="IRRIGATION">IRRIGATION</option>
            <option value="Gardening">Gardening</option>
            <option value="Bulk">Bulk</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="packetSize">Packet Size</label> {/* Added packet size */}
          <input
            type="number"
            id="packetSize"
            min="1"
            max="150"
            value={packetSize}
            onChange={(e) => setPacketSize(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit</label> {/* Added unit dropdown */}
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kg">KG</option>
            <option value="l">L</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity Available</label>
          <input
            type="number"
            id="quantity"
            placeholder="Enter Quantity"
            value={quantityAvailable}
            onChange={(e) => setQuantityAvailable(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="supplyDate">Supply Date</label>
          <input
            type="date"
            id="supplyDate"
            value={supplyDate}
            onChange={(e) => setSupplyDate(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="add-button">Add</button>
          <button type="button" className="cancel-button" onClick={() => window.location.reload()}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default InventorySupplyform;
