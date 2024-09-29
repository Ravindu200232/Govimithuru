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
            { itemName: '', itemDescription: '', quantity: 1, pricePerUnit: 0, totalPrice: 0 },
        ],
        subtotal: 0,
        discount: 0,
        taxes: 0,
        shippingCost: 0,
        totalAmount: 0,
        paymentMethod: '',
        paymentStatus: 'Confirmed',
        companyName: '',
        companyAddress: '',
        companyContact: '',
    });

    const [errors, setErrors] = useState({});

    const calculateSubtotal = () => {
        return formData.items.reduce((acc, item) => {
            return acc + (item.quantity * item.pricePerUnit);
        }, 0);
    };

    const calculateTotalAmount = () => {
        const subtotal = calculateSubtotal();
        const discount = Math.min(formData.discount, subtotal); // Ensure discount is not greater than subtotal
        const total = subtotal - discount + formData.taxes + formData.shippingCost;
        return total.toFixed(2); // Format to 2 decimal places
    };

    const validateForm = () => {
        const newErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10}$/;

        if (!formData.receiptNumber) newErrors.receiptNumber = "Receipt Number is required.";
        if (!formData.transactionId) newErrors.transactionId = "Transaction ID is required.";
        if (!formData.date) newErrors.date = "Date is required.";
        if (!formData.customerName) newErrors.customerName = "Customer Name is required.";
        if (!formData.customerEmail || !emailPattern.test(formData.customerEmail)) {
            newErrors.customerEmail = "Valid Customer Email is required.";
        }
        if (!formData.customerPhone || !phonePattern.test(formData.customerPhone)) {
            newErrors.customerPhone = "Customer Phone must be 10 digits.";
        }
        if (!formData.billingAddress) newErrors.billingAddress = "Billing Address is required.";
        if (!formData.paymentMethod) newErrors.paymentMethod = "Payment Method is required.";
        if (!formData.companyName) newErrors.companyName = "Company Name is required.";
        if (!formData.companyAddress) newErrors.companyAddress = "Company Address is required.";
        if (!formData.companyContact) newErrors.companyContact = "Company Contact is required.";
        if (formData.items.length === 0) newErrors.items = "At least one item is required.";

        formData.items.forEach((item, index) => {
            if (!item.itemName) newErrors[`itemName${index}`] = `Item Name is required for item ${index + 1}.`;
            if (item.quantity < 1 || item.quantity > 1000) {
                newErrors[`quantity${index}`] = `Quantity must be between 1 and 1000 for item ${index + 1}.`;
            }
            if (item.pricePerUnit < 0) newErrors[`pricePerUnit${index}`] = `Price per Unit must be a non-negative number for item ${index + 1}.`;
        });

        if (formData.discount < 0) newErrors.discount = "Discount must be a non-negative number.";
        if (formData.taxes < 0) newErrors.taxes = "Taxes must be a non-negative number.";
        if (formData.shippingCost < 0 || formData.shippingCost > 100000) {
            newErrors.shippingCost = "Shipping Cost must be between 0 and 100000.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Update totalAmount whenever input changes for discount, taxes, or shippingCost
        if (['discount', 'taxes', 'shippingCost'].includes(name)) {
            const updatedTotalAmount = calculateTotalAmount();
            setFormData((prevData) => ({
                ...prevData,
                totalAmount: updatedTotalAmount,
            }));
        }
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...formData.items];
        updatedItems[index][name] = value;

        if (name === "quantity" || name === "pricePerUnit") {
            const quantity = Math.max(1, Math.min(1000, Number(updatedItems[index].quantity))); // Clamp between 1 and 1000
            const pricePerUnit = Math.max(0, Number(updatedItems[index].pricePerUnit)); // Non-negative
            updatedItems[index].quantity = quantity;
            updatedItems[index].totalPrice = quantity * pricePerUnit;
        }

        setFormData((prevData) => ({
            ...prevData,
            items: updatedItems,
            subtotal: calculateSubtotal(),
            totalAmount: calculateTotalAmount(), // Update totalAmount
        }));
    };

    const handleAddItem = () => {
        setFormData((prevData) => ({
            ...prevData,
            items: [...prevData.items, { itemName: '', itemDescription: '', quantity: 1, pricePerUnit: 0, totalPrice: 0 }],
        }));
    };

    const handleRemoveItem = (index) => {
        const updatedItems = formData.items.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            items: updatedItems,
            subtotal: calculateSubtotal(),
            totalAmount: calculateTotalAmount(), // Update totalAmount
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

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
                <input type="text" name="receiptNumber" placeholder="Receipt Number" onChange={handleInputChange} required />
                {errors.receiptNumber && <span className="error">{errors.receiptNumber}</span>}
            </label>
            <label>
                Transaction ID:
                <input type="text" name="transactionId" placeholder="Transaction ID" onChange={handleInputChange} required />
                {errors.transactionId && <span className="error">{errors.transactionId}</span>}
            </label>
            <label>
                Date:
                <input type="date" name="date" onChange={handleInputChange} required />
                {errors.date && <span className="error">{errors.date}</span>}
            </label>
            <label>
                Customer Name:
                <input type="text" name="customerName" placeholder="Customer Name" onChange={handleInputChange} required />
                {errors.customerName && <span className="error">{errors.customerName}</span>}
            </label>
            <label>
                Customer Email:
                <input
                    type="email"
                    name="customerEmail"
                    placeholder="Customer Email"
                    value={formData.customerEmail}
                    onChange={(e) => {
                        const value = e.target.value;
                        handleInputChange(e);

                        // Validate email format
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(value) && value !== "") {
                            setErrors((prevErrors) => ({
                                ...prevErrors,
                                customerEmail: "Invalid email format",
                            }));
                        } else {
                            setErrors((prevErrors) => ({
                                ...prevErrors,
                                customerEmail: "",
                            }));
                        }
                    }}
                    required
                />
                {errors.customerEmail && <span className="error">{errors.customerEmail}</span>}
            </label>
            <label>
                Customer Phone:
                <input
                    type="text"
                    name="customerPhone"
                    placeholder="Customer Phone"
                    maxLength={10} // Max 10 digits
                    onChange={handleInputChange}
                    required
                />
                {errors.customerPhone && <span className="error">{errors.customerPhone}</span>}
            </label>
            <label>
                Billing Address:
                <input type="text" name="billingAddress" placeholder="Billing Address" onChange={handleInputChange} required />
                {errors.billingAddress && <span className="error">{errors.billingAddress}</span>}
            </label>
            <label>
                Shipping Address:
                <input type="text" name="shippingAddress" placeholder="Shipping Address" onChange={handleInputChange} />
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
                        {errors[`itemName${index}`] && <span className="error">{errors[`itemName${index}`]}</span>}
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
                            min={1}
                            max={1000}
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                        />
                        {errors[`quantity${index}`] && <span className="error">{errors[`quantity${index}`]}</span>}
                    </label>
                    <label>
                        Price per Unit:
                        <input
                            type="number"
                            name="pricePerUnit"
                            placeholder="Price per Unit"
                            min={0}
                            value={item.pricePerUnit}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                        />
                        {errors[`pricePerUnit${index}`] && <span className="error">{errors[`pricePerUnit${index}`]}</span>}
                    </label>
                    <label>
                        Total Price:
                        <input
                            type="number"
                            name="totalPrice"
                            placeholder="Total Price"
                            value={item.totalPrice}
                            readOnly
                        />
                    </label>
                    <button type="button" onClick={() => handleRemoveItem(index)}>Remove Item</button>
                </div>
            ))}

            <button type="button" onClick={handleAddItem}>Add Item</button>

            {/* Financial Information */}
            <label>
                Subtotal:
                <input type="number" name="subtotal" value={formData.subtotal} readOnly />
            </label>
            <label>
                Discount:
                <input
                    type="number"
                    name="discount"
                    placeholder="Discount"
                    min={0}
                    value={formData.discount}
                    onChange={handleInputChange}
                />
                {errors.discount && <span className="error">{errors.discount}</span>}
            </label>
            <label>
                Taxes:
                <input
                    type="number"
                    name="taxes"
                    placeholder="Taxes"
                    min={0}
                    value={formData.taxes}
                    onChange={handleInputChange}
                    required
                />
                {errors.taxes && <span className="error">{errors.taxes}</span>}
            </label>
            <label>
                Shipping Cost:
                <input
                    type="number"
                    name="shippingCost"
                    placeholder="Shipping Cost"
                    min={0}
                    max={100000}
                    value={formData.shippingCost}
                    onChange={handleInputChange}
                />
                {errors.shippingCost && <span className="error">{errors.shippingCost}</span>}
            </label>
            <label>
                Total Amount:
                <input
                    type="number"
                    name="totalAmount"
                    placeholder="Total Amount"
                    value={formData.totalAmount}
                    readOnly
                />
            </label>

            <label>
                Payment Method:
                <select name="paymentMethod" onChange={handleInputChange} required>
                    <option value="" disabled>Select Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Check">Check</option>
                </select>
                {errors.paymentMethod && <span className="error">{errors.paymentMethod}</span>}
            </label>
            
            <label>
                Payment Status:
                <select name="paymentStatus" onChange={handleInputChange}>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                </select>
            </label>
            <label>
                Company Name:
                <input type="text" name="companyName" placeholder="Company Name" onChange={handleInputChange} required />
                {errors.companyName && <span className="error">{errors.companyName}</span>}
            </label>
            <label>
                Company Address:
                <input type="text" name="companyAddress" placeholder="Company Address" onChange={handleInputChange} required />
                {errors.companyAddress && <span className="error">{errors.companyAddress}</span>}
            </label>
            <label>
    Company Contact:
    <input
        type="text"
        name="companyContact"
        placeholder="Company Contact"
        onKeyPress={(e) => {
            // Allow only digits (0-9)
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        }}
        onChange={(e) => {
            const value = e.target.value;
            // Only allow up to 10 digits
            if (/^\d{0,10}$/.test(value)) {
                handleInputChange(e);
            }
        }}
        maxLength={10}
        required
    />
    {errors.companyContact && <span className="error">{errors.companyContact}</span>}
</label>


            <button type="submit">Create Receipt</button>
        </form>
    );
};

export default PaymentReceiptForm;
