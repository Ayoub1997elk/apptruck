const Employee = require('../models/Employee');

const addEmployee = async (req, res) => {
  try {
    const { name, role, salary, contractType, startDate } = req.body;
    const newEmployee = new Employee({ name, role, salary, contractType, startDate });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addEmployee };