import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import EntityPanelWrapper from "./components/EntityPanelWrapper";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
        <Route path="/mapa" element={<App />} />  {/* 👈 agregado */}
        <Route path="/entidad" element={<EntityPanelWrapper />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
