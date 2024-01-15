import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
  </BrowserRouter>
);
