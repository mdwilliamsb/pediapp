import { Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [user] = useAuthState(auth)
  const [nombre, setNombre] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const perfilGuardado = localStorage.getItem("perfil")
    if (perfilGuardado) {
      const perfil = JSON.parse(perfilGuardado)
      setNombre(perfil.nombre || "")
    }
  }, [])

  const cerrarSesion = async () => {
    await signOut(auth)
    localStorage.removeItem("perfil")
    navigate("/login")
  }

  return (
    <nav className="bg-blue-600 text-white py-3 px-6 flex items-center justify-between shadow">
      <Link to="/" className="text-lg font-semibold tracking-wide">
        PediApp
      </Link>

      {user && (
        <div className="flex items-center space-x-4">
          {nombre && <span className="hidden sm:inline text-sm">👶 {nombre}</span>}

          <button
            onClick={cerrarSesion}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 text-sm"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </nav>
  )
}
