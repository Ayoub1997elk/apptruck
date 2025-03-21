import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { I18nextProvider } from "react-i18next";
import { Provider } from 'react-redux';
import store from './store'; // Corrected import path
import i18n from "./utils/i18n";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Customize your primary color
    },
    background: {
      default: "#f0f0f0", // Lighter background color
    },
    text: {
      primary: "#000000", // Dark text color
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);