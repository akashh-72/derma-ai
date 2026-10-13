import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBanner from './components/StatsBanner';
import AudienceCards from './components/AudienceCards';
import KeyFeatures from './components/KeyFeatures';
import SmartAnalysisBanner from './components/SmartAnalysisBanner';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import AuthPage from './components/auth/AuthPage';
import PatientLayout from './components/patient/PatientLayout';
import DoctorLayout from './components/doctor/DoctorLayout';
import ContactPage from './components/ContactPage';
import { subscribeToAuthChanges, signOutUser } from './firebase/authService';
import { syncDiseasesToFirebase } from './firebase/dbService';
import './App.css';
import './components/portals.css';

export default function App() {
  // Persistent user state loaded from localStorage & synced with Firebase Auth
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dermaai_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persistent view state: restore wherever the user was on refresh!
  const [currentView, setCurrentView] = useState(() => {
    try {
      const savedUser = localStorage.getItem('dermaai_active_user');
      const savedView = localStorage.getItem('dermaai_current_view');
      if (savedUser && savedView && ['patient', 'doctor', 'contact'].includes(savedView)) {
        return savedView;
      }
      return savedView || 'landing';
    } catch {
      return 'landing';
    }
  });

  // Persistent tab states for Patient and Doctor workspaces
  const [patientTab, setPatientTab] = useState(() => {
    try {
      return localStorage.getItem('dermaai_patient_tab') || 'overview';
    } catch {
      return 'overview';
    }
  });

  const [doctorTab, setDoctorTab] = useState(() => {
    try {
      return localStorage.getItem('dermaai_doctor_tab') || 'dashboard';
    } catch {
      return 'dashboard';
    }
  });

  const [authDefaultRole, setAuthDefaultRole] = useState('patient');
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Quick, high-aesthetic restore animation on page reload (450ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Safe view & tab navigators that persist state
  const navigateView = (view) => {
    setCurrentView(view);
    try { localStorage.setItem('dermaai_current_view', view); } catch (e) {}
  };

  const navigatePatientTab = (tab) => {
    setPatientTab(tab);
    try { localStorage.setItem('dermaai_patient_tab', tab); } catch (e) {}
  };

  const navigateDoctorTab = (tab) => {
    setDoctorTab(tab);
    try { localStorage.setItem('dermaai_doctor_tab', tab); } catch (e) {}
  };

  // Sync with Firebase Auth and initialize dataset in background
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((fbUser) => {
      if (fbUser) {
        setUser(prev => ({ ...prev, ...fbUser }));
        localStorage.setItem('dermaai_active_user', JSON.stringify(fbUser));
      }
    });

    // Auto sync 8 balanced dataset classes to Firebase Firestore/RTDB
    syncDiseasesToFirebase().catch(() => {});

    return () => unsubscribe();
  }, []);

  // Navigation Handlers for Patient Suite - Strictly Checks Authentication
  const handleOpenScanner = () => {
    if (!user) {
      handleOpenAuth('signin', 'patient');
      return;
    }
    if (user.role === 'doctor') {
      navigateDoctorTab('analyses');
      navigateView('doctor');
    } else {
      navigatePatientTab('scanner');
      navigateView('patient');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDoctorMatch = () => {
    if (!user) {
      handleOpenAuth('signin', 'patient');
      return;
    }
    if (user.role === 'doctor') {
      navigateDoctorTab('dashboard');
      navigateView('doctor');
    } else {
      navigatePatientTab('doctors');
      navigateView('patient');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProfile = () => {
    if (!user) {
      handleOpenAuth('signin', 'patient');
      return;
    }
    if (user.role === 'doctor') {
      navigateDoctorTab('dashboard');
      navigateView('doctor');
    } else {
      navigatePatientTab('overview');
      navigateView('patient');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation Handler for Doctor Suite
  const handleOpenDoctorPortal = (tab = 'dashboard') => {
    if (!user) {
      handleOpenAuth('signin', 'doctor');
      return;
    }
    if (user.role !== 'doctor') {
      handleOpenAuth('signin', 'doctor');
      return;
    }
    navigateDoctorTab(tab);
    navigateView('doctor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreGradCam = () => {
    const el = document.getElementById('gradcam-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenScanner();
    }
  };

  const handleSelectDoctorFromPreview = (doctor) => {
    handleOpenDoctorMatch();
  };

  const handleOpenAuth = (mode = 'signin', role = 'patient') => {
    setAuthDefaultRole(role);
    navigateView(mode === 'signup' ? 'signup' : 'signin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (userObj) => {
    setUser(userObj);
    localStorage.setItem('dermaai_active_user', JSON.stringify(userObj));
    if (userObj.role === 'doctor') {
      navigateDoctorTab('dashboard');
      navigateView('doctor');
    } else {
      navigatePatientTab('overview');
      navigateView('patient');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (e) {}
    localStorage.removeItem('dermaai_active_user');
    localStorage.setItem('dermaai_current_view', 'landing');
    localStorage.setItem('dermaai_patient_tab', 'overview');
    localStorage.setItem('dermaai_doctor_tab', 'dashboard');
    setUser(null);
    navigatePatientTab('overview');
    navigateDoctorTab('dashboard');
    navigateView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick reload splash loader with smooth animation (Requirement 3)
  if (isAppLoading) {
    return (
      <div className="dermaai-page-loader-screen">
        <div className="dermaai-loader-card">
          <div className="dermaai-loader-pulse-ring">
            <div className="dermaai-loader-icon">
              <Activity size={26} color="#FFFFFF" strokeWidth={2.8} />
            </div>
          </div>
          <div className="dermaai-loader-text-group">
            <h4 className="dermaai-loader-title">Derma<span style={{ color: '#0055FF' }}>AI</span></h4>
            <div className="dermaai-loader-bar">
              <div className="dermaai-loader-bar-fill"></div>
            </div>
            <p className="dermaai-loader-subtitle">Restoring Clinical Workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root-container">
      {/* 1. Landing Page View */}
      {currentView === 'landing' && (
        <>
          <Navbar 
            currentView={currentView}
            setCurrentView={navigateView}
            user={user}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
            onOpenScanner={handleOpenScanner}
            onOpenDoctorMatch={handleOpenDoctorMatch}
            onOpenProfile={handleOpenProfile}
            onOpenDoctorPortal={handleOpenDoctorPortal}
          />

          <main>
            {/* Hero: AI Skin Scanner */}
            <Hero 
              onOpenScanner={handleOpenScanner}
              onExploreGradCam={handleExploreGradCam}
            />

            {/* Modern Stats & Live Clinical Analytics Banner */}
            <StatsBanner 
              onOpenScanner={handleOpenScanner}
            />

            {/* Universal AI Skin Screening (CE / GDPR / ISO & 3 Squircle Cards) */}
            <AudienceCards 
              onOpenScanner={handleOpenScanner}
              onOpenDoctorMatch={handleOpenDoctorMatch}
              onOpenAuth={(role) => handleOpenAuth('signin', role)}
              onOpenDoctorPortal={handleOpenDoctorPortal}
            />

            {/* Core Diagnostic Capabilities / Key Features */}
            <KeyFeatures 
              onOpenScanner={handleOpenScanner}
            />

            {/* Smart Skin Analysis Clinical Consultation Banner */}
            <SmartAnalysisBanner 
              onOpenScanner={handleOpenScanner}
            />

            {/* Clinical FAQ */}
            <FAQSection />
          </main>

          <Footer 
            onOpenScanner={handleOpenScanner}
            onOpenDoctorMatch={handleOpenDoctorMatch}
            onOpenAuth={(role) => handleOpenAuth('signin', role)}
            onOpenDoctorPortal={handleOpenDoctorPortal}
            onOpenContact={() => { navigateView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        </>
      )}

      {/* 2. Dedicated Contact Us Page View (Same Navbar & Footer) */}
      {currentView === 'contact' && (
        <>
          <Navbar 
            currentView={currentView}
            setCurrentView={navigateView}
            user={user}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
            onOpenScanner={handleOpenScanner}
            onOpenDoctorMatch={handleOpenDoctorMatch}
            onOpenProfile={handleOpenProfile}
            onOpenDoctorPortal={handleOpenDoctorPortal}
          />

          <main>
            <ContactPage 
              onOpenScanner={handleOpenScanner}
              onBackToLanding={() => { navigateView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          </main>

          <Footer 
            onOpenScanner={handleOpenScanner}
            onOpenDoctorMatch={handleOpenDoctorMatch}
            onOpenAuth={(role) => handleOpenAuth('signin', role)}
            onOpenDoctorPortal={handleOpenDoctorPortal}
            onOpenContact={() => { navigateView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        </>
      )}

      {/* 2. Authentication Page */}
      {(currentView === 'signin' || currentView === 'signup') && (
        <AuthPage 
          initialMode={currentView}
          defaultRole={authDefaultRole}
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={() => { navigateView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        />
      )}

      {/* 3. Dedicated Patient Portal Suite (100% Separate) */}
      {currentView === 'patient' && (
        <PatientLayout 
          user={user}
          onLogout={handleLogout}
          onBackToLanding={() => { navigateView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          initialTab={patientTab}
          onTabChange={navigatePatientTab}
        />
      )}

      {/* 4. Dedicated Doctor Clinician Workstation Suite (100% Separate) */}
      {currentView === 'doctor' && (
        <DoctorLayout 
          user={user}
          onLogout={handleLogout}
          onBackToLanding={() => { navigateView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          initialTab={doctorTab}
          onTabChange={navigateDoctorTab}
        />
      )}
    </div>
  );
}
