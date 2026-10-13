import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserCheck, 
  FileText, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  Video, 
  Eye, 
  X,
  Activity,
  Download
} from 'lucide-react';

export default function DoctorPatientRoster({ onStartTelehealth, onWriteRx }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientModal, setSelectedPatientModal] = useState(null);

  const rosterList = [
    {
      id: "DERMA-9104",
      name: "Rahul Sharma",
      age: "29 / M",
      phone: "+91 98201 44820",
      email: "rahul.sharma@example.com",
      phototype: "Fitzpatrick Type IV",
      primaryDiagnosis: "Atopic Dermatitis (Eczema)",
      status: "Active Flare • Telehealth Today",
      allergies: ["Nickel (Severe)", "Synthetic Fragrance Mix I"],
      lastVisit: "Oct 12, 2026",
      nextAppointment: "Today 4:30 PM",
      totalScans: 4,
      totalPrescriptions: 2,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
      history: [
        { date: "Oct 12, 2026", event: "AI Scan SCN-1048: 94.2% Atopic Dermatitis; Telehealth booked." },
        { date: "Sep 28, 2026", event: "Telehealth consult. Prescribed Mometasone 0.1% + Levocetirizine." },
        { date: "Aug 15, 2026", event: "Routine cutaneous phototype assessment: Fitzpatrick Type IV recorded." }
      ]
    },
    {
      id: "DERMA-7320",
      name: "Priya Patel",
      age: "42 / F",
      phone: "+91 98402 11944",
      email: "priya.patel@example.com",
      phototype: "Fitzpatrick Type III",
      primaryDiagnosis: "Dysplastic Melanocytic Nevus",
      status: "Biopsy Priority",
      allergies: ["No known allergies"],
      lastVisit: "Oct 10, 2026",
      nextAppointment: "Today 6:00 PM",
      totalScans: 2,
      totalPrescriptions: 1,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      history: [
        { date: "Oct 10, 2026", event: "High-resolution dermoscopy of thoracic trunk lesion. AI flagged 86.8% dysplasia." },
        { date: "Sep 02, 2026", event: "Initial skin cancer screening consultation." }
      ]
    },
    {
      id: "DERMA-6411",
      name: "Amit Roy",
      age: "36 / M",
      phone: "+91 97110 59283",
      email: "amit.roy@example.com",
      phototype: "Fitzpatrick Type IV",
      primaryDiagnosis: "Plaque Psoriasis",
      status: "Under Topical Therapy",
      allergies: ["Sulfa antibiotics (Urticaria)"],
      lastVisit: "Oct 05, 2026",
      nextAppointment: "Tomorrow 11:00 AM",
      totalScans: 6,
      totalPrescriptions: 3,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      history: [
        { date: "Oct 05, 2026", event: "Right knee plaque evaluation. PASI score improved from 8.2 to 3.4." },
        { date: "Aug 19, 2026", event: "Prescription refilled: Calcipotriol + Betamethasone." }
      ]
    },
    {
      id: "DERMA-5290",
      name: "Kavita Sen",
      age: "51 / F",
      phone: "+91 99203 84729",
      email: "kavita.sen@example.com",
      phototype: "Fitzpatrick Type IV",
      primaryDiagnosis: "Post-Cryotherapy Actinic Keratosis",
      status: "Post-Op Follow-up",
      allergies: ["Adhesive tape sensitivity"],
      lastVisit: "Sep 22, 2026",
      nextAppointment: "Today 5:15 PM",
      totalScans: 3,
      totalPrescriptions: 2,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      history: [
        { date: "Sep 22, 2026", event: "Cryotherapy performed on dorsal hand lesion." }
      ]
    }
  ];

  const filteredPatients = rosterList.filter(pat => 
    pat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pat.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pat.primaryDiagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="doctor-roster-container">
      {/* 1. Header Banner */}
      <div className="roster-header-card">
        <div className="roster-header-text">
          <div className="roster-badge">
            <Users size={16} color="#0055FF" />
            <span>Hospital EHR Patient Directory</span>
          </div>
          <h1 className="roster-main-title">Clinical Patient Records & History</h1>
          <p className="roster-main-desc">
            Search comprehensive patient charts, review longitudinal dermoscopy timelines, inspect historical prescriptions, and access verified clinical telemetry.
          </p>
        </div>

        <div className="roster-search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by patient name, ID (e.g. DERMA-9104), or condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="roster-search-field"
          />
        </div>
      </div>

      {/* 2. Patient Records Table / Cards */}
      <div className="roster-list-table-container">
        <div className="roster-table-header">
          <div className="col-patient">Patient & Identity</div>
          <div className="col-diag">Primary Condition</div>
          <div className="col-profile">Phototype & Allergies</div>
          <div className="col-status">Clinical Status</div>
          <div className="col-actions">Actions</div>
        </div>

        <div className="roster-table-body">
          {filteredPatients.map(pat => (
            <div key={pat.id} className="roster-row-item">
              <div className="col-patient">
                <img src={pat.avatar} alt={pat.name} className="roster-avatar" />
                <div className="roster-patient-info">
                  <strong className="patient-fullname">{pat.name}</strong>
                  <span className="patient-demographics">{pat.age} • {pat.phone}</span>
                  <span className="patient-code-tag">{pat.id}</span>
                </div>
              </div>

              <div className="col-diag">
                <strong className="diag-title">{pat.primaryDiagnosis}</strong>
                <span className="scans-count">{pat.totalScans} Scans • {pat.totalPrescriptions} ℞ Slips</span>
              </div>

              <div className="col-profile">
                <span className="phototype-tag">{pat.phototype}</span>
                <div className="allergies-preview">
                  {pat.allergies.map((a, i) => (
                    <span key={i} className="allergy-tag-mini">{a}</span>
                  ))}
                </div>
              </div>

              <div className="col-status">
                <span className={`status-pill-badge ${pat.status.includes('Priority') ? 'urgent' : 'active'}`}>
                  {pat.status}
                </span>
                <span className="next-apt-text">Slot: {pat.nextAppointment}</span>
              </div>

              <div className="col-actions">
                <button 
                  className="open-chart-btn"
                  onClick={() => setSelectedPatientModal(pat)}
                >
                  <Eye size={14} />
                  <span>View EHR</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Deep Patient EHR Modal */}
      {selectedPatientModal && (
        <div className="ehr-modal-overlay">
          <div className="ehr-modal-card">
            <div className="ehr-modal-header">
              <div className="ehr-header-patient-info">
                <img src={selectedPatientModal.avatar} alt={selectedPatientModal.name} className="ehr-big-avatar" />
                <div>
                  <div className="ehr-name-row">
                    <h2>{selectedPatientModal.name}</h2>
                    <span className="ehr-id-pill">{selectedPatientModal.id}</span>
                  </div>
                  <span className="ehr-meta-text">
                    {selectedPatientModal.age} • {selectedPatientModal.phone} • {selectedPatientModal.email}
                  </span>
                </div>
              </div>
              <button 
                className="close-ehr-btn"
                onClick={() => setSelectedPatientModal(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="ehr-modal-body">
              {/* Vitals Summary Strip */}
              <div className="ehr-summary-strip">
                <div className="summary-item">
                  <span>Constitutional Phototype</span>
                  <strong>{selectedPatientModal.phototype}</strong>
                </div>
                <div className="summary-item">
                  <span>Primary Diagnosis</span>
                  <strong>{selectedPatientModal.primaryDiagnosis}</strong>
                </div>
                <div className="summary-item">
                  <span>Known Allergies</span>
                  <strong className="allergy-text">{selectedPatientModal.allergies.join(", ")}</strong>
                </div>
                <div className="summary-item">
                  <span>Last Visit</span>
                  <strong>{selectedPatientModal.lastVisit}</strong>
                </div>
              </div>

              {/* Longitudinal Medical Timeline */}
              <div className="ehr-timeline-section">
                <h4 className="timeline-heading">Longitudinal Clinical History & Visit Logs:</h4>
                <div className="ehr-timeline-list">
                  {selectedPatientModal.history.map((hist, idx) => (
                    <div key={idx} className="timeline-node">
                      <div className="node-marker">
                        <Clock size={12} color="#0055FF" />
                      </div>
                      <div className="node-content">
                        <span className="node-date">{hist.date}</span>
                        <p className="node-event">{hist.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ehr-modal-footer">
              <button 
                className="ehr-action-btn secondary"
                onClick={() => setSelectedPatientModal(null)}
              >
                Close Record
              </button>
              <button 
                className="ehr-action-btn primary"
                onClick={() => {
                  setSelectedPatientModal(null);
                  if (onWriteRx) onWriteRx(selectedPatientModal);
                }}
              >
                <FileText size={15} />
                <span>Issue Prescription (℞)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
