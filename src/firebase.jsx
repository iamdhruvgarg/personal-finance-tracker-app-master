// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNuZiiCUsi80X0a8NPybBZRUkYBplRPTk",
  authDomain: "personal-finance-tracker-40d00.firebaseapp.com",
  databaseURL: "https://personal-finance-tracker-40d00-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "personal-finance-tracker-40d00",
  storageBucket: "personal-finance-tracker-40d00.firebasestorage.app",
  messagingSenderId: "645400864022",
  appId: "1:645400864022:web:5cfc764cd58a7f7abf1c37",
  measurementId: "G-PCQ8XXVE9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider, doc, setDoc };


