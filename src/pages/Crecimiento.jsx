import { useEffect, useState, useRef } from 'react'
import { Chart } from 'chart.js/auto'

export default function Crecimiento() {
  const [registros, setRegistros] = useState([])
  const [nuevoRegistro, setNuevoRegistro] = useState({
    fecha: '',
    peso: '',
    talla: ''
  })

  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('crecimiento') || '[]')
    setRegistros(datosGuardados)
  }, [])

  useEffect(() => {
    if (!chartRef.current) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')

    // 🔁 Ordenar los registros por fecha antes de graficar
    const registrosOrdenados = [...registros].sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    )

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: registrosOrdenados.map(r => formatearFecha(r.fecha)),
        datasets: [
          {
            label: 'Peso (kg)',
            data: registrosOrdenados.map(r => parseFloat(r.peso)),
            borderColor: '#4caf50',
            backgroundColor: '#a5d6a7',
            tension: 0.3
          },
          {
            label: 'Talla (cm)',
            data: registrosOrdenados.map(r => parseFloat(r.talla)),
            borderColor: '#2196f3',
            backgroundColor: '#90caf9',
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Valor' }
          }
        }
      }
    })
  }, [registros])

  const formatearFecha = (fechaStr) => {
    const opciones = { day: '2-digit', month: 'short', year: 'numeric' }
    return new Date(fechaStr).toLocaleDateString('es-MX', opciones)
  }

  const guardarRegistro = (e) => {
    e.preventDefault()
    const actualizado = [...registros, nuevoRegistro]
    localStorage.setItem('crecimiento', JSON.stringify(actualizado))
    setRegistros(actualizado)
    setNuevoRegistro({ fecha: '', peso: '', talla: '' })
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">Crecimiento</h2>

      <form onSubmit={guardarRegistro} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          value={nuevoRegistro.fecha}
          onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, fecha: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Peso (kg)"
          value={nuevoRegistro.peso}
          onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, peso: e.target.value })}
          className="p-2 border rounded"
          step="0.01"
          required
        />
        <input
          type="number"
          placeholder="Talla (cm)"
          value={nuevoRegistro.talla}
          onChange={(e) => setNuevoRegistro({ ...nuevoRegistro, talla: e.target.value })}
          className="p-2 border rounded"
          step="0.1"
          required
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Agregar registro
        </button>
      </form>

      <canvas ref={chartRef} height="100"></canvas>
    </div>
  )
}
