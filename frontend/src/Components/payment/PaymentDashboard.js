import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import autoTable
import '../User/css/UserDashboard.css';
import logo from '../ui/img/logo.png';

function PaymentDashboard() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/payments/")
            .then((res) => {
                setPayments(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/payments/${id}`)
            .then(() => {
                // Update state to remove the deleted payment
                setPayments(payments.filter(payment => payment._id !== id));
                alert("Payment deleted successfully");
            })
            .catch((err) => {
                alert("Error: " + err.message);
            });
    };

    // Function to generate PDF of payments
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Add logo
        doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Adjust size and position as needed

        // Company details
        doc.setFontSize(10);
        doc.text("Govimithu Pvt Limited", 14, 40);
        doc.text("Anuradhapura Kahatagasdigiliya", 14, 45);
        doc.text("Phone Number: 0789840996", 14, 50);
        
        doc.setFontSize(20);
        doc.text("Payment Records", 20, 70); // Adjust Y position after company info
        doc.setFontSize(12);

        // Prepare table headers
        const headers = [
            ["ID", "Customer Name", "Card Name", "Card Type", "Card Number", "Expiration Date", "Total Price", "Pay Date"]
        ];

        // Prepare table data with auto-generated IDs
        const data = payments.map((payment, index) => [
            index + 1, // Auto-generated ID starting from 1
            payment.customerName,
            payment.cardName,
            payment.cardType,
            payment.cardNumber,
            payment.expirationDate,
            `$${payment.totalPrice.toFixed(2)}`,
            new Date(payment.date).toLocaleString() // Format the date and time
        ]);

        // Create the table
        doc.autoTable({
            head: headers,
            body: data,
            startY: 80, // Start below the title
        });

        // Save the PDF
        doc.save("PaymentRecords.pdf");
    };

    return (
        <div>
            <h2 className="payment-dashboard-title">Payment Dashboard</h2>
            <button onClick={generatePDF} className="download-pdf-btn">Download PDF</button> {/* Download PDF Button */}
            <table className="payment-table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Card Name</th>
                        <th>Card Type</th>
                        <th>Card Number</th>
                        <th>Expiration Date</th>
                        <th>Total Price</th>
                        <th>Pay Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment._id}>
                            <td>{payment.customerName}</td>
                            <td>{payment.cardName}</td>
                            <td>{payment.cardType}</td>
                            <td>{payment.cardNumber}</td>
                            <td>{payment.expirationDate}</td>
                            <td>Rs: {payment.totalPrice.toFixed(2)}</td>
                            <td>{new Date(payment.date).toLocaleString()}</td> {/* Show both date and time */}
                            <td>
                                <button className="delete-btn" onClick={() => handleDelete(payment._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentDashboard;
