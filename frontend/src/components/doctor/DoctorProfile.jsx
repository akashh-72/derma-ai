import React, { useState } from 'react';
import { 
  Stethoscope, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Edit3, 
  Save, 
  CheckCircle2 
} from 'lucide-react';

export default function DoctorProfile({ user }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('dermaai_doctor_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return {
      fullName: user?.name || 'Dr. Sneha Patil',
      title: user?.specialization || 'MD, DNB (Dermatology & Venereology)',
      licenseNumber: user?.licenseNumber || 'MMC-2018-09412',
      clinicName: user?.clinic || 'Patil Dermacare & Aesthetic Clinic',
      address: 'Suite 302, Cyber City Medical Square, Kolhapur',
      email: user?.email || 'dr.patil@apexskin.org',
      phone: '+91 98220 88990',
      experienceYears: '12 Years',
      fee: '₹700',
      workingHours: 'Mon - Sat (10:00 AM - 07:30 PM)',
      bio: 'Certified Consultant Dermatologist specializing in atopic inflammatory dermatoses, computerized dermoscopy, and tele-dermatology triage.'
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('dermaai_doctor_profile', JSON.stringify(profile));
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (e) {}
  };

  return (
    <div className="doctor-profile-tab">
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            Clinician Profile & Practice Settings
          </h1>
          <p>
            Professional credentials, Medical Council registration, clinic consultation schedules, and telehealth parameters.
          </p>
        </div>

        <div className="portal-welcome-actions">
          {!isEditing ? (
            <button className="portal-btn-primary" onClick={() => setIsEditing(true)}>
              <Edit3 size={16} />
              <span>Edit Credentials</span>
            </button>
          ) : (
            <button className="portal-btn-primary" onClick={handleSave}>
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>

      {saveSuccess && (
        <div style={{ padding: '0.85rem 1.25rem', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '14px', color: '#065F46', fontWeight: 600, fontSize: '0.88rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} color="#059669" />
          <span>Clinician credentials & clinic settings updated successfully!</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
        {/* Left Column: Doctor Identity */}
        <div className="portal-card" style={{ margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #F1F5F9' }}>
            <img 
              src="/doctors/doctor-1.jpg" 
              alt="Doctor Avatar"
              style={{ width: '80px', height: '80px', borderRadius: '22px', objectFit: 'cover', border: '2.5px solid #0055FF', boxShadow: '0 4px 12px rgba(0, 85, 255, 0.15)' }}
              onError={(e) => { e.target.onerror = null; e.target.src = "/doctors/doctor-1.jpg"; }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>{profile.fullName}</h3>
                <ShieldCheck size={18} color="#0055FF" />
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>{profile.title}</p>
              <span className="portal-badge emerald" style={{ marginTop: '0.35rem' }}>
                Medical License: {profile.licenseNumber}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>FULL CLINICAL NAME</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={profile.fullName} 
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>{profile.fullName}</p>
              )}
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>SPECIALIZATION / QUALIFICATIONS</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={profile.title} 
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>{profile.title}</p>
              )}
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>PROFESSIONAL BIOGRAPHY</label>
              {isEditing ? (
                <textarea 
                  rows={3}
                  value={profile.bio} 
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>{profile.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Clinic & Consultation Parameters */}
        <div className="portal-card" style={{ margin: 0 }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.25rem' }}>
            Clinic & Consultation Parameters
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>CLINIC / HOSPITAL AFFILIATION</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={profile.clinicName} 
                  onChange={(e) => setProfile({ ...profile, clinicName: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>{profile.clinicName}</p>
              )}
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>CLINIC ADDRESS</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={profile.address} 
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0 }}>{profile.address}</p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>CONSULTATION FEE</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profile.fee} 
                    onChange={(e) => setProfile({ ...profile, fee: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                ) : (
                  <p style={{ fontSize: '1rem', fontWeight: 800, color: '#0055FF', margin: 0 }}>{profile.fee}</p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>WORKING HOURS</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profile.workingHours} 
                    onChange={(e) => setProfile({ ...profile, workingHours: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                ) : (
                  <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0 }}>{profile.workingHours}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
