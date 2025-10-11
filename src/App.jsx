import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import ReportForm from "./components/ReportForm";
import ThemeToggle from "./components/ThemeToggle";
import Toast from "./components/Toast";
import "./styles.css";

function App() {
  const [reports, setReports] = useState([]);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    fetch("/reports.json")
      .then((res) => res.json())
      .then(setReports)
      .catch((err) => console.error("Error cargando reportes:", err));
  }, []);

  const handleAddReport = (newReport) => {
    setReports((prev) => [...prev, newReport]);
    setToastMsg("✅ Reporte enviado correctamente");
  };

  return (
    <div>
      <ThemeToggle />
      <div className="app-layout">
        <MapView reports={reports} />
        <ReportForm onAddReport={handleAddReport} />
      </div>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}

export default App;
