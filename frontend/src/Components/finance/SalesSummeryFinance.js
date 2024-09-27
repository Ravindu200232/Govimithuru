import React, { useEffect, useState } from 'react';

const SellSummaryFinance = () => {
    const [sellSummary, setSellSummary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalSales, setTotalSales] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8000/orders/'); // Update this endpoint if necessary
                const orders = await response.json();

                // Aggregate sales
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

                // Calculate total sales
                totalSalesAmount = Object.values(summary).reduce((acc, item) => acc + item.totalSales, 0);

                setSellSummary(Object.entries(summary).map(([itemName, details]) => ({
                    itemName,
                    ...details,
                })));
                setTotalSales(totalSalesAmount);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Sales Summary</h1>
            <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity Sold</th>
                        <th>Total Sales (Rs:)</th>
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
        </div>
    );
};

export default SellSummaryFinance;
