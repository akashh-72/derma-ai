import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart2, 
  Eye, 
  Calendar, 
  Users, 
  TrendingUp, 
  Stethoscope, 
  LogOut, 
  ChevronDown, 
  ArrowLeft,
  ShieldCheck,
  Video,
  FileText,
  Sliders,
  Sparkles,
  ClipboardList,
  Menu,
  X
} from 'lucide-react';
import DoctorDashboard from './DoctorDashboard';
import DoctorAnalyses from './DoctorAnalyses';
import DoctorTriageQueue from './DoctorTriageQueue';
import DoctorAppointments from './DoctorAppointments';
import DoctorTelehealth from './DoctorTelehealth';
import DoctorPrescriptionStudio from './DoctorPrescriptionStudio';
import DoctorPatients from './DoctorPatients';
import DoctorAnalytics from './DoctorAnalytics';
import DoctorProfile from './DoctorProfile';

// Verified doctor avatar
const DEFAULT_DOC_AVATAR = "/doctors/doctor-1.jpg";

export default function DoctorLayout({ 
  user, 
  onLogout, 
  onBackToLanding, 
  initialTab = 'dashboard'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [openMenu, setOpenMenu] = useState(null); // 'queue' | 'consult' | 'care' | null
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState('queue');
  const [selectedReviewItem, setSelectedReviewItem] = useState(null);
  const [selectedPatientForRx, setSelectedPatientForRx] = useState(null);
  
  const queueMenuRef = useRef(null);
  const consultMenuRef = useRef(null);
  const careMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const timeoutRef = useRef(null);

  // Sync initial tab when changed from props
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Persist doctor active tab
  useEffect(() => {
    try {
      localStorage.setItem('dermaai_doctor_tab', activeTab);
    } catch (e) {}
  }, [activeTab]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      const inQueue = queueMenuRef.current && queueMenuRef.current.contains(event.target);
      const inConsult = consultMenuRef.current && consultMenuRef.current.contains(event.target);
      const inCare = careMenuRef.current && careMenuRef.current.contains(event.target);
      
      if (!inQueue && !inConsult && !inCare) {
        setOpenMenu(null);
      }

      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuEnter = (menuName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(menuName);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 220);
  };

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setOpenMenu(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAnalysisReview = (item) => {
    setSelectedReviewItem(item);
    setActiveTab('analyses');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchRx = (patientData) => {
    setSelectedPatientForRx(patientData);
    setActiveTab('prescriptions');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Active group indicators
  const queueTabs = ['analyses', 'triage'];
  const consultTabs = ['appointments', 'telehealth', 'prescriptions'];
  const careTabs = ['patients', 'analytics'];

  const isQueueActive = queueTabs.includes(activeTab);
  const isConsultActive = consultTabs.includes(activeTab);
  const isCareActive = careTabs.includes(activeTab);

  return (
    <div className="portal-suite-root doc-theme">
      {/* 1. Floating Capsule Pill Navigation Bar */}
      <div className="portal-floating-nav-wrapper">
        <header className="portal-pill-navbar">
          
          {/* Brand Logo & Clinician Indicator */}
          <div 
            className="portal-brand-pill"
            onClick={() => handleSelectTab('dashboard')}
            title="DermaAI Clinician Workstation"
            role="button"
            tabIndex={0}
          >
            <div className="portal-brand-icon" style={{ background: '#059669', boxShadow: '0 2px 8px rgba(5, 150, 105, 0.35)' }}>
              <Stethoscope size={18} strokeWidth={2.5} />
            </div>
            <span className="portal-brand-title">DermaAI</span>
            <span className="portal-brand-badge doc">Clinician</span>
          </div>

          {/* Navigation Links Strip with Submenus */}
          <nav className="portal-nav-links">
            
            {/* 1. Overview */}
            <button
              className={`portal-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleSelectTab('dashboard')}
            >
              <BarChart2 size={15} />
              <span>Overview</span>
            </button>

            {/* 2. Diagnostic Queue Submenu */}
            <div 
              className="portal-nav-submenu-group"
              ref={queueMenuRef}
              onMouseEnter={() => handleMenuEnter('queue')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`portal-nav-dropdown-btn ${isQueueActive ? 'active-group' : ''} ${openMenu === 'queue' ? 'open' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === 'queue' ? null : 'queue');
                }}
                aria-haspopup="true"
                aria-expanded={openMenu === 'queue'}
              >
                <Eye size={15} />
                <span>Diagnostic Queue</span>
                <span className="portal-tab-badge" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>3</span>
                <ChevronDown size={13} className={`portal-dropdown-chevron ${openMenu === 'queue' ? 'rotated' : ''}`} />
              </button>

              {openMenu === 'queue' && (
                <div className="portal-submenu-flyout">
                  <button 
                    className={`portal-submenu-item ${activeTab === 'analyses' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('analyses')}
                  >
                    <div className="portal-submenu-item-icon">
                      <Eye size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>AI Scan Reviews</span>
                        <span className="portal-submenu-tag doc-primary">Grad-CAM</span>
                      </div>
                      <span className="portal-submenu-item-desc">
                        Deep CNN classification with heatmap explainability & verification
                      </span>
                    </div>
                  </button>

                  <button 
                    className={`portal-submenu-item ${activeTab === 'triage' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('triage')}
                  >
                    <div className="portal-submenu-item-icon">
                      <Sliders size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>Priority Triage Queue</span>
                        <span className="portal-submenu-tag" style={{ background: '#FEE2E2', color: '#DC2626' }}>Urgent Flag</span>
                      </div>
                      <span className="portal-submenu-item-desc">
                        Multi-patient urgency sorting, biopsy triage & attending sign-off
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Consultations Submenu */}
            <div 
              className="portal-nav-submenu-group"
              ref={consultMenuRef}
              onMouseEnter={() => handleMenuEnter('consult')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`portal-nav-dropdown-btn ${isConsultActive ? 'active-group' : ''} ${openMenu === 'consult' ? 'open' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === 'consult' ? null : 'consult');
                }}
                aria-haspopup="true"
                aria-expanded={openMenu === 'consult'}
              >
                <Calendar size={15} />
                <span>Consultations</span>
                <ChevronDown size={13} className={`portal-dropdown-chevron ${openMenu === 'consult' ? 'rotated' : ''}`} />
              </button>

              {openMenu === 'consult' && (
                <div className="portal-submenu-flyout">
                  <button 
                    className={`portal-submenu-item ${activeTab === 'appointments' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('appointments')}
                  >
                    <div className="portal-submenu-item-icon">
                      <Calendar size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>Appointments Schedule</span>
                        <span className="portal-submenu-tag">Live Sync</span>
                      </div>
                      <span className="portal-submenu-item-desc">
                        Patient bookings calendar, clinic check-in & slot management
                      </span>
                    </div>
                  </button>

                  <button 
                    className={`portal-submenu-item ${activeTab === 'telehealth' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('telehealth')}
                  >
                    <div className="portal-submenu-item-icon">
                      <Video size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>HD Telehealth Suite</span>
                        <span className="portal-submenu-tag doc-primary">1080p Video</span>
                      </div>
                      <span className="portal-submenu-item-desc">
                        Encrypted video consultation room with live scratchpad & dermoscopy feed
                      </span>
                    </div>
                  </button>

                  <button 
                    className={`portal-submenu-item ${activeTab === 'prescriptions' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('prescriptions')}
                  >
                    <div className="portal-submenu-item-icon">
                      <FileText size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>Prescription Studio</span>
                        <span className="portal-submenu-tag" style={{ background: '#EDE9FE', color: '#7C3AED' }}>Digital Rx</span>
                      </div>
                      <span className="portal-submenu-item-desc">
                        ICD-11 linked drug formulary, dosage regimen builder & PDF exporter
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 4. Patient Care Submenu */}
            <div 
              className="portal-nav-submenu-group"
              ref={careMenuRef}
              onMouseEnter={() => handleMenuEnter('care')}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`portal-nav-dropdown-btn ${isCareActive ? 'active-group' : ''} ${openMenu === 'care' ? 'open' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === 'care' ? null : 'care');
                }}
                aria-haspopup="true"
                aria-expanded={openMenu === 'care'}
              >
                <Users size={15} />
                <span>Patient Care</span>
                <ChevronDown size={13} className={`portal-dropdown-chevron ${openMenu === 'care' ? 'rotated' : ''}`} />
              </button>

              {openMenu === 'care' && (
                <div className="portal-submenu-flyout">
                  <button 
                    className={`portal-submenu-item ${activeTab === 'patients' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('patients')}
                  >
                    <div className="portal-submenu-item-icon">
                      <Users size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>Patient Dossiers</span>
                        <span className="portal-submenu-tag">History</span>
                      </div>
                      <span className="portal-submenu-item-desc">
                        Cutaneous histories, Fitzpatrick skin phototypes & scan timelines
                      </span>
                    </div>
                  </button>

                  <button 
                    className={`portal-submenu-item ${activeTab === 'analytics' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('analytics')}
                  >
                    <div className="portal-submenu-item-icon">
                      <TrendingUp size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>Clinical Analytics</span>
                        <span className="portal-submenu-tag doc-primary">96.4% Accuracy</span>
                      </div>
                      <span className="portal-submenu-item-desc">
                        Prevalence metrics across 8 classes & AI concordance performance
                      </span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 5. Doctor Settings */}
            <button
              className={`portal-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleSelectTab('profile')}
            >
              <Stethoscope size={15} />
              <span>Practice Settings</span>
            </button>
          </nav>

          {/* Actions Strip */}
          <div className="portal-nav-actions" ref={profileMenuRef}>
            {/* Doctor Profile Chip */}
            <div 
              className="portal-user-chip"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              role="button"
              tabIndex={0}
            >
              <img 
                src={DEFAULT_DOC_AVATAR} 
                alt="Doctor Avatar" 
                className="portal-avatar-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_DOC_AVATAR;
                }}
              />
              <span className="portal-user-name">
                {user?.name ? user.name.split(' ')[0] + ' ' + (user.name.split(' ')[1] || '') : 'Dr. Sneha'}
              </span>
              <ChevronDown size={14} color="#64748B" />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="portal-mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle clinician mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="portal-profile-dropdown">
                <div className="portal-dropdown-header">
                  <h5>{user?.name || 'Dr. Sneha Patil'}</h5>
                  <p>{user?.email || 'doctor@derma-ai.org'}</p>
                </div>

                <button 
                  className="portal-dropdown-item"
                  onClick={() => {
                    handleSelectTab('profile');
                    setProfileDropdownOpen(false);
                  }}
                >
                  <Stethoscope size={16} />
                  <span>Clinician Practice Settings</span>
                </button>

                <button 
                  className="portal-dropdown-item"
                  onClick={() => {
                    handleSelectTab('analyses');
                    setProfileDropdownOpen(false);
                  }}
                >
                  <Eye size={16} />
                  <span>Review Priority Queue</span>
                </button>

                <button 
                  className="portal-dropdown-item"
                  onClick={() => {
                    handleSelectTab('prescriptions');
                    setProfileDropdownOpen(false);
                  }}
                >
                  <FileText size={16} />
                  <span>Prescription Studio</span>
                </button>

                <button 
                  className="portal-dropdown-item"
                  onClick={() => {
                    onBackToLanding();
                    setProfileDropdownOpen(false);
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>Back to Landing Page</span>
                </button>

                <div style={{ height: '1px', background: '#F1F5F9', margin: '0.4rem 0' }} />

                <button 
                  className="portal-dropdown-item danger"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onLogout();
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Mobile Backdrop & Drawer Menu */}
        {mobileMenuOpen && (
          <>
            <div 
              className="portal-mobile-backdrop" 
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="portal-mobile-drawer">
              {/* Clinician User Card */}
              <div className="portal-mobile-user-card">
                <img 
                  src={DEFAULT_DOC_AVATAR} 
                  alt="Doctor Profile" 
                  onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_DOC_AVATAR; }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user?.name || 'Dr. Sneha Patil'}
                    </span>
                    <ShieldCheck size={14} color="#059669" />
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user?.specialization || 'Attending Dermatologist • Board Certified'}
                  </span>
                </div>
              </div>

              {/* Navigation List */}
              <div className="portal-mobile-nav-list">
                {/* 1. Overview */}
                <button
                  className={`portal-mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => { handleSelectTab('dashboard'); setMobileMenuOpen(false); }}
                >
                  <BarChart2 size={16} />
                  <span>Overview (Clinician Station)</span>
                </button>

                {/* 2. Diagnostic Queue Accordion */}
                <div className="portal-mobile-accordion-group">
                  <button 
                    className={`portal-mobile-accordion-trigger ${expandedMobileGroup === 'queue' ? 'expanded' : ''}`}
                    onClick={() => setExpandedMobileGroup(expandedMobileGroup === 'queue' ? null : 'queue')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Eye size={16} color={isQueueActive ? '#059669' : '#475569'} />
                      <span style={{ fontWeight: 700, color: isQueueActive ? '#059669' : '#1E293B' }}>Diagnostic Queue</span>
                      <span className="portal-tab-badge" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>3</span>
                    </div>
                    <ChevronDown size={14} style={{ transform: expandedMobileGroup === 'queue' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </button>

                  {expandedMobileGroup === 'queue' && (
                    <div className="portal-mobile-accordion-content">
                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'analyses' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('analyses'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <Eye size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>AI Scan Reviews</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Grad-CAM heatmaps & verification</div>
                        </div>
                      </button>

                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'triage' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('triage'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <Sliders size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>Priority Triage Queue</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Urgency sorting & biopsy flags</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. Consultations Accordion */}
                <div className="portal-mobile-accordion-group">
                  <button 
                    className={`portal-mobile-accordion-trigger ${expandedMobileGroup === 'consult' ? 'expanded' : ''}`}
                    onClick={() => setExpandedMobileGroup(expandedMobileGroup === 'consult' ? null : 'consult')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Calendar size={16} color={isConsultActive ? '#059669' : '#475569'} />
                      <span style={{ fontWeight: 700, color: isConsultActive ? '#059669' : '#1E293B' }}>Consultations</span>
                    </div>
                    <ChevronDown size={14} style={{ transform: expandedMobileGroup === 'consult' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </button>

                  {expandedMobileGroup === 'consult' && (
                    <div className="portal-mobile-accordion-content">
                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'appointments' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('appointments'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <Calendar size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>Appointments Schedule</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Patient calendar & check-in</div>
                        </div>
                      </button>

                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'telehealth' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('telehealth'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <Video size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>HD Telehealth Suite</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>1080p encrypted video room</div>
                        </div>
                      </button>

                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'prescriptions' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('prescriptions'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <FileText size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>Prescription Studio</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Digital Rx builder & PDF</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Patient Care Accordion */}
                <div className="portal-mobile-accordion-group">
                  <button 
                    className={`portal-mobile-accordion-trigger ${expandedMobileGroup === 'care' ? 'expanded' : ''}`}
                    onClick={() => setExpandedMobileGroup(expandedMobileGroup === 'care' ? null : 'care')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Users size={16} color={isCareActive ? '#059669' : '#475569'} />
                      <span style={{ fontWeight: 700, color: isCareActive ? '#059669' : '#1E293B' }}>Patient Care</span>
                    </div>
                    <ChevronDown size={14} style={{ transform: expandedMobileGroup === 'care' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </button>

                  {expandedMobileGroup === 'care' && (
                    <div className="portal-mobile-accordion-content">
                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'patients' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('patients'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <Users size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>Patient Dossiers</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Histories & phototypes</div>
                        </div>
                      </button>

                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'analytics' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('analytics'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <TrendingUp size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>Clinical Analytics</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Class prevalence & AI accuracy</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* 5. Practice Settings */}
                <button
                  className={`portal-mobile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => { handleSelectTab('profile'); setMobileMenuOpen(false); }}
                >
                  <Stethoscope size={16} />
                  <span>Practice Settings & Profile</span>
                </button>

                <div style={{ height: '1px', background: '#E2E8F0', margin: '0.5rem 0' }} />

                {/* Back to Landing Page */}
                <button 
                  className="portal-mobile-nav-item"
                  onClick={() => { setMobileMenuOpen(false); onBackToLanding(); }}
                >
                  <ArrowLeft size={16} />
                  <span>Back to Landing Page</span>
                </button>

                {/* Sign Out */}
                <button 
                  className="portal-mobile-nav-item"
                  style={{ color: '#DC2626' }}
                  onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 2. Main Portal Content Canvas */}
      <main className="portal-main-container">
        {activeTab === 'dashboard' && (
          <DoctorDashboard 
            user={user}
            onNavigateTab={handleSelectTab}
            onOpenAnalysisReview={handleOpenAnalysisReview}
          />
        )}

        {activeTab === 'analyses' && (
          <DoctorAnalyses 
            user={user}
            initialReviewItem={selectedReviewItem}
            onNavigateTab={handleSelectTab}
            onProceedToPrescription={handleLaunchRx}
          />
        )}

        {activeTab === 'triage' && (
          <DoctorTriageQueue 
            onProceedToPrescription={handleLaunchRx}
            onOpenAnalysisReview={handleOpenAnalysisReview}
            onNavigateTab={handleSelectTab}
          />
        )}

        {activeTab === 'appointments' && (
          <DoctorAppointments 
            user={user}
            onNavigateTab={handleSelectTab}
            onLaunchTelehealth={(apt) => handleSelectTab('telehealth')}
          />
        )}

        {activeTab === 'telehealth' && (
          <DoctorTelehealth 
            onLaunchRxForPatient={handleLaunchRx}
            onNavigateTab={handleSelectTab}
          />
        )}

        {activeTab === 'prescriptions' && (
          <DoctorPrescriptionStudio 
            initialPatient={selectedPatientForRx}
            onNavigateTab={handleSelectTab}
          />
        )}

        {activeTab === 'patients' && (
          <DoctorPatients 
            user={user}
            onNavigateTab={handleSelectTab}
            onLaunchRx={handleLaunchRx}
          />
        )}

        {activeTab === 'analytics' && (
          <DoctorAnalytics 
            user={user}
            onNavigateTab={handleSelectTab}
          />
        )}

        {activeTab === 'profile' && (
          <DoctorProfile 
            user={user}
            onNavigateTab={handleSelectTab}
          />
        )}
      </main>
    </div>
  );
}
