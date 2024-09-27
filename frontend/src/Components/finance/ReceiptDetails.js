import React from 'react';
import jsPDF from 'jspdf';

const ReceiptDetails = ({ receipt, onClose }) => {
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(12);
        doc.text('Receipt Details', 20, 20);
        doc.text(`Receipt Number: ${receipt.receiptNumber}`, 20, 30);
        doc.text(`Transaction ID: ${receipt.transactionId}`, 20, 40);
        doc.text(`Date: ${new Date(receipt.date).toLocaleDateString()}`, 20, 50);
        doc.text(`Customer Name: ${receipt.customerName}`, 20, 60);
        doc.text(`Email: ${receipt.customerEmail}`, 20, 70);
        doc.text(`Phone: ${receipt.customerPhone}`, 20, 80);
        doc.text(`Billing Address: ${receipt.billingAddress}`, 20, 90);
        if (receipt.shippingAddress) {
            doc.text(`Shipping Address: ${receipt.shippingAddress}`, 20, 100);
        }

        doc.text('Items', 20, 110);
        const items = receipt.items.map(item => {
            return `Item Name: ${item.itemName}, Description: ${item.itemDescription}, Quantity: ${item.quantity}, Price per Unit: $${item.pricePerUnit.toFixed(2)}, Total Price: $${item.totalPrice.toFixed(2)}`;
        });
        items.forEach((item, index) => {
            doc.text(item, 20, 120 + (index * 10));
        });

        doc.text(`Subtotal: $${receipt.subtotal.toFixed(2)}`, 20, 120 + (items.length * 10) + 10);
        doc.text(`Discount: $${receipt.discount.toFixed(2)}`, 20, 130 + (items.length * 10) + 10);
        doc.text(`Taxes: $${receipt.taxes.toFixed(2)}`, 20, 140 + (items.length * 10) + 10);
        doc.text(`Shipping Cost: $${receipt.shippingCost.toFixed(2)}`, 20, 150 + (items.length * 10) + 10);
        doc.text(`Total Amount: $${receipt.totalAmount.toFixed(2)}`, 20, 160 + (items.length * 10) + 10);
        doc.text(`Payment Method: ${receipt.paymentMethod}`, 20, 170 + (items.length * 10) + 10);
        doc.text(`Payment Status: ${receipt.paymentStatus}`, 20, 180 + (items.length * 10) + 10);
        doc.text(`Company Name: ${receipt.companyName}`, 20, 190 + (items.length * 10) + 10);
        doc.text(`Company Address: ${receipt.companyAddress}`, 20, 200 + (items.length * 10) + 10);
        doc.text(`Company Contact: ${receipt.companyContact}`, 20, 210 + (items.length * 10) + 10);

        doc.save(`receipt_${receipt.receiptNumber}.pdf`);
    };

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
            <button onClick={downloadPDF}>Download PDF</button>
        </div>
    );
};

export default ReceiptDetails;
