const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  salary: { type: Number, required: true },
  contractType: { type: String, required: true, enum: ["Full-Time", "Part-Time", "Contract"] },
  startDate: { type: Date, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;