const express = require("express");
const router = express.Router();
const LeaveRequest = require("../models/LeaveRequest");
const { isHR } = require("../middleware/authMiddleware");

// Submit a leave request (accessible to all employees)
router.post("/", async (req, res) => {
  try {
    const leaveRequest = new LeaveRequest(req.body);
    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all leave requests (restricted to HR)
router.get("/", isHR, async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate("employee");
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update leave request status (restricted to HR)
router.put("/:id", isHR, async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!leaveRequest) {
      return res.status(404).json({ error: "Leave request not found" });
    }
    res.json(leaveRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;