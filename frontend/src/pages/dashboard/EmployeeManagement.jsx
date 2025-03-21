import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert, MenuItem } from "@mui/material";
import axios from "../../utils/api";
import { Money as MoneyIcon } from '@mui/icons-material';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    salary: "",
    contractType: "",
    startDate: ""
  });
  const [payrollOpen, setPayrollOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [payrollData, setPayrollData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employees");
      setEmployees(response.data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to perform this action');
        return;
      }

      await axios.post("/employees", newEmployee);
      fetchEmployees();
      handleClose();
      setNewEmployee({
        name: "",
        role: "",
        salary: "",
        contractType: "",
        startDate: ""
      });
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else if (err.response?.status === 403) {
        setError("You do not have permission to add an employee.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Failed to add employee:", err);
    }
  };

  const handlePayrollOpen = (employee) => {
    setSelectedEmployee(employee);
    setPayrollOpen(true);
  };

  const handlePayrollClose = () => {
    setPayrollOpen(false);
    setSelectedEmployee(null);
    setPayrollData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
  };

  const handlePayrollSubmit = async () => {
    try {
      await axios.post('/payroll', {
        ...payrollData,
        employee: selectedEmployee._id
      });
      handlePayrollClose();
      // Optional: Show success message
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process payroll');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Employee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newEmployee.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            type="text"
            fullWidth
            variant="standard"
            value={newEmployee.role}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="salary"
            label="Salary (MAD)" // Update currency symbol
            type="number"
            fullWidth
            variant="standard"
            value={newEmployee.salary}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="contractType"
            label="Contract Type"
            select
            fullWidth
            variant="standard"
            value={newEmployee.contractType}
            onChange={handleChange}
          >
            <MenuItem value="Full-Time">Full-Time</MenuItem>
            <MenuItem value="Part-Time">Part-Time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            variant="standard"
            value={newEmployee.startDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Salary (MAD)</TableCell> {/* Update currency symbol */}
              <TableCell>Contract Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.salary} MAD</TableCell> {/* Update currency symbol */}
                <TableCell>{employee.contractType}</TableCell>
                <TableCell>{new Date(employee.startDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<MoneyIcon />}
                    onClick={() => handlePayrollOpen(employee)}
                    size="small"
                  >
                    Payroll
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeManagement;