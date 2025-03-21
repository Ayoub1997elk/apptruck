const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");

// Get all inventory items
router.get("/", async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.json(inventoryItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new inventory item
router.post("/", async (req, res) => {
  try {
    const inventoryItem = new Inventory(req.body);
    await inventoryItem.save();
    res.status(201).json(inventoryItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;