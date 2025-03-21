const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

// Add a new vehicle
router.post("/", async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all vehicles
router.get("/", async (req, res) => {
    try {
      const vehicles = await Vehicle.find()
        .populate("currentDriver") // Populate currentDriver
        
      res.json(vehicles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get a specific vehicle by ID
  router.get("/:id", async (req, res) => {
    try {
      const vehicle = await Vehicle.findById(req.params.id)
        .populate("currentDriver") // Populate currentDriver
        .populate("maintenanceHistory.supervisor"); // Populate supervisor in maintenanceHistory
      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      res.json(vehicle);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  // Update a vehicle
router.put("/:id", async (req, res) => {
    try {
      const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      res.json(vehicle);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete a vehicle
  router.delete("/:id", async (req, res) => {
    try {
      const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      res.json({ message: "Vehicle deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;