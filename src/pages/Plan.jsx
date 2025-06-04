import { useNavigate } from 'react-router-dom'

export default function Plan() {
  const navigate = useNavigate()

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg text-center">
      <h2 className="text-2xl font-semibold text-red-700 mb-4">Tu prueba ha finalizado</h2>
      <p className="text-gray-700 mb-4">
        Has disfrutado de 7 días gratuitos usando PediApp. Para continuar usando la aplicación, activa tu plan premium.
      </p>

      <div className="mb-6">
        <p className="text-lg font-medium mb-2 text-green-600">Beneficios:</p>
        <ul className="list-disc list-inside text-left text-sm text-gray-600">
          <li>Seguimiento completo del crecimiento</li>
          <li>Esquema de vacunación interactivo</li>
          <li>Estimulación temprana personalizada</li>
          <li>Resumen en PDF y almacenamiento seguro</li>
        </ul>
      </div>

      <button
        onClick={() => alert('⚠️ Aquí se integrará Stripe o la tienda de apps')}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-3"
      >
        Activar Plan
      </button>

      <button
        onClick={() => navigate('/login')}
        className="w-full text-sm text-blue-600 underline mt-2"
      >
        Volver a iniciar sesión
      </button>
    </div>
  )
}
