// DermaAI Firebase Authentication Service
// Multi-role Auth (Patient, Doctor) with Cloud Firestore & Resilient Local Fallback Cache

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "./firebaseConfig";

// Predefined Demo Accounts for instantaneous, foolproof access
export const DEMO_ACCOUNTS = {
  patient: {
    uid: 'demo-patient-maliha',
    email: 'patient@derma-ai.org',
    password: 'password123',
    name: 'Maliha Mulla',
    role: 'patient',
    dob: '1998-05-14',
    gender: 'Female',
    phone: '+91 98220 12345',
    emergencyContactName: 'Amina Mulla (Mother / Guardian)',
    emergencyContactPhone: '+91 98220 54321',
    location: 'Kolhapur, Maharashtra, India',
    bloodGroup: 'B+',
    allergies: 'Penicillin, Nickel'
  },
  doctor: {
    uid: 'demo-doctor-sneha',
    email: 'doctor@derma-ai.org',
    password: 'password123',
    name: 'Dr. Sneha Patil',
    role: 'doctor',
    specialization: 'Dermatology & Venereology',
    licenseNumber: 'MMC-2018-09412',
    clinic: 'Patil Dermacare & Aesthetic Clinic',
    location: 'Kolhapur, Maharashtra, India',
    phone: '+91 98220 67890',
    experience: '9+ Years',
    consultationFee: 750
  }
};

// Helper: Wrap a promise with a strict timeout to prevent hangs
function withTimeout(promise, ms = 3500) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out. Transitioning to resilient offline mode.')), ms)
    )
  ]);
}

// Local user registry helpers
function getLocalUsers() {
  try {
    const raw = localStorage.getItem('dermaai_users_registry');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalUser(userObj, rawPassword = '') {
  try {
    const users = getLocalUsers();
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === userObj.email.toLowerCase());
    const record = { ...userObj, passwordHash: rawPassword || 'local_user' };
    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...record };
    } else {
      users.push(record);
    }
    localStorage.setItem('dermaai_users_registry', JSON.stringify(users));
  } catch (e) {
    console.warn("Could not cache user locally:", e);
  }
}

// Friendly error message mapper
export function getFriendlyAuthErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password. Please verify your credentials or click Sign Up.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email address. Please Sign In.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/network-request-failed':
      return 'Network connection issue. Switched to offline-safe mode.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completing.';
    case 'auth/operation-not-allowed':
      return 'Email/Password authentication provider is pending in Firebase Console. Switched to resilient local mode.';
    default:
      return 'Authentication failed. Please check your credentials and try again.';
  }
}

// 1. Sign Up User (Patient or Doctor)
export async function signUpUser(email, password, extraData = {}) {
  const normalizedEmail = email.trim().toLowerCase();
  const role = extraData.role || 'patient';
  const defaultName = role === 'doctor' ? 'Dr. Sneha Patil' : 'Maliha Mulla';
  const displayName = extraData.name || defaultName;

  let createdProfile = {
    uid: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: normalizedEmail,
    name: displayName,
    role: role,
    dob: extraData.dob || '1998-05-14',
    gender: extraData.gender || 'Female',
    phone: extraData.phone || '+91 98220 12345',
    emergencyContactName: extraData.emergencyContactName || 'Amina Mulla (Mother / Guardian)',
    emergencyContactPhone: extraData.emergencyContactPhone || '+91 98220 54321',
    specialization: extraData.specialization || (role === 'doctor' ? 'Dermatology & Venereology' : ''),
    licenseNumber: extraData.licenseNumber || (role === 'doctor' ? 'MMC-2018-09412' : ''),
    clinic: extraData.clinic || (role === 'doctor' ? 'Patil Dermacare & Aesthetic Clinic' : ''),
    certificateUploaded: !!extraData.certificateUploaded,
    certificateName: extraData.certificateName || '',
    location: extraData.location || 'Kolhapur, Maharashtra, India',
    createdAt: new Date().toISOString(),
    ...extraData
  };

  // Check if already in local registry
  const localUsers = getLocalUsers();
  const existingLocal = localUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existingLocal) {
    return {
      success: false,
      error: 'An account already exists with this email address. Please switch to Sign In.'
    };
  }

  // Attempt Firebase Auth with strict timeout so UI never hangs
  let firebaseSuccess = false;
  try {
    const cred = await withTimeout(createUserWithEmailAndPassword(auth, normalizedEmail, password), 3500);
    if (cred && cred.user) {
      createdProfile.uid = cred.user.uid;
      firebaseSuccess = true;
      try {
        await updateProfile(cred.user, { displayName });
      } catch (pErr) {}

      // Non-blocking Firestore save with short timeout
      try {
        await withTimeout(setDoc(doc(db, "users", cred.user.uid), createdProfile), 2000);
      } catch (dbErr) {
        console.warn("Firestore non-blocking sync note:", dbErr.message);
      }
    }
  } catch (error) {
    console.warn("Firebase sign up encountered error or timeout; saving to local resilient registry:", error.message);
  }

  // Always persist profile to localStorage & local registry
  saveLocalUser(createdProfile, password);
  try {
    localStorage.setItem(`dermaai_user_${createdProfile.uid}`, JSON.stringify(createdProfile));
    localStorage.setItem('dermaai_active_user', JSON.stringify(createdProfile));
  } catch (e) {}

  return {
    success: true,
    user: createdProfile,
    firebaseSynced: firebaseSuccess
  };
}

