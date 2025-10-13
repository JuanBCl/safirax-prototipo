import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert("❌ Usuario o contraseña incorrectos");
      return;
    }

    // Guardar sesión activa
    localStorage.setItem("user", JSON.stringify(foundUser));

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#E0F2FE] dark:bg-gray-900 transition-colors">
      <Header /> {/* ✅ Header agregado */}

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[#1E3A8A] dark:text-white">
            Iniciar Sesión
          </h2>

          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
          />

          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
