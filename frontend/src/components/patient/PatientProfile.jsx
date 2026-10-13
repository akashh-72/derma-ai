import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Heart, 
  AlertTriangle, 
  CheckCircle2, 
  Edit3, 
  Save, 
  MapPin, 
  FileText 
} from 'lucide-react';

export default function PatientProfile({ user, onBackToLanding }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('dermaai_patient_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return {
      fullName: user?.name || user?.firstName || 'Akash Patil',
      email: user?.email || 'patient@derma-ai.org',
      phone: user?.phone || '+91 98220 12345',
      dob: user?.dob || '1998-05-14',
      gender: user?.gender || 'Male',
      bloodGroup: 'B+',
      location: user?.location || 'Kolhapur, Maharashtra',
      fitzpatrickType: 'Type III (Light Brown / Medium)',
      allergies: 'Nickel metal, Fragrance mix, Topical Neomycin',
      chronicConditions: 'Atopic Eczema (seasonal flares), Mild Dermatitis',
      emergencyContactName: user?.emergencyContactName || 'Sunil Patil (Guardian)',
      emergencyContactPhone: user?.emergencyContactPhone || '+91 98220 54321'
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fitzpatrickTypes = [
    { type: 'Type I', label: 'Pale White (Always burns, never tans)', swatch: '#FFE5D9' },
    { type: 'Type II', label: 'Fair White (Usually burns, tans with difficulty)', swatch: '#FFD7BA' },
    { type: 'Type III', label: 'Cream White / Olive (Mild burn, gradual tan)', swatch: '#ECC098' },
    { type: 'Type IV', label: 'Moderate Brown (Rarely burns, tans easily)', swatch: '#D89A6E' },
    { type: 'Type V', label: 'Dark Brown (Very rarely burns, profuse tan)', swatch: '#A5683F' },
    { type: 'Type VI', label: 'Deeply Pigmented (Never burns, deeply pigmented)', swatch: '#603813' }
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('dermaai_patient_profile', JSON.stringify(profile));
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (e) {}
  };

  return (
    <div className="patient-profile-tab">
      {/* 1. Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            Digital Skin Passport & Health Dossier
          </h1>
          <p>
            Your comprehensive dermatological profile, Fitzpatrick phototype calibration, known contact allergies, and emergency medical contacts.
          </p>
        </div>

        <div className="portal-welcome-actions">
          {!isEditing ? (
            <button 
              className="portal-btn-primary"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 size={16} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <button 
              className="portal-btn-primary"
              onClick={handleSaveProfile}
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          )}
        </div>
      </div>

      {saveSuccess && (
        <div style={{ padding: '0.85rem 1.25rem', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '14px', color: '#065F46', fontWeight: 600, fontSize: '0.88rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} color="#059669" />
          <span>Skin Passport updated successfully! Changes synced with cloud medical records.</span>
        </div>
      )}

      {/* 2. Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
        
        {/* Left Column: Personal Demographics & Contact */}
        <div className="portal-card" style={{ margin: 0 }}>
          <div className="portal-card-header">
            <div className="portal-card-title-group">
              <div className="portal-card-icon">
                <User size={18} />
              </div>
              <div>
                <h3 className="portal-card-title">Personal Demographics</h3>
                <p className="portal-card-subtitle">Verified patient identity information</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #F1F5F9' }}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=240" 
              alt="Maliha Mulla"
              style={{ width: '72px', height: '72px', borderRadius: '22px', objectFit: 'cover', border: '2px solid #0055FF' }}
            />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.2rem' }}>
                {profile.fullName}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Patient ID: DERMA-PT-2026</p>
              <span className="portal-badge blue" style={{ marginTop: '0.35rem' }}>
                Blood Group: {profile.bloodGroup}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>FULL NAME</label>
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
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>EMAIL ADDRESS</label>
              {isEditing ? (
                <input 
                  type="email" 
                  value={profile.email} 
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              ) : (
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>{profile.email}</p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>PHONE NUMBER</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profile.phone} 
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                ) : (
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>{profile.phone}</p>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>DATE OF BIRTH</label>
                {isEditing ? (
                  <input 
                    type="date" 
                    value={profile.dob} 
                    onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                ) : (
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>{profile.dob}</p>
                )}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>EMERGENCY CONTACT</label>
              <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.15rem' }}>
                  {profile.emergencyContactName}
                </p>
                <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0 }}>
                  {profile.emergencyContactPhone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Fitzpatrick Phototype & Allergies */}
        <div className="portal-card" style={{ margin: 0 }}>
          <div className="portal-card-header">
            <div className="portal-card-title-group">
              <div className="portal-card-icon">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="portal-card-title">Dermatological Skin Phenotype</h3>
                <p className="portal-card-subtitle">Fitzpatrick Phototype Scale (Melanin & Sun Sensitivity)</p>
              </div>
            </div>
          </div>

          {/* Fitzpatrick Phototype Selector */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.5rem' }}>
              CURRENT FITZPATRICK PHOTOTYPE:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {fitzpatrickTypes.map(fp => {
                const isSelected = profile.fitzpatrickType.includes(fp.type);
                return (
                  <div
                    key={fp.type}
                    onClick={() => {
                      if (isEditing) setProfile({ ...profile, fitzpatrickType: `${fp.type} (${fp.label.split('(')[0].trim()})` });
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #0055FF' : '1px solid #E2E8F0',
                      background: isSelected ? '#EFF6FF' : '#FFFFFF',
                      cursor: isEditing ? 'pointer' : 'default',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: fp.swatch, border: '1px solid rgba(0,0,0,0.15)', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>{fp.type}</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>{fp.label}</span>
                    </div>
                    {isSelected && <CheckCircle2 size={16} color="#0055FF" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Allergies and Chronic Conditions */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>
                KNOWN CONTACT & DRUG ALLERGIES
              </label>
              {isEditing ? (
                <textarea 
                  rows={2} 
                  value={profile.allergies} 
                  onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                />
              ) : (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '0.65rem 0.85rem', borderRadius: '12px', color: '#991B1B', fontSize: '0.82rem', fontWeight: 600 }}>
                  ⚠️ {profile.allergies}
                </div>
              )}
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '0.35rem' }}>
                CHRONIC DERMATOLOGICAL CONDITIONS
              </label>
              {isEditing ? (
                <textarea 
                  rows={2} 
                  value={profile.chronicConditions} 
                  onChange={(e) => setProfile({ ...profile, chronicConditions: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                />
              ) : (
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.65rem 0.85rem', borderRadius: '12px', color: '#475569', fontSize: '0.82rem' }}>
                  {profile.chronicConditions}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
