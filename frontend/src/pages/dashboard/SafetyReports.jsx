import React, { useState, useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "../../utils/api";

const SafetyReports = () => {
  const [safetyReports, setSafetyReports] = useState([]);

  useEffect(() => {
    fetchSafetyReports();
  }, []);

  const fetchSafetyReports = async () => {
    try {
      const response = await axios.get("/safety-reports");
      setSafetyReports(response.data);
    } catch (err) {
      console.error("Failed to fetch safety reports:", err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Safety Reports
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {safetyReports.map((report) => (
              <TableRow key={report._id}>
                <TableCell>{report._id}</TableCell>
                <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                <TableCell>{report.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SafetyReports;