const express = require("express");
const router = express.Router();
const Payroll = require("../models/Payroll");
const { isHR } = require("../middleware/authMiddleware");

// Get payroll history for an employee
router.get("/employee/:id", isHR, async (req, res) => {
  try {
    const payrolls = await Payroll.find({ employee: req.params.id })
      .sort({ date: -1 });
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Process new payroll
router.post("/", isHR, async (req, res) => {
  try {
    const { employee, amount, date, description } = req.body;
    const payroll = new Payroll({
      employee,
      amount,
      date,
      description
    });
    await payroll.save();
    res.status(201).json(payroll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get payroll history
router.get("/", async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("employee");
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;