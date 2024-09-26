import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReceiptDetails from './ReceiptDetails'; // Import the new component

const FinancePaycheckDashboard = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedReceipt, setSelectedReceipt] = useState(null); // State for selected receipt

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/givechecks/');
                setReceipts(response.data);
            } catch (err) {
                setError('Error fetching receipts: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReceipts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this receipt?')) {
            try {
                await axios.delete(`http://localhost:8000/api/givechecks/${id}`);
                setReceipts(receipts.filter((receipt) => receipt._id !== id));
                alert('Receipt deleted successfully');
            } catch (err) {
                setError('Error deleting receipt: ' + err.message);
            }
        }
    };

    const handleView = (receipt) => {
        setSelectedReceipt(receipt); // Set the selected receipt
    };

    const closeDetails = () => {
        setSelectedReceipt(null); // Close details view
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Finance Paycheck Receipts</h2>
            {receipts.length === 0 ? (
                <p>No receipts available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Receipt Number</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Total Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map((receipt) => (
                            <tr key={receipt._id}>
                                <td>{receipt.receiptNumber}</td>
                                <td>{receipt.transactionId}</td>
                                <td>{new Date(receipt.date).toLocaleDateString()}</td>
                                <td>{receipt.customerName}</td>
                                <td>${receipt.totalAmount.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => handleDelete(receipt._id)}>Delete</button>
                                    <button onClick={() => handleView(receipt)}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {selectedReceipt && (
                <ReceiptDetails receipt={selectedReceipt} onClose={closeDetails} />
            )}
        </div>
    );
};

export default FinancePaycheckDashboard;
