import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function createEmojiIcon(emoji, color) {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
      ">
        ${emoji}
      </div>
    `,
    className: "",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });
}

export default function MapView({ reports = [] }) {
  useEffect(()=>{},[reports]);
  return (
    <div className="map-container">
      <MapContainer
        center={[4.7110, -74.0721]} // Bogotá
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Claro (OpenStreetMap)">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Oscuro (Carto Dark)">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
              attribution="© CartoDB"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.lat, report.lng]}
            icon={createEmojiIcon(report.emoji, report.color)}
          >
            <Popup>
              <div style={{minWidth:200}}>
                <div style={{fontSize:18}}>{report.emoji} <strong>{report.tipo}</strong></div>
                <div style={{marginTop:6}}>{report.descripcion}</div>
                <div style={{marginTop:8, fontSize:12, color:'rgba(0,0,0,0.6)'}}>🕓 {report.fecha}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
