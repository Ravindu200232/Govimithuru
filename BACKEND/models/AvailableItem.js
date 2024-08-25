const mongoose = require("mongoose");

const AvailableItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure each name is unique
    },
    supName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    availableItem: {
        type: Number,
        required: true,
    },
}, { toJSON: { getters: true }, toObject: { getters: true } });

const AvailableItem = mongoose.model("AvailableItem", AvailableItemSchema);

module.exports = AvailableItem;
