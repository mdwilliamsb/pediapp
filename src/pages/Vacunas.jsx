import { useState, useEffect } from "react"
import { VACUNAS_MEXICO, VACUNAS_USA } from "../data/vacunasData"

export default function Vacunas() {
  const [pais, setPais] = useState("mexico")
  const [vacunas, setVacunas] = useState([])
  const [registro, setRegistro] = useState({})

  useEffect(() => {
    const data = pais === "mexico" ? VACUNAS_MEXICO : VACUNAS_USA
    setVacunas(data)

    const guardado = localStorage.getItem(`vacunas-${pais}`)
    if (guardado) {
      setRegistro(JSON.parse(guardado))
    } else {
      setRegistro({})
    }
  }, [pais])

  const toggleVacuna = (id) => {
    const nuevo = { ...registro, [id]: !registro[id] }
    setRegistro(nuevo)
    localStorage.setItem(`vacunas-${pais}`, JSON.stringify(nuevo))
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">💉 Esquema de Vacunación</h2>

      {/* Selector de país */}
      <div className="mb-6 flex space-x-2">
        <button
          onClick={() => setPais("mexico")}
          className={`px-4 py-2 rounded ${
            pais === "mexico" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          🇲🇽 México
        </button>
        <button
          onClick={() => setPais("usa")}
          className={`px-4 py-2 rounded ${
            pais === "usa" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          🇺🇸 EE.UU.
        </button>
      </div>

      {/* Lista de vacunas */}
      <ul className="space-y-3">
        {vacunas.map((vacuna) => (
          <li key={vacuna.id} className="flex items-center justify-between border-b py-2">
            <div>
              <p className="font-medium text-gray-800">{vacuna.nombre}</p>
              <p className="text-sm text-gray-500">{vacuna.edad}</p>
            </div>
            <input
              type="checkbox"
              checked={registro[vacuna.id] || false}
              onChange={() => toggleVacuna(vacuna.id)}
              className="h-5 w-5"
            />
          </li>
        ))}
      </ul>

      {/* Emergencias */}
      <div className="mt-10 bg-red-50 border border-red-300 p-4 rounded">
        <h3 className="text-red-700 font-semibold text-lg mb-2">🚨 ¿Qué hacer en caso de emergencia?</h3>
        <ul className="list-disc pl-5 text-sm text-red-800 space-y-1">
          <li>Si tu hijo tiene fiebre después de una vacuna, aplica medios físicos (paños fríos) y vigila su temperatura.</li>
          <li>Si presenta dificultad respiratoria, sarpullido generalizado o llanto inconsolable, acude de inmediato a urgencias.</li>
          <li>Siempre ten a la mano su carnet de vacunación o esta cartilla digital.</li>
          <li>Consulta a tu pediatra si tienes dudas sobre síntomas posteriores a la vacuna.</li>
        </ul>
      </div>
    </div>
  )
}
