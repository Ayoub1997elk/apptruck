const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  date: { type: Date, default: Date.now },
  mileage: { type: Number, required: true },
  repairType: { type: String, enum: ["mechanic", "electric", "body", "preventive", "corrective"], required: true },
  problems: { type: String, required: true },
  parts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }],
  hours: { type: Number, required: true },
  cost: { type: Number, required: true },
  tva: { type: Number, required: true },
  supervisor: { type: String, required: true },
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);