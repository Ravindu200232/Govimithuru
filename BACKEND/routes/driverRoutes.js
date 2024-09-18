// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Driver = require('../models/driver'); // Ensure the correct model is required

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffer
const upload = multer({ storage: storage });

// Add Driver
router.post('/add', upload.single('profileImage'), (req, res) => {
    const { firstName, lastName, email, department, phoneNumber, nic, drivingNic, birthday } = req.body;
    const profileImage = req.file;

    const newDriver = new Driver({
        firstName,
        lastName,
        email,
        department,
        phoneNumber,
        nic,
        drivingNic,
        birthday: birthday ? new Date(birthday) : undefined,
        profileImage: profileImage ? profileImage.buffer : undefined
    });

    newDriver.save()
        .then(() => res.json('Driver Added'))
        .catch((err) => res.status(500).send(err));
});

// Get All Drivers
router.get('/', (req, res) => {
    Driver.find()
        .then((drivers) => res.json(drivers))
        .catch((err) => res.status(500).send(err));
});

// Update Driver
router.put('/update/:id', upload.single('profileImage'), async (req, res) => {
    const driverId = req.params.id;
    const { firstName, lastName, email, department, phoneNumber, nic, drivingNic, birthday } = req.body;
    const profileImage = req.file;

    const updateDriver = {
        firstName,
        lastName,
        email,
        department,
        phoneNumber,
        nic,
        drivingNic,
        birthday: birthday ? new Date(birthday) : undefined,
    };

    if (profileImage) {
        updateDriver.profileImage = profileImage.buffer;
    }

    await Driver.findByIdAndUpdate(driverId, updateDriver)
        .then(() => res.status(200).send({ status: 'Driver updated' }))
        .catch((err) => res.status(500).send({ status: 'Error with updating data', error: err.message }));
});

// Delete Driver
router.delete('/delete/:id', async (req, res) => {
    const driverId = req.params.id;

    await Driver.findByIdAndDelete(driverId)
        .then(() => res.status(200).send({ status: 'Driver deleted' }))
        .catch((err) => res.status(500).send({ status: 'Error with deleting driver', error: err.message }));
});

// Get One Driver by ID
router.get('/get/:id', async (req, res) => {
    const driverId = req.params.id;

    await Driver.findById(driverId)
        .then((driver) => res.status(200).send({ status: 'Driver fetched', driver }))
        .catch((err) => res.status(500).send({ status: 'Error with getting driver', error: err.message }));
});

// Validate Unique Fields
router.post('/validate', async (req, res) => {
    const { email, nic, drivingNic } = req.body;

    try {
        const emailExists = await Driver.findOne({ email });
        const nicExists = await Driver.findOne({ nic });
        const drivingNicExists = await Driver.findOne({ drivingNic });

        if (emailExists || nicExists || drivingNicExists) {
            return res.json({ isUnique: false });
        }

        res.json({ isUnique: true });
    } catch (err) {
        res.status(500).send({ status: 'Error with validation', error: err.message });
    }
});

module.exports = router;
