import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Building, 
  CheckCircle2, 
  MapPin, 
  UserCheck, 
  Phone, 
  Plus, 
  Search,
  Filter,
  RefreshCw,
  X,
  Mic,
  MicOff,
  VideoOff,
  FileText,
  AlertCircle
} from 'lucide-react';
import { fetchAppointmentsFromFirebase } from '../../firebase/dbService';

const PATIENT_FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Crect width='100' height='100' rx='20' fill='%23EFF6FF'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%230055FF'/%3E%3Cpath d='M22 88c0-16 12-28 28-28s28 12 28 28' fill='%230055FF'/%3E%3C/svg%3E";

export default function DoctorAppointments({ 
  user, 
  onNavigateTab, 
  onLaunchTelehealth 
}) {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'today' | 'telehealth' | 'in-clinic'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTelehealthApt, setActiveTelehealthApt] = useState(null);
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const docId = user?.uid || user?.email || 'doc-1';
      const fetched = await fetchAppointmentsFromFirebase({ doctorId: docId });

      const baselines = [
        {
          id: 'APT-1082',
          patientName: 'Maliha Mulla',
          patientPhone: '+91 98220 12345',
          slot: 'Today, 4:30 PM',
          type: 'telehealth',
          fee: '₹700',
          status: 'Confirmed',
          diagnosis: 'Atopic Dermatitis (Eczema)',
          notes: 'Flare-up on elbow flexures following detergent contact.'
        },
        {
          id: 'APT-1085',
          patientName: 'Vikram Mehta',
          patientPhone: '+91 98220 55443',
          slot: 'Today, 5:45 PM',
          type: 'in-clinic',
          fee: '₹700',
          status: 'Confirmed',
          diagnosis: 'Fungal Tinea Ringworm',
          notes: 'Active annular expanding rash on trunk.'
        },
        {
          id: 'APT-1070',
          patientName: 'Kavita Sharma',
          patientPhone: '+91 98220 99887',
          slot: 'Tomorrow, 10:30 AM',
          type: 'in-clinic',
          fee: '₹700',
          status: 'Confirmed',
          diagnosis: 'Melanoma Evaluation (Urgent Biopsy)',
          notes: 'Scheduled for in-person dermoscopic biopsy.'
        }
      ];

      // Merge fetched with baseline
      const mergedMap = new Map();
      baselines.forEach(b => mergedMap.set(b.id, b));
      if (fetched && fetched.length > 0) {
        fetched.forEach(f => mergedMap.set(f.id, f));
      }

      setAppointmentsList(Array.from(mergedMap.values()));
    } catch (e) {
      console.warn("Appointments error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointmentsList(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    setActionNotice(`Appointment #${id} updated to ${newStatus}`);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const filtered = appointmentsList.filter(a => {
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = !q || 
      a.patientName?.toLowerCase().includes(q) || 
      a.diagnosis?.toLowerCase().includes(q) ||
      a.id?.toLowerCase().includes(q);

    if (!matchQuery) return false;

    if (activeTab === 'today') return a.slot?.includes('Today') || a.date?.includes('Today');
    if (activeTab === 'telehealth') return a.type === 'telehealth';
    if (activeTab === 'in-clinic') return a.type === 'in-clinic';
    return true;
  });

  return (
    <div className="doctor-appointments-tab">
      
      {/* 1. Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>Clinician Appointment Schedule & Telehealth</h1>
          <p>
            Manage confirmed patient consultations, launch encrypted HD telehealth rooms, and synchronize clinic arrivals.
          </p>
        </div>

        <div className="portal-welcome-actions">
          <button 
            className="portal-btn-secondary"
            onClick={loadAppointments}
            disabled={loading}
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Sync Appointments</span>
          </button>
        </div>
      </div>

      {actionNotice && (
        <div style={{ padding: '0.75rem 1.25rem', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', color: '#065F46', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={16} color="#059669" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* 2. Filter & Search Controls */}
      <div className="portal-card" style={{ padding: '1rem 1.5rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: `All Consultations (${appointmentsList.length})` },
              { id: 'today', label: `Today's Schedule (${appointmentsList.filter(a => a.slot?.includes('Today') || a.date?.includes('Today')).length})` },
              { id: 'telehealth', label: 'Virtual Telehealth' },
              { id: 'in-clinic', label: 'In-Clinic Visits' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  border: activeTab === t.id ? '1.5px solid #0055FF' : '1px solid #E2E8F0',
                  padding: '0.45rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: activeTab === t.id ? '#0055FF' : '#FFFFFF',
                  color: activeTab === t.id ? '#FFFFFF' : '#475569',
                  boxShadow: activeTab === t.id ? '0 4px 10px rgba(0, 85, 255, 0.2)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search by patient, diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 0.85rem 0.45rem 2.25rem',
                borderRadius: '9999px',
                border: '1.5px solid #E2E8F0',
                fontSize: '0.8rem',
                outline: 'none',
                background: '#F8FAFC'
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Appointments Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {filtered.map(apt => (
          <div key={apt.id} className="portal-card" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0055FF', background: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                  #{apt.id}
                </span>
                <span className={`portal-badge ${apt.status === 'Completed' ? 'emerald' : apt.status === 'Cancelled' ? 'red' : 'blue'}`}>
                  {apt.status || 'Confirmed'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.2rem' }}>
                {apt.patientName}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Phone size={13} /> {apt.patientPhone || '+91 98765 43210'}
              </p>

              <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', fontWeight: 700, color: '#0055FF' }}>
                    <Clock size={14} />
                    <span>{apt.slot || 'Today, 4:30 PM'}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>{apt.fee || '₹700'}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {apt.type === 'telehealth' ? <Video size={13} color="#0055FF" /> : <Building size={13} color="#059669" />}
                  <span>{apt.type === 'telehealth' ? 'HD Telehealth Video Consultation' : (apt.address || 'Patil Dermacare Clinic, Kolhapur')}</span>
                </div>
              </div>

              <div style={{ background: '#EFF6FF', padding: '0.75rem 0.9rem', borderRadius: '12px', fontSize: '0.78rem', color: '#1E40AF', marginBottom: '1rem', border: '1px solid #DBEAFE' }}>
                <strong>Condition: </strong>{apt.diagnosis || 'Clinical Dermatology Follow-up'}
                {apt.notes && (
                  <p style={{ margin: '0.25rem 0 0', color: '#1E3A8A', fontSize: '0.75rem', lineHeight: 1.4 }}>
                    "{apt.notes}"
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.85rem', display: 'flex', gap: '0.5rem' }}>
              {apt.type === 'telehealth' ? (
                <>
                  <button
                    className="portal-btn-primary"
                    onClick={() => setActiveTelehealthApt(apt)}
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                  >
                    <Video size={14} />
                    <span>Launch Video Call</span>
                  </button>

                  {onNavigateTab && (
                    <button
                      className="portal-btn-secondary"
                      onClick={() => onNavigateTab('telehealth')}
                      title="Open full Telehealth Suite"
                      style={{ padding: '0.55rem' }}
                    >
                      <FileText size={14} />
                    </button>
                  )}
                </>
              ) : (
                <button
                  className="portal-btn-secondary"
                  onClick={() => updateAppointmentStatus(apt.id, 'Arrived')}
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                >
                  <UserCheck size={14} />
                  <span>Mark Patient Arrived</span>
                </button>
              )}

              <button
                className="portal-btn-secondary"
                onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                style={{ fontSize: '0.78rem', padding: '0.45rem 0.75rem' }}
                title="Mark consultation completed"
              >
                <CheckCircle2 size={14} color="#059669" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="portal-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
          <Calendar size={36} color="#94A3B8" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>
            No Consultations Found
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
            No appointments match your active tab or search criteria.
          </p>
          <button 
            className="portal-btn-primary"
            onClick={() => { setActiveTab('all'); setSearchQuery(''); }}
          >
            Show All Consultations
          </button>
        </div>
      )}

      {/* 4. Live Telehealth Video Modal */}
      {activeTelehealthApt && (
        <div className="portal-modal-overlay" onClick={() => setActiveTelehealthApt(null)}>
          <div 
            className="portal-modal-box" 
            style={{ maxWidth: '840px', padding: 0, overflow: 'hidden', background: '#0F172A', border: '1px solid #334155' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Call Header */}
            <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1E293B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
                <div>
                  <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '0.98rem', fontWeight: 800 }}>
                    Consulting: {activeTelehealthApt.patientName}
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                    #{activeTelehealthApt.id} • {activeTelehealthApt.diagnosis}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setActiveTelehealthApt(null)}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Video Canvas */}
            <div style={{ height: '380px', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {cameraOff ? (
                <div style={{ textAlign: 'center', color: '#94A3B8' }}>
                  <VideoOff size={48} style={{ margin: '0 auto 0.5rem auto' }} />
                  <p>Patient Video Feed Paused</p>
                </div>
              ) : (
                <img 
                  src="/doctors/doctor-3.jpg" 
                  alt="Patient Video Feed" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = PATIENT_FALLBACK_AVATAR; }}
                />
              )}

              {/* Patient Live Pill */}
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', color: '#FFFFFF', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                <span>{activeTelehealthApt.patientName} (Live 1080p)</span>
              </div>

              {/* Doctor PIP */}
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '120px', height: '80px', borderRadius: '12px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)', background: '#1E293B', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                <img 
                  src="/doctors/doctor-1.jpg" 
                  alt="Doctor Feed" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute', bottom: '4px', left: '6px', fontSize: '0.65rem', color: '#FFFFFF', background: 'rgba(0,0,0,0.6)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                  You
                </span>
              </div>
            </div>

            {/* Controls Bar */}
            <div style={{ padding: '1rem 1.5rem', background: '#0F172A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1E293B' }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button
                  onClick={() => setMicMuted(!micMuted)}
                  style={{
                    padding: '0.55rem 0.95rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: micMuted ? '#DC2626' : '#1E293B',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  {micMuted ? <MicOff size={15} /> : <Mic size={15} />}
                  <span>{micMuted ? 'Muted' : 'Mute'}</span>
                </button>

                <button
                  onClick={() => setCameraOff(!cameraOff)}
                  style={{
                    padding: '0.55rem 0.95rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: cameraOff ? '#DC2626' : '#1E293B',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  {cameraOff ? <VideoOff size={15} /> : <Video size={15} />}
                  <span>{cameraOff ? 'Cam Off' : 'Camera'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                {onNavigateTab && (
                  <button
                    className="portal-btn-secondary"
                    onClick={() => {
                      setActiveTelehealthApt(null);
                      onNavigateTab('prescriptions');
                    }}
                    style={{ background: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', fontSize: '0.8rem' }}
                  >
                    <FileText size={15} />
                    <span>Prescription Studio</span>
                  </button>
                )}

                <button 
                  className="portal-btn-primary"
                  onClick={() => {
                    updateAppointmentStatus(activeTelehealthApt.id, 'Completed');
                    setActiveTelehealthApt(null);
                  }}
                  style={{ background: '#DC2626', fontSize: '0.8rem' }}
                >
                  Conclude Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
