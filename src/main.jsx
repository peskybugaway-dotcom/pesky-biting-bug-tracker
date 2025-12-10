import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Global crash catcher (even outside React)
window.addEventListener("error", (e) => {
  document.body.innerHTML =
    "<pre style='color:red;background:#111;padding:20px;white-space:pre-wrap;'>" +
    "Global Error: " + e.message +
    "</pre>";
});

const root = document.getElementById("root");
createRoot(root).render(<App />);
