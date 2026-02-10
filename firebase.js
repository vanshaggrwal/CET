// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDY77TBrkXZfjUYUPI4QqBsLLx9Q8KEQY",
  authDomain: "mhtcet-101f8.firebaseapp.com",
  projectId: "mhtcet-101f8",
  storageBucket: "mhtcet-101f8.firebasestorage.app",
  messagingSenderId: "897413625764",
  appId: "1:897413625764:web:0ea2b458fc9a990c6c3331",
  measurementId: "G-JM6HNHE5D9",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);