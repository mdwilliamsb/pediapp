import { useState } from 'react'
import Tesseract from 'tesseract.js'

export default function Laboratorio() {
  const [imagen, setImagen] = useState(null)
  const [preview, setPreview] = useState(null)
  const [texto, setTexto] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagen(file)
      setPreview(URL.createObjectURL(file))
      setTexto('') // Limpia texto previo
    }
  }

  const procesarOCR = () => {
    if (!imagen) return
    setCargando(true)

    Tesseract.recognize(imagen, 'eng', {
      logger: m => console.log(m)
    }).then(({ data: { text } }) => {
      setTexto(text)
      setCargando(false)
    }).catch(() => {
      setTexto('Error al leer la imagen.')
      setCargando(false)
    })
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Captura de estudio</h2>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleUpload}
        className="mb-4"
      />

      {preview && (
        <>
          <img src={preview} alt="captura" className="w-full rounded shadow mb-4" />
          <button
            onClick={procesarOCR}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Procesar imagen
          </button>
        </>
      )}

      {cargando && (
        <p className="mt-4 text-sm text-gray-600">Procesando imagen...</p>
      )}

      {texto && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Texto extraído:</p>
          <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">{texto}</pre>
        </div>
      )}
    </div>
  )
}
