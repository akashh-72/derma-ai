import React, { useState, useEffect } from 'react';
import { 
  Scan, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  FileText, 
  Eye, 
  Layers, 
  HelpCircle, 
  Bell, 
  ShieldCheck,
  ChevronRight,
  SunMedium
} from 'lucide-react';
import { CLINICAL_CASES } from '../../data/mockData';
import { fetchUserScansFromFirebase, fetchAppointmentsFromFirebase } from '../../firebase/dbService';

export default function PatientOverview({ 
  user, 
  onNavigateTab, 
  onOpenScannerWithCase 
}) {
  const [scans, setScans] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScanModal, setSelectedScanModal] = useState(null);

  // Load live scans and appointments from Firebase & LocalStorage
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const userId = user?.uid || user?.email || 'demo-patient';
        const [scansList, aptsList] = await Promise.all([
          fetchUserScansFromFirebase(userId),
          fetchAppointmentsFromFirebase({ patientId: userId })
        ]);

        // Default samples if empty
        if (!scansList || scansList.length === 0) {
          const sample = [
            {
              id: 'scn-101',
              diseaseName: 'Eczema / Atopic Dermatitis',
              predictedClass: 'Eczema / Atopic Dermatitis',
              folderName: 'Eczema Photos',
              confidence: 96.2,
              severity: 'Moderate',
              status: 'reviewed',
              doctorNotes: 'Consistent with flexural atopic eczema. Prescribed Ceramide barrier cream twice daily and mild topical hydrocortisone 1% for 5 days.',
              createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
              imageUrl: CLINICAL_CASES[1].originalImage,
              overlay: CLINICAL_CASES[1].gradcamImage
            },
            {
              id: 'scn-102',
              diseaseName: 'Acne & Rosacea',
              predictedClass: 'Acne & Rosacea',
              folderName: 'Acne And Rosacea Photos',
              confidence: 94.8,
              severity: 'Low - Moderate',
              status: 'pending',
              createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
              imageUrl: CLINICAL_CASES[0].originalImage,
              overlay: CLINICAL_CASES[0].gradcamImage
            }
          ];
          setScans(sample);
        } else {
          setScans(scansList);
        }

        if (aptsList && aptsList.length > 0) {
          setAppointments(aptsList);
        } else {
          setAppointments([
            {
              id: 'apt-01',
              doctorName: 'Dr. Sneha Patil',
              clinicName: 'Patil Dermacare Clinic',
              date: 'Tomorrow, 4:30 PM',
              status: 'Confirmed',
              type: 'In-Clinic'
            }
          ]);
        }
      } catch (e) {
        console.warn("Overview data load fallback:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  // Derived stats
  const totalScans = scans.length;
  const pendingCount = scans.filter(s => s.status === 'pending' || !s.status).length;
  const reviewedCount = scans.filter(s => s.status === 'reviewed' || s.status === 'completed').length;
  const upcomingApts = appointments.filter(a => a.status === 'Confirmed' || a.status === 'pending').length;

  return (
    <div className="patient-overview-tab">
      {/* 1. Welcome Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            Welcome back, <span style={{ color: '#0055FF' }}>{user?.name || user?.firstName || 'Akash Patil'}</span> 👋
          </h1>
          <p>
            Monitor your skin health trajectory, review AI Grad-CAM analyses, and connect with certified dermatologists.
          </p>
        </div>

        <div className="portal-welcome-actions">
          <button 
            className="portal-btn-primary"
            onClick={() => onNavigateTab('scanner')}
          >
            <Scan size={16} />
            <span>Launch AI Scanner</span>
          </button>
          <button 
            className="portal-btn-secondary"
            onClick={() => onNavigateTab('doctors')}
          >
            <Calendar size={16} />
            <span>Book Visit</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Live Statistics Grid */}
      <div className="portal-stats-grid">
        <div className="portal-stat-card" onClick={() => onNavigateTab('analyses')} style={{ cursor: 'pointer' }}>
          <div className="portal-stat-icon-box blue">
            <Scan size={24} />
          </div>
          <div>
            <div className="portal-stat-value">{totalScans}</div>
            <div className="portal-stat-label">Total AI Scans</div>
          </div>
        </div>

        <div className="portal-stat-card" onClick={() => onNavigateTab('analyses')} style={{ cursor: 'pointer' }}>
          <div className="portal-stat-icon-box amber">
            <Clock size={24} />
          </div>
          <div>
            <div className="portal-stat-value">{pendingCount}</div>
            <div className="portal-stat-label">Pending Doctor Review</div>
          </div>
        </div>

        <div className="portal-stat-card" onClick={() => onNavigateTab('analyses')} style={{ cursor: 'pointer' }}>
          <div className="portal-stat-icon-box emerald">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="portal-stat-value">{reviewedCount}</div>
            <div className="portal-stat-label">Reviewed & Approved</div>
          </div>
        </div>

        <div className="portal-stat-card" onClick={() => onNavigateTab('appointments')} style={{ cursor: 'pointer' }}>
          <div className="portal-stat-icon-box purple">
            <Calendar size={24} />
          </div>
          <div>
            <div className="portal-stat-value">{upcomingApts}</div>
            <div className="portal-stat-label">Active Consultations</div>
          </div>
        </div>
      </div>

      {/* 3. Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem', marginBottom: '2rem' }}>
        
        {/* Left Column: Quick Scan Launch Card & Benchmark Cases */}
        <div>
          <div className="portal-card" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%)', borderColor: '#BFDBFE' }}>
            <div className="portal-card-header">
              <div className="portal-card-title-group">
                <div className="portal-card-icon" style={{ background: '#0055FF', color: '#FFFFFF' }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="portal-card-title">Instant AI Vision Lesion Scanner</h3>
                  <p className="portal-card-subtitle">8 Balanced Clinical Dataset Classes with Grad-CAM</p>
                </div>
              </div>
              <span className="portal-badge blue">Deep CNN</span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              Upload any clear dermoscopic or camera photo of an unfamiliar skin spot, rash, or mole. Our deep learning model classifies condition probability and generates instant visual heatmaps.
            </p>

            {/* Quick Upload Dropzone Target */}
            <div 
              className="portal-upload-zone"
              onClick={() => onNavigateTab('scanner')}
              style={{ padding: '1.75rem 1rem', background: '#FFFFFF', marginBottom: '1.25rem' }}
            >
              <div className="portal-upload-icon-circle" style={{ width: '48px', height: '48px' }}>
                <Scan size={22} />
              </div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>
                Take or Upload Photo to Scan
              </h4>
              <p style={{ fontSize: '0.78rem', color: '#64748B' }}>
                Supports JPG, PNG, WEBP (Max 5MB)
              </p>
            </div>

            {/* Benchmark Test Strip */}
            <div style={{ borderTop: '1px solid #DBEAFE', paddingTop: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Or Test Verified Benchmark Case:
              </span>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {CLINICAL_CASES.slice(0, 4).map(c => (
                  <button
                    key={c.id}
                    onClick={() => onOpenScannerWithCase(c.id)}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '9999px',
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#0055FF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#0055FF'; e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = '#0055FF'; }}
                  >
                    {c.name.split('/')[0]} ({c.confidence}%)
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Skincare Tip Banner */}
          <div className="portal-card" style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F59E0B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <SunMedium size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#92400E', marginBottom: '0.25rem' }}>
                  Daily Clinical Skincare Tip: Broad-Spectrum UV Defense
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#B45309', lineHeight: 1.5 }}>
                  Even on overcast days, up to 80% of UV rays penetrate cloud cover. Reapply broad-spectrum SPF 30+ mineral sunscreen every 2 to 3 hours to prevent photodamage and melanocytic alterations.
                </p>
                <button
                  onClick={() => onNavigateTab('guides')}
                  style={{
                    marginTop: '0.75rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#92400E',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span>Explore Skincare & Wellness Guides</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Scans History & Quick Shortcuts */}
        <div>
          <div className="portal-card">
            <div className="portal-card-header">
              <div className="portal-card-title-group">
                <div className="portal-card-icon">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="portal-card-title">Recent Skin Scans</h3>
                  <p className="portal-card-subtitle">Latest AI Vision diagnostic entries</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigateTab('analyses')}
                style={{ background: 'transparent', border: 'none', color: '#0055FF', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
              >
                View All Scans →
              </button>
            </div>

            {/* Scans List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {scans.slice(0, 3).map((scan) => {
                const isReviewed = scan.status === 'reviewed' || scan.status === 'completed';
                return (
                  <div
                    key={scan.id}
                    onClick={() => setSelectedScanModal(scan)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                      background: '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#0055FF';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 85, 255, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img 
                        src={scan.imageUrl || scan.preview || CLINICAL_CASES[1].originalImage} 
                        alt="Scan thumbnail" 
                        style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #E2E8F0' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.15rem' }}>
                          {scan.diseaseName || scan.predictedClass || 'Dermatological Scan'}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {new Date(scan.createdAt || scan.timestamp || Date.now()).toLocaleDateString()}
                          </span>
                          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#0055FF' }}>
                            {scan.confidence ? `${scan.confidence}%` : 'High confidence'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className={`portal-badge ${isReviewed ? 'emerald' : 'amber'}`}>
                        {isReviewed ? 'Reviewed by Doctor' : 'Pending Review'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Action Clinical Grid */}
          <div className="portal-card">
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
              Quick Clinical Navigation
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                onClick={() => onNavigateTab('questionnaire')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.85rem',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  background: '#F8FAFC',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0055FF'; e.currentTarget.style.background = '#EFF6FF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', color: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>Questionnaire</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>10-step health check</div>
                </div>
              </button>

              <button
                onClick={() => onNavigateTab('reminders')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.85rem',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  background: '#F8FAFC',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0055FF'; e.currentTarget.style.background = '#EFF6FF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', color: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bell size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>Reminders</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Sunscreen & Rx</div>
                </div>
              </button>

              <button
                onClick={() => onNavigateTab('guides')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.85rem',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  background: '#F8FAFC',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0055FF'; e.currentTarget.style.background = '#EFF6FF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', color: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HelpCircle size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>Skin Guides</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Tips & Actives</div>
                </div>
              </button>

              <button
                onClick={() => onNavigateTab('profile')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.85rem',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  background: '#F8FAFC',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0055FF'; e.currentTarget.style.background = '#EFF6FF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', color: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>Skin Passport</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Profile & Phototype</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quick Scan Details Modal */}
      {selectedScanModal && (
        <div className="portal-modal-overlay" onClick={() => setSelectedScanModal(null)}>
          <div className="portal-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="portal-modal-header">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>
                Lesion Analysis Record #{selectedScanModal.id?.substring(0, 8)}
              </h3>
              <button 
                onClick={() => setSelectedScanModal(null)}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                ✕
              </button>
            </div>

            <div className="portal-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>ORIGINAL LESION IMAGE</span>
                  <img 
                    src={selectedScanModal.imageUrl || selectedScanModal.preview} 
                    alt="Original lesion"
                    style={{ width: '100%', height: '220px', borderRadius: '16px', objectFit: 'cover', border: '1px solid #E2E8F0' }}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>GRAD-CAM EXPLAINABILITY MAP</span>
                  <img 
                    src={selectedScanModal.overlay || selectedScanModal.imageUrl} 
                    alt="Grad-CAM heatmap"
                    style={{ width: '100%', height: '220px', borderRadius: '16px', objectFit: 'cover', border: '1px solid #E2E8F0' }}
                  />
                </div>
              </div>

              <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '1.25rem', marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>
                    {selectedScanModal.diseaseName || selectedScanModal.predictedClass}
                  </h4>
                  <span className={`portal-badge ${selectedScanModal.status === 'reviewed' ? 'emerald' : 'amber'}`}>
                    {selectedScanModal.status === 'reviewed' ? 'Reviewed & Confirmed' : 'Pending Review'}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
                  {selectedScanModal.description || 'Neural network activation indicates high feature correlation for this condition.'}
                </p>
              </div>

              {selectedScanModal.doctorNotes && (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <UserCheck size={18} color="#059669" />
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#065F46' }}>Dermatologist Clinical Notes & Prescription</h5>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#047857', lineHeight: 1.5 }}>
                    {selectedScanModal.doctorNotes}
                  </p>
                </div>
              )}
            </div>

            <div className="portal-modal-footer">
              <button 
                className="portal-btn-secondary"
                onClick={() => setSelectedScanModal(null)}
              >
                Close
              </button>
              <button 
                className="portal-btn-primary"
                onClick={() => {
                  setSelectedScanModal(null);
                  onNavigateTab('doctors');
                }}
              >
                <Calendar size={14} />
                <span>Book Dermatologist Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
