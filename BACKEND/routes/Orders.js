const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Middleware for validating request body
const validateOrder = (req, res, next) => {
    const { customerName, saleDate, status, address, postalCode, email,phoneNumber, paymentType, productDetails } = req.body;
    if (!customerName || !saleDate || !status || !address || !postalCode || !email || !phoneNumber ||!paymentType || !productDetails) {
        return res.status(400).json({ status: "Error", error: "Missing required fields" });
    }
    next();
};

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ status: "Error with fetching orders", error: err.message });
    }
});

// Add a new order
router.post('/add', validateOrder, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        await newOrder.save();
        res.status(201).json({ status: "Success", message: "Order Added" });
    } catch (err) {
        res.status(500).json({ status: "Error with adding order", error: err.message });
    }
});

// Update an order
router.put('/update/:id', validateOrder, async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ status: "Error", error: "Order not found" });
        }
        res.status(200).json({ status: "Success", message: "Order Updated" });
    } catch (err) {
        res.status(500).json({ status: "Error with updating order", error: err.message });
    }
});

// Delete an order
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ status: "Error", error: "Order not found" });
        }
        res.status(200).json({ status: "Success", message: "Order Deleted" });
    } catch (err) {
        res.status(500).json({ status: "Error with deleting order", error: err.message });
    }
});

module.exports = router;
