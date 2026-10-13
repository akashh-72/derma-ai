import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Eye, 
  FileText, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  ChevronRight,
  Clock,
  X
} from 'lucide-react';
import { CLINICAL_CASES } from '../../data/mockData';

export default function DoctorPatients({ user, onNavigateTab, onLaunchRx }) {
  const [patients, setPatients] = useState([
    {
      id: 'PT-01',
      name: 'Maliha Mulla',
      email: 'maliha.mulla@example.com',
      phone: '+91 98220 12345',
      age: 27,
      gender: 'Female',
      location: 'Kolhapur, Maharashtra',
      bloodGroup: 'B+',
      riskLevel: 'Moderate',
      totalScans: 4,
      lastDiagnosis: 'Atopic Dermatitis (Eczema)',
      lastVisit: 'Oct 12, 2026',
      allergies: 'Nickel metal, Fragrance mix',
      scansHistory: [
        { id: 'SCN-8941', disease: 'Eczema / Atopic Dermatitis', date: 'Oct 10, 2026', confidence: '96.2%', status: 'Reviewed', img: CLINICAL_CASES[1].originalImage },
        { id: 'SCN-8812', disease: 'Healthy Control Skin', date: 'Sep 15, 2026', confidence: '98.1%', status: 'Reviewed', img: CLINICAL_CASES[4].originalImage }
      ]
    },
    {
      id: 'PT-02',
      name: 'Kavita Sharma',
      email: 'kavita.sharma@example.com',
      phone: '+91 98220 99887',
      age: 48,
      gender: 'Female',
      location: 'Pune, Maharashtra',
      bloodGroup: 'O+',
      riskLevel: 'Urgent',
      totalScans: 2,
      lastDiagnosis: 'Melanoma & Abnormal Moles',
      lastVisit: 'Today',
      allergies: 'Penicillin, NSAIDs',
      scansHistory: [
        { id: 'SCN-8920', disease: 'Melanoma & Abnormal Moles', date: 'Today', confidence: '93.8%', status: 'Urgent Triage', img: CLINICAL_CASES[5].originalImage }
      ]
    },
    {
      id: 'PT-03',
      name: 'Arjun Deshmukh',
      email: 'arjun.deshmukh@example.com',
      phone: '+91 98220 54311',
      age: 26,
      gender: 'Male',
      location: 'Kolhapur, Maharashtra',
      bloodGroup: 'A+',
      riskLevel: 'Low - Moderate',
      totalScans: 3,
      lastDiagnosis: 'Acne & Rosacea',
      lastVisit: 'Oct 08, 2026',
      allergies: 'None reported',
      scansHistory: [
        { id: 'SCN-8935', disease: 'Acne & Rosacea', date: 'Oct 08, 2026', confidence: '95.4%', status: 'Pending', img: CLINICAL_CASES[0].originalImage }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.lastDiagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="doctor-patients-tab">
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            Clinician Patient Roster & Medical History Dossier
          </h1>
          <p>
            Centralized directory of patient cutaneous histories, AI analysis trajectories, and previous prescription records.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="portal-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.75rem' }}>
        <div style={{ position: 'relative', maxWidth: '420px' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search patient roster by name or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: '9999px', border: '1px solid #E2E8F0', fontSize: '0.82rem', outline: 'none' }}
          />
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {filteredPatients.map(pt => (
          <div 
            key={pt.id} 
            className="portal-card" 
            style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>#{pt.id}</span>
                <span className={`portal-badge ${pt.riskLevel === 'Urgent' ? 'red' : 'blue'}`}>
                  {pt.riskLevel} Risk
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFF6FF', color: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem' }}>
                  {pt.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>{pt.name}</h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748B' }}>{pt.age}y • {pt.gender} • {pt.location}</p>
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '1rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#64748B' }}>Last Diagnosis:</span>
                  <strong style={{ color: '#0F172A' }}>{pt.lastDiagnosis}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#64748B' }}>Total Scans:</span>
                  <span style={{ fontWeight: 600, color: '#0055FF' }}>{pt.totalScans} Entries</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Known Allergies:</span>
                  <span style={{ color: '#DC2626', fontWeight: 600 }}>{pt.allergies}</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.85rem' }}>
              <button
                className="portal-btn-primary"
                onClick={() => setSelectedPatient(pt)}
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '0.55rem' }}
              >
                <FileText size={14} />
                <span>View Full Medical History</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Patient Dossier Modal Drawer */}
      {selectedPatient && (
        <div className="portal-modal-overlay" onClick={() => setSelectedPatient(null)}>
          <div className="portal-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="portal-modal-header">
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>PATIENT DOSSIER</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                  {selectedPatient.name} ({selectedPatient.age} Yrs)
                </h3>
              </div>
              <button 
                className="portal-modal-close-btn"
                onClick={() => setSelectedPatient(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="portal-modal-body">
              {/* Demographics Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', background: '#F8FAFC', padding: '0.85rem', borderRadius: '14px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>BLOOD GROUP</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', display: 'block' }}>{selectedPatient.bloodGroup}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>PHONE NUMBER</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', display: 'block' }}>{selectedPatient.phone}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>LOCATION</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', display: 'block' }}>{selectedPatient.location}</span>
                </div>
              </div>

              {/* Scans History */}
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
                AI Vision Scan Timeline ({selectedPatient.scansHistory.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {selectedPatient.scansHistory.map((scan, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '12px', border: '1px solid #E2E8F0', background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={scan.img} alt={scan.disease} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <strong style={{ fontSize: '0.85rem', color: '#0F172A' }}>{scan.disease}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{scan.date} • {scan.confidence}</div>
                      </div>
                    </div>
                    <span className="portal-badge emerald" style={{ fontSize: '0.7rem' }}>{scan.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="portal-modal-footer">
              <button className="portal-btn-secondary" onClick={() => setSelectedPatient(null)}>Close</button>
              
              {onLaunchRx && (
                <button
                  className="portal-btn-secondary"
                  onClick={() => {
                    const pat = {
                      id: selectedPatient.id,
                      name: selectedPatient.name,
                      age: `${selectedPatient.age} / ${selectedPatient.gender[0]}`,
                      diagnosis: selectedPatient.lastDiagnosis,
                      allergies: selectedPatient.allergies,
                      phototype: "Fitzpatrick Type IV"
                    };
                    setSelectedPatient(null);
                    onLaunchRx(pat);
                  }}
                  style={{ color: '#7C3AED', borderColor: '#DDD6FE', background: '#F5F3FF' }}
                >
                  <FileText size={15} />
                  <span>Draft ℞ in Studio</span>
                </button>
              )}

              <button 
                className="portal-btn-primary" 
                onClick={() => {
                  setSelectedPatient(null);
                  onNavigateTab('appointments');
                }}
              >
                Schedule Follow-up Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
