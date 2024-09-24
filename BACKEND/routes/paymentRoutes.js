const express = require('express');
const Payment = require('../models/Payment');

const router = express.Router();

// Create a new payment
router.post('/add', async (req, res) => {
  try {
    const { customerName, cardName, cardType, cardNumber, expirationDate, cvv, totalPrice } = req.body;
    
    // Create new payment instance
    const newPayment = new Payment({
      customerName,
      cardName,
      cardType,
      cardNumber,
      expirationDate,
      cvv,
      totalPrice
    });
    
    // Save to database
    await newPayment.save();
    
    res.status(201).json({ message: 'Payment saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save payment.' });
  }
});

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve payments.' });
  }
});

module.exports = router;
