import React, { useEffect, useState } from "react";
import "./Fleet.css";
import cardBackgrund from "../../assets/truckcard.jpg";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "../../components/Sidebar";
import axios from "../../utils/api";


const FleetDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [newVehicle, setNewVehicle] = useState({
    licensePlate: "",
    vin: "",
    type: "",
    model: "",
    year: "",
    milage: "",
    currentDriver: "",
    fueltankcapacity: "",
    status: "active",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("/vehicles");
      setVehicles(response.data);
    } catch (err) {
      console.error("Failed to fetch vehicles:", err);
    }
  };

  const validateVehicle = (vehicle) => {
    if (!vehicle.licensePlate || !vehicle.type || !vehicle.model || !vehicle.year) {
      return "All fields are required";
    }
    if (isNaN(vehicle.year) || vehicle.year < 1900 || vehicle.year > new Date().getFullYear()) {
      return "Please enter a valid year";
    }
    return null;
  };

  const handleAddVehicle = async () => {
    try {
      setError("");
      const validationError = validateVehicle(newVehicle);
      if (validationError) {
        setError(validationError);
        return;
      }

      const response = await axios.post("/vehicles", newVehicle);
      if (response.data) {
        setNewVehicle({
          licensePlate: "",
          vin: "",
          type: "",
          model: "",
          year: "",
          milage: "",
          currentDriver: "",
          fueltankcapacity: "",
          status: "active",
        });

        setOpenAddDialog(false);
        fetchVehicles();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add vehicle. Please try again.");
      console.error("Failed to add vehicle:", err);
    }
  };

  const handleEditVehicle = async () => {
    try {
      await axios.put(`/vehicles/${selectedVehicle._id}`, selectedVehicle);
      setOpenEditDialog(false);
      fetchVehicles();
    } catch (err) {
      console.error("Failed to update vehicle:", err);
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await axios.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (err) {
      console.error("Failed to delete vehicle:", err);
    }
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Fleet Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
          Add Vehicle
        </Button>
        <Grid container spacing={3} sx={{ mt: 2 }}>
  {vehicles.map((vehicle) => (
    <Grid item key={vehicle._id} xs={12} sm={6} md={4}>
      <Card
        className="vehicle-card"
        style={{
          backgroundImage: `url(${cardBackgrund})`, // Add background image
        }}
      >
        <CardContent className="card-content">
        <Typography variant="h6" className="card-title license-plate">
        {vehicle.licensePlate}
          </Typography>
          <Typography className="card-detail">VIN: {vehicle.vin}</Typography>
          <Typography className="card-detail">Type: {vehicle.type}</Typography>
          <Typography className="card-detail">Model: {vehicle.model}</Typography>
          <Typography className="card-detail">Year: {vehicle.year}</Typography>
          <Typography className="card-detail">Milage: {vehicle.milage}</Typography>
          <Typography className="card-detail">
            Current Driver: {vehicle.currentDriver}
          </Typography>
          <Typography className="card-detail">
            Fuel Tank Capacity: {vehicle.fueltankcapacity}
          </Typography>
          <Typography className="card-detail">Status: {vehicle.status}</Typography>
        </CardContent>
        <CardActions className="card-actions">
          <IconButton
            onClick={() => {
              setSelectedVehicle(vehicle);
              setOpenEditDialog(true);
            }}
          >
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteVehicle(vehicle._id)}>
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>

        {/* Add Vehicle Dialog */}
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogContent>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              fullWidth
              margin="normal"
              label="License Plate"
              value={newVehicle.licensePlate}
              onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="VIN"
              value={newVehicle.vin}
              onChange={(e) => setNewVehicle({ ...newVehicle, vin: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Type"
              value={newVehicle.type}
              onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Model"
              value={newVehicle.model}
              onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Year"
              type="number"
              value={newVehicle.year}
              onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Milage"
              type="number"
              value={newVehicle.milage}
              onChange={(e) => setNewVehicle({ ...newVehicle, milage: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Current Driver"
              value={newVehicle.currentDriver}
              onChange={(e) => setNewVehicle({ ...newVehicle, currentDriver: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Status"
              value={newVehicle.status}
              onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Fuel Tank Capacity"
              type="number"
              value={newVehicle.fueltankcapacity}
              onChange={(e) => setNewVehicle({ ...newVehicle, fueltankcapacity: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddVehicle} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Vehicle Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Vehicle</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="License Plate"
              value={selectedVehicle?.licensePlate || ""}
              onChange={(e) => setSelectedVehicle({ ...selectedVehicle, licensePlate: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="VIN"
              value={selectedVehicle?.vin || ""}
              onChange={(e) => setSelectedVehicle({ ...selectedVehicle, vin: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Type"
              value={selectedVehicle?.type || ""}
              onChange={(e) => setSelectedVehicle({ ...selectedVehicle, type: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Model"
              value={selectedVehicle?.model || ""}
              onChange={(e) => setSelectedVehicle({ ...selectedVehicle, model: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Year"
              type="number"
              value={selectedVehicle?.year || ""}
              onChange={(e) => setSelectedVehicle({ ...selectedVehicle, year: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Current Driver"
              value={selectedVehicle?.currentDriver || ""}
              onChange={(e) => setSelectedVehicle({ ...selectedVehicle, currentDriver: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Status"
              value={selectedVehicle?.status || ""}
              onChange={(e) => setSelectedVehicle({ ...selectedVehicle, status: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Fuel Tank Capacity"
              type="number"
              value={selectedVehicle?.fueltankcapacity || ""}
              onChange={(e) => setSelectedVehicle({ ...selectedVehicle, fueltankcapacity: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditVehicle} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default FleetDashboard;