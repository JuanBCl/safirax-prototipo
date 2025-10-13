import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaMoon,
  FaSun,
  FaHome,
  FaMapMarkedAlt,
  FaBuilding,
} from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="bg-blue-900 text-white dark:bg-gray-900 dark:text-gray-100 shadow-md transition-colors duration-300">
      {/* 🔹 Fila superior: Logo + modo oscuro + perfil */}
      <div className="flex justify-between items-center px-4 py-3 md:px-8">
        <h1
          className="text-2xl md:text-4xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          SafiraX
        </h1>

        <div className="flex items-center gap-3">
          {/* 🌓 Botón Modo Oscuro */}
          <button
            onClick={toggleTheme}
            className="p-2 md:p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-110"
            title={darkMode ? "Modo claro" : "Modo oscuro"}
          >
            {darkMode ? (
              <FaSun className="transition-all duration-300 ease-in-out" size={22} />
            ) : (
              <FaMoon className="transition-all duration-300 ease-in-out" size={22} />
            )}
          </button>

          {/* 👤 Icono de Perfil */}
          {user && (
            <div className="relative">
              {/* 📱 Mobile → redirige */}
              <div className="md:hidden">
                <FaUserCircle
                  size={30}
                  className="cursor-pointer hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
                  onClick={() => navigate("/perfil")}
                />
              </div>

              {/* 🖥️ Desktop → dropdown */}
              <div className="hidden md:block">
                <FaUserCircle
                  size={30}
                  className="cursor-pointer hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
                  onClick={() => setOpenDropdown((prev) => !prev)}
                />

                {openDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-lg overflow-hidden z-50 animate-fadeIn">
                    <div className="p-3 border-b dark:border-gray-700">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500 capitalize">{user.role}</p>

                      {user.role === "ciudadano" && (
                        <>
                          {user.plan === "free" ? (
                            <button
                              onClick={() => navigate("/plan")}
                              className="mt-2 w-full bg-yellow-500 text-white py-1.5 rounded hover:bg-yellow-600 transition"
                            >
                              Comprar membresía
                            </button>
                          ) : (
                            <p className="mt-2 text-center text-yellow-500 font-semibold">
                              ⭐ Premium
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Fila inferior: Iconos de navegación */}
      <nav className="flex justify-around md:justify-center items-center py-2 gap-6 md:gap-10 border-t border-blue-800 dark:border-gray-800">
        {/* Home */}
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
        >
          <FaHome size={26} className="md:size-30" />
          <span className="text-xs md:text-lg mt-1">Home</span>
        </button>

        {/* Invitado */}
        {!user && (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="text-sm md:text-lg font-semibold px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm md:text-lg font-semibold px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Registrarse
            </button>
          </div>
        )}

        {/* Sesión iniciada */}
        {user && (
          <>
            {/* Mapa */}
            <button
              onClick={() => navigate("/mapa")}
              className="flex flex-col items-center hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
            >
              <FaMapMarkedAlt size={26} className="md:size-30" />
              <span className="text-xs md:text-lg mt-1">Mapa</span>
            </button>

            {/* Entidad (solo autoridad) */}
            {user.role === "autoridad" && (
              <button
                onClick={() => navigate("/entidad")}
                className="flex flex-col items-center hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
              >
                <FaBuilding size={26} className="md:size-30" />
                <span className="text-xs md:text-lg mt-1">Entidad</span>
              </button>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
