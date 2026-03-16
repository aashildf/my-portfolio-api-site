import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "./styles/global.css";
import "./styles/colors.css";
import "./styles/typography.css";
import "./styles/layout.css";
import "./styles/header.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/my-portfolio-api-site/">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
