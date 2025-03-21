import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { loginUser } from '../services/authService';
import { Email, Lock } from '@mui/icons-material'; // Icons for email and password

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user?.role);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && userRole) {
      let targetPath;

      switch (userRole) {
        case 'general_director':
          targetPath = '/dashboard/reports';
          break;
        case 'operations_director':
          targetPath = '/dashboard/safety';
          break;
        case 'fleet_maintenance_manager':
          targetPath = '/dashboard/fleet';
          break;
        case 'hr_manager':
          targetPath = '/dashboard/employees';
          break;
        case 'inventory_manager':
          targetPath = '/dashboard/inventory';
          break;
        case 'safety_officer':
          targetPath = '/dashboard/safety';
          break;
        case 'driver':
          targetPath = '/dashboard/assignments';
          break;
        default:
          targetPath = '/dashboard';
      }

      navigate(targetPath, { replace: true });
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email.includes('@') || formData.password.length < 6) {
      dispatch(loginFailure('Please enter a valid email and password (minimum 6 characters)'));
      return;
    }
    setIsLoading(true);
    try {
      const response = await loginUser(formData);
      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error.message || 'Login failed. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'white',
          borderRadius: 3,
          background: 'linear-gradient(135deg, #6a11cb, #2575fc)', // Gradient background
          mb: 4,
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        S.A.D.T.H
      </Typography>
      <Box

        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          width: '40%',
          borderRadius: 3,
          background: 'linear-gradient(135deg, #6a11cb, #2575fc)', // Gradient background
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            borderRadius: 3,
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#333',
                mb: 4,
              }}
            >
              Welcome Back
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#6a11cb' }} /> {/* Email icon */}
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#6a11cb' }} /> {/* Password icon */}
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                  color: '#fff',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2575fc, #6a11cb)',
                  },
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: '#fff' }} /> // Loading spinner
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Login;