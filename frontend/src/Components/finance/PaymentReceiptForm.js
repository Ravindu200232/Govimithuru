import React, { useState } from 'react';
import axios from 'axios';

const PaymentReceiptForm = () => {
    const [formData, setFormData] = useState({
        receiptNumber: '',
        transactionId: '',
        date: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        billingAddress: '',
        shippingAddress: '',
        items: [
            { itemName: '', itemDescription: '', quantity: 0, pricePerUnit: 0, totalPrice: 0 },
        ],
        subtotal: 0,
        discount: 0,
        taxes: 0,
        shippingCost: 0,
        totalAmount: 0,
        paymentMethod: '', // Changed this to be a select
        paymentStatus: 'Confirmed',
        companyName: '',
        companyAddress: '',
        companyContact: '',
    });

    const calculateSubtotal = () => {
        const subtotal = formData.items.reduce((acc, item) => {
            return acc + (item.quantity * item.pricePerUnit);
        }, 0);
        return subtotal;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...formData.items];
        updatedItems[index][name] = value;

        // Update total price for the item
        if (name === "quantity" || name === "pricePerUnit") {
            const quantity = Number(updatedItems[index].quantity);
            const pricePerUnit = Number(updatedItems[index].pricePerUnit);
            updatedItems[index].totalPrice = quantity * pricePerUnit;
        }

        setFormData((prevData) => ({
            ...prevData,
            items: updatedItems,
            subtotal: calculateSubtotal(), // Recalculate subtotal
        }));
    };

    const handleAddItem = () => {
        setFormData((prevData) => ({
            ...prevData,
            items: [...prevData.items, { itemName: '', itemDescription: '', quantity: 0, pricePerUnit: 0, totalPrice: 0 }],
        }));
    };

    const handleRemoveItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            items: updatedItems,
            subtotal: calculateSubtotal(), // Recalculate subtotal
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/givechecks/create', formData);
            alert(`Receipt created: ${response.data.data.receiptNumber}`);
            // Reset form or handle success
        } catch (error) {
            console.error('Error creating receipt:', error);
            alert('Error creating receipt: ' + error.response?.data.message || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Payment Receipt</h2>

            {/* Basic Information */}
            <label>
                Receipt Number:
                <input type="text" name="receiptNumber" placeholder="Receipt Number" onChange={handleChange} required />
            </label>
            <label>
                Transaction ID:
                <input type="text" name="transactionId" placeholder="Transaction ID" onChange={handleChange} required />
            </label>
            <label>
                Date:
                <input type="date" name="date" onChange={handleChange} required />
            </label>
            <label>
                Customer Name:
                <input type="text" name="customerName" placeholder="Customer Name" onChange={handleChange} required />
            </label>
            <label>
                Customer Email:
                <input type="email" name="customerEmail" placeholder="Customer Email" onChange={handleChange} required />
            </label>
            <label>
                Customer Phone:
                <input type="text" name="customerPhone" placeholder="Customer Phone" onChange={handleChange} required />
            </label>
            <label>
                Billing Address:
                <input type="text" name="billingAddress" placeholder="Billing Address" onChange={handleChange} required />
            </label>
            <label>
                Shipping Address:
                <input type="text" name="shippingAddress" placeholder="Shipping Address" onChange={handleChange} />
            </label>

            <h3>Items</h3>
            {formData.items.map((item, index) => (
                <div key={index}>
                    <label>
                        Item Name:
                        <input
                            type="text"
                            name="itemName"
                            placeholder="Item Name"
                            value={item.itemName}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                        />
                    </label>
                    <label>
                        Item Description:
                        <input
                            type="text"
                            name="itemDescription"
                            placeholder="Item Description"
                            value={item.itemDescription}
                            onChange={(e) => handleItemChange(index, e)}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                        />
                    </label>
                    <label>
                        Price per Unit:
                        <input
                            type="number"
                            name="pricePerUnit"
                            placeholder="Price per Unit"
                            value={item.pricePerUnit}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                        />
                    </label>
                    <label>
                        Total Price:
                        <input
                            type="number"
                            name="totalPrice"
                            placeholder="Total Price"
                            value={item.totalPrice}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                            readOnly // Make this read-only since it's calculated
                        />
                    </label>
                    <button type="button" onClick={() => handleRemoveItem(index)}>Remove Item</button>
                </div>
            ))}

            <br></br>
            <button type="button" onClick={handleAddItem}>Add Item</button>
            <br></br>

            {/* Financial Information */}
            <label>
                Subtotal:
                <input type="number" name="subtotal" value={formData.subtotal} readOnly />
            </label>
            <label>
                Discount:
                <input type="number" name="discount" placeholder="Discount" onChange={handleChange} />
            </label>
            <label>
                Taxes:
                <input type="number" name="taxes" placeholder="Taxes" onChange={handleChange} required />
            </label>
            <label>
                Shipping Cost:
                <input type="number" name="shippingCost" placeholder="Shipping Cost" onChange={handleChange} />
            </label>
            <label>
                Total Amount:
                <input type="number" name="totalAmount" placeholder="Total Amount" onChange={handleChange} required />
            </label>

            {/* Updated Payment Method to be a Select Dropdown */}
            <label>
                Payment Method:
                <select name="paymentMethod" onChange={handleChange} required>
                    <option value="" disabled>Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Check">Check</option>
                </select>
            </label>
            
            <label>
                Payment Status:
                <select name="paymentStatus" onChange={handleChange}>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                </select>
            </label>
            <label>
                Company Name:
                <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} required />
            </label>
            <label>
                Company Address:
                <input type="text" name="companyAddress" placeholder="Company Address" onChange={handleChange} required />
            </label>
            <label>
                Company Contact:
                <input type="text" name="companyContact" placeholder="Company Contact" onChange={handleChange} required />
            </label>

            <button type="submit">Create Receipt</button>
        </form>
    );
};

export default PaymentReceiptForm;
