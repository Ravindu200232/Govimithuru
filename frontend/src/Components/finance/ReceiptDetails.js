import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Ensure you import this for the table
import logo from '../ui/img/logo.png';

const ReceiptDetails = ({ receipt, onClose }) => {
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Add logo
        doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Adjust size and position as needed

        // Company details
        doc.setFontSize(10);
        doc.text("Govimithu Pvt Limited", 14, 40);
        doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
        doc.text("Phone Number: 0789840996", 14, 50);


        // Watermark setup
        doc.setFontSize(40);
        doc.setTextColor(150, 150, 150);
        doc.text('Govimithuru.lk', 70, 150, { angle: 45 });
        doc.setTextColor(0, 0, 0); // Reset color for other text

        // Receipt details
        doc.setFontSize(12);
        doc.text('Receipt Details', 20, 70);
        doc.text(`Receipt Number: ${receipt.receiptNumber}`, 20, 80);
        doc.text(`Transaction ID: ${receipt.transactionId}`, 20, 90);
        doc.text(`Date: ${new Date(receipt.date).toLocaleDateString()}`, 20, 100);
        doc.text(`Customer Name: ${receipt.customerName}`, 20, 110);
        doc.text(`Email: ${receipt.customerEmail}`, 20, 120);
        doc.text(`Phone: ${receipt.customerPhone}`, 20, 130);
        doc.text(`Billing Address: ${receipt.billingAddress}`, 20, 140);
        if (receipt.shippingAddress) {
            doc.text(`Shipping Address: ${receipt.shippingAddress}`, 20, 150);
        }

        // Items header
        doc.text('Items', 20, 160);
        const items = receipt.items.map(item => {
            return [
                item.itemName,
                item.itemDescription,
                item.quantity,
                item.pricePerUnit.toFixed(2),
                item.totalPrice.toFixed(2)
            ];
        });

        // Table headers and body
        const headers = [["Item Name", "Description", "Quantity", "Price per Unit", "Total Price"]];
        doc.autoTable({
            head: headers,
            body: items.map(item => [
                item[0],
                item[1],
                item[2],
                `$${item[3]}`,
                `$${item[4]}`
            ]),
            startY: 170, // Start below the receipt details
        });

        // Summary details
        const summaryY = doc.autoTable.previous.finalY + 10;
        doc.text(`Subtotal: $${receipt.subtotal.toFixed(2)}`, 20, summaryY);
        doc.text(`Discount: $${receipt.discount.toFixed(2)}`, 20, summaryY + 10);
        doc.text(`Taxes: $${receipt.taxes.toFixed(2)}`, 20, summaryY + 20);
        doc.text(`Shipping Cost: $${receipt.shippingCost.toFixed(2)}`, 20, summaryY + 30);
        doc.text(`Total Amount: $${receipt.totalAmount.toFixed(2)}`, 20, summaryY + 40);
        doc.text(`Payment Method: ${receipt.paymentMethod}`, 20, summaryY + 50);
        doc.text(`Payment Status: ${receipt.paymentStatus}`, 20, summaryY + 60);
        doc.text(`Company Name: ${receipt.companyName}`, 20, summaryY + 70);
        doc.text(`Company Address: ${receipt.companyAddress}`, 20, summaryY + 80);
        doc.text(`Company Contact: ${receipt.companyContact}`, 20, summaryY + 90);

        // Signature line
        const signatureName = "----------------"; // Change to your desired name
        const signatureY = summaryY + 100;
        
        // Set dotted line
        doc.setLineDash([2, 2], 0); // Create a dotted line
        doc.line(20, signatureY + 10, 190, signatureY + 10); // Draw the line slightly below the name
        
        // Add signature text above the dotted line
        doc.setLineDash([]); // Reset to solid line for text
        doc.text(`Signature: ${signatureName}`, 20, signatureY);
        

        // Save PDF
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
