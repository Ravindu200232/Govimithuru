import React, { useState } from 'react';
import axios from 'axios';

const OtherExpensesForm = () => {
    const [expenseName, setExpenseName] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Predefined categories for expenses
    const categories = [
        'Office Supplies',
        'Utilities',
        'Travel',
        'Food',
        'Rent',
        'Maintenance',
        'Marketing',
        'Salaries',
        'Miscellaneous',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:8000/api/otherexpenses/create', {
                expenseName,
                expenseDescription,
                amount,
                category,
                paymentMethod,
            });
            setSuccess('Expense created successfully');
            // Clear form
            setExpenseName('');
            setExpenseDescription('');
            setAmount('');
            setCategory('');
            setPaymentMethod('');
        } catch (err) {
            setError('Error creating expense: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Other Expense</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <input
                type="text"
                placeholder="Expense Name"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Expense Description"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="" disabled>Select Category</option>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Payment Method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
};

export default OtherExpensesForm;
