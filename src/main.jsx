import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import EntityPanelWrapper from "./components/EntityPanelWrapper";
import EntityPanel from "./components/EntityPanel";
import ReportForm from "./components/ReportForm";
import Login from "./components/Login";
import Register from "./components/Register";
import Plan from "./components/Plan";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app/*" element={<App />} />
        <Route path="/mapa/*" element={<App />} />
        <Route path="/entidad" element={<EntityPanelWrapper />} />
        <Route path="/entidad" element={<EntityPanel />} />
        <Route path="/reporte" element={<ReportForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
