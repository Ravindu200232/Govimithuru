const mongoose = require("mongoose");
const InventoryAlert = require("./InventoryAlert"); // Import InventoryAlert model

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

// Pre-save hook to check availableItem count and create an alert if necessary
AvailableItemSchema.pre('save', async function (next) {
    if (this.isModified('availableItem') && this.availableItem <= 3) {
        // Generate an alert if available item is <= 3
        const existingAlert = await InventoryAlert.findOne({ itemId: this._id });
        if (!existingAlert) {
            const alertMessage = `Low stock alert: Item "${this.name}" has only ${this.availableItem} left in stock.`;
            const newAlert = new InventoryAlert({
                itemId: this._id,
                message: alertMessage
            });
            await newAlert.save();
        }
    }
    next();
});

const AvailableItem = mongoose.model("AvailableItem", AvailableItemSchema);

module.exports = AvailableItem;
