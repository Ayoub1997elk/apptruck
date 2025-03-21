import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice"; // Remove fetchUser action
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // User profile icon
import SettingsIcon from "@mui/icons-material/Settings"; // Settings icon
import LogoutIcon from "@mui/icons-material/Logout"; // Logout icon
import "./Navbar.css"; // Import CSS for styling

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log("User information:", user);
  }, [user]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/login"); // Redirect to login page
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        {/* Logo or App Name */}
        <h1 className="app-name">S.A.T.D.H APP</h1>
      </div>

      <div className="navbar-right">
        {/* User Profile */}
        <div className="user-profile" onClick={handleModalOpen}>
          <AccountCircleIcon style={{ fontSize: "2rem", marginRight: "10px", cursor: "pointer" }} />
          <div className="user-info">
            <span className="user-name">{user?.firstName} {user?.lastName}</span> {/* Show first name and last name */}
            <span className="user-role">{user?.role}</span>
          </div>
        </div>

        {/* Settings Dropdown */}
        <div className="settings">
          <SettingsIcon style={{ fontSize: "1.5rem", cursor: "pointer" }} />
          <div className="settings-dropdown">
            <button onClick={() => navigate("/settings")}>Settings</button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="logout" onClick={handleLogout}>
          <LogoutIcon style={{ fontSize: "1.5rem", cursor: "pointer" }} />
        </div>
      </div>

    </div>
  );
};

export default Navbar;