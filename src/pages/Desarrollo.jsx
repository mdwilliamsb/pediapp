import { useState, useEffect } from "react"

const hitosPorEdad = [
  {
    edad: "0–3 meses",
    items: [
      "Sostiene la cabeza brevemente en prono",
      "Sonríe socialmente",
      "Fija la mirada en objetos"
    ]
  },
  {
    edad: "4–6 meses",
    items: [
      "Gira de boca arriba a boca abajo",
      "Emite sonidos tipo gorjeo",
      "Sostiene objetos con ambas manos"
    ]
  },
  {
    edad: "7–9 meses",
    items: [
      "Se sienta sin apoyo",
      "Balbucea sonidos consonánticos",
      "Pasa objetos de una mano a otra"
    ]
  },
  {
    edad: "10–12 meses",
    items: [
      "Camina con apoyo",
      "Dice al menos 1 palabra con sentido",
      "Hace gestos como adiós o aplaudir"
    ]
  },
  {
    edad: "13–18 meses",
    items: [
      "Camina solo",
      "Señala lo que quiere",
      "Usa al menos 5 palabras"
    ]
  }
]

export default function Desarrollo() {
  const [progreso, setProgreso] = useState({})

  useEffect(() => {
    const guardado = localStorage.getItem("desarrollo")
    if (guardado) {
      setProgreso(JSON.parse(guardado))
    }
  }, [])

  const toggleHito = (grupo, item) => {
    const actualizado = {
      ...progreso,
      [grupo]: {
        ...progreso[grupo],
        [item]: !progreso[grupo]?.[item]
      }
    }
    setProgreso(actualizado)
    localStorage.setItem("desarrollo", JSON.stringify(actualizado))
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">🧠 Hitos del Desarrollo</h2>
      <p className="text-gray-700 mb-6">
        Marca los logros que tu hijo ha alcanzado. Esto te ayudará a seguir su desarrollo y detectar señales de atención temprana.
      </p>

      {hitosPorEdad.map(({ edad, items }) => (
        <div key={edad} className="mb-6">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">{edad}</h3>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={progreso[edad]?.[item] || false}
                  onChange={() => toggleHito(edad, item)}
                />
                <span
                  className={`${
                    progreso[edad]?.[item] ? "text-green-700 line-through" : "text-gray-800"
                  }`}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="text-sm text-gray-500 mt-6">
        *Estos hitos están basados en guías internacionales. Cada niño tiene su propio ritmo. Si hay dudas, consulta con tu pediatra.
      </p>
    </div>
  )
}
