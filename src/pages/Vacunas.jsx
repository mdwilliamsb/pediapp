import { useEffect, useState } from 'react'

const esquemaVacunas = [
  { id: 'bcn', edad: 'Recién nacido', nombre: 'BCG + Hepatitis B' },
  { id: '2m', edad: '2 meses', nombre: 'Pentavalente + Rotavirus + Neumococo' },
  { id: '4m', edad: '4 meses', nombre: 'Pentavalente + Rotavirus + Neumococo' },
  { id: '6m', edad: '6 meses', nombre: 'Pentavalente + Hepatitis B' },
  { id: '12m', edad: '12 meses', nombre: 'SRP (Triple viral) + Neumococo refuerzo' },
  { id: '18m', edad: '18 meses', nombre: 'DPT + Hepatitis A' },
  { id: '4a', edad: '4 años', nombre: 'Refuerzo SRP' }
]

export default function Vacunas() {
  const [estado, setEstado] = useState({})

  // Cargar del localStorage
  useEffect(() => {
    const guardado = localStorage.getItem('vacunas')
    if (guardado) {
      setEstado(JSON.parse(guardado))
    }
  }, [])

  const toggleEstado = (id) => {
    const nuevoEstado = {
      ...estado,
      [id]: !estado[id]
    }
    setEstado(nuevoEstado)
    localStorage.setItem('vacunas', JSON.stringify(nuevoEstado))
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Esquema de Vacunación 💉</h2>
      <ul className="space-y-4">
        {esquemaVacunas.map((vacuna) => (
          <li key={vacuna.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="text-sm text-gray-500">{vacuna.edad}</p>
              <p className="text-base text-gray-800">{vacuna.nombre}</p>
            </div>
            <button
              onClick={() => toggleEstado(vacuna.id)}
              className={`text-sm px-4 py-1 rounded-full font-semibold transition ${
                estado[vacuna.id]
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {estado[vacuna.id] ? 'Aplicada' : 'Pendiente'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
