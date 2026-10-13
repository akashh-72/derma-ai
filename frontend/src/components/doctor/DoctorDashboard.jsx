import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  Stethoscope, 
  FileText, 
  Activity, 
  Video, 
  TrendingUp, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { CLINICAL_CASES } from '../../data/mockData';
import { fetchAppointmentsFromFirebase } from '../../firebase/dbService';

export default function DoctorDashboard({ 
  user, 
  onNavigateTab, 
  onOpenAnalysisReview 
}) {
  const [appointments, setAppointments] = useState([]);
  const [pendingQueue, setPendingQueue] = useState([]);
  const [urgentCases, setUrgentCases] = useState([]);

  useEffect(() => {
    async function loadData() {
      // Mock clinical triage queue matching the 8 dataset categories
      const queue = [
        {
          id: 'SCN-8920',
          patientName: 'Kavita Sharma',
          patientAge: 48,
          patientGender: 'Female',
          predictedClass: 'Melanoma & Skin Cancer / Moles',
          confidence: 93.8,
          severity: 'Urgent',
          urgencyColor: 'red',
          timestamp: '28 mins ago',
          imageUrl: CLINICAL_CASES[5].originalImage,
          overlay: CLINICAL_CASES[5].gradcamImage,
          symptoms: 'Pigmented lesion on right scapula; noted asymmetry and dark color variegation over past 2 months.'
        },
        {
          id: 'SCN-8935',
          patientName: 'Arjun Deshmukh',
          patientAge: 26,
          patientGender: 'Male',
          predictedClass: 'Acne & Rosacea',
          confidence: 95.4,
          severity: 'Moderate',
          urgencyColor: 'amber',
          timestamp: '2 hours ago',
          imageUrl: CLINICAL_CASES[0].originalImage,
          overlay: CLINICAL_CASES[0].gradcamImage,
          symptoms: 'Facial flushing across cheeks and painful pustules.'
        },
        {
          id: 'SCN-8941',
          patientName: 'Maliha Mulla',
          patientAge: 27,
          patientGender: 'Female',
          predictedClass: 'Eczema / Atopic Dermatitis',
          confidence: 96.2,
          severity: 'Moderate',
          urgencyColor: 'amber',
          timestamp: '5 hours ago',
          imageUrl: CLINICAL_CASES[1].originalImage,
          overlay: CLINICAL_CASES[1].gradcamImage,
          symptoms: 'Pruritic excoriated plaques on bilateral antecubital flexures.'
        }
      ];

      setPendingQueue(queue);
      setUrgentCases(queue.filter(q => q.severity === 'Urgent'));

      try {
        const apts = await fetchAppointmentsFromFirebase({ doctorId: user?.uid || 'doc-1' });
        if (apts && apts.length > 0) {
          setAppointments(apts);
        } else {
          setAppointments([
            {
              id: 'APT-1082',
              patientName: 'Maliha Mulla',
              slot: 'Today, 4:30 PM',
              type: 'telehealth',
              status: 'Confirmed',
              diagnosis: 'Atopic Eczema'
            },
            {
              id: 'APT-1085',
              patientName: 'Vikram Mehta',
              slot: 'Today, 5:45 PM',
              type: 'in-clinic',
              status: 'Confirmed',
              diagnosis: 'Fungal Tinea Ringworm'
            }
          ]);
        }
      } catch (e) {}
    }
    loadData();
  }, [user]);

  return (
    <div className="doctor-dashboard-tab">
      {/* 1. Clinician Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            Clinician Workstation • <span style={{ color: '#0055FF' }}>{user?.name || 'Dr. Sneha Patil'}</span>
          </h1>
          <p>
            {user?.specialization || 'MD, DNB (Dermatology & Venereology)'} • License: {user?.licenseNumber || 'MMC-2018-09412'} • {user?.clinic || 'Patil Dermacare Clinic'}
          </p>
        </div>

        <div className="portal-welcome-actions">
          <button 
            className="portal-btn-primary"
            onClick={() => onNavigateTab('analyses')}
          >
            <Eye size={16} />
            <span>Open Triage Station</span>
          </button>
        </div>
      </div>

      {/* 2. KPI Live Cards */}
      <div className="portal-stats-grid">
        <div className="portal-stat-card" onClick={() => onNavigateTab('patients')} style={{ cursor: 'pointer' }}>
          <div className="portal-stat-icon-box blue">
            <Users size={24} />
          </div>
          <div>
            <div className="portal-stat-value">124</div>
            <div className="portal-stat-label">Active Patients</div>
          </div>
        </div>

        <div className="portal-stat-card" onClick={() => onNavigateTab('analyses')} style={{ cursor: 'pointer' }}>
          <div className="portal-stat-icon-box amber">
            <Clock size={24} />
          </div>
          <div>
            <div className="portal-stat-value">{pendingQueue.length}</div>
            <div className="portal-stat-label">Scans Awaiting Review</div>
          </div>
        </div>

        <div className="portal-stat-card" onClick={() => onNavigateTab('analyses')} style={{ cursor: 'pointer' }}>
          <div className="portal-stat-icon-box" style={{ background: '#FEF2F2', color: '#DC2626' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="portal-stat-value" style={{ color: '#DC2626' }}>{urgentCases.length}</div>
            <div className="portal-stat-label">Urgent / Melanoma Flags</div>
          </div>
        </div>

        <div className="portal-stat-card" onClick={() => onNavigateTab('appointments')} style={{ cursor: 'pointer' }}>
          <div className="portal-stat-icon-box emerald">
            <Calendar size={24} />
          </div>
          <div>
            <div className="portal-stat-value">{appointments.length}</div>
            <div className="portal-stat-label">Today's Appointments</div>
          </div>
        </div>
      </div>

      {/* 3. Urgent Triage Alert Banner */}
      {urgentCases.length > 0 && (
        <div className="portal-emergency-alert" style={{ marginBottom: '2rem' }}>
          <div className="portal-emergency-alert-icon">
            <ShieldAlert size={24} />
          </div>
          <div className="portal-emergency-alert-content" style={{ flex: 1 }}>
            <h4>PRIORITY TRIAGE QUEUE: {urgentCases[0].patientName}</h4>
            <p>
              AI Vision flagged potential <strong>{urgentCases[0].predictedClass}</strong> (Confidence: {urgentCases[0].confidence}%) with irregular border and asymmetric dermoscopic pigmentation.
            </p>
            <div style={{ marginTop: '0.65rem' }}>
              <button
                className="portal-btn-primary"
                onClick={() => onOpenAnalysisReview(urgentCases[0])}
                style={{ background: '#DC2626', padding: '0.45rem 1rem', fontSize: '0.8rem', boxShadow: '0 4px 14px rgba(220, 38, 38, 0.3)' }}
              >
                Review Urgent Scan Immediately →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Two-Column Clinical Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
        
        {/* Left Column: Triage Queue */}
        <div className="portal-card">
          <div className="portal-card-header">
            <div className="portal-card-title-group">
              <div className="portal-card-icon">
                <Clock size={18} />
              </div>
              <div>
                <h3 className="portal-card-title">Patient Lesion Review Queue</h3>
                <p className="portal-card-subtitle">Scans awaiting clinician diagnosis & sign-off</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigateTab('analyses')}
              style={{ background: 'transparent', border: 'none', color: '#0055FF', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              View All ({pendingQueue.length}) →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {pendingQueue.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenAnalysisReview(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.95rem 1rem',
                  borderRadius: '16px',
                  border: item.severity === 'Urgent' ? '1px solid #FECACA' : '1px solid #E2E8F0',
                  background: item.severity === 'Urgent' ? '#FEF2F2' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img 
                    src={item.imageUrl} 
                    alt={item.patientName}
                    style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #E2E8F0' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A' }}>
                        {item.patientName}
                      </h4>
                      <span style={{ fontSize: '0.72rem', color: '#64748B' }}>({item.patientAge}y, {item.patientGender})</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0055FF', margin: '0.15rem 0' }}>
                      {item.predictedClass} • {item.confidence}%
                    </p>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{item.timestamp}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`portal-badge ${item.severity === 'Urgent' ? 'red' : 'amber'}`}>
                    {item.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Today's Appointments Schedule */}
        <div className="portal-card">
          <div className="portal-card-header">
            <div className="portal-card-title-group">
              <div className="portal-card-icon">
                <Calendar size={18} />
              </div>
              <div>
                <h3 className="portal-card-title">Today's Consultation Schedule</h3>
                <p className="portal-card-subtitle">Confirmed in-clinic & telehealth sessions</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigateTab('appointments')}
              style={{ background: 'transparent', border: 'none', color: '#0055FF', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Full Calendar →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {appointments.map((apt) => (
              <div
                key={apt.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.95rem 1rem',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A' }}>
                      {apt.patientName}
                    </h4>
                    <span className="portal-badge blue" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                      {apt.type === 'telehealth' ? '🎥 Video' : '🏥 In-Clinic'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.78rem', color: '#64748B' }}>
                    <span style={{ fontWeight: 600, color: '#0055FF' }}>{apt.slot}</span>
                    <span>•</span>
                    <span>{apt.diagnosis}</span>
                  </div>
                </div>

                <div>
                  {apt.type === 'telehealth' ? (
                    <button
                      className="portal-btn-primary"
                      onClick={() => onNavigateTab('appointments')}
                      style={{ fontSize: '0.75rem', padding: '0.4rem 0.85rem' }}
                    >
                      <Video size={13} />
                      <span>Start Video</span>
                    </button>
                  ) : (
                    <span className="portal-badge emerald" style={{ fontSize: '0.72rem' }}>
                      Confirmed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Doctor Tool Shortcuts */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
              Clinician Workstation Tools:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              <button
                className="portal-btn-secondary"
                onClick={() => onNavigateTab('telehealth')}
                style={{ fontSize: '0.78rem', padding: '0.55rem', justifyContent: 'center' }}
              >
                <Video size={14} color="#0055FF" />
                <span>Telehealth Suite</span>
              </button>
              <button
                className="portal-btn-secondary"
                onClick={() => onNavigateTab('prescriptions')}
                style={{ fontSize: '0.78rem', padding: '0.55rem', justifyContent: 'center' }}
              >
                <FileText size={14} color="#7C3AED" />
                <span>Prescription Studio</span>
              </button>
              <button
                className="portal-btn-secondary"
                onClick={() => onNavigateTab('patients')}
                style={{ fontSize: '0.78rem', padding: '0.55rem', justifyContent: 'center' }}
              >
                <Users size={14} color="#059669" />
                <span>Patient Roster</span>
              </button>
              <button
                className="portal-btn-secondary"
                onClick={() => onNavigateTab('analytics')}
                style={{ fontSize: '0.78rem', padding: '0.55rem', justifyContent: 'center' }}
              >
                <TrendingUp size={14} color="#D97706" />
                <span>Clinical Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
