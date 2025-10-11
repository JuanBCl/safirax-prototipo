import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🎨 Colores por tipo de incidente
const typeColors = {
  robo: "#E63946",               // rojo fuerte
  vandalismo: "#6D6875",         // gris oscuro
  accidente: "#457B9D",          // azul
  "desastre natural": "#FF6B35"  // naranja intenso
};

// 🫧 Emojis por tipo de incidente
const typeEmojis = {
  robo: "🚨",
  vandalismo: "⚠️",
  accidente: "🚗",
  "desastre natural": "🌪️"
};

// 🪄 Generar icono personalizado (círculo + emoji)
const getIcon = (type) => {
  const bgColor = typeColors[type];
  const emoji = typeEmojis[type];

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background:${bgColor};
        color:white;
        border-radius:50%;
        width:36px;
        height:36px;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:20px;
        border:2px solid white;
        box-shadow:0 0 6px rgba(0,0,0,0.3);
      ">
        ${emoji}
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

export default function MapView({ reports }) {
  useEffect(() => {
    const map = L.map("map").setView([4.711, -74.0721], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);

    reports.forEach((report) => {
      if (!typeColors[report.type]) return; // ❌ ignorar si el tipo no es válido

      const marker = L.marker([report.lat, report.lng], {
        icon: getIcon(report.type),
      }).addTo(markersLayer);

      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="font-size: 1rem; margin-bottom: 4px;">
            ${(report.type || "").toUpperCase()}
          </h3>
          <p style="margin-bottom: 4px;">${report.description || ""}</p>
          <p style="font-size: 0.8rem; color: #555;">📅 ${new Date(
            report.timestamp
          ).toLocaleString()}</p>
          ${
            report.image
              ? `<img src="${report.image}" alt="Imagen del reporte" style="max-width: 100%; margin-top: 6px; border-radius: 6px;" />`
              : ""
          }
        </div>
      `;
      marker.bindPopup(popupContent);
    });

    return () => {
      map.remove();
    };
  }, [reports]);

  return (
  <div
  id="map"
  className="h-[600px] w-full rounded-lg shadow-md mt-4 border border-gray-300 dark:border-gray-700"
></div>

);


}
