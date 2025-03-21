import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildIcon from "@mui/icons-material/Build";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SecurityIcon from "@mui/icons-material/Security";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userRole = useSelector((state) => state.auth.user?.role);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const getNavItems = (role) => {
    switch (role) {
      case "developer":
        return [
          { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { text: "Fleet Management", icon: <DirectionsCarIcon />, path: "/dashboard/fleet" },
          { text: "Maintenance", icon: <BuildIcon />, path: "/dashboard/maintenance" },
          { text: "Inventory", icon: <InventoryIcon />, path: "/dashboard/inventory" },
          { text: "Employee Management", icon: <PeopleIcon />, path: "/dashboard/employees" },
          { text: "Payroll", icon: <AttachMoneyIcon />, path: "/dashboard/payroll" },
          { text: "Attendance", icon: <CalendarTodayIcon />, path: "/dashboard/attendance" },
          { text: "Safety Reports", icon: <SecurityIcon />, path: "/dashboard/safety" },
        ];
      case "general_director":
        return [
          { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { text: "Reports", icon: <AssignmentIcon />, path: "/dashboard/reports" },
        ];
      case "operations_director":
        return [
          { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { text: "Fleet Management", icon: <DirectionsCarIcon />, path: "/dashboard/fleet" },
          { text: "Safety Reports", icon: <SecurityIcon />, path: "/dashboard/safety" },
        ];
      case "fleet_maintenance_manager":
        return [
          { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { text: "Fleet Management", icon: <DirectionsCarIcon />, path: "/dashboard/fleet" },
          { text: "Maintenance", icon: <BuildIcon />, path: "/dashboard/maintenance" },
          { text: "Inventory", icon: <InventoryIcon />, path: "/dashboard/inventory" },
        ];
      case "hr_manager":
        return [
          { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { text: "Employee Management", icon: <PeopleIcon />, path: "/dashboard/employees" },
          { text: "Payroll", icon: <AttachMoneyIcon />, path: "/dashboard/payroll" },
          { text: "Attendance", icon: <CalendarTodayIcon />, path: "/dashboard/attendance" },
        ];
      case "inventory_manager":
        return [
          { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { text: "Inventory", icon: <InventoryIcon />, path: "/dashboard/inventory" },
        ];
      case "safety_officer":
        return [
          { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { text: "Safety Reports", icon: <SecurityIcon />, path: "/dashboard/safety" },
        ];
      case "driver":
        return [
          { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { text: "My Assignments", icon: <AssignmentIcon />, path: "/dashboard/assignments" },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems(userRole);

  return (
    <>
      <MenuIcon
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 1300,
          cursor: "pointer",
          color: "#ffffff",
        }}
      />
      <Drawer
        variant="temporary"
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
            zIndex: 1200,
            paddingTop: 10,
            background: "linear-gradient(135deg,rgb(7, 123, 240),rgb(21, 178, 218))", // Updated gradient background
            color: "#ecf0f1", // Light text color
            fontFamily: "'Poppins', sans-serif", // Modern font
          },
        }}
      >
        <Box> 
          <Typography variant="h6" sx={{ px: 2, mb: 2, fontWeight: "bold", color: "#ecf0f1", fontSize: "1.5rem" }}>
            Menu
          </Typography>
          <List>
            {navItems.map((item, index) => (
              <ListItem
                key={index} // Add unique key prop
                component={Link}
                to={item.path}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(236, 240, 241, 0.2)", // Enhanced hover effect
                  },
                  borderRadius: "8px", // Rounded corners
                  margin: "5px 10px", // Spacing between items
                  color: "#ffffff", // Text color
                }}
              >
                <ListItemIcon sx={{ color: "#2ecc71" }}>{item.icon}</ListItemIcon> {/* Updated icon color */}
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;