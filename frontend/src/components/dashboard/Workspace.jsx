import React, { useState, useRef, useEffect } from 'react';
import { 
  Home,
  Scan, 
  UserCheck, 
  Calendar, 
  Stethoscope, 
  MessageSquare, 
  ArrowLeft, 
  LogOut, 
  User, 
  Activity,
  Layers,
  Sparkles,
  Heart,
  FileText,
  ExternalLink,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import PatientHomeTab from './PatientHomeTab';
import ScanTab from './ScanTab';
import DoctorMatchTab from './DoctorMatchTab';
import AppointmentsTab from './AppointmentsTab';
import DoctorPortalTab from './DoctorPortalTab';
import WhatsAppSimTab from './WhatsAppSimTab';
import PatientProfileTab from './PatientProfileTab';
import BookingModal from './BookingModal';

export default function Workspace({ 
  user, 
  onLogout, 
  onBackToLanding, 
  initialTab = 'home',
  initialCondition = null
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [currentDiagnosis, setCurrentDiagnosis] = useState(initialCondition);
  const [bookingDoc, setBookingDoc] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
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

  const [appointments, setAppointments] = useState([
    {
      id: "apt-1049",
      doctorId: "doc-1",
      doctorName: "Dr. Ananya Sharma",
      clinicName: "Apex Skin & Laser Institute",
      slot: "Today 4:30 PM",
      notes: "Severe pruritus on elbow flexures",
      diagnosis: "Atopic Dermatitis (Eczema)",
      status: "Confirmed",
      date: "Oct 11, 2026"
    }
  ]);

  const handleOpenBooking = (doctor) => {
    setBookingDoc(doctor);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (newApt) => {
    setAppointments(prev => [newApt, ...prev]);
    setActiveTab('appointments');
  };

  const handleMatchDoctorsForCondition = (conditionData) => {
    setCurrentDiagnosis(conditionData);
    setActiveTab('doctors');
  };

  return (
    <div className="workspace-wrapper">
      {/* Floating Pill Capsule Navbar - Matches Landing Page Exactly */}
      <div className="floating-nav-outer-container">
        <header className="skinive-pill-navbar patient-portal-floating-navbar">
          {/* Brand Logo - Clean Icon & Brand Text Matching Landing Page */}
          <div 
            className="skinive-pill-brand" 
            onClick={() => setActiveTab('home')}
            role="button"
            tabIndex={0}
            title="DermaAI"
          >
            <div className="skinive-circle-logo">
              <Activity size={20} color="#FFFFFF" strokeWidth={2.8} />
            </div>
            <span className="skinive-pill-brand-text">DermaAI</span>
          </div>

          {/* Clean, Uncluttered Desktop Navigation Links */}
          {/* Clean, Uncluttered Desktop Navigation Links */}
          <nav className="skinive-pill-links">
            {user?.role === 'doctor' ? (
              <>
                <button 
                  className={`skinive-pill-link-btn ${activeTab === 'doctorPortal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('doctorPortal')}
                >
                  <Stethoscope size={15} />
                  <span>Clinical Triage</span>
                  <span className="portal-count-tag">3</span>
                </button>

                <button 
                  className={`skinive-pill-link-btn ${activeTab === 'scan' ? 'active' : ''}`}
                  onClick={() => setActiveTab('scan')}
                >
                  <Scan size={15} />
                  <span>AI Scanner</span>
                </button>

                <button 
                  className={`skinive-pill-link-btn ${activeTab === 'appointments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('appointments')}
                >
                  <Calendar size={15} />
                  <span>Telehealth & Roster</span>
                  {appointments.length > 0 && (
                    <span className="portal-count-tag">{appointments.length}</span>
                  )}
                </button>

                <button 
                  className={`skinive-pill-link-btn ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => setActiveTab('home')}
                >
                  <Home size={15} />
                  <span>Patient View</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  className={`skinive-pill-link-btn ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => setActiveTab('home')}
                >
                  <Home size={15} />
                  <span>Overview</span>
                </button>

                <button 
                  className={`skinive-pill-link-btn ${activeTab === 'scan' ? 'active' : ''}`}
                  onClick={() => setActiveTab('scan')}
                >
                  <Scan size={15} />
                  <span>AI Scanner</span>
                </button>

                <button 
                  className={`skinive-pill-link-btn ${activeTab === 'doctors' ? 'active' : ''}`}
                  onClick={() => setActiveTab('doctors')}
                >
                  <UserCheck size={15} />
                  <span>Doctors</span>
                </button>

                <button 
                  className={`skinive-pill-link-btn ${activeTab === 'appointments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('appointments')}
                >
                  <Calendar size={15} />
                  <span>Consultations</span>
                  {appointments.length > 0 && (
                    <span className="portal-count-tag">{appointments.length}</span>
                  )}
                </button>
              </>
            )}
          </nav>

          {/* Right Action: Profile Capsule with Hover Dropdown & Logout */}
          <div className="skinive-pill-actions">
            <div 
              className="pro-user-capsule-wrapper" 
              ref={profileMenuRef}
              onMouseEnter={() => setProfileDropdownOpen(true)}
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <div 
                className={`pro-user-capsule ${profileDropdownOpen ? 'active' : ''}`}
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                role="button"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={profileDropdownOpen}
                title="Account & Profile Menu"
              >
                <div className="user-capsule-avatar">
                  <span>{user ? user.name.charAt(0).toUpperCase() : (user?.role === 'doctor' ? 'D' : 'R')}</span>
                  <span className="user-avatar-online-dot"></span>
                </div>
                <div className="user-capsule-info">
                  <span className="user-capsule-name">{user ? user.name.split(' ')[0] : (user?.role === 'doctor' ? 'Dr. Ananya' : 'Rahul')}</span>
                  <span className="user-capsule-role-pill">{user?.role === 'doctor' ? 'Doctor' : 'Patient'}</span>
                </div>
                <ChevronDown size={14} className={`user-capsule-chevron ${profileDropdownOpen ? 'rotated' : ''}`} />
              </div>

              {/* Luxury Floating User Profile Menu Dropdown with Logout */}
              {profileDropdownOpen && (
                <div 
                  className="pro-user-dropdown-menu animate-fadeIn"
                  onMouseEnter={() => setProfileDropdownOpen(true)}
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="pro-dropdown-header">
                    <div className="pro-dropdown-avatar">
                      <span>{user ? user.name.charAt(0).toUpperCase() : (user?.role === 'doctor' ? 'D' : 'R')}</span>
                    </div>
                    <div className="pro-dropdown-meta">
                      <div className="pro-dropdown-name-row">
                        <span className="pro-dropdown-fullname">{user?.name || (user?.role === 'doctor' ? 'Dr. Ananya Sharma' : 'Rahul Sharma')}</span>
                        <span className="pro-dropdown-verified-badge">
                          <CheckCircle2 size={12} /> Verified
                        </span>
                      </div>
                      <span className="pro-dropdown-email">{user?.email || (user?.role === 'doctor' ? 'dr.ananya@apexskin.com' : 'patient@derma-ai.org')}</span>
                      <div className="pro-dropdown-status-tag">
                        <span className="live-status-dot"></span>
                        <span>{user?.role === 'doctor' ? 'License #MCI-2018-0914' : 'Clinical ID #DERMA-9104'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pro-dropdown-divider"></div>

                  <div className="pro-dropdown-links">
                    {/* Direct shortcut to Doctor Clinical Workstation */}
                    <button 
                      className="pro-dropdown-item"
                      onClick={() => { setProfileDropdownOpen(false); setActiveTab('doctorPortal'); }}
                    >
                      <div className="dropdown-item-icon bg-blue-tint">
                        <Stethoscope size={16} color="#0055FF" />
                      </div>
                      <div className="dropdown-item-text">
                        <span className="dropdown-item-title">Doctor Workstation & Triage</span>
                        <span className="dropdown-item-sub">Physician XAI Review & Digital Rx</span>
                      </div>
                    </button>

                    <button 
                      className="pro-dropdown-item"
                      onClick={() => { setProfileDropdownOpen(false); setActiveTab('home'); }}
                    >
                      <div className="dropdown-item-icon bg-blue-tint">
                        <Home size={16} color="#0055FF" />
                      </div>
                      <div className="dropdown-item-text">
                        <span className="dropdown-item-title">Patient Overview</span>
                        <span className="dropdown-item-sub">Clinical Vitals & Care Protocol</span>
                      </div>
                    </button>

                    <button 
                      className="pro-dropdown-item"
                      onClick={() => { setProfileDropdownOpen(false); setActiveTab('scan'); }}
                    >
                      <div className="dropdown-item-icon bg-blue-tint">
                        <Sparkles size={16} color="#0055FF" />
                      </div>
                      <div className="dropdown-item-text">
                        <span className="dropdown-item-title">AI Diagnostic Scanner</span>
                        <span className="dropdown-item-sub">Deep Vision & Grad-CAM Analysis</span>
                      </div>
                    </button>

                    <button 
                      className="pro-dropdown-item"
                      onClick={() => { setProfileDropdownOpen(false); setActiveTab('doctors'); }}
                    >
                      <div className="dropdown-item-icon bg-blue-tint">
                        <UserCheck size={16} color="#0055FF" />
                      </div>
                      <div className="dropdown-item-text">
                        <span className="dropdown-item-title">Smart Doctor Match</span>
                        <span className="dropdown-item-sub">Find Nearby Verified Specialists</span>
                      </div>
                    </button>

                    <button 
                      className="pro-dropdown-item"
                      onClick={() => { setProfileDropdownOpen(false); setActiveTab('appointments'); }}
                    >
                      <div className="dropdown-item-icon bg-purple-tint">
                        <Calendar size={16} color="#7C3AED" />
                      </div>
                      <div className="dropdown-item-text">
                        <span className="dropdown-item-title">Consultations & Rx</span>
                        <span className="dropdown-item-sub">Prescriptions & Visit Times</span>
                      </div>
                    </button>

                    <button 
                      className="pro-dropdown-item"
                      onClick={() => { setProfileDropdownOpen(false); setActiveTab('profile'); }}
                    >
                      <div className="dropdown-item-icon bg-emerald-tint">
                        <Heart size={16} color="#059669" />
                      </div>
                      <div className="dropdown-item-text">
                        <span className="dropdown-item-title">Skin Health Passport</span>
                        <span className="dropdown-item-sub">Fitzpatrick Scale & Triage Log</span>
                      </div>
                    </button>

                    <button 
                      className="pro-dropdown-item"
                      onClick={() => { setProfileDropdownOpen(false); setActiveTab('whatsapp'); }}
                    >
                      <div className="dropdown-item-icon bg-emerald-tint">
                        <MessageSquare size={16} color="#10B981" />
                      </div>
                      <div className="dropdown-item-text">
                        <span className="dropdown-item-title">WhatsApp AI Bot</span>
                        <span className="dropdown-item-sub">24/7 Mobile Photo Screening</span>
                      </div>
                    </button>

                    <button 
                      className="pro-dropdown-item"
                      onClick={() => { setProfileDropdownOpen(false); onBackToLanding(); }}
                    >
                      <div className="dropdown-item-icon bg-blue-tint">
                        <ExternalLink size={16} color="#0055FF" />
                      </div>
                      <div className="dropdown-item-text">
                        <span className="dropdown-item-title">Back to Landing Page</span>
                        <span className="dropdown-item-sub">DermaAI Public Information</span>
                      </div>
                    </button>
                  </div>

                  <div className="pro-dropdown-divider"></div>

                  <button 
                    className="pro-dropdown-logout-btn"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onLogout();
                    }}
                    title="Log Out of DermaAI"
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* Main Workspace Body */}
      <main className="workspace-main-content">
        <div className="container-wide">
          {activeTab === 'home' && (
            <PatientHomeTab 
              user={user}
              onNavigateTab={(tab) => setActiveTab(tab)}
              appointments={appointments}
            />
          )}

          {activeTab === 'scan' && (
            <ScanTab 
              onMatchDoctorsForCondition={handleMatchDoctorsForCondition}
              initialConditionId={currentDiagnosis?.id}
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorMatchTab 
              onSelectDoctor={handleOpenBooking}
              currentDiagnosis={currentDiagnosis}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsTab 
              appointments={appointments}
              onNewAppointmentClick={() => setActiveTab('doctors')}
            />
          )}

          {activeTab === 'profile' && (
            <PatientProfileTab 
              user={user}
              onNavigateToScan={() => setActiveTab('scan')}
              onNavigateToDoctors={() => setActiveTab('doctors')}
            />
          )}

          {activeTab === 'doctorPortal' && (
            <DoctorPortalTab />
          )}

          {activeTab === 'whatsapp' && (
            <WhatsAppSimTab 
              onMatchDoctorFromWhatsApp={handleMatchDoctorsForCondition}
            />
          )}
        </div>
      </main>

      {/* Booking Modal */}
      <BookingModal 
        doctor={bookingDoc}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onConfirmBooking={handleConfirmBooking}
        currentDiagnosis={currentDiagnosis}
      />
    </div>
  );
}
