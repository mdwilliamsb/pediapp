import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDiasRestantes } from '../utils/getDiasRestantes'

export default function Home() {
  const [perfil, setPerfil] = useState(null)
  const [edad, setEdad] = useState('')
  const [diasRestantes, setDiasRestantes] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('perfil')
    if (data) {
      const perfilGuardado = JSON.parse(data)
      setPerfil(perfilGuardado)
      setEdad(calcularEdad(perfilGuardado.nacimiento))
    }

    getDiasRestantes().then(setDiasRestantes)
  }, [])

  const calcularEdad = (fecha) => {
    if (!fecha) return ''
    const nacimiento = new Date(fecha)
    const hoy = new Date()
    const años = hoy.getFullYear() - nacimiento.getFullYear()
    const meses = hoy.getMonth() - nacimiento.getMonth()
    return `${años} años y ${meses < 0 ? meses + 12 : meses} meses`
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg text-center">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Bienvenido a PediApp 👋</h2>

      {diasRestantes !== null && diasRestantes <= 2 && diasRestantes > 0 && (
        <div className="bg-red-100 text-red-800 text-sm p-3 rounded mb-4 shadow-md border border-red-300">
          <p>
            ⚠️ Te quedan <strong>{diasRestantes}</strong> día{diasRestantes > 1 ? 's' : ''} de prueba gratuita.
          </p>
          <Link
            to="/plan"
            className="inline-block mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
          >
            Activar plan ahora
          </Link>
        </div>
      )}

      {perfil ? (
        <>
          <div className="flex flex-col items-center mb-4">
            {perfil.avatarUrl ? (
              <img
                src={perfil.avatarUrl}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
                Sin foto
              </div>
            )}
            <p className="text-lg font-medium">{perfil.nombre}</p>
            <p className="text-sm text-gray-600">Edad: {edad}</p>
            {diasRestantes !== null && (
              <p className="text-sm text-orange-600 mt-1">
                🕒 Te quedan <strong>{diasRestantes}</strong> días de prueba gratuita
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Link
              to="/perfil"
              className="bg-blue-100 text-blue-700 p-3 rounded shadow hover:bg-blue-200"
            >
              👤 Perfil
            </Link>
            <Link
              to="/vacunas"
              className="bg-green-100 text-green-700 p-3 rounded shadow hover:bg-green-200"
            >
              💉 Vacunas
            </Link>
            <Link
              to="/desarrollo"
              className="bg-yellow-100 text-yellow-700 p-3 rounded shadow hover:bg-yellow-200"
            >
              🎯 Desarrollo
            </Link>
            <Link
              to="/crecimiento"
              className="bg-purple-100 text-purple-700 p-3 rounded shadow hover:bg-purple-200"
            >
              📈 Crecimiento
            </Link>
          </div>
        </>
      ) : (
        <p className="text-gray-600 mt-6">
          Aún no has registrado un perfil. Ve a la pestaña <Link to="/perfil" className="text-blue-500 underline">Perfil</Link> para comenzar.
        </p>
      )}
    </div>
  )
}
