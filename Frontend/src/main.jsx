<<<<<<< HEAD
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/poppins"; // Default weight (400)
import "@fontsource/source-code-pro"; // Default weight (400)
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
>>>>>>> 2bc1e2d3132390b0ef75a6ebf3e54c79fe0835ba

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
