import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Reporte({ onAddReporte }) {
  const [tipo, setTipo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagen, setImagen] = useState(null)
  const [ubicacion, setUbicacion] = useState(null)
  const navigate = useNavigate()

  // 📍 Obtener ubicación automática
  const obtenerUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUbicacion({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          })
        },
        (error) => {
          alert('No se pudo obtener tu ubicación: ' + error.message)
        }
      )
    } else {
      alert('La geolocalización no está disponible en este navegador.')
    }
  }

  // 📝 Guardar imagen localmente en memoria (opcional)
  const handleImagen = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagen(file)
    }
  }

  // 🚀 Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!tipo || !descripcion || !ubicacion) {
      alert('Por favor completa todos los campos y obtén tu ubicación 📍')
      return
    }

    const nuevoReporte = {
      id: Date.now(),
      tipo,
      descripcion,
      ubicacion,
      imagen: imagen ? URL.createObjectURL(imagen) : null,
      fecha: new Date().toLocaleString(),
    }

    // Llamar la función que agrega el reporte al estado global (App.jsx)
    onAddReporte(nuevoReporte)

    // Redirigir al mapa
    navigate('/mapa')
  }

  return (
    <div className="min-h-screen bg-fondoClaro flex flex-col justify-center items-center px-6 py-10">
      <h1 className="text-3xl font-bold text-primario mb-6">
        Reportar incidente
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
      >
        {/* Tipo de incidente */}
        <div>
          <label className="block text-text font-semibold mb-1">
            Tipo de incidente
          </label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="Robo">Robo</option>
            <option value="Accidente">Accidente</option>
            <option value="Vandalismo">Vandalismo</option>
            <option value="Emergencia Médica">Emergencia Médica</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-text font-semibold mb-1">
            Descripción
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 h-24"
            placeholder="Describe brevemente el incidente..."
            required
          />
        </div>

        {/* Ubicación */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="text-text font-semibold">Ubicación:</span>
          <button
            type="button"
            onClick={obtenerUbicacion}
            className="bg-secundario text-white px-4 py-2 rounded-lg hover:bg-primario transition"
          >
            Obtener mi ubicación 📍
          </button>
        </div>
        {ubicacion && (
          <p className="text-sm text-gray-600">
            Ubicación obtenida: Lat {ubicacion.lat.toFixed(5)}, Lng {ubicacion.lng.toFixed(5)}
          </p>
        )}

        {/* Subida de imagen */}
        <div>
          <label className="block text-text font-semibold mb-1">
            Imagen (opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagen}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Botón enviar */}
        <button
          type="submit"
          className="w-full bg-primario text-white py-2 rounded-lg font-semibold hover:bg-secundario transition"
        >
          Enviar reporte
        </button>
      </form>
    </div>
  )
}
