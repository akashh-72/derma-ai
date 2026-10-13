import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  Building, 
  CheckCircle2, 
  AlertTriangle, 
  Phone, 
  UserCheck, 
  XCircle,
  FileText,
  Mic,
  MicOff,
  VideoOff,
  Sparkles
} from 'lucide-react';
import { fetchAppointmentsFromFirebase } from '../../firebase/dbService';

export default function PatientAppointments({ 
  user, 
  onNavigateTab 
}) {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'
  const [activeTelehealthRoom, setActiveTelehealthRoom] = useState(null);
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  useEffect(() => {
    async function loadAppointments() {
      try {
        const userId = user?.uid || user?.email || 'patient-local';
        const list = await fetchAppointmentsFromFirebase({ patientId: userId });
        if (list && list.length > 0) {
          setAppointments(list);
        } else {
          // Pre-populate with baseline appointments
          const baselines = [
            {
              id: 'APT-1082',
              doctorId: 'doc-1',
              doctorName: 'Dr. Sneha Patil',
              doctorTitle: 'MD, DNB (Dermatology & Venereology)',
              clinicName: 'Patil Dermacare & Aesthetic Clinic',
              address: 'Suite 302, Cyber City Medical Square, Kolhapur',
              doctorImage: '/doctors/doctor-1.jpg',
              type: 'telehealth',
              slot: 'Today, 4:30 PM',
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              fee: '₹700',
              status: 'Confirmed',
              notes: 'Severe pruritus on elbow flexures, flare-up post detergent exposure',
              diagnosis: 'Atopic Dermatitis (Eczema)'
            },
            {
              id: 'APT-1049',
              doctorId: 'doc-2',
              doctorName: 'Dr. Rajesh Kulkarni',
              doctorTitle: 'MBBS, MD - Dermatology, FAAD',
              clinicName: 'Kulkarni Dermacare Center',
              address: '24 Station Road, Near Central Hospital, Kolhapur',
              doctorImage: '/doctors/doctor-2.jpg',
              type: 'in-clinic',
              slot: 'Oct 02, 2026 at 11:30 AM',
              date: 'Oct 02, 2026',
              fee: '₹800',
              status: 'Completed',
              notes: 'Follow-up dermoscopy of right forearm melanocytic nevus. Lesion stable, no malignant features.',
              diagnosis: 'Benign Melanocytic Nevus'
            }
          ];
          setAppointments(baselines);
        }
      } catch (err) {
        console.warn("Failed loading appointments:", err);
      }
    }
    loadAppointments();
  }, [user]);

  const upcomingApts = appointments.filter(a => a.status === 'Confirmed' || a.status === 'pending');
  const pastApts = appointments.filter(a => a.status === 'Completed' || a.status === 'Cancelled');
  const currentList = activeTab === 'upcoming' ? upcomingApts : pastApts;

  const handleCancelAppointment = (aptId) => {
    if (window.confirm("Are you sure you wish to cancel this dermatology appointment?")) {
      setAppointments(prev => prev.map(a => a.id === aptId ? { ...a, status: 'Cancelled' } : a));
    }
  };

  return (
    <div className="patient-appointments-tab">
      {/* 1. Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            My Dermatologist Visits & Telehealth
          </h1>
          <p>
            Track your confirmed clinical visits, manage follow-up schedules, and launch encrypted telehealth consultations.
          </p>
        </div>

        <div className="portal-welcome-actions">
          <button 
            className="portal-btn-primary"
            onClick={() => onNavigateTab('doctors')}
          >
            <Calendar size={16} />
            <span>Book New Appointment</span>
          </button>
        </div>
      </div>

      {/* 2. Tabs Switcher */}
      <div className="portal-card" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('upcoming')}
            style={{
              border: 'none',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'upcoming' ? '#0055FF' : '#F1F5F9',
              color: activeTab === 'upcoming' ? '#FFFFFF' : '#475569',
              transition: 'all 0.15s ease'
            }}
          >
            Upcoming Consultations ({upcomingApts.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            style={{
              border: 'none',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'past' ? '#0055FF' : '#F1F5F9',
              color: activeTab === 'past' ? '#FFFFFF' : '#475569',
              transition: 'all 0.15s ease'
            }}
          >
            Past Clinical History ({pastApts.length})
          </button>
        </div>
      </div>

      {/* 3. Appointment Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {currentList.map(apt => {
          const isTelehealth = apt.type === 'telehealth';
          const isConfirmed = apt.status === 'Confirmed';

          return (
            <div 
              key={apt.id} 
              className="portal-card"
              style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* Header status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>
                    REF #{apt.id}
                  </span>
                  <span className={`portal-badge ${apt.status === 'Confirmed' ? 'emerald' : apt.status === 'Completed' ? 'blue' : 'amber'}`}>
                    {apt.status}
                  </span>
                </div>

                {/* Doctor profile snippet */}
                <div style={{ display: 'flex', gap: '0.9rem', marginBottom: '1rem' }}>
                  <img 
                    src={apt.doctorImage || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400'} 
                    alt={apt.doctorName}
                    style={{ width: '56px', height: '56px', borderRadius: '16px', objectFit: 'cover', border: '1px solid #E2E8F0' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.15rem' }}>
                      {apt.doctorName}
                    </h3>
                    <p style={{ fontSize: '0.76rem', color: '#64748B', marginBottom: '0.3rem' }}>{apt.doctorTitle}</p>
                    <span className="portal-badge blue" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                      {isTelehealth ? '🎥 HD Telehealth Video' : '🏥 In-Clinic Consultation'}
                    </span>
                  </div>
                </div>

                {/* Schedule box */}
                <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '14px', border: '1px solid #E2E8F0', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>
                    <Clock size={15} color="#0055FF" />
                    <span>{apt.slot || apt.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.76rem', color: '#64748B' }}>
                    <MapPin size={14} />
                    <span>{apt.clinicName}</span>
                  </div>
                </div>

                {/* Clinical Notes / Diagnostic Focus */}
                {apt.notes && (
                  <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '0.75rem 0.9rem', borderRadius: '12px', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase', display: 'block', marginBottom: '0.15rem' }}>
                      Clinical Reason & Diagnostic Focus:
                    </span>
                    <p style={{ fontSize: '0.78rem', color: '#1E3A8A', margin: 0, lineHeight: 1.4 }}>
                      {apt.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.85rem', display: 'flex', gap: '0.65rem' }}>
                {isConfirmed && isTelehealth && (
                  <button
                    className="portal-btn-primary"
                    onClick={() => setActiveTelehealthRoom(apt)}
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                  >
                    <Video size={14} />
                    <span>Launch Telehealth Room</span>
                  </button>
                )}

                {isConfirmed && !isTelehealth && (
                  <button
                    className="portal-btn-secondary"
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }}
                    onClick={() => alert(`Clinic Address: ${apt.address || apt.clinicName}`)}
                  >
                    <Building size={14} />
                    <span>Clinic Directions</span>
                  </button>
                )}

                {isConfirmed && (
                  <button
                    onClick={() => handleCancelAppointment(apt.id)}
                    style={{
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      color: '#DC2626',
                      borderRadius: '9999px',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {currentList.length === 0 && (
        <div className="portal-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <Calendar size={42} color="#94A3B8" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
            No appointments found in this view
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Schedule an appointment with our smart matched dermatologists.
          </p>
          <button 
            className="portal-btn-primary"
            onClick={() => onNavigateTab('doctors')}
          >
            Find Dermatologists
          </button>
        </div>
      )}

      {/* 4. Encrypted Telehealth Video Consultation Room Modal */}
      {activeTelehealthRoom && (
        <div className="portal-modal-overlay">
          <div className="portal-modal-box" style={{ maxWidth: '860px', padding: 0, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                  Telehealth Room: {activeTelehealthRoom.doctorName}
                </h3>
              </div>
              <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.15)', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: 600 }}>
                End-to-End Encrypted (HIPAA / CE)
              </span>
            </div>

            {/* Video Canvas Stage */}
            <div style={{ background: '#000000', position: 'relative', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Doctor Video Stream Simulation */}
              <img 
                src={activeTelehealthRoom.doctorImage} 
                alt={activeTelehealthRoom.doctorName}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }}
              />

              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '0.35rem 0.85rem', borderRadius: '9999px', color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 600 }}>
                👨‍⚕️ {activeTelehealthRoom.doctorName} (Doctor Feed - Live)
              </div>

              {/* Patient Self PiP View */}
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '130px', height: '95px', borderRadius: '14px', overflow: 'hidden', border: '2px solid #FFFFFF', background: '#1E293B' }}>
                {cameraOff ? (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '0.75rem' }}>
                    Camera Off
                  </div>
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=240" 
                    alt="Self" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <span style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(0,0,0,0.6)', color: '#FFFFFF', fontSize: '0.62rem', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                  You
                </span>
              </div>
            </div>

            {/* Room Controls Bar */}
            <div style={{ padding: '1.25rem 1.5rem', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button
                  onClick={() => setMicMuted(!micMuted)}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: micMuted ? '#EF4444' : '#334155',
                    color: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title={micMuted ? 'Unmute' : 'Mute'}
                >
                  {micMuted ? <MicOff size={18} /> : <Mic size={18} />}
                </button>

                <button
                  onClick={() => setCameraOff(!cameraOff)}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: cameraOff ? '#EF4444' : '#334155',
                    color: '#FFFFFF',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title={cameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
                >
                  {cameraOff ? <VideoOff size={18} /> : <Video size={18} />}
                </button>
              </div>

              <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
                Call Duration: 04:12 • Clinical Session Active
              </span>

              <button
                onClick={() => setActiveTelehealthRoom(null)}
                style={{
                  background: '#DC2626',
                  color: '#FFFFFF',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
