// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAY9McyYyHXNOUsRjjVLw88tYM8GorQ-D0",
  authDomain: "financely-rec-48e26.firebaseapp.com",
  projectId: "financely-rec-48e26",
  storageBucket: "financely-rec-48e26.appspot.com",
  messagingSenderId: "192668650295",
  appId: "1:192668650295:web:77136020b5ea3b8f8628b2",
  measurementId: "G-MKSVGLWW2Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider, doc, setDoc };
