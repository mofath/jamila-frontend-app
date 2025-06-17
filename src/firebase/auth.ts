// src/firebase/auth.ts
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseDb } from "./firebaseApp";

export async function createUserProfileIfNotExist(
  uid: string,
  username: string,
  email: string,
  phone: string
) {
  const userRef = doc(firebaseDb, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      username,
      email,
      phone,
      createdAt: new Date().toISOString()
    });
    console.log("✅ New user profile created");
  } else {
    console.log("ℹ️ User already exists");
  }
}
