// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Add role-based dashboard permissions mapping
const DASHBOARD_PERMISSIONS = {
  developer: ["all"],
  general_director: ["overview", "fleet", "inventory", "hr_manager", "safety", "operations"],
  operations_director: ["operations", "fleet", "safety"],
  fleet_maintenance_manager: ["fleet"],
  hr_manager: ["hr_manager"],
  inventory_manager: ["inventory"],
  safety_officer: ["safety"],
  driver: ["driver"]
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["developer", "general_director", "operations_director", "fleet_maintenance_manager", "hr_manager", "inventory_manager", "safety_officer", "driver"],
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  language: { type: String, enum: ["en", "fr"], default: "fr" },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Add method to check dashboard access
userSchema.methods.canAccessDashboard = function(dashboardName) {
  const permissions = DASHBOARD_PERMISSIONS[this.role];
  return permissions && (permissions.includes('all') || permissions.includes(dashboardName));
};

module.exports = mongoose.model("User", userSchema);