import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  Scan, 
  Layers, 
  UserCheck, 
  Calendar, 
  FileText, 
  Bell, 
  HelpCircle, 
  ShieldCheck, 
  LogOut, 
  ChevronDown, 
  Activity, 
  ArrowLeft,
  Sparkles,
  Stethoscope,
  HeartPulse,
  Menu,
  X
} from 'lucide-react';
import PatientOverview from './PatientOverview';
import PatientScanner from './PatientScanner';
import PatientAnalyses from './PatientAnalyses';
import PatientDoctorDirectory from './PatientDoctorDirectory';
import PatientAppointments from './PatientAppointments';
import PatientQuestionnaire from './PatientQuestionnaire';
import PatientReminders from './PatientReminders';
import PatientGuides from './PatientGuides';
import PatientProfile from './PatientProfile';

export default function PatientLayout({ 
  user, 
  onLogout, 
  onBackToLanding, 
  initialTab = 'overview',
  onTabChange
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [clinicalMenuOpen, setClinicalMenuOpen] = useState(false);
  const [wellnessMenuOpen, setWellnessMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState('clinical');
  
  const [selectedConditionForDoc, setSelectedConditionForDoc] = useState(null);
  const [scannerInitialCaseId, setScannerInitialCaseId] = useState(null);

  const clinicalMenuRef = useRef(null);
  const wellnessMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const clinicalTimeoutRef = useRef(null);
  const wellnessTimeoutRef = useRef(null);

  const handleClinicalEnter = () => {
    if (clinicalTimeoutRef.current) clearTimeout(clinicalTimeoutRef.current);
    setClinicalMenuOpen(true);
    setWellnessMenuOpen(false);
  };

  const handleClinicalLeave = () => {
    clinicalTimeoutRef.current = setTimeout(() => {
      setClinicalMenuOpen(false);
    }, 200);
  };

  const handleWellnessEnter = () => {
    if (wellnessTimeoutRef.current) clearTimeout(wellnessTimeoutRef.current);
    setWellnessMenuOpen(true);
    setClinicalMenuOpen(false);
  };

  const handleWellnessLeave = () => {
    wellnessTimeoutRef.current = setTimeout(() => {
      setWellnessMenuOpen(false);
    }, 200);
  };

  // Sync initialTab when props update
  useEffect(() => {
    if (initialTab && initialTab !== activeTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (clinicalMenuRef.current && !clinicalMenuRef.current.contains(event.target)) {
        setClinicalMenuOpen(false);
      }
      if (wellnessMenuRef.current && !wellnessMenuRef.current.contains(event.target)) {
        setWellnessMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (onTabChange) onTabChange(tabId);
    setClinicalMenuOpen(false);
    setWellnessMenuOpen(false);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookDoctorForCondition = (condition) => {
    setSelectedConditionForDoc(condition);
    handleSelectTab('doctors');
  };

  const handleOpenScannerWithCase = (caseId) => {
    setScannerInitialCaseId(caseId);
    handleSelectTab('scanner');
  };

  const isClinicalActive = ['scanner', 'analyses', 'doctors', 'appointments'].includes(activeTab);
  const isWellnessActive = ['questionnaire', 'reminders', 'guides'].includes(activeTab);

  return (
    <div className="portal-suite-root">
      {/* 1. Floating Capsule Pill Navigation Bar with Nested Submenus */}
      <div className="portal-floating-nav-wrapper">
        <header className="portal-pill-navbar">
          {/* Brand Logo & Overview Action */}
          <div 
            className="portal-brand-pill"
            onClick={() => handleSelectTab('overview')}
            title="DermaAI Patient Portal"
            role="button"
            tabIndex={0}
          >
            <div className="portal-brand-icon">
              <Activity size={18} strokeWidth={2.8} />
            </div>
            <span className="portal-brand-title">DermaAI</span>
            <span className="portal-brand-badge">Patient</span>
          </div>

          {/* Clean Submenu Navigation Strip */}
          <nav className="portal-nav-links">
            {/* 1. Overview */}
            <button
              className={`portal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => handleSelectTab('overview')}
            >
              <Home size={15} />
              <span>Overview</span>
            </button>

            {/* 2. Clinical Hub Dropdown Submenu */}
            <div 
              className="portal-nav-submenu-group" 
              ref={clinicalMenuRef}
              onMouseEnter={handleClinicalEnter}
              onMouseLeave={handleClinicalLeave}
            >
              <button
                className={`portal-nav-dropdown-btn ${isClinicalActive ? 'active-group' : ''} ${clinicalMenuOpen ? 'open' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setClinicalMenuOpen(prev => !prev);
                  setWellnessMenuOpen(false);
                }}
                aria-haspopup="true"
                aria-expanded={clinicalMenuOpen}
              >
                <Stethoscope size={15} />
                <span>Clinical Services</span>
                <ChevronDown size={13} className={`portal-dropdown-chevron ${clinicalMenuOpen ? 'rotated' : ''}`} />
              </button>

              {clinicalMenuOpen && (
                <div className="portal-submenu-flyout">
                  {/* AI Scanner */}
                  <button
                    className={`portal-submenu-item ${activeTab === 'scanner' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('scanner')}
                  >
                    <div className="portal-submenu-item-icon">
                      <Scan size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>AI Vision Scanner</span>
                        <span className="portal-submenu-tag coming-soon">In Development</span>
                      </div>
                      <span className="portal-submenu-item-desc">Next-Gen CNN & Grad-CAM Heatmaps</span>
                    </div>
                  </button>

                  {/* My Analyses */}
                  <button
                    className={`portal-submenu-item ${activeTab === 'analyses' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('analyses')}
                  >
                    <div className="portal-submenu-item-icon">
                      <Layers size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>My Analyses</span>
                        <span className="portal-submenu-tag">Archive</span>
                      </div>
                      <span className="portal-submenu-item-desc">Historical scan records & reports</span>
                    </div>
                  </button>

                  {/* Find Doctors */}
                  <button
                    className={`portal-submenu-item ${activeTab === 'doctors' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('doctors')}
                  >
                    <div className="portal-submenu-item-icon">
                      <UserCheck size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>Find Doctors</span>
                        <span className="portal-submenu-tag primary">Book Visits</span>
                      </div>
                      <span className="portal-submenu-item-desc">Certified dermatologists & clinics</span>
                    </div>
                  </button>

                  {/* My Visits */}
                  <button
                    className={`portal-submenu-item ${activeTab === 'appointments' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('appointments')}
                  >
                    <div className="portal-submenu-item-icon">
                      <Calendar size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>My Visits</span>
                        <span className="portal-submenu-tag">Schedule</span>
                      </div>
                      <span className="portal-submenu-item-desc">Telehealth & clinic appointments</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Wellness & Health Dropdown Submenu */}
            <div 
              className="portal-nav-submenu-group" 
              ref={wellnessMenuRef}
              onMouseEnter={handleWellnessEnter}
              onMouseLeave={handleWellnessLeave}
            >
              <button
                className={`portal-nav-dropdown-btn ${isWellnessActive ? 'active-group' : ''} ${wellnessMenuOpen ? 'open' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setWellnessMenuOpen(prev => !prev);
                  setClinicalMenuOpen(false);
                }}
                aria-haspopup="true"
                aria-expanded={wellnessMenuOpen}
              >
                <HeartPulse size={15} />
                <span>Wellness & Care</span>
                <ChevronDown size={13} className={`portal-dropdown-chevron ${wellnessMenuOpen ? 'rotated' : ''}`} />
              </button>

              {wellnessMenuOpen && (
                <div className="portal-submenu-flyout">
                  {/* Health Assessment */}
                  <button
                    className={`portal-submenu-item ${activeTab === 'questionnaire' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('questionnaire')}
                  >
                    <div className="portal-submenu-item-icon">
                      <FileText size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>Health Assessment</span>
                        <span className="portal-submenu-tag">10-Step</span>
                      </div>
                      <span className="portal-submenu-item-desc">Clinical questionnaire & risk index</span>
                    </div>
                  </button>

                  {/* Daily Reminders */}
                  <button
                    className={`portal-submenu-item ${activeTab === 'reminders' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('reminders')}
                  >
                    <div className="portal-submenu-item-icon">
                      <Bell size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>Daily Reminders</span>
                        <span className="portal-submenu-tag">UV Timer</span>
                      </div>
                      <span className="portal-submenu-item-desc">Sunscreen countdown & routines</span>
                    </div>
                  </button>

                  {/* Skin Guides */}
                  <button
                    className={`portal-submenu-item ${activeTab === 'guides' ? 'active' : ''}`}
                    onClick={() => handleSelectTab('guides')}
                  >
                    <div className="portal-submenu-item-icon">
                      <HelpCircle size={16} />
                    </div>
                    <div className="portal-submenu-item-content">
                      <div className="portal-submenu-item-title">
                        <span>Skin Guides</span>
                        <span className="portal-submenu-tag">Actives</span>
                      </div>
                      <span className="portal-submenu-item-desc">Ingredients & evidence-based care</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 4. Skin Passport */}
            <button
              className={`portal-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleSelectTab('profile')}
            >
              <ShieldCheck size={15} />
              <span>Skin Passport</span>
            </button>
          </nav>

          {/* User Profile & Actions Strip */}
          <div className="portal-nav-actions" ref={profileMenuRef}>
            {/* Back to Home Button */}
            <button 
              className="portal-back-home-btn"
              onClick={onBackToLanding}
              title="Return to DermaAI Landing Page"
            >
              <ArrowLeft size={14} color="#0055FF" />
              <span>Back to Home</span>
            </button>

            {/* User Chip Profile Dropdown Trigger */}
            <div 
              className="portal-user-chip"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              role="button"
              tabIndex={0}
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" 
                alt="Patient Avatar" 
                className="portal-avatar-img"
              />
              <span className="portal-user-name">
                {user?.name || user?.firstName || 'Akash Patil'}
              </span>
              <ChevronDown size={14} color="#64748B" />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="portal-mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle patient mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="portal-profile-dropdown">
                <div className="portal-dropdown-header">
                  <h5>{user?.name || 'Akash Patil'}</h5>
                  <p>{user?.email || 'patient@derma-ai.org'}</p>
                </div>

                <button 
                  className="portal-dropdown-item"
                  onClick={() => handleSelectTab('profile')}
                >
                  <ShieldCheck size={16} />
                  <span>Skin Passport & Profile</span>
                </button>

                <button 
                  className="portal-dropdown-item"
                  onClick={() => handleSelectTab('analyses')}
                >
                  <Layers size={16} />
                  <span>My Analyses History</span>
                </button>

                <button 
                  className="portal-dropdown-item"
                  onClick={() => handleSelectTab('appointments')}
                >
                  <Calendar size={16} />
                  <span>My Appointments & Visits</span>
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
              {/* Patient User Card */}
              <div className="portal-mobile-user-card">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" 
                  alt="Patient Profile" 
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user?.name || user?.firstName || 'Akash Patil'}
                    </span>
                    <ShieldCheck size={14} color="#0055FF" />
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user?.email || 'patient@derma-ai.org'} • Verified Patient
                  </span>
                </div>
              </div>

              {/* Navigation List */}
              <div className="portal-mobile-nav-list">
                {/* 1. Overview */}
                <button
                  className={`portal-mobile-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => { handleSelectTab('overview'); setMobileMenuOpen(false); }}
                >
                  <Home size={16} />
                  <span>Overview</span>
                </button>

                {/* 2. Clinical Services Accordion */}
                <div className="portal-mobile-accordion-group">
                  <button 
                    className={`portal-mobile-accordion-trigger ${expandedMobileGroup === 'clinical' ? 'expanded' : ''}`}
                    onClick={() => setExpandedMobileGroup(expandedMobileGroup === 'clinical' ? null : 'clinical')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Stethoscope size={16} color={isClinicalActive ? '#0055FF' : '#475569'} />
                      <span style={{ fontWeight: 700, color: isClinicalActive ? '#0055FF' : '#1E293B' }}>Clinical Services</span>
                    </div>
                    <ChevronDown size={14} style={{ transform: expandedMobileGroup === 'clinical' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </button>

                  {expandedMobileGroup === 'clinical' && (
                    <div className="portal-mobile-accordion-content">
                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'scanner' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('scanner'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <Scan size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <span>AI Vision Scanner</span>
                            <span className="portal-submenu-tag coming-soon" style={{ fontSize: '0.62rem' }}>Coming Soon</span>
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Next-Gen CNN & Grad-CAM Heatmaps</div>
                        </div>
                      </button>

                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'analyses' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('analyses'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <Layers size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>My Analyses</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Historical scan records & reports</div>
                        </div>
                      </button>

                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'doctors' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('doctors'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <UserCheck size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>Find Doctors</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Certified dermatologists & clinic booking</div>
                        </div>
                      </button>

                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'appointments' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('appointments'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <Calendar size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>My Visits</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Telehealth & clinic consultations</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. Wellness & Care Accordion */}
                <div className="portal-mobile-accordion-group">
                  <button 
                    className={`portal-mobile-accordion-trigger ${expandedMobileGroup === 'wellness' ? 'expanded' : ''}`}
                    onClick={() => setExpandedMobileGroup(expandedMobileGroup === 'wellness' ? null : 'wellness')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <HeartPulse size={16} color={isWellnessActive ? '#0055FF' : '#475569'} />
                      <span style={{ fontWeight: 700, color: isWellnessActive ? '#0055FF' : '#1E293B' }}>Wellness & Care</span>
                    </div>
                    <ChevronDown size={14} style={{ transform: expandedMobileGroup === 'wellness' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </button>

                  {expandedMobileGroup === 'wellness' && (
                    <div className="portal-mobile-accordion-content">
                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'questionnaire' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('questionnaire'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <FileText size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>Health Assessment</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>10-step clinical questionnaire</div>
                        </div>
                      </button>

                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'reminders' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('reminders'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <Bell size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>Daily Reminders</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Sunscreen countdown & routines</div>
                        </div>
                      </button>

                      <button 
                        className={`portal-mobile-sub-item ${activeTab === 'guides' ? 'active' : ''}`}
                        onClick={() => { handleSelectTab('guides'); setMobileMenuOpen(false); }}
                      >
                        <div className="portal-mobile-sub-icon">
                          <HelpCircle size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>Skin Guides</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Evidence-based skincare advice</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Skin Passport */}
                <button
                  className={`portal-mobile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => { handleSelectTab('profile'); setMobileMenuOpen(false); }}
                >
                  <ShieldCheck size={16} />
                  <span>Skin Passport & Profile</span>
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
        {activeTab === 'overview' && (
          <PatientOverview 
            user={user}
            onNavigateTab={handleSelectTab}
            onOpenScannerWithCase={handleOpenScannerWithCase}
          />
        )}

        {activeTab === 'scanner' && (
          <PatientScanner 
            user={user}
            onNavigateTab={handleSelectTab}
          />
        )}

        {activeTab === 'analyses' && (
          <PatientAnalyses 
            user={user}
            onNavigateTab={handleSelectTab}
            onBookDoctorForCondition={handleBookDoctorForCondition}
          />
        )}

        {activeTab === 'doctors' && (
          <PatientDoctorDirectory 
            user={user}
            selectedCondition={selectedConditionForDoc}
            onBookSuccess={() => handleSelectTab('appointments')}
            onNavigateTab={handleSelectTab}
          />
        )}

        {activeTab === 'appointments' && (
          <PatientAppointments 
            user={user}
            onNavigateTab={handleSelectTab}
          />
        )}

        {activeTab === 'questionnaire' && (
          <PatientQuestionnaire 
            user={user}
            onNavigateTab={handleSelectTab}
          />
        )}

        {activeTab === 'reminders' && (
          <PatientReminders 
            user={user}
          />
        )}

        {activeTab === 'guides' && (
          <PatientGuides 
            onNavigateTab={handleSelectTab}
          />
        )}

        {activeTab === 'profile' && (
          <PatientProfile 
            user={user}
            onBackToLanding={onBackToLanding}
          />
        )}
      </main>
    </div>
  );
}
