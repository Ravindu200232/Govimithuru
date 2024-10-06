// models/attendance.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late'], // Possible attendance statuses
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // Automatically set to the current date
        required: true,
    },
    attendanceCount: {  // Corrected property name
        type: Number,
        default: 0,  // Default attendance count
        required: false,
    }
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
