const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    employeeId: {
        type: String, // or Number, depending on your ID format
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Simple email validation regex
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    position: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        // Optional validation for phone number format
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    ETF: {
        type: Number,
        // Example validation: must be a positive number
        min: [0, 'ETF must be a positive number'],
        // Optional default value
        default: 0
    }
}, {
    toJSON: { getters: true },
    toObject: { getters: true }
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
