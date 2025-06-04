import { useEffect, useState } from 'react'

export default function Perfil() {
  const [nombre, setNombre] = useState('')
  const [nacimiento, setNacimiento] = useState('')
  const [sexo, setSexo] = useState('Masculino')
  const [alergias, setAlergias] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [edadTexto, setEdadTexto] = useState('')
  const [peso, setPeso] = useState('')
  const [talla, setTalla] = useState('')
  const [pc, setPc] = useState('')
  const [imc, setImc] = useState(null)
  const [estadoNutricional, setEstadoNutricional] = useState('')
  const [tallaPadre, setTallaPadre] = useState('')
  const [tallaMadre, setTallaMadre] = useState('')
  const [tallaBlanco, setTallaBlanco] = useState(null)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('perfil'))
    if (data) {
      setNombre(data.nombre)
      setNacimiento(data.nacimiento)
      setSexo(data.sexo)
      setAlergias(data.alergias)
      setAvatarUrl(data.avatarUrl)
      setPeso(data.peso || '')
      setTalla(data.talla || '')
      setPc(data.pc || '')
      setTallaPadre(data.tallaPadre || '')
      setTallaMadre(data.tallaMadre || '')
      calcularTodo(data.nacimiento, data.peso, data.talla, data.tallaPadre, data.tallaMadre)
    }
  }, [])

  const calcularEdadTexto = (fecha) => {
    if (!fecha) return ''
    const nacimiento = new Date(fecha)
    const hoy = new Date()
    const años = hoy.getFullYear() - nacimiento.getFullYear()
    const meses = hoy.getMonth() - nacimiento.getMonth()
    return `${años} años y ${meses < 0 ? meses + 12 : meses} meses`
  }

  const calcularIMC = (peso, talla) => {
    if (!peso || !talla) return null
    const talla_m = parseFloat(talla) / 100
    return (parseFloat(peso) / (talla_m * talla_m)).toFixed(2)
  }

  const clasificarIMC = (imc) => {
    if (!imc) return ''
    const i = parseFloat(imc)
    if (i < 14) return 'Bajo peso 🔴'
    if (i >= 14 && i <= 18) return 'Peso adecuado 🟢'
    if (i > 18) return 'Sobrepeso ⚠️'
    return ''
  }

  const calcularTallaBlanco = (padre, madre, sexo) => {
    if (!padre || !madre) return null
    const p = parseFloat(padre)
    const m = parseFloat(madre)
    return sexo === 'Masculino'
      ? (((m + p) + 13) / 2).toFixed(1)
      : (((m + p) - 13) / 2).toFixed(1)
  }

  const calcularTodo = (nac, p, t, tp, tm) => {
    setEdadTexto(calcularEdadTexto(nac))
    const nuevoIMC = calcularIMC(p, t)
    setImc(nuevoIMC)
    setEstadoNutricional(clasificarIMC(nuevoIMC))
    const tallaB = calcularTallaBlanco(tp, tm, sexo)
    setTallaBlanco(tallaB)
  }

  const handleSave = () => {
    const perfil = { nombre, nacimiento, sexo, alergias, avatarUrl, peso, talla, pc, tallaPadre, tallaMadre }
    localStorage.setItem('perfil', JSON.stringify(perfil))
    calcularTodo(nacimiento, peso, talla, tallaPadre, tallaMadre)
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

      {/* Avatar */}
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

      {/* Datos */}
      <label className="text-sm text-gray-600">Nombre</label>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-2 border mb-3 rounded" />

      <label className="text-sm text-gray-600">Fecha de nacimiento</label>
      <input type="date" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} className="w-full p-2 border mb-3 rounded" />

      <label className="text-sm text-gray-600">Sexo</label>
      <select value={sexo} onChange={(e) => setSexo(e.target.value)} className="w-full p-2 border mb-3 rounded">
        <option>Masculino</option>
        <option>Femenino</option>
      </select>

      <label className="text-sm text-gray-600">Alergias</label>
      <input value={alergias} onChange={(e) => setAlergias(e.target.value)} className="w-full p-2 border mb-3 rounded" />

      <label className="text-sm text-gray-600">Peso (kg)</label>
      <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} className="w-full p-2 border mb-3 rounded" />

      <label className="text-sm text-gray-600">Talla (cm)</label>
      <input type="number" value={talla} onChange={(e) => setTalla(e.target.value)} className="w-full p-2 border mb-3 rounded" />

      <label className="text-sm text-gray-600">Perímetro cefálico (cm)</label>
      <input type="number" value={pc} onChange={(e) => setPc(e.target.value)} className="w-full p-2 border mb-3 rounded" />

      <label className="text-sm text-gray-600">Talla del padre (cm)</label>
      <input type="number" value={tallaPadre} onChange={(e) => setTallaPadre(e.target.value)} className="w-full p-2 border mb-3 rounded" />

      <label className="text-sm text-gray-600">Talla de la madre (cm)</label>
      <input type="number" value={tallaMadre} onChange={(e) => setTallaMadre(e.target.value)} className="w-full p-2 border mb-3 rounded" />

      {/* Resultado */}
      {nacimiento && (
        <div className="bg-blue-50 p-4 mt-4 rounded shadow-inner">
          <p className="text-green-600 mb-2"><strong>Edad:</strong> {edadTexto}</p>
          {imc && <p><strong>IMC:</strong> {imc}</p>}
          {estadoNutricional && <p><strong>Estado nutricional:</strong> {estadoNutricional}</p>}
          {tallaBlanco && <p><strong>Talla blanco familiar:</strong> {tallaBlanco} cm</p>}
        </div>
      )}

      <button onClick={handleSave} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded">
        Guardar Perfil
      </button>
    </div>
  )
}


