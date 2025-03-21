import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, toggleSidebar } from "./redux/slices/authSlice";
import Dashboard from "./pages/Dashboard";
import FleetManagement from "./pages/dashboard/Fleet";
import Maintenance from "./pages/dashboard/Maintenance";
import Inventory from "./pages/dashboard/Inventory";
import EmployeeManagement from "./pages/dashboard/EmployeeManagement";
import Payroll from "./pages/dashboard/Payroll";
import Attendance from "./pages/dashboard/Attendance";
import Reports from "./pages/dashboard/Reports";
import SafetyReports from "./pages/dashboard/SafetyReports";
import NotFound from "./components/NotFound";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import MyAssignments from "./pages/dashboard/MyAssignments";
import Navbar from "./components/Navbar";
import appBackground from "./assets/background.jpg";
import "./App.css";

const AppRouter = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.user?.role);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSidebarVisible = useSelector((state) => state.auth.isSidebarVisible);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(loginSuccess({ token, user }));
    }
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
      <Router basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router basename="/">
      <div className="app-container">
        <Navbar user={user} />
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className={`content-container ${isSidebarVisible ? "with-sidebar" : ""}`}>
          <Routes>
            {/* Add your routes here */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/fleet" element={<FleetManagement />} />
            <Route path="/dashboard/maintenance" element={<Maintenance />} />
            <Route path="/dashboard/inventory" element={<Inventory />} />
            <Route path="/dashboard/employees" element={<EmployeeManagement />} />
            <Route path="/dashboard/payroll" element={<Payroll />} />
            <Route path="/dashboard/attendance" element={<Attendance />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="/dashboard/safety" element={<SafetyReports />} />
            <Route path="/dashboard/assignments" element={<MyAssignments />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;