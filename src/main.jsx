window.addEventListener("error", (e) => {
  document.body.innerHTML =
    "<pre style='color:red;background:#111;padding:20px;white-space:pre-wrap;'>" +
    e.message +
    "</pre>";
});

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(<App />);
