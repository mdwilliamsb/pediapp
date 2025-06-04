import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

const links = [
  { to: "/", label: "Inicio" },
  { to: "/perfil", label: "Perfil" },
  { to: "/vacunas", label: "Vacunas" },
  { to: "/desarrollo", label: "Desarrollo" },
  { to: "/crecimiento", label: "Crecimiento" },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const [nombre, setNombre] = useState("")

  useEffect(() => {
    const perfil = localStorage.getItem("perfil")
    if (perfil) {
      const { nombre } = JSON.parse(perfil)
      setNombre(nombre)
    }
  }, [])

  const cerrarSesion = async () => {
    await signOut(auth)
    localStorage.removeItem("perfil")
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Título */}
          <h1 className="text-xl font-bold text-blue-700">PediApp</h1>

          {/* Links de navegación siempre visibles */}
          <div className="flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.to
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Zona de usuario (condicional) */}
          {user && (
            <div className="flex items-center space-x-3">
              {nombre && (
                <span className="hidden sm:inline text-sm text-blue-800 font-medium">
                  👶 {nombre}
                </span>
              )}
              <button
                onClick={cerrarSesion}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
