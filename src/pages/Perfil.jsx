import { useEffect, useState } from 'react'

export default function Perfil() {
  const [nombre, setNombre] = useState('')
  const [nacimiento, setNacimiento] = useState('')
  const [sexo, setSexo] = useState('Masculino')
  const [alergias, setAlergias] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [edad, setEdad] = useState('')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('perfil'))
    if (data) {
      setNombre(data.nombre)
      setNacimiento(data.nacimiento)
      setSexo(data.sexo)
      setAlergias(data.alergias)
      setAvatarUrl(data.avatarUrl)
      setEdad(calcularEdad(data.nacimiento))
    }
  }, [])

  const calcularEdad = (fecha) => {
    if (!fecha) return ''
    const nacimiento = new Date(fecha)
    const hoy = new Date()
    const años = hoy.getFullYear() - nacimiento.getFullYear()
    const meses = hoy.getMonth() - nacimiento.getMonth()
    return `${años} años y ${meses < 0 ? meses + 12 : meses} meses`
  }

  const handleSave = () => {
    const perfil = { nombre, nacimiento, sexo, alergias, avatarUrl }
    localStorage.setItem('perfil', JSON.stringify(perfil))
    setEdad(calcularEdad(nacimiento))
    alert('✅ Perfil guardado')
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setAvatarUrl(reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Perfil del Niño 👶</h2>

      <div className="flex flex-col items-center mb-4">
        <label className="text-sm text-gray-600 mb-1">Foto de perfil</label>
        {avatarUrl ? (
          <img src={avatarUrl} className="w-24 h-24 rounded-full object-cover mb-2" alt="avatar" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
            Sin foto
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm" />
      </div>

      <label className="text-sm text-gray-600">Nombre</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
      />

      <label className="text-sm text-gray-600">Fecha de nacimiento</label>
      <input
        type="date"
        value={nacimiento}
        onChange={(e) => setNacimiento(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
      />

      <label className="text-sm text-gray-600">Sexo</label>
      <select
        value={sexo}
        onChange={(e) => setSexo(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
      >
        <option>Masculino</option>
        <option>Femenino</option>
      </select>

      <label className="text-sm text-gray-600">Alergias</label>
      <input
        type="text"
        value={alergias}
        onChange={(e) => setAlergias(e.target.value)}
        className="w-full p-2 border mb-3 rounded"
      />

      {nacimiento && (
        <p className="text-green-600 mb-4">
          Edad actual: <strong>{edad}</strong>
        </p>
      )}

      <button
        onClick={handleSave}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded"
      >
        Guardar Perfil
      </button>
    </div>
  )
}
