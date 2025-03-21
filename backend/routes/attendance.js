const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const { isHR } = require("../middleware/authMiddleware");

// Add attendance record
router.post("/", isHR, async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get attendance records
router.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.query.date) {
      const date = new Date(req.query.date);
      if (!isNaN(date)) {
        query.date = {
          $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
        };
      }
    }
    
    const attendance = await Attendance.find(query)
      .populate('employee')
      .sort({ date: -1 });
    
    res.json(attendance);
  } catch (err) {
    console.error('Attendance fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;