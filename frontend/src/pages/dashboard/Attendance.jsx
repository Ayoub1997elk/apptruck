import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Modal, TextField, Select, MenuItem, FormControl, 
  InputLabel, Alert, Snackbar } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "../../utils/api";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee: "",
    date: new Date(),
    status: "Present"
  });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, [selectedDate]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/employees");
      setEmployees(response.data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  const fetchAttendance = async () => {
    try {
      let params = {};
      if (selectedDate) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        params = { date: formattedDate };
      }
      const response = await axios.get("/attendance", { params });
      setAttendance(response.data || []);
    } catch (err) {
      console.error("Failed to fetch attendance:", err);
      setAlert({
        open: true,
        message: "Failed to fetch attendance records",
        severity: "error"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        date: formData.date.toISOString()
      };
      await axios.post("/attendance", submitData);
      setOpen(false);
      fetchAttendance();
      setAlert({ open: true, message: "Attendance added successfully!", severity: "success" });
    } catch (err) {
      setAlert({ open: true, message: err.response?.data?.error || "Error adding attendance", severity: "error" });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Attendance Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Add Attendance Record
          </Button>
          <DatePicker
            label="Filter by Date"
            value={selectedDate}
            onChange={(newDate) => {
              setSelectedDate(newDate);
              console.log('Date selected:', newDate);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>

        {attendance.length === 0 ? (
          <Typography sx={{ mt: 2 }}>No attendance records found</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendance.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>{record.employee.name}</TableCell>
                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                    <TableCell>{record.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1
          }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Add Attendance Record
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Employee</InputLabel>
                <Select
                  value={formData.employee}
                  onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
                  required
                >
                  {employees.map((emp) => (
                    <MenuItem key={emp._id} value={emp._id}>{emp.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(newDate) => setFormData({ ...formData, date: newDate })}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                  <MenuItem value="Leave">Leave</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </form>
          </Box>
        </Modal>

        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default Attendance;