// Firebase configuration for React
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
  console.warn("Firebase no está configurado. Edita src/config/firebase.js con tu firebaseConfig.");
} else {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
}

export { app, auth, db, firebaseConfig, hasValidConfig as firebaseConfigured };

