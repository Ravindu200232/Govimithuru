// routes/attendances.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');

// Increment attendance
router.post('/increment', async (req, res) => {
    const { employeeName } = req.body;

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const attendanceRecord = await Attendance.findOne({
            employeeName,
            date: { $gte: today, $lt: tomorrow }
        });

        if (attendanceRecord) {
            // Update attendance count
            attendanceRecord.attendanceCount += 1;
            await attendanceRecord.save();
            return res.status(200).json(attendanceRecord);
        }

        const newAttendance = new Attendance({
            employeeName,
            status: 'Present',
            attendanceCount: 1, // Initialize count to 1
        });
        await newAttendance.save();
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all attendance records
router.get('/', async (req, res) => {
    try {
        const attendances = await Attendance.find();
        res.json(attendances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
