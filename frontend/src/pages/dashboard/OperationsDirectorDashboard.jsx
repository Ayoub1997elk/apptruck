import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const OperationsDirectorDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Operations Director Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Fleet</Typography>
              <Typography variant="h4">50</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={() => navigate("/dashboard/fleet")}>
                View Fleet
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OperationsDirectorDashboard;
