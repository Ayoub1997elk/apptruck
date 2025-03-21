import React from "react";
import { Box, Typography } from "@mui/material";

const Reports = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Typography variant="body1">
        View and generate reports for the organization.
      </Typography>
    </Box>
  );
};

export default Reports;