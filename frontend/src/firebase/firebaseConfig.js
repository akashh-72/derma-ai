// Firebase Configuration & Initialization for DermaAI
// Project: skin-disease-detection-59480

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAGuVkAxjaVjRtQUz3rOWFWXgLuCcdwY8I",
  authDomain: "skin-disease-detection-59480.firebaseapp.com",
  databaseURL: "https://skin-disease-detection-59480-default-rtdb.firebaseio.com",
  projectId: "skin-disease-detection-59480",
  storageBucket: "skin-disease-detection-59480.firebasestorage.app",
  messagingSenderId: "1064317183942",
  appId: "1:1064317183942:web:be596597bcd54e802d74c7"
};

// Initialize Firebase app singleton
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase Auth Service
export const auth = getAuth(app);

// Cloud Firestore Database
export const db = getFirestore(app);

// Realtime Database
export const rtdb = getDatabase(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default app;
