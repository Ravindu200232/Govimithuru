const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    deliveryPersonName: { type: String, required: true },
    deliveryDate: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    deliveryType: { type: String, enum: ['standard', 'express'], required: true },
    deliveryDetails: [
        {
            itemName: { type: String, required: true },
            quantity: { type: Number, required: true },
            itemPrice: { type: Number, required: true },
            totalPrice: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('Delivery', deliverySchema);
