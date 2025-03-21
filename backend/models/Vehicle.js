const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true, unique: true },
  vin: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  milage: { type: Number, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  status: { type: String, default: "active" },
  currentDriver: { type: String, required: true },
  fueltankcapacity: { type: Number, required: true },
  maintenanceHistory: [
    {
      date: { type: Date, required: true },
      description: { type: String, required: true },
      cost: { type: Number, required: true },
      supervisor: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);