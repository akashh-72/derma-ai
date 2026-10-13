import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  User, 
  Stethoscope, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  KeyRound,
  RotateCcw,
  Calendar,
  Phone,
  Building,
  FileText,
  UploadCloud,
  FileCheck,
  HeartPulse
} from 'lucide-react';
import { signInUser, signUpUser, signInWithGoogle, loginAsDemo } from '../../firebase/authService';

export default function AuthPage({ 
  initialMode = 'signin', 
  defaultRole = 'patient', 
  onLoginSuccess, 
  onBackToLanding 
}) {
  const [authMode, setAuthMode] = useState(initialMode); // 'signin' | 'signup' | 'forgot'
  const [role, setRole] = useState(defaultRole); // 'patient' | 'doctor'
  
  // Common Sign In / Sign Up fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Patient Sign Up specific fields
  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientLastName, setPatientLastName] = useState('');
  const [patientDob, setPatientDob] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [patientTermsAgreed, setPatientTermsAgreed] = useState(false);

  // Doctor Sign Up specific fields
  const [doctorFirstName, setDoctorFirstName] = useState('');
  const [doctorLastName, setDoctorLastName] = useState('');
  const [doctorSpecialization, setDoctorSpecialization] = useState('');
  const [doctorLicenseNumber, setDoctorLicenseNumber] = useState('');
  const [doctorHospitalName, setDoctorHospitalName] = useState('');
  const [degreeCertificateFile, setDegreeCertificateFile] = useState(null);
  const [doctorTermsAgreed, setDoctorTermsAgreed] = useState(false);

  // Forgot Password Flow State (UI only)
  const [forgotStep, setForgotStep] = useState(1); // 1: Enter Email, 2: Enter OTP & New Password, 3: Success
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(45);
  const otpInputRefs = useRef([]);
  const fileInputRef = useRef(null);

  // Resend Countdown Timer for OTP
  useEffect(() => {
    let timer;
    if (authMode === 'forgot' && forgotStep === 2 && resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [authMode, forgotStep, resendCooldown]);

  // Google Authentication
  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const result = await signInWithGoogle(role);
      setIsSubmitting(false);
      if (result.success) {
        setSuccessToast(`Signed in with Google as ${result.user.name}`);
        setTimeout(() => {
          onLoginSuccess(result.user);
        }, 400);
      } else {
        setErrorMsg(result.error || 'Google authentication could not be completed.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Error communicating with authentication service.');
    }
  };

  // Quick Demo Login for instant zero-wait testing
  const handleQuickDemoLogin = (demoRole) => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const demoUser = loginAsDemo(demoRole);
      setSuccessToast(`Signed in instantly as ${demoUser.name} (${demoRole === 'doctor' ? 'Clinician' : 'Patient'})`);
      setTimeout(() => {
        setIsSubmitting(false);
        onLoginSuccess(demoUser);
      }, 350);
    } catch (e) {
      setIsSubmitting(false);
      setErrorMsg("Demo login: " + e.message);
    }
  };

  // Sign In Submit
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessToast('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    const result = await signInUser(email.trim(), password, role);
    setIsSubmitting(false);

    if (result.success) {
      setSuccessToast(`Welcome back, ${result.user.name}!`);
      setTimeout(() => {
        onLoginSuccess(result.user);
      }, 400);
    } else {
      setErrorMsg(result.error);
    }
  };

  // Patient Sign Up Submit
  const handlePatientSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessToast('');

    if (!patientFirstName.trim() || !patientLastName.trim()) {
      setErrorMsg('Please enter your first and last name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!patientGender) {
      setErrorMsg('Please select your gender.');
      return;
    }
    if (!patientTermsAgreed) {
      setErrorMsg('Please agree to the Terms of Service and Medical Disclaimer to continue.');
      return;
    }

    setIsSubmitting(true);
    const fullName = `${patientFirstName.trim()} ${patientLastName.trim()}`;
    const result = await signUpUser(email.trim(), password, { 
      name: fullName, 
      role: 'patient',
      dob: patientDob,
      gender: patientGender,
      phone: patientPhone,
      emergencyContactName: emergencyName,
      emergencyContactPhone: emergencyPhone
    });
    setIsSubmitting(false);

    if (result.success) {
      setSuccessToast(`Patient account created! Welcome, ${result.user.name}.`);
      setTimeout(() => {
        onLoginSuccess(result.user);
      }, 500);
    } else {
      setErrorMsg(result.error);
    }
  };

  // Doctor Sign Up Submit
  const handleDoctorSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessToast('');

    if (!doctorFirstName.trim() || !doctorLastName.trim()) {
      setErrorMsg('Please enter your first and last name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid professional email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!doctorSpecialization) {
      setErrorMsg('Please select your medical specialization.');
      return;
    }
    if (!doctorLicenseNumber.trim()) {
      setErrorMsg('Please enter your medical license number.');
      return;
    }
    if (!doctorHospitalName.trim()) {
      setErrorMsg('Please enter your hospital or clinic name.');
      return;
    }
    if (!doctorTermsAgreed) {
      setErrorMsg('Please agree to the Healthcare Professional Terms to continue.');
      return;
    }

    setIsSubmitting(true);
    const fullName = `Dr. ${doctorFirstName.trim()} ${doctorLastName.trim()}`;
    const result = await signUpUser(email.trim(), password, { 
      name: fullName, 
      role: 'doctor',
      specialization: doctorSpecialization,
      licenseNumber: doctorLicenseNumber.trim(),
      clinic: doctorHospitalName.trim(),
      certificateUploaded: !!degreeCertificateFile,
      certificateName: degreeCertificateFile ? degreeCertificateFile.name : ''
    });
    setIsSubmitting(false);

    if (result.success) {
      setSuccessToast(`Healthcare provider account registered! Welcome, ${result.user.name}.`);
      setTimeout(() => {
        onLoginSuccess(result.user);
      }, 500);
    } else {
      setErrorMsg(result.error);
    }
  };

  // Switch to Forgot Password
  const handleOpenForgot = () => {
    setAuthMode('forgot');
    setForgotStep(1);
    setForgotEmail(email.trim() || '');
    setErrorMsg('');
    setSuccessToast('');
  };

  // Back to Sign In
  const handleBackToSignIn = () => {
    setAuthMode('signin');
    setForgotStep(1);
    setErrorMsg('');
    setSuccessToast('');
  };

  // Forgot Password: Step 1 Submit (Send OTP)
  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!forgotEmail.trim() || !forgotEmail.includes('@')) {
      setErrorMsg('Please enter a valid registered email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setForgotStep(2);
      setResendCooldown(45);
      setSuccessToast(`Verification code has been sent to ${forgotEmail}`);
    }, 600);
  };

  // Forgot Password: OTP Input Handling
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, '').slice(0, 6);
      if (pasted.length > 0) {
        const nextDigits = [...otpDigits];
        for (let i = 0; i < 6; i++) {
          nextDigits[i] = pasted[i] || '';
        }
        setOtpDigits(nextDigits);
        const nextFocus = Math.min(pasted.length, 5);
        otpInputRefs.current[nextFocus]?.focus();
      }
      return;
    }

    const digit = value.replace(/\D/g, '');
    const nextDigits = [...otpDigits];
    nextDigits[index] = digit;
    setOtpDigits(nextDigits);

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(45);
    setSuccessToast(`New verification code sent to ${forgotEmail}`);
    setOtpDigits(['', '', '', '', '', '']);
    otpInputRefs.current[0]?.focus();
  };

  // Forgot Password: Step 2 Submit (Verify OTP & Set New Password)
  const handleVerifyOtpAndReset = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setErrorMsg('Please enter the full 6-digit OTP sent to your email.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setForgotStep(3);
      setErrorMsg('');
      setSuccessToast('');
    }, 700);
  };

  // File Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDegreeCertificateFile(file);
      setSuccessToast(`Attached: ${file.name}`);
    }
  };

  return (
    <div className="auth-clean-page-wrapper">
      
      {/* 1. Dynamic Top Navigation Bar matching specifications */}
      <div className="auth-clean-nav-bar">
        <div 
          className="auth-clean-brand" 
          onClick={onBackToLanding}
          role="button"
          tabIndex={0}
        >
          <div className="auth-clean-circle-logo">
            <Activity size={20} color="#FFFFFF" strokeWidth={2.8} />
          </div>
          <span className="auth-clean-brand-text">Derma<span className="text-electric">AI</span></span>
        </div>

        {/* Right Navigation Actions */}
        <div className="auth-nav-action-buttons">
          {authMode === 'signup' && role === 'patient' && (
            <>
              <button 
                type="button"
                className="auth-nav-pill-btn secondary"
                onClick={() => { setRole('doctor'); setErrorMsg(''); }}
              >
                <Stethoscope size={14} />
                <span>Doctor Signup</span>
              </button>
              <button 
                type="button"
                className="auth-nav-pill-btn outline"
                onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
              >
                <span>Login</span>
              </button>
            </>
          )}

          {authMode === 'signup' && role === 'doctor' && (
            <>
              <button 
                type="button"
                className="auth-nav-pill-btn secondary"
                onClick={() => { setRole('patient'); setErrorMsg(''); }}
              >
                <User size={14} />
                <span>Patient Signup</span>
              </button>
              <button 
                type="button"
                className="auth-nav-pill-btn outline"
                onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
              >
                <span>Login</span>
              </button>
            </>
          )}

          {authMode === 'signin' && (
            <>
              <button 
                type="button"
                className="auth-nav-pill-btn secondary"
                onClick={() => { setAuthMode('signup'); setRole('patient'); setErrorMsg(''); }}
              >
                <User size={14} />
                <span>Patient Signup</span>
              </button>
              <button 
                type="button"
                className="auth-nav-pill-btn outline"
                onClick={() => { setAuthMode('signup'); setRole('doctor'); setErrorMsg(''); }}
              >
                <Stethoscope size={14} />
                <span>Doctor Signup</span>
              </button>
            </>
          )}

          <button 
            type="button"
            className="auth-clean-back-btn"
            onClick={onBackToLanding}
          >
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* 2. Main Centered Card Container */}
      <div className="auth-clean-card-container">
        <div className={`auth-clean-card ${authMode === 'signup' ? 'wide' : ''}`}>
          
          {/* Card Eyebrow / Hero Section */}
          <div className="auth-clean-header">
            {authMode === 'forgot' ? (
              <>
                <div className="auth-forgot-icon-bubble">
                  {forgotStep === 3 ? (
                    <CheckCircle2 size={28} color="#10B981" />
                  ) : (
                    <KeyRound size={26} color="#0066FF" />
                  )}
                </div>
                <h1 className="auth-clean-title">
                  {forgotStep === 1 && 'Reset Your Password'}
                  {forgotStep === 2 && 'Enter Verification Code'}
                  {forgotStep === 3 && 'Password Reset Complete'}
                </h1>
                <p className="auth-clean-subtitle">
                  {forgotStep === 1 && "Enter your registered email address and we'll send a 6-digit OTP code to verify your identity."}
                  {forgotStep === 2 && `We've sent a 6-digit verification code to ${forgotEmail}. Enter it below to proceed.`}
                  {forgotStep === 3 && "Your password has been successfully updated. You can now sign in with your new credentials."}
                </p>
              </>
            ) : authMode === 'signin' ? (
              <>
                <h1 className="auth-clean-title">Sign In to DermaAI</h1>
                <p className="auth-clean-subtitle">
                  Access your clinical AI skin screenings, medical records, and consultations.
                </p>
              </>
            ) : role === 'patient' ? (
              <>
                <div className="auth-role-hero-badge patient">
                  <User size={15} />
                  <span>PATIENT REGISTRATION</span>
                </div>
                <h1 className="auth-clean-title">Join DermaAI as a Patient</h1>
                <p className="auth-clean-subtitle">
                  Create your account to access AI-powered skin analysis and connect with healthcare providers
                </p>
              </>
            ) : (
              <>
                <div className="auth-role-hero-badge doctor">
                  <Stethoscope size={15} />
                  <span>CLINICIAN CREDENTIALING</span>
                </div>
                <h1 className="auth-clean-title">Join DermaAI as a Healthcare Provider</h1>
                <p className="auth-clean-subtitle">
                  Register your medical practice to access AI-powered tools and connect with patients
                </p>
              </>
            )}
          </div>

          {/* Feedback Banners */}
          {errorMsg && (
            <div className="auth-clean-alert error">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successToast && (
            <div className="auth-clean-alert success">
              <CheckCircle2 size={16} />
              <span>{successToast}</span>
            </div>
          )}

          {/* ========================================================
              VIEW A: SIGN IN FORM
              ======================================================== */}
          {authMode === 'signin' && (
            <>
              {/* Role Toggle: Patient | Doctor */}
              <div className="auth-clean-role-toggle">
                <button
                  type="button"
                  className={`role-toggle-item ${role === 'patient' ? 'active' : ''}`}
                  onClick={() => setRole('patient')}
                >
                  <User size={15} />
                  <span>Patient Portal</span>
                </button>
                <button
                  type="button"
                  className={`role-toggle-item ${role === 'doctor' ? 'active' : ''}`}
                  onClick={() => setRole('doctor')}
                >
                  <Stethoscope size={15} />
                  <span>Doctor / Clinician</span>
                </button>
              </div>

              {/* Google Sign In Button */}
              <button 
                type="button"
                className="auth-clean-google-btn"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
              >
                <svg className="google-svg-icon" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* 1-Click Fast Instant Test Access */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '0.65rem 0.85rem',
                margin: '0.85rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#64748B' }}>
                  ⚡ Quick 1-Click Access (Testing & Review):
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('patient')}
                    disabled={isSubmitting}
                    style={{
                      padding: '0.45rem 0.65rem',
                      borderRadius: '8px',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      color: '#0055FF',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <User size={13} />
                    <span>Demo Patient</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('doctor')}
                    disabled={isSubmitting}
                    style={{
                      padding: '0.45rem 0.65rem',
                      borderRadius: '8px',
                      background: '#ECFDF5',
                      border: '1px solid #A7F3D0',
                      color: '#059669',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Stethoscope size={13} />
                    <span>Demo Doctor</span>
                  </button>
                </div>
              </div>

              <div className="auth-clean-divider">
                <span>or continue with email credentials</span>
              </div>

              <form onSubmit={handleSignInSubmit} className="auth-clean-form">
                <div className="auth-field-group">
                  <label className="auth-label">Email Address</label>
                  <div className="auth-input-wrapper">
                    <Mail size={17} className="auth-field-icon" />
                    <input 
                      type="email"
                      placeholder={role === 'doctor' ? "dr.patil@apexskin.org" : "maliha.mulla@example.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="auth-input-control"
                      required
                    />
                  </div>
                </div>

                <div className="auth-field-group">
                  <label className="auth-label">Password</label>
                  <div className="auth-input-wrapper">
                    <Lock size={17} className="auth-field-icon" />
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="auth-input-control"
                      required
                    />
                    <button 
                      type="button" 
                      className="auth-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="auth-remember-forgot-row">
                  <label className="auth-checkbox-label">
                    <input 
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>

                  <button 
                    type="button" 
                    className="auth-forgot-link"
                    onClick={handleOpenForgot}
                  >
                    Forgot password?
                  </button>
                </div>

                <button 
                  type="submit" 
                  className="auth-clean-submit-btn"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
                  <ArrowRight size={17} />
                </button>
              </form>

              <div className="auth-clean-footer-text">
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    className="auth-switch-link"
                    onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </>
          )}

          {/* ========================================================
              VIEW B: PATIENT SIGN UP FORM
              ======================================================== */}
          {authMode === 'signup' && role === 'patient' && (
            <form onSubmit={handlePatientSignUpSubmit} className="auth-clean-form">
              
              {/* Section 1: Create Your Account */}
              <div className="auth-section-block">
                <div className="auth-section-header">
                  <h3 className="auth-section-title">Create Your Account</h3>
                  <p className="auth-section-desc">Fill in your information to get started</p>
                </div>

                {/* First Name & Last Name */}
                <div className="auth-row-2col">
                  <div className="auth-field-group">
                    <label className="auth-label">First Name</label>
                    <div className="auth-input-wrapper">
                      <User size={17} className="auth-field-icon" />
                      <input 
                        type="text"
                        placeholder="Maliha"
                        value={patientFirstName}
                        onChange={(e) => setPatientFirstName(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="auth-field-group">
                    <label className="auth-label">Last Name</label>
                    <div className="auth-input-wrapper">
                      <User size={17} className="auth-field-icon" />
                      <input 
                        type="text"
                        placeholder="Mulla"
                        value={patientLastName}
                        onChange={(e) => setPatientLastName(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="auth-field-group">
                  <label className="auth-label">Email Address</label>
                  <div className="auth-input-wrapper">
                    <Mail size={17} className="auth-field-icon" />
                    <input 
                      type="email"
                      placeholder="maliha.mulla@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="auth-input-control"
                      required
                    />
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="auth-row-2col">
                  <div className="auth-field-group">
                    <label className="auth-label">Password</label>
                    <div className="auth-input-wrapper">
                      <Lock size={17} className="auth-field-icon" />
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                      <button 
                        type="button" 
                        className="auth-eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="auth-field-group">
                    <label className="auth-label">Confirm Password</label>
                    <div className="auth-input-wrapper">
                      <Lock size={17} className="auth-field-icon" />
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Medical Information */}
              <div className="auth-section-block">
                <div className="auth-section-header">
                  <h3 className="auth-section-title">Medical Information</h3>
                </div>

                <div className="auth-row-2col">
                  {/* Date of Birth */}
                  <div className="auth-field-group">
                    <label className="auth-label">Date of Birth</label>
                    <div className="auth-input-wrapper">
                      <Calendar size={17} className="auth-field-icon" />
                      <input 
                        type="date"
                        value={patientDob}
                        onChange={(e) => setPatientDob(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                    </div>
                  </div>

                  {/* Gender Select */}
                  <div className="auth-field-group">
                    <label className="auth-label">Gender</label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value)}
                      className="auth-select-control"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other / Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="auth-field-group">
                  <label className="auth-label">Phone Number</label>
                  <div className="auth-input-wrapper">
                    <Phone size={17} className="auth-field-icon" />
                    <input 
                      type="tel"
                      placeholder="+91 98220 12345"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="auth-input-control"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Emergency Contact */}
              <div className="auth-section-block">
                <div className="auth-section-header">
                  <h3 className="auth-section-title">Emergency Contact</h3>
                </div>

                <div className="auth-row-2col">
                  <div className="auth-field-group">
                    <label className="auth-label">Emergency Contact Name</label>
                    <div className="auth-input-wrapper">
                      <User size={17} className="auth-field-icon" />
                      <input 
                        type="text"
                        placeholder="Amina Mulla (Mother / Guardian)"
                        value={emergencyName}
                        onChange={(e) => setEmergencyName(e.target.value)}
                        className="auth-input-control"
                      />
                    </div>
                  </div>

                  <div className="auth-field-group">
                    <label className="auth-label">Emergency Contact Phone</label>
                    <div className="auth-input-wrapper">
                      <Phone size={17} className="auth-field-icon" />
                      <input 
                        type="tel"
                        placeholder="+91 98220 54321"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                        className="auth-input-control"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="auth-terms-card">
                <label className="auth-checkbox-label align-start">
                  <input 
                    type="checkbox"
                    checked={patientTermsAgreed}
                    onChange={(e) => setPatientTermsAgreed(e.target.checked)}
                    required
                  />
                  <span className="auth-terms-text">
                    I agree to the <span className="text-electric font-semibold">Terms of Service</span> and <span className="text-electric font-semibold">Privacy Policy</span>. I understand that this platform is for educational purposes and not a substitute for professional medical advice.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="auth-clean-submit-btn"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Creating Patient Account...' : 'Create Patient Account'}</span>
                <ArrowRight size={17} />
              </button>

              {/* Footer */}
              <div className="auth-clean-footer-text">
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    className="auth-switch-link"
                    onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* ========================================================
              VIEW C: HEALTHCARE PROVIDER / DOCTOR SIGN UP FORM
              ======================================================== */}
          {authMode === 'signup' && role === 'doctor' && (
            <form onSubmit={handleDoctorSignUpSubmit} className="auth-clean-form">
              
              {/* Section 1: Professional Registration */}
              <div className="auth-section-block">
                <div className="auth-section-header">
                  <h3 className="auth-section-title">Professional Registration</h3>
                  <p className="auth-section-desc">Complete your medical professional profile</p>
                </div>

                {/* First Name & Last Name */}
                <div className="auth-row-2col">
                  <div className="auth-field-group">
                    <label className="auth-label">First Name</label>
                    <div className="auth-input-wrapper">
                      <User size={17} className="auth-field-icon" />
                      <input 
                        type="text"
                        placeholder="Sneha"
                        value={doctorFirstName}
                        onChange={(e) => setDoctorFirstName(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="auth-field-group">
                    <label className="auth-label">Last Name</label>
                    <div className="auth-input-wrapper">
                      <User size={17} className="auth-field-icon" />
                      <input 
                        type="text"
                        placeholder="Patil"
                        value={doctorLastName}
                        onChange={(e) => setDoctorLastName(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Email */}
                <div className="auth-field-group">
                  <label className="auth-label">Professional Email</label>
                  <div className="auth-input-wrapper">
                    <Mail size={17} className="auth-field-icon" />
                    <input 
                      type="email"
                      placeholder="dr.sneha.patil@apexskin.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="auth-input-control"
                      required
                    />
                  </div>
                </div>

                {/* Password & Confirm Password */}
                <div className="auth-row-2col">
                  <div className="auth-field-group">
                    <label className="auth-label">Password</label>
                    <div className="auth-input-wrapper">
                      <Lock size={17} className="auth-field-icon" />
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                      <button 
                        type="button" 
                        className="auth-eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="auth-field-group">
                    <label className="auth-label">Confirm Password</label>
                    <div className="auth-input-wrapper">
                      <Lock size={17} className="auth-field-icon" />
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Professional Information */}
              <div className="auth-section-block">
                <div className="auth-section-header">
                  <h3 className="auth-section-title">Professional Information</h3>
                </div>

                {/* Medical Specialization */}
                <div className="auth-field-group">
                  <label className="auth-label">Medical Specialization</label>
                  <select
                    value={doctorSpecialization}
                    onChange={(e) => setDoctorSpecialization(e.target.value)}
                    className="auth-select-control"
                    required
                  >
                    <option value="">Select your specialization</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="General Practice">General Practice</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Family Medicine">Family Medicine</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Medical License Number & Hospital/Clinic Name */}
                <div className="auth-row-2col">
                  <div className="auth-field-group">
                    <label className="auth-label">Medical License Number</label>
                    <div className="auth-input-wrapper">
                      <FileText size={17} className="auth-field-icon" />
                      <input 
                        type="text"
                        placeholder="e.g. MMC-2018-09412 (MMC, Maharashtra)"
                        value={doctorLicenseNumber}
                        onChange={(e) => setDoctorLicenseNumber(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="auth-field-group">
                    <label className="auth-label">Hospital / Clinic Name</label>
                    <div className="auth-input-wrapper">
                      <Building size={17} className="auth-field-icon" />
                      <input 
                        type="text"
                        placeholder="Patil Dermacare & Aesthetic Clinic, Kolhapur"
                        value={doctorHospitalName}
                        onChange={(e) => setDoctorHospitalName(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Degree Certificate Upload */}
                <div className="auth-field-group">
                  <label className="auth-label">Degree Certificate Upload</label>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.png,.jpg,.jpeg"
                    style={{ display: 'none' }}
                  />

                  <div 
                    className="auth-file-upload-dropzone"
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                  >
                    {degreeCertificateFile ? (
                      <div className="auth-file-selected-badge">
                        <FileCheck size={22} color="#10B981" />
                        <div className="file-info-text">
                          <span className="file-name">{degreeCertificateFile.name}</span>
                          <span className="file-size">{(degreeCertificateFile.size / 1024).toFixed(1)} KB • Attached</span>
                        </div>
                        <span className="file-replace-tag">Change</span>
                      </div>
                    ) : (
                      <div className="auth-file-placeholder">
                        <UploadCloud size={24} className="upload-icon" />
                        <span className="upload-main-text">Upload degree or medical council registration certificate</span>
                        <span className="upload-sub-text">Supported files: PDF, JPG, PNG (Max 10MB)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="auth-terms-card">
                <label className="auth-checkbox-label align-start">
                  <input 
                    type="checkbox"
                    checked={doctorTermsAgreed}
                    onChange={(e) => setDoctorTermsAgreed(e.target.checked)}
                    required
                  />
                  <span className="auth-terms-text">
                    I agree to the <span className="text-electric font-semibold">Terms of Service</span> and <span className="text-electric font-semibold">Privacy Policy</span>. I confirm that I am a licensed healthcare professional and understand my responsibilities in providing medical advice through this platform.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="auth-clean-submit-btn"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Registering Provider...' : 'Register as Healthcare Provider'}</span>
                <ArrowRight size={17} />
              </button>

              {/* Footer */}
              <div className="auth-clean-footer-text">
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    className="auth-switch-link"
                    onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* ========================================================
              VIEW D: FORGOT PASSWORD FLOW (OTP & NEW PASSWORD)
              ======================================================== */}
          {authMode === 'forgot' && (
            <div className="auth-forgot-flow-container">
              
              {/* Step 1: Enter Registered Email */}
              {forgotStep === 1 && (
                <form onSubmit={handleSendOtp} className="auth-clean-form">
                  <div className="auth-field-group">
                    <label className="auth-label">Registered Gmail / Email</label>
                    <div className="auth-input-wrapper">
                      <Mail size={17} className="auth-field-icon" />
                      <input 
                        type="email"
                        placeholder="e.g. maliha.mulla@gmail.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="auth-input-control"
                        autoFocus
                        required
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="auth-clean-submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Sending Code...' : 'Send Verification Code'}</span>
                    <ArrowRight size={17} />
                  </button>

                  <button
                    type="button"
                    className="auth-secondary-back-link"
                    onClick={handleBackToSignIn}
                  >
                    <ArrowLeft size={15} />
                    <span>Back to Sign In</span>
                  </button>
                </form>
              )}

              {/* Step 2: Enter 6-Digit OTP & Set New Password */}
              {forgotStep === 2 && (
                <form onSubmit={handleVerifyOtpAndReset} className="auth-clean-form">
                  
                  {/* Email Target Indicator Pill */}
                  <div className="auth-email-target-pill">
                    <Mail size={14} className="text-electric" />
                    <span>Code sent to <strong>{forgotEmail}</strong></span>
                    <button 
                      type="button" 
                      className="auth-change-email-btn"
                      onClick={() => setForgotStep(1)}
                    >
                      Change
                    </button>
                  </div>

                  {/* 6-Digit OTP Segmented Input */}
                  <div className="auth-field-group">
                    <div className="auth-label-row">
                      <label className="auth-label">Enter 6-Digit Verification Code</label>
                      <button
                        type="button"
                        className="auth-resend-inline-btn"
                        onClick={handleResendOtp}
                        disabled={resendCooldown > 0}
                      >
                        {resendCooldown > 0 ? (
                          <span>Resend in {resendCooldown}s</span>
                        ) : (
                          <span className="resend-active"><RotateCcw size={12} /> Resend Now</span>
                        )}
                      </button>
                    </div>

                    <div className="auth-otp-boxes-grid">
                      {otpDigits.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpInputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className={`auth-otp-cell ${digit ? 'filled' : ''}`}
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="auth-field-group">
                    <label className="auth-label">New Password</label>
                    <div className="auth-input-wrapper">
                      <Lock size={17} className="auth-field-icon" />
                      <input 
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="At least 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                      <button 
                        type="button" 
                        className="auth-eye-btn"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        aria-label="Toggle password visibility"
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="auth-field-group">
                    <label className="auth-label">Confirm New Password</label>
                    <div className="auth-input-wrapper">
                      <Lock size={17} className="auth-field-icon" />
                      <input 
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Re-type new password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="auth-input-control"
                        required
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="auth-clean-submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Verifying & Updating...' : 'Reset Password'}</span>
                    <CheckCircle2 size={17} />
                  </button>

                  <button
                    type="button"
                    className="auth-secondary-back-link"
                    onClick={handleBackToSignIn}
                  >
                    <ArrowLeft size={15} />
                    <span>Back to Sign In</span>
                  </button>
                </form>
              )}

              {/* Step 3: Password Successfully Reset */}
              {forgotStep === 3 && (
                <div className="auth-reset-success-box">
                  <div className="auth-reset-badge">
                    <CheckCircle2 size={36} color="#10B981" />
                  </div>
                  <h3 className="auth-reset-success-heading">Password Changed!</h3>
                  <p className="auth-reset-success-desc">
                    Your password has been successfully updated for <strong>{forgotEmail}</strong>. You can now log into your account using your new credentials.
                  </p>

                  <button 
                    type="button" 
                    className="auth-clean-submit-btn"
                    onClick={handleBackToSignIn}
                  >
                    <span>Proceed to Sign In</span>
                    <ArrowRight size={17} />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