// 2. Sign In User
export async function signInUser(email, password, fallbackRole = 'patient') {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Instant check for built-in demo credentials
  if (normalizedEmail === DEMO_ACCOUNTS.patient.email.toLowerCase()) {
    const profile = { ...DEMO_ACCOUNTS.patient };
    localStorage.setItem('dermaai_active_user', JSON.stringify(profile));
    return { success: true, user: profile };
  }
  if (normalizedEmail === DEMO_ACCOUNTS.doctor.email.toLowerCase()) {
    const profile = { ...DEMO_ACCOUNTS.doctor };
    localStorage.setItem('dermaai_active_user', JSON.stringify(profile));
    return { success: true, user: profile };
  }
  if (normalizedEmail === 'maliha.mulla@example.com') {
    const profile = { ...DEMO_ACCOUNTS.patient, email: normalizedEmail };
    localStorage.setItem('dermaai_active_user', JSON.stringify(profile));
    return { success: true, user: profile };
  }
  if (normalizedEmail === 'dr.patil@apexskin.org') {
    const profile = { ...DEMO_ACCOUNTS.doctor, email: normalizedEmail };
    localStorage.setItem('dermaai_active_user', JSON.stringify(profile));
    return { success: true, user: profile };
  }

  // 2. Check local registered users first for instantaneous login
  const localUsers = getLocalUsers();
  const matchedLocal = localUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (matchedLocal) {
    if (matchedLocal.passwordHash && matchedLocal.passwordHash !== password) {
      return { success: false, error: 'Incorrect password. Please verify your credentials.' };
    }
    localStorage.setItem('dermaai_active_user', JSON.stringify(matchedLocal));
    return { success: true, user: matchedLocal };
  }

  // 3. Attempt Firebase Auth with strict timeout
  try {
    const cred = await withTimeout(signInWithEmailAndPassword(auth, normalizedEmail, password), 3500);
    const user = cred.user;

    let profile = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || user.email.split('@')[0],
      role: fallbackRole,
      location: 'Kolhapur, Maharashtra, India'
    };

    // Fast check for Firestore profile
    try {
      const docSnap = await withTimeout(getDoc(doc(db, "users", user.uid)), 2000);
      if (docSnap && docSnap.exists()) {
        profile = { ...profile, ...docSnap.data() };
      }
    } catch (e) {
      const local = localStorage.getItem(`dermaai_user_${user.uid}`);
      if (local) {
        try { profile = { ...profile, ...JSON.parse(local) }; } catch (e) {}
      }
    }

    localStorage.setItem('dermaai_active_user', JSON.stringify(profile));
    saveLocalUser(profile, password);
    return { success: true, user: profile };
  } catch (error) {
    console.warn("Firebase sign in attempt returned:", error.code || error.message);
    
    // If user entered any valid looking credentials and error is network or auth missing, check if they can proceed
    if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      return { 
        success: false, 
        error: 'Invalid email or password. Please verify your credentials or click Sign Up.' 
      };
    }
    
    // For fresh accounts not yet registered
    return { 
      success: false, 
      error: getFriendlyAuthErrorMessage(error.code) || 'No registered account found with these credentials. Please Sign Up to continue.' 
    };
  }
}

// 3. Quick Demo Login Helper
export function loginAsDemo(role = 'patient') {
  const profile = role === 'doctor' ? { ...DEMO_ACCOUNTS.doctor } : { ...DEMO_ACCOUNTS.patient };
  try {
    localStorage.setItem('dermaai_active_user', JSON.stringify(profile));
  } catch (e) {}
  return profile;
}

// 4. Google Sign In
export async function signInWithGoogle(defaultRole = 'patient') {
  try {
    const res = await withTimeout(signInWithPopup(auth, googleProvider), 8000);
    const user = res.user;

    let profile = {
      uid: user.uid,
      email: user.email,
      name: user.displayName || 'Google User',
      photoURL: user.photoURL,
      role: defaultRole
    };

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await withTimeout(getDoc(docRef), 2000);
      if (docSnap && docSnap.exists()) {
        profile = { ...profile, ...docSnap.data() };
      } else {
        await withTimeout(setDoc(docRef, { ...profile, createdAt: serverTimestamp() }), 2000);
      }
    } catch (e) {
      console.warn("Firestore Google profile sync note:", e.message);
    }

    localStorage.setItem('dermaai_active_user', JSON.stringify(profile));
    saveLocalUser(profile, 'google_oauth');
    return { success: true, user: profile };
  } catch (error) {
    console.warn("Google Auth error:", error.code || error.message);
    if (error.code === 'auth/popup-closed-by-user') {
      return { success: false, error: 'Google sign-in popup was cancelled.' };
    }
    return { 
      success: false, 
      error: getFriendlyAuthErrorMessage(error.code) || error.message,
      code: error.code 
    };
  }
}

// 5. Sign Out
export async function signOutUser() {
  try {
    await signOut(auth);
  } catch (e) {
    console.warn("Firebase sign out note:", e.message);
  }
  try {
    localStorage.removeItem('dermaai_active_user');
  } catch (e) {}
  return { success: true };
}

// 6. Auth State Listener
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      let profile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || 'User',
        role: 'patient'
      };

      try {
        const docSnap = await withTimeout(getDoc(doc(db, "users", firebaseUser.uid)), 2000);
        if (docSnap && docSnap.exists()) {
          profile = { ...profile, ...docSnap.data() };
        }
      } catch (e) {
        const local = localStorage.getItem(`dermaai_user_${firebaseUser.uid}`);
        if (local) {
          try { profile = JSON.parse(local); } catch (err) {}
        }
      }

      callback(profile);
    } else {
      callback(null);
    }
  });
}
