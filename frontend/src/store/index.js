import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Corrected path

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
