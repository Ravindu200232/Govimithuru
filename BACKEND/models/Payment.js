const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  cardName: { type: String, required: true },
  cardType: { type: String, enum: ['visa', 'mastercard', 'amex'], required: true },
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
