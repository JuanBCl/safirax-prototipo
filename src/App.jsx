import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MapView from "./components/MapView";
import ReportForm from "./components/ReportForm";
import ThemeToggle from "./components/ThemeToggle";
import Toast from "./components/Toast";
import Header from "./components/Header";
import EntityPanel from "./components/EntityPanel"; // 👈 importante
import "./styles.css";

function App() {
  const [reports, setReports] = useState([]);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
  const stored = localStorage.getItem("reports");
  if (stored) {
    setReports(JSON.parse(stored));
  } else {
    fetch("/reports.json")
      .then((res) => res.json())
      .then(setReports)
      .catch((err) => console.error("Error cargando reportes:", err));
  }
}, []);


  const handleAddReport = (newReport) => {
  const updatedReports = [...reports, newReport];
  setReports(updatedReports);

  // ✅ Guardar también en localStorage
  localStorage.setItem("reports", JSON.stringify(updatedReports));

  setToastMsg("✅ Reporte enviado correctamente");
};


  return (
    <div>
      <Header />
      <ThemeToggle />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-layout">
              <MapView reports={reports} />
              <ReportForm onAddReport={handleAddReport} />
              {toastMsg && (
                <Toast message={toastMsg} onClose={() => setToastMsg("")} />
              )}
            </div>
          }
        />
        <Route path="/entidad" element={<EntityPanel reports={reports} />} />
      </Routes>
    </div>
  );
}

export default App;
