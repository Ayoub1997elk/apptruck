import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Sidebar from "../../components/Sidebar"; // Corrected import path

const OperationsDashboard = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Operations Manager Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to the Operations Dashboard. Here, you can manage daily operations and logistics.
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary">
            View Operations Status
          </Button>
          <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
            Schedule Tasks
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OperationsDashboard;