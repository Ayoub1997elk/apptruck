const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');

// Get all maintenance records
router.get("/", async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find()
      .populate("vehicle")
      .populate("supervisor")
      .populate("parts");
    res.json(maintenanceRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new maintenance record
router.post("/", async (req, res) => {
  try {
    const maintenance = new Maintenance(req.body);
    await maintenance.save();
    res.status(201).json(maintenance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a maintenance record
router.put("/:id", async (req, res) => {
  try {
    const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!maintenance) {
      return res.status(404).json({ error: "Maintenance record not found" });
    }
    res.json(maintenance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a maintenance record
router.delete("/:id", async (req, res) => {
  try {
    const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ error: "Maintenance record not found" });
    }
    res.json({ message: "Maintenance record deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;