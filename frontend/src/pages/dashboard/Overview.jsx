import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import Sidebar from "../../components/Sidebar";

const OverviewDashboard = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Company Overview Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Operations Status</Typography>
              <Typography variant="body1">Overall operations performance</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Fleet Status</Typography>
              <Typography variant="body1">Vehicle fleet overview</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">HR Overview</Typography>
              <Typography variant="body1">Personnel status</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Inventory Status</Typography>
              <Typography variant="body1">Stock levels and orders</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OverviewDashboard;
