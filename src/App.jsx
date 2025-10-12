import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MapView from "./components/MapView";
import ReportForm from "./components/ReportForm";
import Header from "./components/Header";
import EntityPanel from "./components/EntityPanel";
import { Toaster } from "react-hot-toast"; // 👈 importamos el Toaster global
import "./styles.css";

function App() {
  const [reports, setReports] = useState([]);

  // 📥 Cargar reportes guardados
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

  // 📝 Guardar nuevos reportes
  const handleAddReport = (newReport) => {
    const updatedReports = [...reports, newReport];
    setReports(updatedReports);
    localStorage.setItem("reports", JSON.stringify(updatedReports));

    // ✅ Mostrar notificación
    import("react-hot-toast").then(({ toast }) =>
      toast.success("✅ Reporte enviado correctamente")
    );
  };

  return (
  <div className="min-h-screen bg-fondoClaro text-text dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <Header />

    <Toaster position="top-right" reverseOrder={false} />

    <Routes>
      <Route
        path="/"
        element={
          <div className="app-layout">
            <MapView reports={reports} />
            <ReportForm onAddReport={handleAddReport} />
          </div>
        }
      />
      <Route path="/entidad" element={<EntityPanel reports={reports} />} />
    </Routes>
  </div>
);

}

export default App;
