const express = require("express");
const router = express.Router();
const Employee = require("../models/employeeshowcase");

// Add Employee
router.post("/add", async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json({ message: "Employee Added" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Employees
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Employee
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee updated", updatedEmployee });
    } catch (err) {
        res.status(500).json({ message: "Error updating employee", error: err.message });
    }
});

// Delete Employee
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting employee", error: err.message });
    }
});

// Get One Employee by ID
router.get("/get/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee fetched", employee });
    } catch (err) {
        res.status(500).json({ message: "Error getting employee", error: err.message });
    }
});

module.exports = router;
