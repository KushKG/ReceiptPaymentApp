// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiaa9oJnVW51gOdFcvPIbZ248qOPcmyLs",
  authDomain: "payback-1a15a.firebaseapp.com",
  projectId: "payback-1a15a",
  storageBucket: "payback-1a15a.appspot.com",
  messagingSenderId: "804706252141",
  appId: "1:804706252141:web:e8ffecf3fc6668b3215664",
  measurementId: "G-78G0FXQY53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, app, firestore }

