// src/pages/dashboard/General.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Sidebar from "../../components/Sidebar";

const GeneralDashboard = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          General Director Dashboard
        </Typography>
        <Typography variant="body1">
          Strategic overview of company performance and financials.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary">
            View Financial Reports
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralDashboard;