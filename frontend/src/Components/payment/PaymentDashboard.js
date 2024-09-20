import React, { useState, useEffect } from "react";
import axios from "axios";
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

    return (
        <div>
            <h2 className="payment-dashboard-title">Payment Dashboard</h2>
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
