import { initializeApp, getApps, setLogLevel, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.REACT_APP_FIREBASE_APP_ID!,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID!,
};

let firebaseApp: FirebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  console.log("Firebase initialized:", firebaseApp.name);
} else {
  firebaseApp = getApps()[0];
  console.log("ℹFirebase already initialized:", firebaseApp.name);
}

let firebaseDb: Firestore;

try {
  firebaseDb = getFirestore(firebaseApp);
  console.log("Firestore connection established successfully");
} catch (error) {
  console.error("Failed to connect to Firestore:", error);
}

const auth = getAuth(firebaseApp);
setLogLevel("debug");

export { firebaseApp, firebaseDb, auth };
