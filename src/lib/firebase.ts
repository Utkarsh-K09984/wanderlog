// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgKJ6BnBf0kI8s5FK1R-DgZJNU_RGVfps",
  authDomain: "wanderlog-1e0bb.firebaseapp.com",
  projectId: "wanderlog-1e0bb",
  storageBucket: "wanderlog-1e0bb.firebasestorage.app",
  messagingSenderId: "198600387357",
  appId: "1:198600387357:web:1a4c99a3a72026b3158ff4",
  measurementId: "G-TL7P0V5MHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth   = getAuth(app);
const googleprovider = new GoogleAuthProvider();

export {auth,googleprovider};