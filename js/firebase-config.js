import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCX2EB0a1pVSEATWC2EnGG_fH93ATs36gs",
  authDomain: "quiet-museum.firebaseapp.com",
  projectId: "quiet-museum",
  storageBucket: "quiet-museum.firebasestorage.app",
  messagingSenderId: "1018544788576",
  appId: "1:1018544788576:web:8e2cdb5c674930c1701f05",
  measurementId: "G-14H6NBLN8P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, firebaseConfig };
