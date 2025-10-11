import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwf4vaYKo9vWPyF_cWMNVOfKfaxkQJTRg",
  authDomain: "t-m-b-publishers.firebaseapp.com",
  projectId: "t-m-b-publishers",
  storageBucket: "t-m-b-publishers.firebasestorage.app",
  messagingSenderId: "626506743915",
  appId: "1:626506743915:web:1c281bc04fa543e0d5f12e",
  measurementId: "G-CP3046CMP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // 👈 VERY IMPORTANT

// Export them
export { auth, db, storage };
