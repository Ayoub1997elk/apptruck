import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
  isSidebarVisible: false, // Initial state for sidebar visibility
};

// Async thunk to fetch user information
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/auth/user");
    console.log("Fetched user data:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching user data:", err.response.data);
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = action.payload;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    logout: (state) => {
      state.user = null;
      state.token = null;vercel.json
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    toggleSidebar: (state) => {
      state.isSidebarVisible = !state.isSidebarVisible; // Toggle sidebar visibility
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log("User data fulfilled:", action.payload);
        state.user = {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        console.error("User data rejected:", action.payload);
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, loginFailure, logout, toggleSidebar } = authSlice.actions;
export default authSlice.reducer;