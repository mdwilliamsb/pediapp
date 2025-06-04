import { useEffect, useState, useRef } from 'react'
import html2pdf from 'html2pdf.js'

export default function Resumen() {
  const [perfil, setPerfil] = useState(null)
  const [edad, setEdad] = useState('')
  const [vacunas, setVacunas] = useState({})
  const [crecimiento, setCrecimiento] = useState([])
  const pdfRef = useRef()

  useEffect(() => {
    const perfilData = JSON.parse(localStorage.getItem('perfil'))
    const vacunasData = JSON.parse(localStorage.getItem('vacunas'))
    const crecimientoData = JSON.parse(localStorage.getItem('crecimiento'))

    if (perfilData) {
      setPerfil(perfilData)
      setEdad(calcularEdad(perfilData.nacimiento))
    }
    if (vacunasData) setVacunas(vacunasData)
    if (crecimientoData) setCrecimiento(crecimientoData)
  }, [])

  const calcularEdad = (fecha) => {
    if (!fecha) return ''
    const nacimiento = new Date(fecha)
    const hoy = new Date()
    const años = hoy.getFullYear() - nacimiento.getFullYear()
    const meses = hoy.getMonth() - nacimiento.getMonth()
    return `${años} años y ${meses < 0 ? meses + 12 : meses} meses`
  }

  const contarVacunas = () => {
    const total = Object.keys(vacunas).length
    const aplicadas = Object.values(vacunas).filter(v => v).length
    return { total, aplicadas, pendientes: total - aplicadas }
  }

  const calcularIMC = () => {
    if (crecimiento.length === 0) return null
    const ultimo = crecimiento[crecimiento.length - 1]
    return (ultimo.peso / ((ultimo.talla / 100) ** 2)).toFixed(1)
  }

  const exportarPDF = () => {
    html2pdf().from(pdfRef.current).set({
      margin: 0.5,
      filename: 'resumen_pediapp.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {},
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }).save()
  }

  const vacunasTotales = contarVacunas()
  const imc = calcularIMC()

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg">
      <div ref={pdfRef}>
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Resumen General 🧾</h2>
        {perfil ? (
          <>
            <p><strong>Nombre:</strong> {perfil.nombre}</p>
            <p><strong>Edad:</strong> {edad}</p>
            <p><strong>Sexo:</strong> {perfil.sexo}</p>
            <p><strong>Alergias:</strong> {perfil.alergias || 'Ninguna'}</p>

            <div className="my-4">
              <h3 className="font-semibold text-green-700 mb-1">Último registro de crecimiento:</h3>
              {crecimiento.length > 0 ? (
                <>
                  <p><strong>Peso:</strong> {crecimiento.at(-1).peso} kg</p>
                  <p><strong>Talla:</strong> {crecimiento.at(-1).talla} cm</p>
                  <p><strong>IMC:</strong> {imc}</p>
                </>
              ) : (
                <p className="text-gray-500">Sin datos registrados.</p>
              )}
            </div>

            <div className="my-4">
              <h3 className="font-semibold text-purple-700 mb-1">Estado de vacunación:</h3>
              <p>Aplicadas: {vacunasTotales.aplicadas}</p>
              <p>Pendientes: {vacunasTotales.pendientes}</p>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No hay perfil guardado.</p>
        )}
      </div>

      <button
        onClick={exportarPDF}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Exportar como PDF
      </button>
    </div>
  )
}
