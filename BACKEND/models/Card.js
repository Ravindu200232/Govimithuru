// models/Card.js
const mongoose = require("mongoose");

// Define the Card Schema
const CardSchema = new mongoose.Schema({
    itemNamec: {
        type: String,
        required: [true, "Item name is required"],
    },
    categoryc: {
        type: String,
        required: [true, "Category is required"],
    },
    pricec: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    },
}, { 
    timestamps: true  // Automatically manage createdAt and updatedAt fields
});

// Create the Card model
const Card = mongoose.model("Card", CardSchema);

// Export the Card model
module.exports = Card;
