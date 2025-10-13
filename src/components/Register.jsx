import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ciudadano");
  const [cedula, setCedula] = useState(null);
  const [certificado, setCertificado] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // ⚠️ Validaciones previas
    if (!cedula) {
      alert("📸 Debes subir la cédula");
      return;
    }
    if (role === "autoridad" && !certificado) {
      alert("📄 Debes subir el certificado");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 🛑 Verificar si ya existe un usuario con ese correo
    const emailExistente = users.find((user) => user.email === email);
    if (emailExistente) {
      alert("❌ Este correo ya está registrado. Por favor usa otro.");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role,
      plan: "free",
      cedula,
      certificado,
    };

    // Guardar en la lista general
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Guardar sesión activa
    localStorage.setItem("user", JSON.stringify(newUser));

    alert("✅ Registro exitoso");

    // Redirigir según rol
    if (role === "ciudadano") {
      navigate("/plan");
    } else {
      navigate("/entidad");  // si quieres mandar autoridades a otra vista
    }
  };


  return (
    <div className="min-h-screen bg-[#E0F2FE] dark:bg-gray-900 transition-colors">
      <Header /> {/* ✅ Header agregado */}

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <form
          onSubmit={handleRegister}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[#1E3A8A] dark:text-white">
            Registrarse
          </h2>

          <label className="block mb-2 dark:text-gray-300">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
          />

          <label className="block mb-2 dark:text-gray-300">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
          />

          <label className="block mb-2 dark:text-gray-300">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white"
          />

          <div className="flex space-x-2 mb-4">
            <button
              type="button"
              className={`flex-1 py-2 rounded ${
                role === "ciudadano" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-600 dark:text-white"
              }`}
              onClick={() => setRole("ciudadano")}
            >
              Ciudadano
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded ${
                role === "autoridad" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-600 dark:text-white"
              }`}
              onClick={() => setRole("autoridad")}
            >
              Autoridad
            </button>
          </div>

          <label className="block mb-2 dark:text-gray-300">Subir cédula</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setCedula(e.target.files[0].name)}
            required
            className="mb-4"
          />

          {role === "autoridad" && (
            <>
              <label className="block mb-2 dark:text-gray-300">Subir certificado (PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setCertificado(e.target.files[0].name)}
                required
                className="mb-4"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Registrarse
          </button>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:underline font-medium"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
