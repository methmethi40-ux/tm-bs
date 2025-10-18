// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase configuration (you already provided this)
const firebaseConfig = {
  apiKey: "AIzaSyBwf4vaYKo9vWPyF_cWMNVOfKfaxkQJTRg",
  authDomain: "t-m-b-publishers.firebaseapp.com",
  projectId: "t-m-b-publishers",
  storageBucket: "t-m-b-publishers.firebasestorage.app",
  messagingSenderId: "626506743915",
  appId: "1:626506743915:web:1c281bc04fa543e0d5f12e",
  measurementId: "G-CP3046CMP8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default app;
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-TQPWB9SK39"); // replace with your GA Measurement ID
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
