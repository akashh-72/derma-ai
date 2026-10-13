// DermaAI Firebase Authentication Context & Provider
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInUser, 
  signUpUser, 
  signInWithGoogle, 
  signOutUser, 
  subscribeToAuthChanges 
} from './authService';
import { syncDiseasesToFirebase } from './dbService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dermaai_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Sync active user to localStorage for instant reload preservation
  useEffect(() => {
    if (user) {
      localStorage.setItem('dermaai_active_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dermaai_active_user');
    }
  }, [user]);

  // Listen to live Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUserProfile) => {
      if (firebaseUserProfile) {
        setUser((prev) => ({
          ...prev,
          ...firebaseUserProfile
        }));
      }
      setLoading(false);
    });

    // Auto-sync dataset classes in background
    syncDiseasesToFirebase().catch(() => {});

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);
    const result = await signInUser(email, password);
    setLoading(false);
    if (result.success) {
      setUser(result.user);
      return { success: true, user: result.user };
    } else {
      setAuthError(result.error);
      return { success: false, error: result.error };
    }
  };

  const signup = async (email, password, extraData) => {
    setLoading(true);
    setAuthError(null);
    const result = await signUpUser(email, password, extraData);
    setLoading(false);
    if (result.success) {
      setUser(result.user);
      return { success: true, user: result.user };
    } else {
      setAuthError(result.error);
      return { success: false, error: result.error };
    }
  };

  const loginGoogle = async (role = 'patient') => {
    setLoading(true);
    setAuthError(null);
    const result = await signInWithGoogle(role);
    setLoading(false);
    if (result.success) {
      setUser(result.user);
      return { success: true, user: result.user };
    } else {
      setAuthError(result.error);
      return { success: false, error: result.error };
    }
  };

  const logout = async () => {
    setLoading(true);
    await signOutUser();
    setUser(null);
    setLoading(false);
  };

  // Quick Demo Login for instant testing without manual typing
  const quickDemoLogin = (role = 'patient') => {
    const demoUser = role === 'doctor' ? {
      uid: "firebase-demo-doc-sneha",
      name: "Dr. Sneha Patil",
      email: "dr.patil@apexskin.org",
      role: "doctor",
      title: "MD, DNB (Dermatology & Venereology)",
      specialization: "Dermatology & Venereology",
      licenseNumber: "MMC-2018-09412",
      clinic: "Patil Dermacare & Aesthetic Clinic, Kolhapur",
      location: "Kolhapur, Maharashtra",
      verified: true,
      authProvider: "Firebase Demo Clinical Session"
    } : {
      uid: "firebase-demo-patient-maliha",
      name: "Maliha Mulla",
      email: "maliha.mulla@example.com",
      role: "patient",
      dob: "1998-05-14",
      gender: "Female",
      phone: "+91 98220 12345",
      emergencyContactName: "Amina Mulla (Mother / Guardian)",
      emergencyContactPhone: "+91 98220 54321",
      clinicalId: "DERMA-9104",
      location: "Kolhapur, Maharashtra",
      authProvider: "Firebase Demo Patient Session"
    };

    setUser(demoUser);
    return demoUser;
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      authError,
      setAuthError,
      login,
      signup,
      loginGoogle,
      logout,
      quickDemoLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
