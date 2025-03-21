const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payroll", payrollSchema);