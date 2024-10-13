const mongoose = require("mongoose");
const InventoryAlert = require("./InventoryAlert"); // Import InventoryAlert model
const nodemailer = require('nodemailer');

// Schema for available items
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
// Function to send email when stock is low
async function sendLowStockEmail(from, to, subject, htmlContent) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "bandarasumith326@gmail.com", // Your sender email address
                pass: 'enag cmin nzoy wpuk', // Your new app password here
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const info = await transporter.sendMail({
            from: `Stock Alert <${from}>`,
            to: to,
            subject: subject,
            html: htmlContent,
        });

        console.log("Email sent: " + info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

// Create the HTML content for the low stock email
function createLowStockEmailContent(item) {
    return `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f9f9f9;">
            <h1 style="color: #FF5733;">⚠️ Low Stock Alert!</h1>
            <p style="font-size: 16px;">Dear Team,</p>
            <p style="font-size: 16px;">We wanted to inform you that the item <strong style="color: #FF5733;">"${item.name}"</strong> is running low on stock.</p>
            <p style="font-size: 16px;">Currently, there are only <strong style="color: #FF5733;">${item.availableItem} units</strong> left in stock.</p>
            <p style="font-size: 16px;">Please consider restocking this item to avoid any disruptions.</p>
            <p style="font-size: 16px;">Best Regards,<br>Your Inventory Management System</p>
        </div>
    `;
}

// Update the pre-save hook to generate the email content
AvailableItemSchema.pre('save', async function (next) {
    if (this.isModified('availableItem') && this.availableItem <= 3) {
        const existingAlert = await InventoryAlert.findOne({ itemId: this._id });
        if (!existingAlert) {
            const alertMessage = `Low stock alert: Item "${this.name}" has only ${this.availableItem} left in stock.`;
            
            const newAlert = new InventoryAlert({
                itemId: this._id,
                message: alertMessage
            });
            await newAlert.save();

            // Create HTML content for the email
            const emailMessage = createLowStockEmailContent(this);
            await sendLowStockEmail('bandarasumith326@gmail.com', 'ravindu2232@gmail.com', 'Low Stock Alert', emailMessage);
        }
    }
    next();
});


// Create and export the model
const AvailableItem = mongoose.model("AvailableItem", AvailableItemSchema);
module.exports = AvailableItem;
