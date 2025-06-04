import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Layout from "./components/Layout"

import Home from "./pages/Home"
import Perfil from "./pages/Perfil"
import Vacunas from "./pages/Vacunas"
import Desarrollo from "./pages/Desarrollo"
import Crecimiento from "./pages/Crecimiento"
import Laboratorio from "./pages/Laboratorio"
import Login from "./pages/Login"
import Registro from "./pages/Registro"

import RutaProtegida from "./components/RutaProtegida"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas protegidas con Layout */}
        <Route
          path="/"
          element={
            <RutaProtegida>
              <Layout>
                <Home />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Layout>
                <Perfil />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/vacunas"
          element={
            <RutaProtegida>
              <Layout>
                <Vacunas />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/desarrollo"
          element={
            <RutaProtegida>
              <Layout>
                <Desarrollo />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/crecimiento"
          element={
            <RutaProtegida>
              <Layout>
                <Crecimiento />
              </Layout>
            </RutaProtegida>
          }
        />
        <Route
          path="/laboratorio"
          element={
            <RutaProtegida>
              <Layout>
                <Laboratorio />
              </Layout>
            </RutaProtegida>
          }
        />
      </Routes>
    </Router>
  )
}
