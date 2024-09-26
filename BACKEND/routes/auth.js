const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Sign Up
router.post("/signup", async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
    try {
        const newUser = new User({ firstname, lastname, username, email, password });
        await newUser.save();
        res.status(201).send("User created successfully!");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send("Invalid credentials");
        }
        // Include username in the response
        res.json({ message: "Login successful!", username: user.username });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;
