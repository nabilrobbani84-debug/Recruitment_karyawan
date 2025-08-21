'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { authService } from '@/services/authService';

// Tipe untuk data pengguna (tidak ada perubahan)
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'employer' | 'admin';
}

// Tipe untuk data registrasi (tidak ada perubahan)
export interface RegisterData {
  fullName: string;
  email: string;
  password_UNSAFE: string;
  accountType: 'candidate' | 'employer';
}

// --- PERBAIKAN DI SINI ---
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  // Diubah agar Promise mengembalikan tipe User
  login: (email: string, pass: string) => Promise<User>; 
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        console.log("Checking user session (placeholder)...");
      } catch (err) {
        console.error("Error checking user session:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, []);

  // --- PERBAIKAN DI SINI ---
  // Fungsi ini sekarang akan me-return 'Promise<User>'
  const login = async (email: string, pass: string): Promise<User> => {
    setIsLoading(true);
    try {
      // TODO: Ganti dengan implementasi login backend sesungguhnya
      console.log("Login process (placeholder)...", { email, pass });

      // Placeholder Logic
      if (email === 'candidate@example.com' && pass === 'password') {
        const loggedInUser: User = { id: '1', email, name: "Candidate User", role: 'candidate' };
        setUser(loggedInUser);
        return loggedInUser; // <-- KUNCI: Kembalikan data user
      } else if (email === 'employer@example.com' && pass === 'password') {
        const loggedInUser: User = { id: '2', email, name: "Employer User", role: 'employer' };
        setUser(loggedInUser);
        return loggedInUser; // <-- KUNCI: Kembalikan data user
      } else {
        throw new Error('Email atau password salah.');
      }
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
        setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    // ... (tidak ada perubahan)
  };

  const logout = async () => {
    // ... (tidak ada perubahan)
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};