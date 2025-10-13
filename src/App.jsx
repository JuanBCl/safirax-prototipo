// App.jsx
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MapView from "./components/MapView";
import ReportForm from "./components/ReportForm";
import Header from "./components/Header";
import EntityPanel from "./components/EntityPanel";
import { Toaster } from "react-hot-toast";
import "./styles.css";

function App() {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null); // 👈 Guardaremos aquí la info del usuario

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

  // 📌 Verificar usuario logueado
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
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
              {/* 👇 Solo mostrar formulario si el usuario está logueado */}
              {user && <ReportForm onAddReport={handleAddReport} />}
            </div>
          }
        />
        <Route path="/entidad" element={<EntityPanel reports={reports} />} />
      </Routes>
    </div>
  );
}

export default App;
