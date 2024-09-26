import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OtherExpensesDashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/otherexpenses/');
                setExpenses(response.data);
            } catch (err) {
                setError('Error fetching expenses: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            try {
                await axios.delete(`http://localhost:8000/api/otherexpenses/${id}`);
                setExpenses(expenses.filter((expense) => expense._id !== id));
                alert('Expense deleted successfully');
            } catch (err) {
                setError('Error deleting expense: ' + err.message);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Other Expenses</h2>
            {expenses.length === 0 ? (
                <p>No expenses available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Expense Name</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Payment Method</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense._id}>
                                <td>{expense.expenseName}</td>
                                <td>{expense.expenseDescription}</td>
                                <td>${expense.amount.toFixed(2)}</td>
                                <td>{new Date(expense.date).toLocaleDateString()}</td>
                                <td>{expense.category}</td>
                                <td>{expense.paymentMethod}</td>
                                <td>
                                    <button onClick={() => handleDelete(expense._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OtherExpensesDashboard;
