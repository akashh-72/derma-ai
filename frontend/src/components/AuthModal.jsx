import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  User, 
  Stethoscope, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  AlertCircle,
  Database
} from 'lucide-react';
import { signInUser, signUpUser } from '../firebase/authService';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, defaultRole = 'patient' }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [role, setRole] = useState(defaultRole); // 'patient' | 'doctor'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (authMode === 'signup') {
      const res = await signUpUser(email, password, {
        name: name.trim() || (role === 'doctor' ? 'Dr. Clinician' : 'Patient User'),
        role
      });
      setLoading(false);
      if (res.success) {
        onLoginSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.error);
      }
    } else {
      const res = await signInUser(email, password);
      setLoading(false);
      if (res.success) {
        onLoginSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.error);
      }
    }
  };

  const handleQuickDemo = (demoRole) => {
    const demoUser = demoRole === 'patient' ? {
      uid: 'firebase-pat-maliha-mulla',
      name: 'Maliha Mulla',
      email: 'maliha.mulla@example.com',
      role: 'patient',
      dob: '1998-05-14',
      gender: 'Female',
      phone: '+91 98220 12345',
      emergencyContactName: 'Amina Mulla (Mother / Guardian)',
      emergencyContactPhone: '+91 98220 54321',
      location: 'Kolhapur, Maharashtra',
      authProvider: 'Firebase Demo Session'
    } : {
      uid: 'firebase-doc-sneha-patil',
      name: 'Dr. Sneha Patil',
      email: 'dr.patil@apexskin.org',
      role: 'doctor',
      specialization: 'Dermatology & Venereology',
      licenseNumber: 'MMC-2018-09412',
      clinic: 'Patil Dermacare & Aesthetic Clinic, Kolhapur',
      location: 'Kolhapur, Maharashtra',
      authProvider: 'Firebase Demo Session'
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container auth-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="auth-modal-header text-center">
          <div className="auth-firebase-badge-mini">
            <Database size={13} className="text-electric" />
            <span>Firebase Connected (skin-disease-detection-59480)</span>
          </div>

          <div className="auth-icon-wrap">
            {role === 'doctor' ? (
              <Stethoscope size={28} className="text-electric" />
            ) : (
              <User size={28} className="text-electric" />
            )}
          </div>
          <h3 className="auth-title">
            {authMode === 'login' ? 'Welcome Back to DermaAI' : 'Create Clinical Account'}
          </h3>
          <p className="auth-sub">
            {authMode === 'login' 
              ? 'Access your skin scans, Grad-CAM records & consultations'
              : 'Sign up to monitor skin changes and consult verified dermatologists'}
          </p>

          {/* Role Switcher Pills */}
          <div className="auth-role-toggle">
            <button
              type="button"
              className={`role-btn ${role === 'patient' ? 'active' : ''}`}
              onClick={() => setRole('patient')}
            >
              <User size={16} />
              <span>Patient Portal</span>
            </button>
            <button
              type="button"
              className={`role-btn ${role === 'doctor' ? 'active' : ''}`}
              onClick={() => setRole('doctor')}
            >
              <Stethoscope size={16} />
              <span>Dermatologist Portal</span>
            </button>
          </div>
        </div>

        {/* Quick Demo Selector */}
        <div className="auth-demo-hint-box">
          <span className="demo-hint-title">One-Click Test Access:</span>
          <div className="demo-hint-btns">
            <button 
              type="button" 
              className="btn btn-outline btn-xs"
              onClick={() => handleQuickDemo('patient')}
            >
              Patient Demo (Maliha)
            </button>
            <button 
              type="button" 
              className="btn btn-outline btn-xs"
              onClick={() => handleQuickDemo('doctor')}
            >
              Doctor Demo (Dr. Sneha)
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="auth-modal-error">
            <AlertCircle size={15} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="auth-form-body">
          {authMode === 'signup' && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder={role === 'doctor' ? "Dr. Full Name" : "Your full name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder={role === 'doctor' ? "doctor@apexskin.org" : "user@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block btn-auth-submit"
            disabled={loading}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Modal Footer Switch */}
        <div className="auth-modal-footer text-center">
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button 
                type="button" 
                className="link-btn"
                onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button 
                type="button" 
                className="link-btn"
                onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
