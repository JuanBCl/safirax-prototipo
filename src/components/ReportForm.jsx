import { useState } from "react";

export default function ReportForm({ onAddReport }) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // 👈 Vista previa de la imagen
    } else {
      setImage(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || !description) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const newReport = {
          id: Date.now(),
          type,
          description,
          lat: latitude,
          lng: longitude,
          timestamp: new Date().toISOString(),
          image: previewUrl || null,
        };

        onAddReport(newReport);

        // 🧹 Limpiar formulario
        setType("");
        setDescription("");
        setImage(null);
        setPreviewUrl(null);
        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error al obtener ubicación:", error);
        alert("No se pudo obtener la ubicación.");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-4 max-w-md mx-auto border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        📢 Reportar incidente
      </h2>

      {/* Tipo de incidente */}
      <div className="mb-3">
        <label className="block text-gray-700 dark:text-gray-300 mb-1">
          Tipo de incidente *
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        >
          <option value="">Seleccionar tipo</option>
          <option value="robo">🚨 Robo</option>
          <option value="vandalismo">⚠️ Vandalismo</option>
          <option value="accidente">🚗 Accidente</option>
          <option value="desastre natural">🌪️ Desastre natural</option>
        </select>
      </div>

      {/* Descripción */}
      <div className="mb-3">
        <label className="block text-gray-700 dark:text-gray-300 mb-1">
          Descripción *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows="3"
          placeholder="Describe lo ocurrido..."
          required
        />
      </div>

      {/* Subir imagen */}
      <div className="mb-3">
        <label className="block text-gray-700 dark:text-gray-300 mb-1">
          Imagen (opcional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-gray-700 dark:text-gray-300"
        />

        {/* 📸 Vista previa */}
        {previewUrl && (
          <div className="mt-3">
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              Vista previa:
            </p>
            <img
              src={previewUrl}
              alt="Vista previa"
              className="max-h-48 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
            />
          </div>
        )}
      </div>

      {/* Botón de enviar */}
      <button
        type="submit"
        disabled={loadingLocation}
        className={`w-full py-2 rounded text-white font-semibold ${
          loadingLocation ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loadingLocation ? "Obteniendo ubicación..." : "📨 Enviar reporte"}
      </button>
    </form>
  );
}
