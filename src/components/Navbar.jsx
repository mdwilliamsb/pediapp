import { Link, useLocation } from "react-router-dom"

const links = [
  { to: "/", label: "Inicio" },
  { to: "/perfil", label: "Perfil" },
  { to: "/vacunas", label: "Vacunas" },
  { to: "/desarrollo", label: "Desarrollo" },
  { to: "/crecimiento", label: "Crecimiento" },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-blue-700">PediApp</h1>
          <div className="flex space-x-4">
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
        </div>
      </div>
    </nav>
  )
}
