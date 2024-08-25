const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    quantitySold: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    saleDate: {
        type: Date,
        required: true,
        get: (v) => v.toISOString().split('T')[0],
        set: (v) => new Date(v.toISOString().split('T')[0]),
    },
    status: {
        type: String,
        required: true,
    }
}, { toJSON: { getters: true }, toObject: { getters: true } });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
