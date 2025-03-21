import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import {
  PeopleAlt as PeopleIcon,
  AttachMoney as MoneyIcon,
  Today as TodayIcon,
  TrendingUp as TrendingIcon,
} from "@mui/icons-material";
import axios from "../../utils/api";

const HrDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    averageSalary: 0,
    turnoverRate: 0,
    attendanceRate: 0,
    departmentDistribution: {},
    recentHires: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("/hr/statistics");
      setStats(response.data);
    } catch (err) {
      console.error("Failed to fetch statistics:", err);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8 }}>
      <Typography variant="h4" gutterBottom>
        HR Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Total Employees Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h4">{stats.totalEmployees}</Typography>
              <Typography variant="body2" color="textSecondary">
                Total Employees
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Present Today Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TodayIcon sx={{ fontSize: 40, color: 'success.main' }} />
              <Typography variant="h4">{stats.presentToday}</Typography>
              <Typography variant="body2" color="textSecondary">
                Present Today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Average Salary Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <MoneyIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              <Typography variant="h4">{stats.averageSalary} MAD</Typography> {/* Update currency symbol */}
              <Typography variant="body2" color="textSecondary">
                Average Salary
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Turnover Rate Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingIcon sx={{ fontSize: 40, color: 'error.main' }} />
              <Typography variant="h4">{stats.turnoverRate}%</Typography>
              <Typography variant="body2" color="textSecondary">
                Turnover Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Rate Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Attendance Overview" />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {stats.attendanceRate}% Attendance Rate
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Based on last 30 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Department Distribution Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Department Distribution" />
            <CardContent>
              {Object.entries(stats.departmentDistribution).map(([dept, count]) => (
                <Box key={dept} sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    {dept}: {count} employees
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HrDashboard;