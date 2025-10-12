import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CertificadoUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleNext = () => {
    if (!file) return alert("Por favor sube tu certificado en PDF");
    // aquí puedes guardar la info del usuario en tu backend o localStorage
    navigate("/mapa");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E0F2FE] p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#1E3A8A]">
        Verificación de autoridad 🛡️
      </h1>
      <p className="mb-4 text-gray-600">Sube un certificado en PDF que acredite tu pertenencia a la entidad.</p>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        className="mb-4 border p-2 rounded"
      />

      <button
        onClick={handleNext}
        className="bg-[#2563EB] text-white px-6 py-2 rounded-xl font-semibold"
      >
        Finalizar Registro
      </button>
    </div>
  );
}
