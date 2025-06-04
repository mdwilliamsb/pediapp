// src/firebase.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Tu configuración (¡mantén tus datos!)
const firebaseConfig = {
  apiKey: "AIzaSyCbpSG6KtjtAVCQZwND_LoveOKOaD5uDH4",
  authDomain: "tupediatraapp.firebaseapp.com",
  projectId: "tupediatraapp",
  storageBucket: "tupediatraapp.appspot.com",
  messagingSenderId: "282216299881",
  appId: "1:282216299881:web:f660c20586250aba8b91f8",
  measurementId: "G-SVQW29S8NZ"
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig)

// Exporta los módulos que usaremos
export const auth = getAuth(app)
export const db = getFirestore(app)
