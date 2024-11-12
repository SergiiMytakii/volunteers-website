// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKRTNFoiw-vckbF8LroBFkhqxeXqluNVc",
  authDomain: "cherch-od2024.firebaseapp.com",
  projectId: "cherch-od2024",
  storageBucket: "cherch-od2024.firebasestorage.app",
  messagingSenderId: "551770227645",
  appId: "1:551770227645:web:bf46422f31e460545888d4",
  measurementId: "G-PQN6HC54PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);