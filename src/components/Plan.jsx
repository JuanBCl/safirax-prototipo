import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Plan() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSelectPlan = (plan) => {
    if (plan === "free") {
      // Actualiza el plan a free si el usuario lo selecciona
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.plan = "free";
        localStorage.setItem("user", JSON.stringify(user));

        // Actualiza la lista de usuarios también
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map(u =>
          u.email === user.email ? { ...u, plan: "free" } : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
      navigate("/app");
    } else {
      setShowModal(true);
    }
  };

  const handleConfirmPayment = () => {
    setProcessing(true);

    setTimeout(() => {
      // ✅ Actualizar plan a premium
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.plan = "premium";
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Actualizar en la lista de usuarios
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map(u =>
          u.email === user.email ? { ...u, plan: "premium" } : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }

      setProcessing(false);
      setShowModal(false);
      navigate("/app");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Elige tu plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Card Free */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Plan Free</h3>
            <p className="text-gray-600 mb-4">
              Acceso básico a las funciones de la plataforma. Ideal para ciudadanos.
            </p>
            <ul className="text-gray-700 list-disc list-inside space-y-1">
              <li>Acceso al mapa</li>
              <li>Reportes básicos</li>
              <li>Visualización limitada</li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan("free")}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Seleccionar Free
          </button>
        </div>

        {/* Card Premium */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between border-2 border-yellow-500">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Plan Premium</h3>
            <p className="text-gray-600 mb-4">
              Disfruta de todas las funciones avanzadas con beneficios exclusivos.
            </p>
            <ul className="text-gray-700 list-disc list-inside space-y-1">
              <li>Acceso ilimitado al mapa</li>
              <li>Alertas personalizadas</li>
              <li>Estadísticas avanzadas</li>
              <li>Soporte prioritario</li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan("premium")}
            className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Comprar Premium
          </button>
        </div>
      </div>

      {/* Modal de pago simulado */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Método de Pago</h3>
            <p className="text-gray-600 text-center mb-4">
              Completa el pago para activar tu Plan Premium.
            </p>

            <div className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="Número de tarjeta"
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="w-1/2 border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-1/2 border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                disabled={processing}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                disabled={processing}
              >
                {processing ? "Procesando..." : "Pagar $20.000"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
