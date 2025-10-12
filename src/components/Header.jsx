import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Leer usuario almacenado
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Leer modo oscuro almacenado
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
    <header className="flex items-center justify-between p-4 bg-blue-900 text-white dark:bg-gray-900 dark:text-gray-100 shadow-md relative transition-colors duration-300">

      {/* Logo */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        SafiraX
      </h1>

      {/* Navegación */}
      <nav className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/")}
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Home
        </button>


        {/* Invitado */}
        {!user && (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition"
            >
              Registrarse
            </button>
          </>
        )}

        {/* Sesión iniciada */}
        {user && (
          <>
            <button
              onClick={() => navigate("/mapa")}
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition"
            >
              Mapa
            </button>
            {user.role === "autoridad" && (
              <button
                onClick={() => navigate("/entidad")}
                className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition"
              >
                Entidad
              </button>
            )}
            {/* Perfil */}
            <div className="relative">
              <FaUserCircle
                className="text-3xl cursor-pointer hover:text-blue-300 transition"
                onClick={() => setOpenDropdown((prev) => !prev)}
              />
              {openDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-lg overflow-hidden z-50">

                  <div className="p-3 border-b">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {user.role}
                    </p>
                    {user.role === "ciudadano" && user.plan === "free" && (
                      <button
                        onClick={() => navigate("/plan")}
                        className="mt-2 w-full bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition"
                      >
                        Comprar membresía
                      </button>
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
          </>
        )}

        {/* 🌙 Toggle modo oscuro */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
          title={darkMode ? "Modo claro" : "Modo oscuro"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </nav>
    </header>
  );
}
