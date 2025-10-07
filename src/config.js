// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBInOCYaK4136v0YWbwVwxpPd8WOwBoMoI",
  authDomain: "unified-app-d0f08.firebaseapp.com",
  projectId: "unified-app-d0f08",
  storageBucket: "unified-app-d0f08.appspot.com",
  messagingSenderId: "635751576853",
  appId: "1:635751576853:web:bb3b5836c38781ca7aa51c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
