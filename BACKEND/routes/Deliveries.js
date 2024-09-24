const express = require('express');
const router = express.Router();
const Delivery = require('../models/Deliver');

// Middleware for validating request body
const validateDelivery = (req, res, next) => {
    const { deliveryPersonName, deliveryDate, status, address, postalCode, email, phoneNumber, deliveryType, deliveryDetails } = req.body;
    if (!deliveryPersonName || !deliveryDate || !status || !address || !postalCode || !email || !phoneNumber || !deliveryType || !deliveryDetails) {
        return res.status(400).json({ status: "Error", error: "Missing required fields" });
    }
    next();
};

// Get all deliveries
router.get('/', async (req, res) => {
    try {
        const deliveries = await Delivery.find({});
        res.status(200).json(deliveries);
    } catch (err) {
        res.status(500).json({ status: "Error with fetching deliveries", error: err.message });
    }
});

// Add a new delivery
router.post('/add', validateDelivery, async (req, res) => {
    const newDelivery = new Delivery(req.body);

    try {
        await newDelivery.save();
        res.status(201).json({ status: "Success", message: "Delivery Added" });
    } catch (err) {
        res.status(500).json({ status: "Error with adding delivery", error: err.message });
    }
});

// Update a delivery
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { driverName, status } = req.body; 

    try {
        const delivery = await Delivery.findByIdAndUpdate(id, { driverName, status }, { new: true });
        if (!delivery) {
            return res.status(404).json({ status: "Error", error: "Delivery not found" });
        }
        res.status(200).json({ status: "Success", message: "Delivery Updated" });
    } catch (err) {
        res.status(500).json({ status: "Error with updating delivery", error: err.message });
    }
});

// Delete a delivery
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const delivery = await Delivery.findByIdAndDelete(id);
        if (!delivery) {
            return res.status(404).json({ status: "Error", error: "Delivery not found" });
        }
        res.status(200).json({ status: "Success", message: "Delivery Deleted" });
    } catch (err) {
        res.status(500).json({ status: "Error with deleting delivery", error: err.message });
    }
});

module.exports = router;
