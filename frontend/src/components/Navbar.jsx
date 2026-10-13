import React, { useState, useRef, useEffect } from 'react';
import { 
  Activity, 
  Menu, 
  X, 
  LogOut, 
  ArrowRight, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles, 
  UserCheck, 
  Calendar,
  Heart
} from 'lucide-react';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  user, 
  onOpenAuth, 
  onLogout, 
  onOpenScanner, 
  onOpenDoctorMatch,
  onOpenProfile,
  onOpenDoctorPortal
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clean, uncluttered navigation links requested by user
  const navLinks = [
    { label: 'About', target: '#audience' },
    { label: 'Key Features', target: '#key-features' },
    { label: 'How It Works', target: '#smart-analysis' },
    { label: 'FAQ', target: '#faq' },
    { label: 'Contact', action: 'contact' },
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (link.action === 'contact' || link.label === 'Contact') {
      setCurrentView('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.querySelector(link.target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.querySelector(link.target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="floating-nav-outer-container">
        <header className="skinive-pill-navbar">
          {/* Brand Logo - Circular Icon + Vibrant Text */}
          <div 
            className="skinive-pill-brand" 
            onClick={() => { setCurrentView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            role="button"
            tabIndex={0}
          >
            <div className="skinive-circle-logo">
              <Activity size={20} color="#FFFFFF" strokeWidth={2.8} />
            </div>
            <span className="skinive-pill-brand-text">DermaAI</span>
          </div>

          {/* Clean Desktop Navigation Links */}
          <nav className="skinive-pill-links">
            {navLinks.map((link) => {
              const isContactActive = currentView === 'contact' && link.label === 'Contact';
              return (
                <button
                  key={link.label}
                  className={`skinive-pill-link-btn ${isContactActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(link)}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Professional User Profile Capsule & CTA Button */}
          <div className="skinive-pill-actions">
            {user ? (
              <div className="pro-user-capsule-wrapper" ref={profileMenuRef}>
                <div 
                  className={`pro-user-capsule ${profileDropdownOpen ? 'active' : ''}`}
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="true"
                  aria-expanded={profileDropdownOpen}
                  title="View User Profile Menu"
                >
                  <div className="user-capsule-avatar">
                    <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                    <span className="user-avatar-online-dot"></span>
                  </div>
                  <div className="user-capsule-info">
                    <span className="user-capsule-name">{user.name ? user.name.split(' ')[0] : 'User'}</span>
                    <span className="user-capsule-role-pill">{user.role === 'doctor' ? 'Doctor' : 'Patient'}</span>
                  </div>
                  <ChevronDown size={14} className={`user-capsule-chevron ${profileDropdownOpen ? 'rotated' : ''}`} />
                </div>

                {/* Professional Luxury Floating User Profile Menu Dropdown */}
                {profileDropdownOpen && (
                  <div className="pro-user-dropdown-menu animate-fadeIn">
                    <div className="pro-dropdown-header">
                      <div className="pro-dropdown-avatar">
                        <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                      </div>
                      <div className="pro-dropdown-meta">
                        <div className="pro-dropdown-name-row">
                          <span className="pro-dropdown-fullname">{user.name}</span>
                          <span className="pro-dropdown-verified-badge">
                            <CheckCircle2 size={12} /> Verified
                          </span>
                        </div>
                        <span className="pro-dropdown-email">{user.email || 'patient@derma-ai.org'}</span>
                        <div className="pro-dropdown-status-tag">
                          <span className="live-status-dot"></span>
                          <span>{user.role === 'doctor' ? 'Clinical Staff Account' : 'Active Patient Portal'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pro-dropdown-divider"></div>

                    <div className="pro-dropdown-links">
                      {user?.role === 'doctor' ? (
                        <>
                          <button 
                            className="pro-dropdown-item"
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              if (onOpenDoctorPortal) onOpenDoctorPortal('dashboard');
                            }}
                          >
                            <div className="dropdown-item-icon bg-blue-tint">
                              <Activity size={16} color="#0055FF" />
                            </div>
                            <div className="dropdown-item-text">
                              <span className="dropdown-item-title">Clinical Dashboard</span>
                              <span className="dropdown-item-sub">Executive Metrics & Today's Schedule</span>
                            </div>
                          </button>

                          <button 
                            className="pro-dropdown-item"
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              if (onOpenDoctorPortal) onOpenDoctorPortal('triage');
                            }}
                          >
                            <div className="dropdown-item-icon bg-purple-tint">
                              <Sparkles size={16} color="#7C3AED" />
                            </div>
                            <div className="dropdown-item-text">
                              <span className="dropdown-item-title">Triage Queue & Grad-CAM</span>
                              <span className="dropdown-item-sub">Deep Vision Concordance Review</span>
                            </div>
                          </button>

                          <button 
                            className="pro-dropdown-item"
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              if (onOpenDoctorPortal) onOpenDoctorPortal('prescriptions');
                            }}
                          >
                            <div className="dropdown-item-icon bg-emerald-tint">
                              <FileText size={16} color="#059669" />
                            </div>
                            <div className="dropdown-item-text">
                              <span className="dropdown-item-title">℞ Formulary Studio</span>
                              <span className="dropdown-item-sub">Generate Certified Prescriptions</span>
                            </div>
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            className="pro-dropdown-item"
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              if (onOpenProfile) onOpenProfile();
                            }}
                          >
                            <div className="dropdown-item-icon bg-blue-tint">
                              <Activity size={16} color="#0055FF" />
                            </div>
                            <div className="dropdown-item-text">
                              <span className="dropdown-item-title">Patient Overview</span>
                              <span className="dropdown-item-sub">Vitals, Treatment Log & Scans</span>
                            </div>
                          </button>

                          <button 
                            className="pro-dropdown-item"
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              if (onOpenScanner) onOpenScanner();
                            }}
                          >
                            <div className="dropdown-item-icon bg-purple-tint">
                              <Sparkles size={16} color="#7C3AED" />
                            </div>
                            <div className="dropdown-item-text">
                              <span className="dropdown-item-title">AI Skin Scanner</span>
                              <span className="dropdown-item-sub">Deep Vision & Grad-CAM Analysis</span>
                            </div>
                          </button>

                          <button 
                            className="pro-dropdown-item"
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              if (onOpenDoctorMatch) onOpenDoctorMatch();
                            }}
                          >
                            <div className="dropdown-item-icon bg-emerald-tint">
                              <UserCheck size={16} color="#059669" />
                            </div>
                            <div className="dropdown-item-text">
                              <span className="dropdown-item-title">Consult Dermatologists</span>
                              <span className="dropdown-item-sub">Telehealth & Clinic Appointments</span>
                            </div>
                          </button>
                        </>
                      )}
                    </div>

                    <div className="pro-dropdown-divider"></div>

                    <button 
                      className="pro-dropdown-logout-btn"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                    >
                      <LogOut size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="skinive-pill-signin-btn"
                onClick={() => onOpenAuth('signin', 'patient')}
              >
                Sign In
              </button>
            )}

            {/* Pill CTA Button (Desktop Only - hidden on mobile viewports per user request) */}
            <button 
              className="skinive-pill-cta-btn desktop-only"
              onClick={onOpenScanner}
            >
              <span>START FREE SCAN</span>
            </button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button 
              className="skinive-pill-mobile-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div 
            className="skinive-mobile-backdrop" 
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="skinive-pill-mobile-drawer">
            <div className="mobile-drawer-content">
              {/* User profile card or sign-in / sign-up buttons */}
              {user ? (
                <>
                  <div className="mobile-user-profile-card">
                    <div className="mobile-user-avatar">
                      <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                    </div>
                    <div className="mobile-user-meta" style={{ flex: 1, minWidth: 0 }}>
                      <span className="mobile-user-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</span>
                      <span className="mobile-user-email" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email || 'patient@derma-ai.org'}</span>
                    </div>
                    <button 
                      className="mobile-user-logout" 
                      onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                      title="Sign Out"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>

                  <button
                    className="mobile-pill-drawer-portal-jump"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (user.role === 'doctor') {
                        if (onOpenDoctorPortal) onOpenDoctorPortal();
                        else setCurrentView('doctor');
                      } else {
                        if (onOpenProfile) onOpenProfile();
                        else setCurrentView('patient');
                      }
                    }}
                  >
                    <Sparkles size={16} color="#0055FF" />
                    <span>Go to {user.role === 'doctor' ? 'Clinician Workstation' : 'Patient Health Portal'}</span>
                    <ArrowRight size={14} />
                  </button>
                </>
              ) : (
                <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '0.65rem' }}>
                  <button
                    className="mobile-pill-drawer-signin-btn"
                    onClick={() => { setMobileMenuOpen(false); onOpenAuth('signin', 'patient'); }}
                    style={{ flex: 1 }}
                  >
                    <User size={15} />
                    <span>Sign In</span>
                  </button>
                  <button
                    className="mobile-pill-drawer-signup-btn"
                    onClick={() => { setMobileMenuOpen(false); onOpenAuth('signup', 'patient'); }}
                    style={{ flex: 1 }}
                  >
                    <span>Sign Up</span>
                  </button>
                </div>
              )}

              {/* Navigation links */}
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  className="mobile-pill-drawer-item"
                  onClick={() => handleNavClick(link)}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={15} />
                </button>
              ))}

              <div className="mobile-drawer-sep"></div>

              {/* Mobile Start Free Scan button */}
              <button 
                className="skinive-pill-cta-btn full-width"
                onClick={() => { setMobileMenuOpen(false); onOpenScanner(); }}
              >
                <span>START FREE SCAN</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modern Contact Modal */}
      {contactModalOpen && (
        <div className="analysis-modal-backdrop" onClick={() => setContactModalOpen(false)}>
          <div className="contact-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div>
                <span className="skinive-section-eyebrow">Direct Medical Support</span>
                <h3 className="contact-modal-title">Get in Touch with DermaAI</h3>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setContactModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <p className="contact-modal-subtitle">
              Have questions regarding AI triage, clinic integration, or WhatsApp screening? Our clinical tech team is here to assist.
            </p>

            <div className="contact-channels-grid">
              <div className="contact-channel-item">
                <div className="contact-icon-bubble">
                  <Mail size={20} color="#0055FF" />
                </div>
                <div>
                  <h4 className="channel-title">Email Us</h4>
                  <p className="channel-desc">support@derma-ai.org</p>
                </div>
              </div>

              <div className="contact-channel-item">
                <div className="contact-icon-bubble">
                  <Phone size={20} color="#0055FF" />
                </div>
                <div>
                  <h4 className="channel-title">Clinical Triage Hotline</h4>
                  <p className="channel-desc">+91 (020) 2550-1000</p>
                </div>
              </div>

              <div className="contact-channel-item">
                <div className="contact-icon-bubble">
                  <MessageSquare size={20} color="#0055FF" />
                </div>
                <div>
                  <h4 className="channel-title">WhatsApp Bot Service</h4>
                  <p className="channel-desc">Instant 24/7 Photo Screening</p>
                </div>
              </div>
            </div>

            <div className="contact-modal-footer">
              <button 
                className="skinive-btn-pill-primary full-width"
                onClick={() => {
                  setContactModalOpen(false);
                  onOpenScanner();
                }}
              >
                <span>Launch Clinical Scanner Now</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
