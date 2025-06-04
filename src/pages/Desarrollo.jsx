export default function Desarrollo() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Hitos del Desarrollo</h2>
      <p className="text-gray-700 mb-4">
        Aquí podrás registrar y consultar los hitos del desarrollo de tu hijo, como:
      </p>

      <ul className="list-disc pl-6 text-gray-600">
        <li>✅ Sostiene la cabeza (2-3 meses)</li>
        <li>🧍 Se sienta sin apoyo (6 meses)</li>
        <li>🚶 Camina solo (12-15 meses)</li>
        <li>🗣 Dice 2 palabras con significado (18 meses)</li>
        <li>🧠 Imita acciones complejas (24 meses)</li>
        {/* Agrega más según edad */}
      </ul>

      <p className="mt-4 text-sm text-gray-500">
        *Este seguimiento se basa en guías de neurodesarrollo pediátrico. 
        Recuerda que cada niño tiene su ritmo único.
      </p>
    </div>
  )
}
