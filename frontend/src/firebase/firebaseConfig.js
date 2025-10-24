// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMyAVbOZsiMfPU_svPoRpEQQJTeTD6OuY",
  authDomain: "civicconnect-54f84.firebaseapp.com",
  projectId: "civicconnect-54f84",
  storageBucket: "civicconnect-54f84.firebasestorage.app",
  messagingSenderId: "857047046621",
  appId: "1:857047046621:web:e0e67e5540b113ae053e34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
