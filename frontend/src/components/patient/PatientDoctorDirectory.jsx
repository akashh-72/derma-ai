import React, { useState } from 'react';
import { 
  UserCheck, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Video, 
  Building, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  X,
  Stethoscope,
  Phone,
  Sparkles,
  Info,
  Award,
  ChevronRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { DERMATOLOGISTS } from '../../data/mockData';
import { bookAppointmentInFirebase } from '../../firebase/dbService';

// Guaranteed fallback SVG if any image fails to load
const DEFAULT_DOCTOR_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' fill='none'%3E%3Crect width='120' height='120' rx='24' fill='%23EFF6FF'/%3E%3Cpath d='M60 56a18 18 0 100-36 18 18 0 000 36zm0 10c-20 0-36 14-36 30v4h72v-4c0-16-16-30-36-30z' fill='%230055FF'/%3E%3Cpath d='M53 38h14M60 31v14' stroke='%23FFFFFF' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E";

export default function PatientDoctorDirectory({ 
  user, 
  onBookSuccess, 
  selectedCondition = null,
  onNavigateTab
}) {
  const [searchQuery, setSearchQuery] = useState(selectedCondition || '');
  const [activeFilter, setActiveFilter] = useState('all'); 

  // Booking Modal State
  const [bookingDoc, setBookingDoc] = useState(null);
  const [selectedDate, setSelectedDate] = useState('Today, Oct 13');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consultType, setConsultType] = useState('telehealth'); // 'telehealth' | 'in-clinic'
  const [patientPhone, setPatientPhone] = useState('+91 98765 43210');
  const [reasonNotes, setReasonNotes] = useState(
    selectedCondition ? `Consultation for ${selectedCondition} evaluation` : 'General dermatological evaluation and skin rash review'
  );
  const [bookingSuccessData, setBookingSuccessData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile Details Modal State
  const [viewProfileDoc, setViewProfileDoc] = useState(null);

  // Filter tabs definition
  const filterTabs = [
    { id: 'all', label: 'All Specialists' },
    { id: 'today', label: '⚡ Available Today' },
    { id: 'telehealth', label: '📹 HD Telehealth' },
    { id: 'kolhapur', label: '📍 Kolhapur' },
    { id: 'pune', label: '📍 Pune' },
    { id: 'mumbai', label: '📍 Mumbai' },
    { id: 'acne', label: 'Acne & Rosacea' },
    { id: 'eczema', label: 'Eczema & Allergy' },
    { id: 'melanoma', label: 'Moles & Melanoma' },
  ];

  // Filtering doctors
  const filteredDoctors = DERMATOLOGISTS.filter(doc => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      doc.name.toLowerCase().includes(q) ||
      doc.clinicName.toLowerCase().includes(q) ||
      (doc.city && doc.city.toLowerCase().includes(q)) ||
      doc.specialties.some(s => s.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (activeFilter === 'today' && !doc.availableToday) return false;
    if (activeFilter === 'telehealth' && !doc.telehealthAvailable && !doc.specialties) return false;
    if (activeFilter === 'kolhapur' && doc.city?.toLowerCase() !== 'kolhapur') return false;
    if (activeFilter === 'pune' && doc.city?.toLowerCase() !== 'pune') return false;
    if (activeFilter === 'mumbai' && doc.city?.toLowerCase() !== 'mumbai') return false;
    if (activeFilter === 'acne' && !doc.specialties.some(s => s.toLowerCase().includes('acne'))) return false;
    if (activeFilter === 'eczema' && !doc.specialties.some(s => s.toLowerCase().includes('eczema') || s.toLowerCase().includes('dermatitis'))) return false;
    if (activeFilter === 'melanoma' && !doc.specialties.some(s => s.toLowerCase().includes('melanoma') || s.toLowerCase().includes('mole'))) return false;

    return true;
  });

  const handleOpenBooking = (doc) => {
    setBookingDoc(doc);
    setSelectedDate('Today, Oct 13');
    setSelectedSlot(doc.availableSlots?.[0] || 'Today 4:30 PM');
    setConsultType('telehealth');
    setBookingSuccessData(null);
  };

  const handleConfirmBooking = async () => {
    if (!bookingDoc || !selectedSlot) return;
    setIsSubmitting(true);

    try {
      const generatedId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApt = {
        id: generatedId,
        doctorId: bookingDoc.id,
        doctorName: bookingDoc.name,
        doctorTitle: bookingDoc.title,
        clinicName: bookingDoc.clinicName,
        address: bookingDoc.address,
        doctorImage: bookingDoc.image,
        patientId: user?.uid || user?.email || 'patient-local',
        patientName: user?.name || user?.firstName || 'Akash Patil',
        patientEmail: user?.email || 'patient@derma-ai.org',
        patientPhone: patientPhone || '+91 98765 43210',
        type: consultType,
        slot: `${selectedDate} • ${selectedSlot}`,
        date: selectedDate,
        fee: bookingDoc.fee,
        status: 'Confirmed',
        notes: reasonNotes || 'General dermatological consultation',
        diagnosis: selectedCondition || 'Clinical Evaluation',
        roomLink: consultType === 'telehealth' ? `https://meet.dermaai.health/room/${generatedId}` : null
      };

      await bookAppointmentInFirebase(newApt);

      setIsSubmitting(false);
      setBookingSuccessData(newApt);
    } catch (e) {
      console.warn("Booking error:", e);
      setIsSubmitting(false);
    }
  };

  const quickSymptoms = [
    'Itchy Rash Flare-up',
    'Severe Acne & Breakouts',
    'Suspected Fungal Ringworm',
    'Irregular Dark Mole',
    'AI Grad-CAM Review',
    'Medication Refill'
  ];

  const dateOptions = [
    { id: 'Today, Oct 13', label: 'Today (Oct 13)' },
    { id: 'Tomorrow, Oct 14', label: 'Tomorrow (Oct 14)' },
    { id: 'Thursday, Oct 15', label: 'Thursday (Oct 15)' }
  ];

  return (
    <div className="patient-doctors-clean-tab">
      
      {/* 1. Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>Find Certified Dermatologists</h1>
          <p>
            Book verified clinical evaluations and high-definition telehealth consultations with certified skin specialists.
          </p>
        </div>
      </div>

      {/* 2. Clean Search & Quick Filters Bar */}
      <div className="portal-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search 
              size={18} 
              color="#94A3B8" 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input 
              type="text"
              placeholder="Search by doctor name, clinic, city (Kolhapur, Pune, Mumbai), or condition (Eczema, Acne, Melanoma)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1.25rem 0.75rem 2.85rem',
                borderRadius: '9999px',
                border: '1.5px solid #E2E8F0',
                fontSize: '0.88rem',
                outline: 'none',
                background: '#F8FAFC',
                transition: 'all 0.2s ease',
                color: '#0F172A'
              }}
              onFocus={(e) => { e.target.style.borderColor = '#0055FF'; e.target.style.background = '#FFFFFF'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.background = '#F8FAFC'; }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748B'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Clean Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, marginRight: '0.2rem' }}>
              Filter:
            </span>
            {filterTabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveFilter(t.id)}
                style={{
                  padding: '0.4rem 0.95rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeFilter === t.id ? '1.5px solid #0055FF' : '1px solid #E2E8F0',
                  background: activeFilter === t.id ? '#0055FF' : '#FFFFFF',
                  color: activeFilter === t.id ? '#FFFFFF' : '#475569',
                  boxShadow: activeFilter === t.id ? '0 4px 10px rgba(0, 85, 255, 0.2)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {t.label}
              </button>
            ))}

            {(activeFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => { setActiveFilter('all'); setSearchQuery(''); }}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: '#FEE2E2',
                  color: '#DC2626',
                  border: '1px solid #FECACA',
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', padding: '0 0.25rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
          Showing {filteredDoctors.length} Verified Dermatologist{filteredDoctors.length !== 1 ? 's' : ''}
        </span>
        <span style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <ShieldCheck size={14} color="#059669" /> All Clinicians Verified & Board Certified
        </span>
      </div>

      {/* 3. Doctors Cards Grid */}
      <div className="doctor-directory-grid">
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="doctor-card-modern">
            <div>
              {/* Doctor Profile Header */}
              <div style={{ display: 'flex', gap: '1.1rem', marginBottom: '1.1rem', alignItems: 'flex-start' }}>
                <div className="doctor-avatar-box">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_DOCTOR_AVATAR;
                    }}
                  />
                  <span className="doctor-avatar-online-dot" />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#0F172A', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {doc.name}
                    </h3>
                    <ShieldCheck size={16} color="#0055FF" style={{ flexShrink: 0 }} />
                  </div>

                  <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '0 0 0.45rem 0', fontWeight: 500, lineHeight: 1.3 }}>
                    {doc.title}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem', color: '#B45309', fontWeight: 700, background: '#FEF3C7', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                      <Star size={12} fill="#B45309" /> {doc.rating} ({doc.reviewsCount})
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600, background: '#F1F5F9', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                      {doc.experienceYears} Yrs Exp
                    </span>
                    {doc.availableToday && (
                      <span className="doctor-status-badge today">
                        ⚡ Today
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Clinic Location Box */}
              <div style={{ 
                background: '#F8FAFC', 
                padding: '0.75rem 0.95rem', 
                borderRadius: '14px', 
                marginBottom: '1rem', 
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>
                    <Building size={14} color="#0055FF" />
                    <span>{doc.clinicName}</span>
                  </div>
                  {doc.distanceKm && (
                    <span style={{ fontSize: '0.72rem', color: '#0055FF', fontWeight: 700, background: '#EFF6FF', padding: '0.1rem 0.45rem', borderRadius: '6px' }}>
                      {doc.distanceKm} km away
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.76rem', color: '#64748B' }}>
                  <MapPin size={13} style={{ flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doc.address}</span>
                </div>
              </div>

              {/* Clinical Specialties */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {doc.specialties.map((spec, i) => (
                  <span key={i} className="doctor-specialty-pill">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row: Next Slot, Fee, Actions */}
            <div style={{ 
              borderTop: '1px solid #F1F5F9', 
              paddingTop: '1.1rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', fontWeight: 500 }}>
                  Consultation Fee
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0F172A' }}>
                  {doc.fee}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="portal-btn-secondary"
                  onClick={() => setViewProfileDoc(doc)}
                  style={{ padding: '0.55rem 0.85rem', fontSize: '0.8rem', borderRadius: '12px' }}
                  title="View clinical credentials and reviews"
                >
                  <Info size={14} />
                  <span>Profile</span>
                </button>

                <button
                  className="portal-btn-primary"
                  onClick={() => handleOpenBooking(doc)}
                  style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem', borderRadius: '12px' }}
                >
                  <Calendar size={14} />
                  <span>Book Visit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDoctors.length === 0 && (
        <div className="portal-card" style={{ textAlign: 'center', padding: '3.5rem 2rem', marginBottom: '2.5rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <UserCheck size={32} color="#94A3B8" />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>
            No Dermatologists Found Matching "{searchQuery}"
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            Try broadening your search term, clearing location filters, or viewing all verified skin specialists.
          </p>
          <button 
            className="portal-btn-primary"
            onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
          >
            Show All Specialists
          </button>
        </div>
      )}

      {/* 4. Functional Booking Modal */}
      {bookingDoc && (
        <div className="portal-modal-overlay" onClick={() => !bookingSuccessData && setBookingDoc(null)}>
          <div 
            className="portal-modal-box" 
            style={{ maxWidth: '540px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="portal-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', overflow: 'hidden', border: '2px solid #E2E8F0', flexShrink: 0 }}>
                  <img 
                    src={bookingDoc.image} 
                    alt={bookingDoc.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_DOCTOR_AVATAR; }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>Book Appointment</span>
                    <ShieldCheck size={16} color="#0055FF" />
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    {bookingDoc.name} • {bookingDoc.clinicName}
                  </span>
                </div>
              </div>

              <button className="portal-modal-close-btn" onClick={() => setBookingDoc(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="portal-modal-body">
              {bookingSuccessData ? (
                /* Success Screen with Confirmed Pass */
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    background: '#ECFDF5', 
                    color: '#059669', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1.25rem auto',
                    boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.25)'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>

                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
                    Appointment Confirmed!
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', maxWidth: '400px', margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>
                    Your visit has been recorded in the clinical appointment ledger and synced to your patient records.
                  </p>

                  {/* Confirmed Appointment Digital Pass */}
                  <div style={{ 
                    background: '#F8FAFC', 
                    border: '1.5px dashed #CBD5E1', 
                    borderRadius: '16px', 
                    padding: '1.25rem', 
                    textAlign: 'left',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.65rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Pass ID:</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0055FF' }}>{bookingSuccessData.id}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Doctor</span>
                        <strong style={{ fontSize: '0.84rem', color: '#0F172A' }}>{bookingSuccessData.doctorName}</strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Time & Slot</span>
                        <strong style={{ fontSize: '0.84rem', color: '#0F172A' }}>{bookingSuccessData.slot}</strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Consultation Mode</span>
                        <strong style={{ fontSize: '0.84rem', color: bookingSuccessData.type === 'telehealth' ? '#0055FF' : '#0F172A' }}>
                          {bookingSuccessData.type === 'telehealth' ? '📹 HD Telehealth Video' : '🏥 In-Clinic Visit'}
                        </strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Consultation Fee</span>
                        <strong style={{ fontSize: '0.84rem', color: '#059669' }}>{bookingSuccessData.fee} (Confirmed)</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                    <button 
                      className="portal-btn-primary"
                      onClick={() => {
                        setBookingDoc(null);
                        if (onBookSuccess) onBookSuccess();
                        else if (onNavigateTab) onNavigateTab('appointments');
                      }}
                      style={{ padding: '0.7rem 1.5rem', fontSize: '0.88rem' }}
                    >
                      <Calendar size={16} />
                      <span>View in My Visits</span>
                    </button>

                    <button 
                      className="portal-btn-secondary"
                      onClick={() => setBookingDoc(null)}
                      style={{ padding: '0.7rem 1.25rem', fontSize: '0.88rem' }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Booking Form */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                  
                  {/* Step 1: Mode Selector */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', display: 'block', marginBottom: '0.6rem' }}>
                      1. Select Consultation Mode
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                      <div 
                        className={`booking-mode-toggle-card ${consultType === 'telehealth' ? 'selected' : ''}`}
                        onClick={() => setConsultType('telehealth')}
                      >
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: consultType === 'telehealth' ? '#DBEAFE' : '#F1F5F9', color: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Video size={18} />
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.84rem', color: '#0F172A', display: 'block' }}>HD Telehealth</strong>
                          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Video call from home</span>
                        </div>
                      </div>

                      <div 
                        className={`booking-mode-toggle-card ${consultType === 'in-clinic' ? 'selected' : ''}`}
                        onClick={() => setConsultType('in-clinic')}
                      >
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: consultType === 'in-clinic' ? '#DBEAFE' : '#F1F5F9', color: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Building size={18} />
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.84rem', color: '#0F172A', display: 'block' }}>In-Clinic Visit</strong>
                          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Dermoscopy at clinic</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Date Selection */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', display: 'block', marginBottom: '0.5rem' }}>
                      2. Choose Date
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {dateOptions.map(d => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setSelectedDate(d.id)}
                          style={{
                            flex: 1,
                            padding: '0.55rem',
                            borderRadius: '12px',
                            border: selectedDate === d.id ? '1.5px solid #0055FF' : '1px solid #E2E8F0',
                            background: selectedDate === d.id ? '#EFF6FF' : '#FFFFFF',
                            color: selectedDate === d.id ? '#0055FF' : '#475569',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Slot Selection */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', display: 'block', marginBottom: '0.5rem' }}>
                      3. Select Time Slot
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {(bookingDoc.availableSlots || ['10:30 AM', '11:45 AM', '2:30 PM', '4:30 PM', '5:45 PM']).map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`booking-slot-pill ${selectedSlot === slot ? 'active' : ''}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Contact & Clinical Reason */}
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1E293B', display: 'block', marginBottom: '0.5rem' }}>
                      4. Consultation Reason & Notes
                    </label>

                    {/* Quick symptom pills */}
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                      {quickSymptoms.map((sym, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setReasonNotes(prev => prev ? `${prev}, ${sym}` : sym)}
                          style={{
                            padding: '0.22rem 0.55rem',
                            borderRadius: '9999px',
                            border: '1px solid #E2E8F0',
                            background: '#F8FAFC',
                            fontSize: '0.72rem',
                            color: '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          + {sym}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Describe your symptoms, flare-up duration, or mention your AI scanner results..."
                      value={reasonNotes}
                      onChange={(e) => setReasonNotes(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '12px',
                        border: '1.5px solid #E2E8F0',
                        fontSize: '0.82rem',
                        outline: 'none',
                        resize: 'none',
                        fontFamily: 'inherit',
                        color: '#0F172A'
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#0055FF'; }}
                      onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; }}
                    />
                  </div>

                  {/* Step 5: Transparent Billing Breakdown */}
                  <div style={{ 
                    background: '#F8FAFC', 
                    borderRadius: '14px', 
                    padding: '0.85rem 1rem', 
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Fee Breakdown</span>
                      <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>Doctor Fee + Platform (Waived)</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.72rem', color: '#059669', display: 'block', fontWeight: 700 }}>₹0 Platform Fee</span>
                      <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0F172A' }}>{bookingDoc.fee}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {!bookingSuccessData && (
              <div className="portal-modal-footer">
                <button 
                  className="portal-btn-secondary" 
                  onClick={() => setBookingDoc(null)}
                >
                  Cancel
                </button>
                <button 
                  className="portal-btn-primary" 
                  onClick={handleConfirmBooking}
                  disabled={isSubmitting || !selectedSlot}
                  style={{ minWidth: '160px' }}
                >
                  {isSubmitting ? (
                    <span>Securing Slot...</span>
                  ) : (
                    <>
                      <span>Confirm & Book ({bookingDoc.fee})</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Doctor Clinical Profile Details Modal */}
      {viewProfileDoc && (
        <div className="portal-modal-overlay" onClick={() => setViewProfileDoc(null)}>
          <div 
            className="portal-modal-box" 
            style={{ maxWidth: '600px' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="portal-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div className="doctor-avatar-box" style={{ width: '56px', height: '56px', borderRadius: '16px' }}>
                  <img 
                    src={viewProfileDoc.image} 
                    alt={viewProfileDoc.name} 
                    onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_DOCTOR_AVATAR; }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{viewProfileDoc.name}</span>
                    <ShieldCheck size={17} color="#0055FF" />
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    {viewProfileDoc.title} • {viewProfileDoc.experienceYears} Years Clinical Experience
                  </span>
                </div>
              </div>

              <button className="portal-modal-close-btn" onClick={() => setViewProfileDoc(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="portal-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Rating & Quick Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block' }}>Rating</span>
                  <strong style={{ fontSize: '1rem', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                    <Star size={14} fill="#D97706" /> {viewProfileDoc.rating}
                  </strong>
                </div>

                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block' }}>Reviews</span>
                  <strong style={{ fontSize: '1rem', color: '#0F172A' }}>{viewProfileDoc.reviewsCount}+ Cases</strong>
                </div>

                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block' }}>Fee</span>
                  <strong style={{ fontSize: '1rem', color: '#0055FF' }}>{viewProfileDoc.fee}</strong>
                </div>
              </div>

              {/* Clinic Info */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building size={15} color="#0055FF" /> Clinic & Location
                </h4>
                <div style={{ background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <strong style={{ fontSize: '0.86rem', color: '#0F172A', display: 'block', marginBottom: '0.2rem' }}>
                    {viewProfileDoc.clinicName}
                  </strong>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={13} /> {viewProfileDoc.address} ({viewProfileDoc.city})
                  </span>
                </div>
              </div>

              {/* Clinical Specialties */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Stethoscope size={15} color="#0055FF" /> Clinical Specialization
                </h4>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {viewProfileDoc.specialties.map((spec, i) => (
                    <span key={i} style={{ 
                      fontSize: '0.76rem', 
                      fontWeight: 600, 
                      padding: '0.25rem 0.65rem', 
                      borderRadius: '9999px', 
                      background: '#EFF6FF', 
                      color: '#0055FF', 
                      border: '1px solid #BFDBFE' 
                    }}>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Patient Reviews Snippet */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MessageSquare size={15} color="#0055FF" /> Recent Patient Testimonials
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0.75rem 0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <strong style={{ fontSize: '0.78rem', color: '#0F172A' }}>Rohan S. • Eczema Follow-up</strong>
                      <span style={{ fontSize: '0.72rem', color: '#D97706' }}>★★★★★ 5.0</span>
                    </div>
                    <p style={{ fontSize: '0.76rem', color: '#64748B', margin: 0 }}>
                      "Extremely thorough examination. Correlated the DermaAI Grad-CAM scan with clinical dermoscopy and prescribed an effective barrier cream."
                    </p>
                  </div>

                  <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0.75rem 0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <strong style={{ fontSize: '0.78rem', color: '#0F172A' }}>Anjali M. • Telehealth Video</strong>
                      <span style={{ fontSize: '0.72rem', color: '#D97706' }}>★★★★★ 5.0</span>
                    </div>
                    <p style={{ fontSize: '0.76rem', color: '#64748B', margin: 0 }}>
                      "Very punctual video call. Explained the condition calmly and gave clear instructions for skin care routine."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="portal-modal-footer">
              <button className="portal-btn-secondary" onClick={() => setViewProfileDoc(null)}>
                Close
              </button>
              <button 
                className="portal-btn-primary"
                onClick={() => {
                  const doc = viewProfileDoc;
                  setViewProfileDoc(null);
                  handleOpenBooking(doc);
                }}
              >
                <Calendar size={15} />
                <span>Book Appointment with {viewProfileDoc.name.split(' ')[1] || 'Doctor'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
