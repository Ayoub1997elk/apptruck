import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from "@mui/material";
import { Money as MoneyIcon } from '@mui/icons-material';
import axios from "../../utils/api";

const Payroll = () => {
  const [employees, setEmployees] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [payrollOpen, setPayrollOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [error, setError] = useState("");
  const [payrollData, setPayrollData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  useEffect(() => {
    fetchEmployees();
    fetchPayrolls();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employees");
      setEmployees(response.data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  const fetchPayrolls = async () => {
    try {
      const response = await axios.get("/payroll");
      setPayrolls(response.data);
    } catch (err) {
      console.error("Failed to fetch payrolls:", err);
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
      fetchPayrolls();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process payroll');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Payroll Management
      </Typography>

      {/* Employee List */}
      <TableContainer component={Paper} sx={{ mt: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ p: 2 }}>Employees</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Base Salary (MAD)</TableCell> 
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.salary} MAD</TableCell> 
                <TableCell>
                  <Button
                    startIcon={<MoneyIcon />}
                    onClick={() => handlePayrollOpen(employee)}
                    variant="contained"
                    size="small"
                  >
                    Process Payroll
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payroll History */}
      <TableContainer component={Paper}>
        <Typography variant="h6" sx={{ p: 2 }}>Payroll History</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Amount (MAD)</TableCell> 
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrolls.map((payroll) => (
              <TableRow key={payroll._id}>
                <TableCell>{payroll.employee.name}</TableCell>
                <TableCell>{payroll.amount} MAD</TableCell> 
                <TableCell>{new Date(payroll.date).toLocaleDateString()}</TableCell>
                <TableCell>{payroll.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Payroll Dialog */}
      <Dialog open={payrollOpen} onClose={handlePayrollClose}>
        <DialogTitle>Process Payroll - {selectedEmployee?.name}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            margin="dense"
            label="Amount (MAD)" 
            type="number"
            fullWidth
            value={payrollData.amount}
            onChange={(e) => setPayrollData({ ...payrollData, amount: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={payrollData.date}
            onChange={(e) => setPayrollData({ ...payrollData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={payrollData.description}
            onChange={(e) => setPayrollData({ ...payrollData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePayrollClose}>Cancel</Button>
          <Button onClick={handlePayrollSubmit} color="primary">
            Process Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payroll;