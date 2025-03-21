import React from "react";
import { useSelector } from "react-redux";
import DeveloperDashboard from "./dashboard/DeveloperDashboard";
import GeneralDirectorDashboard from "./dashboard/GeneralDirectorDashboard";
import OperationsDirectorDashboard from "./dashboard/OperationsDirectorDashboard";
import HrDashboard from "./dashboard/Hr";
import MyAssignments from "./dashboard/MyAssignments";

const Dashboard = () => {
  const userRole = useSelector((state) => state.auth.user?.role);

  switch (userRole) {
    case "developer":
      return <DeveloperDashboard />;
    case "general_director":
      return <GeneralDirectorDashboard />;
    case "operations_director":
      return <OperationsDirectorDashboard />;
    case "hr_manager":
      return <HrDashboard />;
    case "driver":
      return <MyAssignments />;
    case "fleet_maintenance_manager":
      return <fleet_maintenance_manager />;

  }
};

export default Dashboard;