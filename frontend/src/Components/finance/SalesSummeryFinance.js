import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const SellSummaryFinance = () => {
    const [sellSummary, setSellSummary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalSales, setTotalSales] = useState(0);
    const [totalOtherExpenses, setTotalOtherExpenses] = useState(0);
    const [totalPaychecks, setTotalPaychecks] = useState(0);
    const [totalSalaries, setTotalSalaries] = useState(0);
    const [totalGiveChecks, setTotalGiveChecks] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8000/orders/');
                const orders = await response.json();

                const summary = {};
                let totalSalesAmount = 0;

                orders.forEach(order => {
                    order.productDetails.forEach(product => {
                        if (summary[product.itemName]) {
                            summary[product.itemName].quantitySold += product.quantitySold;
                            summary[product.itemName].totalSales += product.totalPrice;
                        } else {
                            summary[product.itemName] = {
                                quantitySold: product.quantitySold,
                                totalSales: product.totalPrice,
                            };
                        }
                    });
                });

                totalSalesAmount = Object.values(summary).reduce((acc, item) => acc + item.totalSales, 0);

                setSellSummary(Object.entries(summary).map(([itemName, details]) => ({
                    itemName,
                    ...details,
                })));
                setTotalSales(totalSalesAmount);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const fetchOtherExpenses = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/otherexpenses/');
                const expenses = await response.json();
                const totalExpenses = expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0);
                setTotalOtherExpenses(totalExpenses);
            } catch (error) {
                console.error('Error fetching other expenses:', error);
            }
        };

        const fetchPaychecks = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/givechecks/');
                const paychecks = await response.json();
                const totalPaychecksAmount = paychecks.reduce((acc, paycheck) => acc + (paycheck.totalAmount || 0), 0);
                setTotalPaychecks(totalPaychecksAmount);
            } catch (error) {
                console.error('Error fetching paychecks:', error);
            }
        };

        const fetchSalaries = async () => {
            try {
                const response = await fetch('http://localhost:8000/salary/');
                const salaries = await response.json();
                const totalSalariesAmount = salaries.reduce((acc, salary) => acc + (salary.totalSalary || 0), 0);
                setTotalSalaries(totalSalariesAmount);
            } catch (error) {
                console.error('Error fetching salaries:', error);
            }
        };

        const fetchGiveChecks = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/givechecks/');
                const giveChecks = await response.json();
                const totalGiveChecksAmount = giveChecks.reduce((acc, check) => acc + (check.amount || 0), 0);
                setTotalGiveChecks(totalGiveChecksAmount);
            } catch (error) {
                console.error('Error fetching give checks:', error);
            }
        };

        const calculateFinalTotal = () => {
            const final = totalSales - (totalOtherExpenses + totalPaychecks + totalSalaries + totalGiveChecks);
            setFinalTotal(final);
        };

        Promise.all([
            fetchOrders(),
            fetchOtherExpenses(),
            fetchPaychecks(),
            fetchSalaries(),
            fetchGiveChecks()
        ]).then(() => {
            calculateFinalTotal();
            setLoading(false);
        });
    }, [totalSales, totalOtherExpenses, totalPaychecks, totalSalaries, totalGiveChecks]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Data for Pie Chart
    const pieData = {
        labels: ['Total Sales', 'Other Expenses', 'Paychecks', 'Salaries', 'Give Checks'],
        datasets: [
            {
                label: 'Financial Summary',
                data: [totalSales, totalOtherExpenses, totalPaychecks, totalSalaries, totalGiveChecks],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div>
            <h1>Sales Summary</h1>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity Sold</th>
                        <th>Total Sales (Rs)</th>
                    </tr>
                </thead>
                <tbody>
                    {sellSummary.map(item => (
                        <tr key={item.itemName}>
                            <td>{item.itemName}</td>
                            <td>{item.quantitySold}</td>
                            <td>{item.totalSales.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Total Sales (Rs): {totalSales.toFixed(2)}</h2>

            <h1>Expenses Summary</h1>
            <table>
                <thead>
                    <tr>
                        <th>Expense Type</th>
                        <th>Total (Rs)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Other Expenses</td>
                        <td>{totalOtherExpenses.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Paychecks</td>
                        <td>{totalPaychecks.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Salaries</td>
                        <td>{totalSalaries.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>Give Checks</td>
                        <td>{totalGiveChecks.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Final Total (Sales - Expenses): {finalTotal.toFixed(2)}</h2>

            <h1>Financial Summary Pie Chart</h1>
            <Pie data={pieData} />
        </div>
    );
};

export default SellSummaryFinance;
