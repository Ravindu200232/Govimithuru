import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import autoTable
import '../User/css/UserDashboard.css';

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
        axios.delete(`http://localhost:8000/payment/deletes/${id}`)
            .then(() => {
                setPayments(payments.filter(payment => payment._id !== id));
                alert("Payment deleted successfully");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // Function to generate PDF of payments
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Payment Records", 20, 20);
        doc.setFontSize(12);

        // Prepare table headers
        const headers = [
            ["ID", "Customer Name", "Card Name", "Card Type", "Card Number", "Expiration Date", "Total Price"]
        ];

        // Prepare table data
        const data = payments.map(payment => [
            payment._id, // Add ID to the table
            payment.customerName,
            payment.cardName,
            payment.cardType,
            payment.cardNumber,
            payment.expirationDate,
            `$${payment.totalPrice.toFixed(2)}`
        ]);

        // Create the table
        doc.autoTable({
            head: headers,
            body: data,
            startY: 30, // Start below the title
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
                            <td>{payment.totalPrice}</td>
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