// perfil FUNCIONAL 
// import { useEffect, useState } from 'react'

// export default function Perfil() {
//   const [nombre, setNombre] = useState('')
//   const [nacimiento, setNacimiento] = useState('')
//   const [sexo, setSexo] = useState('Masculino')
//   const [alergias, setAlergias] = useState('')
//   const [avatarUrl, setAvatarUrl] = useState('')
//   const [edad, setEdad] = useState('')

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem('perfil'))
//     if (data) {
//       setNombre(data.nombre)
//       setNacimiento(data.nacimiento)
//       setSexo(data.sexo)
//       setAlergias(data.alergias)
//       setAvatarUrl(data.avatarUrl)
//       setEdad(calcularEdad(data.nacimiento))
//     }
//   }, [])

//   const calcularEdad = (fecha) => {
//     if (!fecha) return ''
//     const nacimiento = new Date(fecha)
//     const hoy = new Date()
//     const años = hoy.getFullYear() - nacimiento.getFullYear()
//     const meses = hoy.getMonth() - nacimiento.getMonth()
//     return `${años} años y ${meses < 0 ? meses + 12 : meses} meses`
//   }

//   const handleSave = () => {
//     const perfil = { nombre, nacimiento, sexo, alergias, avatarUrl }
//     localStorage.setItem('perfil', JSON.stringify(perfil))
//     setEdad(calcularEdad(nacimiento))
//     alert('✅ Perfil guardado')
//   }

//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => setAvatarUrl(reader.result)
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4 text-blue-700">Perfil del Niño 👶</h2>

//       <div className="flex flex-col items-center mb-4">
//         <label className="text-sm text-gray-600 mb-1">Foto de perfil</label>
//         {avatarUrl ? (
//           <img src={avatarUrl} className="w-24 h-24 rounded-full object-cover mb-2" alt="avatar" />
//         ) : (
//           <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
//             Sin foto
//           </div>
//         )}
//         <input type="file" accept="image/*" onChange={handleAvatarChange} className="text-sm" />
//       </div>

//       <label className="text-sm text-gray-600">Nombre</label>
//       <input
//         type="text"
//         value={nombre}
//         onChange={(e) => setNombre(e.target.value)}
//         className="w-full p-2 border mb-3 rounded"
//       />

//       <label className="text-sm text-gray-600">Fecha de nacimiento</label>
//       <input
//         type="date"
//         value={nacimiento}
//         onChange={(e) => setNacimiento(e.target.value)}
//         className="w-full p-2 border mb-3 rounded"
//       />

//       <label className="text-sm text-gray-600">Sexo</label>
//       <select
//         value={sexo}
//         onChange={(e) => setSexo(e.target.value)}
//         className="w-full p-2 border mb-3 rounded"
//       >
//         <option>Masculino</option>
//         <option>Femenino</option>
//       </select>

//       <label className="text-sm text-gray-600">Alergias</label>
//       <input
//         type="text"
//         value={alergias}
//         onChange={(e) => setAlergias(e.target.value)}
//         className="w-full p-2 border mb-3 rounded"
//       />

//       {nacimiento && (
//         <p className="text-green-600 mb-4">
//           Edad actual: <strong>{edad}</strong>
//         </p>
//       )}

//       <button
//         onClick={handleSave}
//         className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded"
//       >
//         Guardar Perfil
//       </button>
//     </div>
//   )
// }
