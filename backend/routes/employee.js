const express = require("express");
const router = express.Router();
const { isHR } = require("../middleware/authMiddleware");
const { addEmployee } = require("../controllers/employeeController");
const Employee = require("../models/Employee"); // Import Employee model

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new employee
router.post("/", isHR, async (req, res) => {
  try {
    const { name, role, salary, contractType, startDate } = req.body;
    const newEmployee = new Employee({ name, role, salary, contractType, startDate });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an employee
router.put("/:id", isHR, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an employee
router.delete("/:id", isHR, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;