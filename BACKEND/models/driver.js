// models/driver.js
const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    drivingNic: {
        type: String,
        required: true,
    },
    profileImage: {
        type: Buffer, // Store profile image as binary data
        required: false,
    },
    birthday: {
        type: Date, // Store birthday as a Date
        required: false, // Optional field
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtual property to convert image buffer to base64 string
DriverSchema.virtual('profileImageBase64').get(function () {
    if (this.profileImage) {
        return this.profileImage.toString('base64');
    }
    return null;
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;
