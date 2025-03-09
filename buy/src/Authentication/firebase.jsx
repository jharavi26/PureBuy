// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCEHtPIsGLuDrRLDHDC1_nYt8tr_FqCJo",
  authDomain: "login-auth-456c3.firebaseapp.com",
  projectId: "login-auth-456c3",
  storageBucket: "login-auth-456c3.firebasestorage.app",
  messagingSenderId: "809981143060",
  appId: "1:809981143060:web:837c85907e19d1e3745f01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(); 
export const db=getFirestore(app);
export default app;

