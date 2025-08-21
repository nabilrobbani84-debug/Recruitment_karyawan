import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

// Firebase configuration (replace with your Firebase project's config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

// Export methods
export { auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail };
