import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "../../components/Sidebar";
import axios from "../../utils/api";
import "./Inventory.css";

const InventoryDashboard = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newInventoryItem, setNewInventoryItem] = useState({
    itemName: "",
    quantity: "",
    minStockThreshold: "",
    supplier: {
      name: "",
      contact: "",
    },
  });

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    try {
      const response = await axios.get("/inventory");
      setInventoryItems(response.data);
    } catch (err) {
      console.error("Failed to fetch inventory items:", err);
    }
  };

  const handleAddInventoryItem = async () => {
    try {
      await axios.post("/inventory", newInventoryItem);
      setOpenAddDialog(false);
      fetchInventoryItems(); // Refresh the list
    } catch (err) {
      console.error("Failed to add inventory item:", err);
    }
  };

  const handleEditInventoryItem = async () => {
    try {
      await axios.put(`/inventory/${selectedItem._id}`, selectedItem);
      setOpenEditDialog(false);
      fetchInventoryItems(); // Refresh the list
    } catch (err) {
      console.error("Failed to update inventory item:", err);
    }
  };

  const handleDeleteInventoryItem = async (id) => {
    try {
      await axios.delete(`/inventory/${id}`);
      fetchInventoryItems(); // Refresh the list
    } catch (err) {
      console.error("Failed to delete inventory item:", err);
    }
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Inventory Management
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
          Add Inventory Item
        </Button>

        {/* Inventory Cards */}
        <Grid container spacing={3} className="grid-container">
          {inventoryItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.itemName}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography color="text.secondary">
                    Min Stock Threshold: {item.minStockThreshold}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Supplier: {item.supplier.name}
                  </Typography>
                  <Typography color="text.secondary">
                    Contact: {item.supplier.contact}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSelectedItem(item);
                      setOpenEditDialog(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteInventoryItem(item._id)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Inventory Dialog */}
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle>Add Inventory Item</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Item Name"
              value={newInventoryItem.itemName}
              onChange={(e) => setNewInventoryItem({ ...newInventoryItem, itemName: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Quantity"
              type="number"
              value={newInventoryItem.quantity}
              onChange={(e) => setNewInventoryItem({ ...newInventoryItem, quantity: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Min Stock Threshold"
              type="number"
              value={newInventoryItem.minStockThreshold}
              onChange={(e) => setNewInventoryItem({ ...newInventoryItem, minStockThreshold: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Supplier Name"
              value={newInventoryItem.supplier.name}
              onChange={(e) =>
                setNewInventoryItem({
                  ...newInventoryItem,
                  supplier: { ...newInventoryItem.supplier, name: e.target.value },
                })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Supplier Contact"
              value={newInventoryItem.supplier.contact}
              onChange={(e) =>
                setNewInventoryItem({
                  ...newInventoryItem,
                  supplier: { ...newInventoryItem.supplier, contact: e.target.value },
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddInventoryItem} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Inventory Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Inventory Item</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Item Name"
              value={selectedItem?.itemName || ""}
              onChange={(e) => setSelectedItem({ ...selectedItem, itemName: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Quantity"
              type="number"
              value={selectedItem?.quantity || ""}
              onChange={(e) => setSelectedItem({ ...selectedItem, quantity: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Min Stock Threshold"
              type="number"
              value={selectedItem?.minStockThreshold || ""}
              onChange={(e) => setSelectedItem({ ...selectedItem, minStockThreshold: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Supplier Name"
              value={selectedItem?.supplier?.name || ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  supplier: { ...selectedItem.supplier, name: e.target.value },
                })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Supplier Contact"
              value={selectedItem?.supplier?.contact || ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  supplier: { ...selectedItem.supplier, contact: e.target.value },
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditInventoryItem} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default InventoryDashboard;