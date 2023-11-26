// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nettside-4bb23.firebaseapp.com",
  projectId: "nettside-4bb23",
  storageBucket: "nettside-4bb23.appspot.com",
  messagingSenderId: "471890478077",
  appId: "1:471890478077:web:50915f269935f450bf8f94"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);