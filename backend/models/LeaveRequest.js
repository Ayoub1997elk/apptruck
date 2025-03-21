const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "Pending", enum: ["Pending", "Approved", "Rejected"] },
});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);