// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-o054YZC7nPc66uSsgBbQx84LPC3xU2k",
  authDomain: "bcs-yep.firebaseapp.com",
  databaseURL: "https://bcs-yep-default-rtdb.firebaseio.com",
  projectId: "bcs-yep",
  storageBucket: "bcs-yep.firebasestorage.app",
  messagingSenderId: "829930064748",
  appId: "1:829930064748:web:0385ab1f3afd1cfe314149",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore
const auth = getAuth(app); // Authentication

export { db, auth };
