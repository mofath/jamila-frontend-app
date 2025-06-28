import { initializeApp, getApps, setLogLevel, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDc4iPR32e2U3BdrR3BbC8o4tVPN68FX70",
  authDomain: "jamila-9f11a.firebaseapp.com",
  projectId: "jamila-9f11a",
  storageBucket: "jamila-9f11a.firebasestorage.app",
  messagingSenderId: "634816672648",
  appId: "1:634816672648:web:0a3bed08e34024913b003d",
  measurementId: "G-HBMKN0S9MP",
};

let firebaseApp: FirebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  console.log("✅ Firebase initialized:", firebaseApp.name);
} else {
  firebaseApp = getApps()[0];
  console.log("ℹ️ Firebase already initialized:", firebaseApp.name);
}

let firebaseDb: Firestore; // ✅ Explicitly typed

try {
  firebaseDb = getFirestore(firebaseApp);
  console.log("✅ Firestore connection established successfully");
} catch (error) {
  console.error("❌ Failed to connect to Firestore:", error);
}

const auth = getAuth(firebaseApp);
setLogLevel("debug"); // 👈 Add this right after getAuth()

export { firebaseApp, firebaseDb, auth };
