import { Navigate } from "react-router-dom"
import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import * as prueba from "../utils/checkTrialStatus"
console.log("Contenido del archivo:", prueba)

export default function RutaProtegida({ children }) {
  const [user, loading] = useAuthState(auth)
  const [verificando, setVerificando] = useState(true)
  const [activo, setActivo] = useState(true)

  useEffect(() => {
    const verificar = async () => {
      if (user) {
        const estaActivo = await checkTrialStatus()
        setActivo(estaActivo)
      }
      setVerificando(false)
    }
    verificar()
  }, [user])

  if (loading || verificando) return <p className="text-center">Cargando...</p>
  if (!user) return <Navigate to="/login" replace />
  if (!activo) return <Navigate to="/plan" replace />
  return children
}
