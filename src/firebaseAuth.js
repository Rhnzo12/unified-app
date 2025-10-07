import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { app, db } from "./config";

const auth = getAuth(app);

// Sign Up (creates user in Auth and saves profile in Firestore)
export async function signUp(email, password, profileData = {}) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user profile in Firestore at users/{uid}/profile/main
    await setDoc(doc(db, "users", user.uid, "profile", "main"), {
      name: profileData.name || "",
      birthday: profileData.birthday || "",
      createdAt: new Date().toISOString()
    });

    return user;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
}

// Sign In (returns user from Auth)
export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
}

export { auth };