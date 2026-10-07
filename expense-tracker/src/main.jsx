import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { ExpenseProvider } from "./context/ExpenseContext";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </HashRouter>
  </React.StrictMode>
);
