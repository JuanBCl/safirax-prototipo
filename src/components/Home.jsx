// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#E0F2FE] flex flex-col justify-center items-center text-center px-6">
      {/* Header */}
      <h1 className="text-5xl font-bold text-[#1E3A8A] mb-4">
        Safira<span className="text-[#2563EB]">X</span>
      </h1>
      <p className="text-[#1F2937] max-w-2xl text-lg mb-8">
        Plataforma ciudadana para reportar y visualizar incidentes en tiempo real.
        Conecta a los ciudadanos con las autoridades, promoviendo la seguridad
        y la transparencia urbana.
      </p>

      {/* Botones principales */}
      <div className="flex flex-col sm:flex-row gap-4">

        <button
          onClick={() => navigate("/mapa")}
          className="bg-white text-[#1E3A8A] border border-[#2563EB] px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#E0F2FE] transition"
        >
          Ver Mapa
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#2563EB] transition"
        >
          Iniciar Sesión
        </button>

        <button
          onClick={() => navigate("/register")}
          className="bg-white text-[#1E3A8A] border border-[#2563EB] px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#E0F2FE] transition"
        >
          Registrarse
        </button>

      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-[#1F2937]">
        © 2025 SafiraX · Seguridad ciudadana inteligente
      </footer>
    </div>
  );
}

export default Home;
