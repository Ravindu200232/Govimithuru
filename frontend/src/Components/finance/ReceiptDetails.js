import React from 'react';

const ReceiptDetails = ({ receipt, onClose }) => {
    return (
        <div className="receipt-details">
            <h3>Receipt Details</h3>
            <p><strong>Receipt Number:</strong> {receipt.receiptNumber}</p>
            <p><strong>Transaction ID:</strong> {receipt.transactionId}</p>
            <p><strong>Date:</strong> {new Date(receipt.date).toLocaleDateString()}</p>
            <p><strong>Customer Name:</strong> {receipt.customerName}</p>
            <p><strong>Email:</strong> {receipt.customerEmail}</p>
            <p><strong>Phone:</strong> {receipt.customerPhone}</p>
            <p><strong>Billing Address:</strong> {receipt.billingAddress}</p>
            {receipt.shippingAddress && (
                <p><strong>Shipping Address:</strong> {receipt.shippingAddress}</p>
            )}
            <h4>Items</h4>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price per Unit</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {receipt.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.itemName}</td>
                            <td>{item.itemDescription}</td>
                            <td>{item.quantity}</td>
                            <td>${item.pricePerUnit.toFixed(2)}</td>
                            <td>${item.totalPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p><strong>Subtotal:</strong> ${receipt.subtotal.toFixed(2)}</p>
            <p><strong>Discount:</strong> ${receipt.discount.toFixed(2)}</p>
            <p><strong>Taxes:</strong> ${receipt.taxes.toFixed(2)}</p>
            <p><strong>Shipping Cost:</strong> ${receipt.shippingCost.toFixed(2)}</p>
            <p><strong>Total Amount:</strong> ${receipt.totalAmount.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> {receipt.paymentMethod}</p>
            <p><strong>Payment Status:</strong> {receipt.paymentStatus}</p>
            <p><strong>Company Name:</strong> {receipt.companyName}</p>
            <p><strong>Company Address:</strong> {receipt.companyAddress}</p>
            <p><strong>Company Contact:</strong> {receipt.companyContact}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ReceiptDetails;
