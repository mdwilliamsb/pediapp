import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebase"
import { TRIAL_DIAS } from "../config"

export const getDiasRestantes = async () => {
  const user = auth.currentUser
  if (!user) return null

  const ref = doc(db, "usuarios", user.uid)
  const snap = await getDoc(ref)

  if (!snap.exists()) return null

  const fechaAlta = snap.data().fechaAlta?.toDate()
  const hoy = new Date()
  const diasTranscurridos = Math.floor((hoy - fechaAlta) / (1000 * 60 * 60 * 24))

  return Math.max(0, TRIAL_DIAS - diasTranscurridos)
}
