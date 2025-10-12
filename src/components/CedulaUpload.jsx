import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CedulaUpload() {
  const location = useLocation();
  const navigate = useNavigate();
  const tipoUsuario = location.state?.tipoUsuario;

  const [file, setFile] = useState(null);

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleNext = () => {
    if (!file) return alert("Por favor sube o toma una foto de tu cédula");
    if (tipoUsuario === "autoridad") {
      navigate("/certificado");
    } else {
      navigate("/planes");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E0F2FE] p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#1E3A8A]">
        Verificación de identidad 🪪
      </h1>
      <p className="mb-4 text-gray-600">
        Sube o toma una foto de tu cédula para continuar
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="mb-4 border p-2 rounded"
      />

      <button
        onClick={handleNext}
        className="bg-[#2563EB] text-white px-6 py-2 rounded-xl font-semibold"
      >
        Continuar
      </button>
    </div>
  );
}
