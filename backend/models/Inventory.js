const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  minStockThreshold: { type: Number, required: true },
  supplier: {
    name: { type: String, required: true },
    contact: { type: String, required: true },
  },
});

module.exports = mongoose.model("Inventory", inventorySchema);