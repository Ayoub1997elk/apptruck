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

const DeveloperDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Developer Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Projects</Typography>
              <Typography variant="h4">10</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={() => navigate("/dashboard/projects")}>
                View Projects
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Commits</Typography>
              <Typography variant="h4">150</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={() => navigate("/dashboard/commits")}>
                View Commits
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeveloperDashboard;
