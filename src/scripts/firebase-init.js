// Firebase initialization helper
// ---------------------------------
// 1. Reemplaza los valores del objeto firebaseConfig con los datos de tu proyecto
//    (Firebase Console → Configuración del proyecto → Tus aplicaciones → Web).
// 2. Si aún no tienes una cuenta, crea tu proyecto en https://console.firebase.google.com/
// 3. Este módulo expone `app` y `db` para que otros scripts puedan usar Firestore.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Reemplaza los valores siguientes por los de tu consola de Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyC8CkXMvUDQmaaR8zyfniYMe4waCKF14-A",
    authDomain: "graykids-academy.firebaseapp.com",
    projectId: "graykids-academy",
    storageBucket: "graykids-academy.firebasestorage.app",
    messagingSenderId: "545857776481",
    appId: "1:545857776481:web:959cfcfd698604e095b320",
    measurementId: "G-E7437GSZRJ"
  };

const hasValidConfig = Boolean(
    firebaseConfig &&
    typeof firebaseConfig.apiKey === "string" &&
    !firebaseConfig.apiKey.includes("YOUR_")
);

let app = null;
let db = null;
let auth = null;

if (!hasValidConfig) {
    console.warn("Firebase no está configurado. Edita js/firebase-init.js con tu firebaseConfig.");
} else {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
}

export { app, auth, db, firebaseConfig, hasValidConfig as firebaseConfigured };

