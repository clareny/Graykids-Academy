// Firebase initialization helper
// ---------------------------------
// 1. Reemplaza los valores del objeto firebaseConfig con los datos de tu proyecto
//    (Firebase Console → Configuración del proyecto → Tus aplicaciones → Web).
// 2. Si aún no tienes una cuenta, crea tu proyecto en https://console.firebase.google.com/
// 3. Este módulo expone `app` y `db` para que otros scripts puedan usar Firestore.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Reemplaza los valores siguientes por los de tu consola de Firebase.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_AUTH_DOMAIN_HERE",
    projectId: "YOUR_PROJECT_ID_HERE",
    storageBucket: "YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
    appId: "YOUR_APP_ID_HERE"
    // Si usas Realtime Database agrega: databaseURL: "https://<tu-project-id>.firebaseio.com"
};

const hasValidConfig = Boolean(
    firebaseConfig &&
    typeof firebaseConfig.apiKey === "string" &&
    !firebaseConfig.apiKey.includes("YOUR_")
);

let app = null;
let db = null;

if (!hasValidConfig) {
    console.warn("Firebase no está configurado. Edita js/firebase-init.js con tu firebaseConfig.");
} else {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
}

export { app, db, hasValidConfig as firebaseConfigured };

