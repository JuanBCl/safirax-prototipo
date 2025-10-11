import { useState } from "react";

export default function ReportForm({ onAddReport }) {
  const [tipo, setTipo] = useState("Seguridad");
  const [descripcion, setDescripcion] = useState("");

  const tipos = {
    Seguridad: { emoji: "🚨", color: "#DC2626" },
    Infraestructura: { emoji: "🏗️", color: "#FACC15" },
    Limpieza: { emoji: "🧹", color: "#16A34A" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!descripcion) {
      alert("Agrega una descripción");
      return;
    }

    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const nuevoReporte = {
          id: Date.now(),
          tipo,
          emoji: tipos[tipo].emoji,
          color: tipos[tipo].color,
          descripcion,
          fecha: new Date().toLocaleString(),
          lat: latitude,
          lng: longitude,
        };
        onAddReport(nuevoReporte);
        setDescripcion("");
      },
      () => alert("No se pudo obtener la ubicación. Verifica permisos.")
    );
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2>📋 Reportar incidente</h2>

      <label>Tipo de incidente</label>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        {Object.keys(tipos).map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <label>Descripción</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Describe brevemente lo sucedido..."
        required
      ></textarea>

      <button type="submit">Enviar reporte</button>
    </form>
  );
}
