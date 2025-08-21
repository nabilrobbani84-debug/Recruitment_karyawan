// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { auth } from '../app/lib/firebase'; // Adjust path as needed
import { onAuthStateChanged, User } from 'firebase/auth';

// Custom hook for managing authentication state
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set up the auth state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // When the auth state is resolved, stop loading
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to log out the user
  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null); // Clear user after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { user, loading, logout };
};
