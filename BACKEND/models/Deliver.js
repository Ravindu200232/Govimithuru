const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Delivery schema definition
const deliverySchema = new mongoose.Schema({
    deliveryPersonName: { type: String, required: true },
    deliveryDate: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ }, // Simple email validation
    phoneNumber: { type: String, required: true },
    driverName: { type: String, required: false },
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

// Pre-save hook to send email when delivery is processed
deliverySchema.pre('save', async function (next) {
    if (this.isNew) { // Check if it's a new delivery
        this.status = "Pending"; // Update the status to Pending
        
        try {
            const emailContent = createDeliveryEmailContent(this);
            await sendDeliveryEmail(this.email, 'Your Order is Out for Delivery', emailContent);
            console.log("Email sent successfully.");
        } catch (error) {
            console.error("Error sending email:", error);
            // Handle email send failure appropriately (e.g., log it, alert admin)
            return next(error); // Pass the error to the next middleware
        }
    }
    next();
});

// Function to create the HTML content for the delivery email
function createDeliveryEmailContent(delivery) {
    let itemsHtml = '';
    delivery.deliveryDetails.forEach(item => {
        itemsHtml += `
            <tr>
                <td>${item.itemName}</td>
                <td>${item.quantity}</td>
                <td>${item.itemPrice}</td>
                <td>${item.totalPrice}</td>
            </tr>
        `;
    });

    return `
        <h1>Your Order is Out for Delivery</h1>
        <p>Dear Customer,</p>
        <p>Your order has been dispatched and is on its way!</p>
        <p>Delivery Details:</p>
        <table border="1">
            <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Item Price</th>
                <th>Total Price</th>
            </tr>
            ${itemsHtml}
        </table>
        <p>Your delivery person is: ${delivery.deliveryPersonName}</p>
        <p>We will contact you soon!</p>
    `;
}

// Function to send the delivery email
async function sendDeliveryEmail(to, subject, htmlContent) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "bandarasumith326@gmail.com", // Your sender email address
            pass: 'enag cmin nzoy wpuk', // Your new app password here
        },
        
    });

    const info = await transporter.sendMail({
        from: 'Govimithuru <bandarasumith326@gmail.com>',
        to: to,
        subject: subject,
        html: htmlContent,
    });

    console.log("Delivery email sent: " + info.messageId);
}

// Export the Delivery model
module.exports = mongoose.model('Delivery', deliverySchema);
