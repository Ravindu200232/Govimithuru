import React, { useState } from 'react';
import './css/InventorySupplyform.css';
import axios from "axios";

function InventorySupplyform() {
  const [name, setName] = useState("");
  const [supName, setSupName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [quantityAvailable, setQuantityAvailable] = useState("");
  const [supplyDate, setSupplyDate] = useState("");

  function sendDate(e) {
    e.preventDefault();
    // Ensure quantityAvailable is a number
    const newSupItem = {
      name,
      supName,
      description,
      category,
      unit,
      quantityAvailable: Number(quantityAvailable),
      supplyDate
    };

    axios.post("http://localhost:8000/inventoryitem/add", newSupItem)
      .then(() => {
        alert("Item Added");
        // Reset form fields
        setName("");
        setSupName("");
        setDescription("");
        setCategory("");
        setUnit("");
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
          <label htmlFor="supplyName">Supply Name</label>
          <input
            type="text"
            id="supplyName"
            placeholder="Enter Supply Name"
            value={supName}
            onChange={(e) => setSupName(e.target.value)}
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
          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            id="unit"
            placeholder="Enter Units"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
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
