import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  MenuItem,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/system";
import Sidebar from "../../components/Sidebar";
import axios from "../../utils/api";
import "./Maintenance.css";

// Styled Components
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
}));

const MaintenanceDashboard = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vehicle: "",
      date: new Date().toISOString().slice(0, 16),
      mileage: 0,
      repairType: "",
      problems: "",
      parts: [], // Array of parts
      hours: 0,
      cost: 0,
      tva: 0,
      supervisor: "",
      mechanic: "", // Mechanic name
    },
  });

  const [partsList, setPartsList] = useState([]); // State to manage parts list

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchVehicles(), fetchInventoryItems(), fetchMaintenanceRecords()]);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicles = async () => {
    const response = await axios.get("/vehicles");
    setVehicles(response.data);
  };

  const fetchInventoryItems = async () => {
    const response = await axios.get("/inventory");
    setInventoryItems(response.data);
  };

  const fetchMaintenanceRecords = async () => {
    const response = await axios.get("/maintenance");
    setMaintenanceRecords(response.data);
  };

  const handleAddMaintenance = async (data) => {
    try {
      // Add parts list to the form data
      const payload = { ...data, parts: partsList };
      await axios.post("/maintenance", payload);
      setOpenAddDialog(false);
      reset(); // Reset form fields
      setPartsList([]); // Clear parts list
      fetchMaintenanceRecords();
      setSnackbarOpen(true);
    } catch (err) {
      setError("Failed to add maintenance record.");
      console.error(err);
    }
  };

  const handleEditMaintenance = async () => {
    try {
      await axios.put(`/maintenance/${selectedRecord._id}`, selectedRecord);
      setOpenEditDialog(false);
      fetchMaintenanceRecords();
      setSnackbarOpen(true);
    } catch (err) {
      setError("Failed to update maintenance record.");
      console.error(err);
    }
  };

  const handleDeleteMaintenance = async (id) => {
    try {
      await axios.delete(`/maintenance/${id}`);
      fetchMaintenanceRecords();
      setSnackbarOpen(true);
    } catch (err) {
      setError("Failed to delete maintenance record.");
      console.error(err);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAddPart = (part) => {
    setPartsList([...partsList, part]); // Add a new part to the list
  };

  const handleRemovePart = (index) => {
    const updatedParts = partsList.filter((_, i) => i !== index); // Remove part by index
    setPartsList(updatedParts);
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Maintenance Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setOpenAddDialog(true)}
          sx={{ mb: 3 }}
        >
          Add Maintenance Record
        </Button>

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Vehicle</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Mileage</StyledTableCell>
                  <StyledTableCell>Repair Type</StyledTableCell>
                  <StyledTableCell>Problems</StyledTableCell>
                  <StyledTableCell>Parts</StyledTableCell>
                  <StyledTableCell>Hours</StyledTableCell>
                  <StyledTableCell>Cost</StyledTableCell>
                  <StyledTableCell>TVA</StyledTableCell>
                  <StyledTableCell>Mechanic</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {maintenanceRecords.map((record) => (
                  <StyledTableRow key={record._id}>
                    <TableCell>{record.vehicle ? record.vehicle.licensePlate : "N/A"}</TableCell>
                    <TableCell>{new Date(record.date).toLocaleString()}</TableCell>
                    <TableCell>{record.mileage}</TableCell>
                    <TableCell>{record.repairType}</TableCell>
                    <TableCell>{record.problems}</TableCell>
                    <TableCell>
                      {record.parts ? record.parts.map((part) => part.itemName).join(", ") : "N/A"}
                    </TableCell>
                    <TableCell>{record.hours}</TableCell>
                    <TableCell>{record.cost}</TableCell>
                    <TableCell>{record.tva}%</TableCell>
                    <TableCell>{record.mechanic}</TableCell>
                    <TableCell>{record.supervisor}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => { setSelectedRecord(record); setOpenEditDialog(true); }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteMaintenance(record._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Add Maintenance Dialog */}
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add Maintenance Record</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(handleAddMaintenance)} className="maintenance-form-container">
              <div className="form-section">
                <h2>Basic Information</h2>
                <Grid container spacing={2}>
                  {/* Vehicle Dropdown */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="vehicle"
                      control={control}
                      rules={{ required: "Vehicle is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Vehicle"
                          error={!!errors.vehicle}
                          helperText={errors.vehicle ? errors.vehicle.message : "Select the vehicle for maintenance"}
                        >
                          {vehicles.map((vehicle) => (
                            <MenuItem key={vehicle._id} value={vehicle._id}>
                              {vehicle.licensePlate} - {vehicle.model} ({vehicle.year})
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* Date and Time */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="date"
                      control={control}
                      rules={{ required: "Date is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Date and Time"
                          type="datetime-local"
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.date}
                          helperText={errors.date ? errors.date.message : "Select the date and time of maintenance"}
                        />
                      )}
                    />
                  </Grid>

                  {/* Mileage */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="mileage"
                      control={control}
                      rules={{ required: "Mileage is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Mileage"
                          type="number"
                          error={!!errors.mileage}
                          helperText={errors.mileage ? errors.mileage.message : "Enter the current mileage of the vehicle"}
                        />
                      )}
                    />
                  </Grid>

                  {/* Repair Type Dropdown */}
                  <Grid item xs={12} md={6}>
                    <Controller
                      name="repairType"
                      control={control}
                      rules={{ required: "Repair type is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Repair Type"
                          error={!!errors.repairType}
                          helperText={errors.repairType ? errors.repairType.message : "Select the type of repair"}
                        >
                          <MenuItem value="mechanic">Mechanic</MenuItem>
                          <MenuItem value="electric">Electric</MenuItem>
                          <MenuItem value="body">Body</MenuItem>
                          <MenuItem value="preventive">Preventive</MenuItem>
                          <MenuItem value="corrective">Corrective</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* Problems */}
                  <Grid item xs={12}>
                    <Controller
                      name="problems"
                      control={control}
                      rules={{ required: "Problems description is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Problems"
                          multiline
                          rows={4}
                          error={!!errors.problems}
                          helperText={errors.problems ? errors.problems.message : "Describe the problems encountered"}
                        />
                      )}
                    />
                  </Grid>

                  {/* Mechanic Name */}
                  <Grid item xs={12}>
                    <Controller
                      name="mechanic"
                      control={control}
                      rules={{ required: "Mechanic name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Mechanic Name"
                          error={!!errors.mechanic}
                          helperText={errors.mechanic ? errors.mechanic.message : "Enter the name of the mechanic"}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </div>

              <div className="form-section">
                <h2>Parts Used</h2>
                <Grid container spacing={2}>
                  {/* Parts Selection */}
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Select Part"
                      value=""
                      onChange={(e) => {
                        const selectedPart = inventoryItems.find((item) => item._id === e.target.value);
                        if (selectedPart) {
                          handleAddPart({
                            ...selectedPart,
                            quantity: 1,
                            tva: 20, // Default TVA
                          });
                        }
                      }}
                    >
                      {inventoryItems.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.itemName} (Quantity: {item.quantity})
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Display Added Parts */}
                  {partsList.map((part, index) => (
                    <Grid item xs={12} key={index}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <TextField
                          fullWidth
                          label="Part Name"
                          value={part.itemName}
                          disabled
                        />
                        <TextField
                          fullWidth
                          label="Quantity"
                          type="number"
                          value={part.quantity}
                          onChange={(e) => {
                            const updatedParts = [...partsList];
                            updatedParts[index].quantity = parseInt(e.target.value);
                            setPartsList(updatedParts);
                          }}
                        />
                        <TextField
                          fullWidth
                          label="TVA (%)"
                          type="number"
                          value={part.tva}
                          onChange={(e) => {
                            const updatedParts = [...partsList];
                            updatedParts[index].tva = parseInt(e.target.value);
                            setPartsList(updatedParts);
                          }}
                        />
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleRemovePart(index)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </div>

              <div className="form-section">
                <h2>Labor and Costs</h2>
              
                  {/* Hours */}
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="hours"
                      control={control}
                      rules={{ required: "Hours are required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Hours"
                          type="number"
                          error={!!errors.hours}
                          helperText={errors.hours ? errors.hours.message : "Enter the number of hours spent on maintenance"}
                        />
                      )}
                    />
                  </Grid>

                  {/* Cost */}
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="cost"
                      control={control}
                      rules={{ required: "Cost is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Cost"
                          type="number"
                          error={!!errors.cost}
                          helperText={errors.cost ? errors.cost.message : "Enter the total cost of maintenance"}
                        />
                      )}
                    />
                  </Grid>

                  {/* TVA (VAT) */}
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="tva"
                      control={control}
                      rules={{ required: "TVA is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="TVA (%)"
                          type="number"
                          error={!!errors.tva}
                          helperText={errors.tva ? errors.tva.message : "Enter the VAT percentage"}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="supervisor"
                      control={control}
                      rules={{ required: "Supervisor name is required" }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Supervisor Name"
                          error={!!errors.supervisor}
                          helperText={errors.supervisor ? errors.supervisor.message : "Enter the name of the supervisor"}
                        />
                      )}
                    />
                  </Grid>
              </div>
              <DialogActions>
                <Button onClick={() => setOpenAddDialog(false)} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Save
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

{/* Edit Maintenance Dialog */}
<Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
  <DialogTitle>Edit Maintenance Record</DialogTitle>
  <DialogContent>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Vehicle ID"
          value={selectedRecord?.vehicle || ""}
          onChange={(e) => setSelectedRecord({ ...selectedRecord, vehicle: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={selectedRecord?.date || ""}
          onChange={(e) => setSelectedRecord({ ...selectedRecord, date: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Mileage"
          type="number"
          value={selectedRecord?.mileage || ""}
          onChange={(e) => setSelectedRecord({ ...selectedRecord, mileage: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Repair Type"
          value={selectedRecord?.repairType || ""}
          onChange={(e) => setSelectedRecord({ ...selectedRecord, repairType: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Problems"
          multiline
          rows={4}
          value={selectedRecord?.problems || ""}
          onChange={(e) => setSelectedRecord({ ...selectedRecord, problems: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Parts"
          value={selectedRecord?.parts || ""}
          onChange={(e) => setSelectedRecord({ ...selectedRecord, parts: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Hours"
          type="number"
          value={selectedRecord?.hours || ""}
          onChange={(e) => setSelectedRecord({ ...selectedRecord, hours: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Cost"
          type="number"
          value={selectedRecord?.cost || ""}
          onChange={(e) => setSelectedRecord({ ...selectedRecord, cost: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="TVA (%)"
          type="number"
          value={selectedRecord?.tva || ""}
          onChange={(e) => setSelectedRecord({ ...selectedRecord, tva: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Mechanic Name"
          value={selectedRecord?.mechanic || ""}
          onChange={(e) => setSelectedRecord({ ...selectedRecord, mechanic: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Supervisor Name"
          value={selectedRecord?.supervisor || ""}
          onChange={(e) => setSelectedRecord({ ...selectedRecord, supervisor: e.target.value })}
        />
      </Grid>
    </Grid>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
    <Button onClick={handleEditMaintenance} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>

        {/* Snackbar for Notifications */}
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            Operation successful!
          </Alert>
        </Snackbar>

        {/* Error Snackbar */}
        {error && (
          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Box>
  );
};

export default MaintenanceDashboard;