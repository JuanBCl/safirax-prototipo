import { useState } from "react";
import Header from "./Header";

export default function EntityPanel({ reports }) {
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  // 🧮 Filtramos reportes por tipo y fecha
  const filteredReports = reports.filter((report) => {
    const matchesType = filterType ? report.type === filterType : true;
    const matchesDate = filterDate
      ? new Date(report.timestamp).toISOString().slice(0, 10) === filterDate
      : true;
    return matchesType && matchesDate;
  });

  return (
    
    <div className="p-4 w-full bg-fondoClaro dark:bg-gray-900 transition-colors duration-300">
  <Header />
  <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
    📊 Panel de Entidad
  </h2>

  {/* 🔍 Filtros */}
  <div className="flex gap-4 mb-4 flex-wrap">
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
      className="border rounded p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
    >
      <option value="">Todos los tipos</option>
      <option value="robo">Robo 🚨</option>
      <option value="vandalismo">Vandalismo ⚠️</option>
      <option value="accidente">Accidente 🚗</option>
      <option value="desastre natural">Desastre natural 🌪️</option>
    </select>

    <input
      type="date"
      value={filterDate}
      onChange={(e) => setFilterDate(e.target.value)}
      className="border rounded p-2 dark:bg-gray-800 dark:text-white dark:border-gray-600"
    />

    <button
      onClick={() => {
        setFilterType("");
        setFilterDate("");
      }}
      className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:opacity-80 dark:hover:opacity-90 transition"
    >
      Limpiar filtros
    </button>
  </div>

  {/* 📋 Tabla */}
  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-sm text-gray-800 dark:text-gray-200">
      <thead className="bg-gray-100 dark:bg-gray-700 text-left">
        <tr>
          <th className="p-2">Tipo</th>
          <th className="p-2">Descripción</th>
          <th className="p-2">Fecha</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <tr
              key={report.id}
              className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="p-2 capitalize">{report.type}</td>
              <td className="p-2">{report.description}</td>
              <td className="p-2">
                {new Date(report.timestamp).toLocaleString()}
              </td>
              <td className="p-2">
                <button
                  onClick={() => setSelectedReport(report)}
                  className="bg-blue-600 dark:bg-blue-700 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 dark:hover:bg-blue-800 transition"
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">
              No hay reportes que coincidan
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* 🪧 Modal de detalles */}
  {selectedReport && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full transition-colors duration-300">
        <h3 className="text-lg font-bold mb-2 dark:text-gray-100">
          {selectedReport.type.toUpperCase()}
        </h3>
        <p className="mb-2 dark:text-gray-200">{selectedReport.description}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          📅 {new Date(selectedReport.timestamp).toLocaleString()}
        </p>
        {selectedReport.image && (
          <img
            src={selectedReport.image}
            alt="imagen"
            className="rounded mb-4 object-cover"
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "8px"
            }}
          />
        )}
        <div className="flex justify-end">
          <button
            onClick={() => setSelectedReport(null)}
            className="bg-gray-300 dark:bg-gray-600 px-3 py-1 rounded hover:opacity-80 dark:hover:opacity-90 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
}
