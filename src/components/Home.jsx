// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ✅ Verificamos si hay un usuario guardado en localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#E0F2FE] dark:bg-gray-900 flex flex-col justify-center items-center text-center px-6 transition-colors">
      {/* Header */}
      <h1 className="text-5xl font-bold text-[#1E3A8A] dark:text-white mb-4">
        Safira<span className="text-[#2563EB]">X</span>
      </h1>
      <p className="text-[#1F2937] dark:text-gray-300 max-w-2xl text-lg mb-8">
        Plataforma ciudadana para reportar y visualizar incidentes en tiempo real.
        Conecta a los ciudadanos con las autoridades, promoviendo la seguridad
        y la transparencia urbana.
      </p>

      {/* Botones principales */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/mapa")}
          className="bg-white dark:bg-gray-800 text-[#1E3A8A] dark:text-white border border-[#2563EB] px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#E0F2FE] dark:hover:bg-gray-700 transition"
        >
          Ver Mapa
        </button>

        {/* 👇 Solo aparecen si no hay sesión iniciada */}
        {!isAuthenticated && (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#2563EB] transition"
            >
              Iniciar Sesión
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-white dark:bg-gray-800 text-[#1E3A8A] dark:text-white border border-[#2563EB] px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#E0F2FE] dark:hover:bg-gray-700 transition"
            >
              Registrarse
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-[#1F2937] dark:text-gray-400">
        © 2025 SafiraX · Seguridad ciudadana inteligente
      </footer>
    </div>
  );
}

export default Home;
