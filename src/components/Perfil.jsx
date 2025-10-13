import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header"; // 🧭 Ajusta la ruta si tu Header está en otra carpeta

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <p className="mb-4 text-lg">No hay sesión iniciada</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <>
      {/* 🧭 Header fijo en todas las vistas */}
      <Header />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-8 pt-28">
        <h1 className="text-3xl font-bold mb-6 text-center">Mi Perfil</h1>

        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>

          {user.role === "ciudadano" && (
            <>
              {user.plan === "free" ? (
                <button
                  onClick={() => navigate("/plan")}
                  className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                >
                  Comprar membresía
                </button>
              ) : (
                <p className="text-center text-yellow-500 font-semibold text-lg">
                  ⭐ Plan Premium
                </p>
              )}
            </>
          )}

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
}
