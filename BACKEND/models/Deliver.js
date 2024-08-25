const mongoose = require("mongoose");

const DeliverSchema = new mongoose.Schema({
    deliverID: {
        type: Number,
        required: true,
    },
    orderID: {
        type: Number,
        required: true,
    },
    deliverDate: {
        type: Date,
        required: true,
        get: (v) => v.toISOString().split('T')[0],
        set: (v) => new Date(v.toISOString().split('T')[0]),
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, { toJSON: { getters: true }, toObject: { getters: true } });

const Deliver = mongoose.model("Deliver", DeliverSchema);

module.exports = Deliver;
