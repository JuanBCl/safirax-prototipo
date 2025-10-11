import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-blue-900 text-white shadow-md">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        SafiraX
      </h1>

      <nav className="space-x-4">
        <button
          onClick={() => navigate("/")}
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/app")}
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
        >
          Mapa
        </button>
        <button
          onClick={() => navigate("/entidad")}
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
        >
          Entidad
        </button>
      </nav>
    </header>
  );
}
