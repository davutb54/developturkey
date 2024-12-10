import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, HashRouter } from "react-router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
