import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Perfil from "./pages/Perfil"
import Vacunas from "./pages/Vacunas"
import Desarrollo from "./pages/Desarrollo"
import Crecimiento from "./pages/Crecimiento"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import RutaProtegida from "./components/RutaProtegida"
import Laboratorio from "./pages/Laboratorio"


export default function App() {
  return (
    
    <Router>
      <div className="min-h-screen bg-blue-50 font-sans">
        <Navbar />
        <main className="p-4 max-w-4xl mx-auto">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />

            {/* Rutas protegidas */}
            <Route
              path="/"
              element={
                <RutaProtegida>
                  <Home />
                </RutaProtegida>
              }
            />
            <Route
              path="/perfil"
              element={
                <RutaProtegida>
                  <Perfil />
                </RutaProtegida>
              }
            />
            <Route
              path="/vacunas"
              element={
                <RutaProtegida>
                  <Vacunas />
                </RutaProtegida>
              }
            />
            <Route
              path="/desarrollo"
              element={
                <RutaProtegida>
                  <Desarrollo />
                </RutaProtegida>
              }
            />
            <Route
              path="/crecimiento"
              element={
                <RutaProtegida>
                  <Crecimiento />
                </RutaProtegida>
              }
            />
            <Route path="/laboratorio" element={<Laboratorio />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
