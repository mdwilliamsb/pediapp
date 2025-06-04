import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebase"
import { TRIAL_DIAS, MODO_GRATUITO_ACTIVO } from "../config"

export const checkTrialStatus = async () => {
  const user = auth.currentUser
  if (!user) return false

  if (!MODO_GRATUITO_ACTIVO) return true // omitir control si está desactivado

  const userRef = doc(db, "usuarios", user.uid)
  const docSnap = await getDoc(userRef)

  if (!docSnap.exists()) return false

  const fechaAlta = docSnap.data().fechaAlta?.toDate()
  const hoy = new Date()
  const diff = (hoy - fechaAlta) / (1000 * 60 * 60 * 24) // días

  return diff <= TRIAL_DIAS
}
