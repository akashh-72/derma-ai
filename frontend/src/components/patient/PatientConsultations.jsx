import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Building2, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ExternalLink, 
  Share2, 
  Pill, 
  ShieldCheck, 
  Phone, 
  X,
  UserCheck,
  Printer
} from 'lucide-react';

export default function PatientConsultations({ appointments = [], onBookNew }) {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'
  const [selectedRx, setSelectedRx] = useState(null);
  const [activeVideoCall, setActiveVideoCall] = useState(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  // Default mock appointments if none provided
  const upcomingList = appointments.length > 0 ? appointments : [
    {
      id: "apt-1049",
      doctorName: "Dr. Sneha Patil",
      doctorTitle: "MD, DNB (Dermatology & Venereology)",
      clinicName: "Patil Dermacare & Aesthetic Clinic, Kolhapur",
      address: "Suite 302, Cyber City Medical Square, Kolhapur",
      type: "telehealth",
      slot: "Today 4:30 PM",
      date: "Oct 12, 2026",
      fee: "₹900",
      status: "Confirmed",
      notes: "Severe pruritus on elbow flexures, flare-up post detergent exposure",
      diagnosis: "Atopic Dermatitis (Eczema)",
      sharedScan: "SCN-1048",
      doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const pastConsultations = [
    {
      id: "apt-0922",
      doctorName: "Dr. Sneha Patil",
      doctorTitle: "MD, DNB (Dermatology & Venereology)",
      clinicName: "Patil Dermacare & Aesthetic Clinic, Kolhapur",
      date: "Sep 28, 2026",
      type: "telehealth",
      diagnosis: "Atopic Dermatitis (Subacute Eczematous Flare)",
      icdCode: "ICD-11: EA80",
      summary: "Patient exhibited erythematous excoriated patches over bilateral antecubital fossae. Significant epidermal barrier disruption. Advised moderate potency topical corticosteroid short pulse, non-sedating antihistamine for nocturnal pruritus, and intensive ceramide barrier therapy.",
      doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
      prescription: {
        rxNumber: "RX-2026-88192",
        issueDate: "28 Sep 2026",
        validTill: "28 Oct 2026",
        medications: [
          {
            name: "Mometasone Furoate 0.1% Topical Cream",
            dosage: "Apply fingertip unit",
            frequency: "Once daily (At bedtime)",
            duration: "7 Days",
            instructions: "Apply sparing thin film exclusively on inflamed plaques. Do not apply on broken bleeding skin."
          },
          {
            name: "Levocetirizine Dihydrochloride 5mg",
            dosage: "1 Tablet Oral",
            frequency: "Once daily (Bedtime)",
            duration: "10 Days",
            instructions: "For relief of nocturnal pruritus and histamine flare."
          },
          {
            name: "Ceramide + Colloidal Oat Intensive Emollient",
            dosage: "Liberal Application",
            frequency: "3 to 4 times daily",
            duration: "30 Days (Ongoing)",
            instructions: "Mandatory application within 3 minutes of bathing to seal trans-epidermal moisture."
          }
        ],
        lifestyleAdvice: [
          "Use lukewarm water (< 32°C) for bathing; limit bathing to 10 minutes.",
          "Use soap-free synthetic syndet cleanser with neutral pH 5.5.",
          "Wear 100% loose-fitting cotton clothing; avoid wool and synthetic fleece."
        ],
        followUp: "14 days post completion of corticosteroid course (or earlier if weeping develops)."
      }
    },
    {
      id: "apt-0850",
      doctorName: "Dr. Rajesh Kulkarni",
      doctorTitle: "MD, Fellowship Dermatopathology",
      clinicName: "Kulkarni Dermacare & Aesthetic Clinic",
      date: "Aug 14, 2026",
      type: "inclinic",
      diagnosis: "Acne Papulopustulosa (Facial T-Zone)",
      icdCode: "ICD-11: ED80",
      summary: "Evaluated follicular papules and comedones. Grad-CAM concordance verified sebaceous localized focus. Prescribed topical retinoid and clindamycin solution with broad spectrum sunscreen protocol.",
      doctorImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
      prescription: {
        rxNumber: "RX-2026-74910",
        issueDate: "14 Aug 2026",
        validTill: "14 Sep 2026",
        medications: [
          {
            name: "Adapalene 0.1% + Benzoyl Peroxide 2.5% Gel",
            dosage: "Pea-sized amount",
            frequency: "Alternate nights",
            duration: "4 Weeks",
            instructions: "Apply to entire face after gentle washing. Follow with non-comedogenic moisturizer."
          },
          {
            name: "Clindamycin Phosphate 1% Topical Solution",
            dosage: "Spot dab",
            frequency: "Morning",
            duration: "14 Days",
            instructions: "Apply directly to active pustular lesions."
          }
        ],
        lifestyleAdvice: [
          "Do not squeeze or excise inflammatory papules.",
          "Mandatory daily mineral sunscreen SPF 50+ application."
        ],
        followUp: "Review after 4 weeks."
      }
    }
  ];

  const handleDownloadRx = (rx) => {
    setDownloadSuccessToast(true);
    setTimeout(() => {
      setDownloadSuccessToast(false);
    }, 3000);
  };

  return (
    <div className="patient-consultations-container">
      {/* 1. Header Banner */}
      <div className="consultations-header-card">
        <div className="consultations-header-content">
          <div className="consultations-badge">
            <FileText size={16} color="#0055FF" />
            <span>Digital Clinical Records & Telemedicine</span>
          </div>
          <h1 className="consultations-title">My Visits & Official Prescriptions (℞)</h1>
          <p className="consultations-subtitle">
            Manage your booked telemedicine sessions, access verified clinician diagnosis reports, and view digital pharmacy prescriptions.
          </p>
        </div>

        <div className="consultations-header-stats">
          <div className="header-stat-box">
            <strong className="stat-num">{upcomingList.length}</strong>
            <span className="stat-lbl">Upcoming Visits</span>
          </div>
          <div className="header-stat-box">
            <strong className="stat-num">{pastConsultations.length}</strong>
            <span className="stat-lbl">Official ℞ Issued</span>
          </div>
          <div className="header-stat-box">
            <strong className="stat-num">100%</strong>
            <span className="stat-lbl">Digital Compliance</span>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="consultations-tab-switcher">
        <button 
          className={`consult-switch-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          <Calendar size={16} />
          <span>Upcoming Appointments</span>
          <span className="tab-count-bubble">{upcomingList.length}</span>
        </button>

        <button 
          className={`consult-switch-btn ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          <FileText size={16} />
          <span>Past Visits & Official ℞ Slips</span>
          <span className="tab-count-bubble">{pastConsultations.length}</span>
        </button>
      </div>

      {/* 3. Upcoming Visits Tab */}
      {activeTab === 'upcoming' && (
        <div className="upcoming-appointments-list">
          {upcomingList.length === 0 ? (
            <div className="empty-appointments-state">
              <Calendar size={48} color="#94A3B8" />
              <h3>No Upcoming Appointments Scheduled</h3>
              <p>You do not have any pending consultations. You can consult verified dermatologists anytime.</p>
              <button className="book-specialist-cta-btn" onClick={onBookNew}>
                Find & Book Specialist
              </button>
            </div>
          ) : (
            upcomingList.map(apt => (
              <div key={apt.id} className="patient-appointment-card">
                <div className="appointment-card-header">
                  <div className="appointment-doctor-meta">
                    <img 
                      src={apt.doctorImage || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"} 
                      alt={apt.doctorName} 
                      className="appointment-doc-avatar" 
                    />
                    <div>
                      <div className="doc-name-badge-row">
                        <h3 className="appointment-doc-name">{apt.doctorName}</h3>
                        <span className="verified-pill">
                          <ShieldCheck size={12} />
                          <span>Board Certified</span>
                        </span>
                      </div>
                      <p className="appointment-doc-title">{apt.doctorTitle || "MD, DNB (Dermatology)"}</p>
                      <span className="appointment-clinic-text">{apt.clinicName}</span>
                    </div>
                  </div>

                  <div className="appointment-time-badge">
                    <div className="time-pill">
                      <Clock size={15} color="#0055FF" />
                      <span>{apt.slot}</span>
                    </div>
                    <span className="status-indicator-tag confirmed">
                      <span className="pulse-dot"></span>
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="appointment-card-body">
                  <div className="appointment-detail-col">
                    <span className="detail-label">Consultation Format:</span>
                    <strong className="detail-value format">
                      {apt.type === 'inclinic' ? (
                        <>
                          <Building2 size={15} color="#059669" />
                          <span>In-Clinic Visit • {apt.address || apt.clinicName}</span>
                        </>
                      ) : (
                        <>
                          <Video size={15} color="#0055FF" />
                          <span>Telehealth HD Video Consultation (WebRTC Secure)</span>
                        </>
                      )}
                    </strong>
                  </div>

                  <div className="appointment-detail-col">
                    <span className="detail-label">Chief Complaint / Reason:</span>
                    <span className="detail-value notes">{apt.notes || "Skin rash examination"}</span>
                  </div>

                  {apt.sharedScan && (
                    <div className="appointment-linked-scan">
                      <FileText size={14} color="#0055FF" />
                      <span>Linked AI Scan: <strong>{apt.sharedScan} ({apt.diagnosis})</strong> with Grad-CAM Map</span>
                    </div>
                  )}
                </div>

                <div className="appointment-card-footer">
                  <div className="consult-fee-tag">
                    <span>Fee: <strong>{apt.fee || "₹900"}</strong> (Pre-Authorized)</span>
                  </div>

                  <div className="appointment-actions-group">
                    {apt.type === 'telehealth' ? (
                      <button 
                        className="join-telehealth-btn"
                        onClick={() => setActiveVideoCall(apt)}
                      >
                        <Video size={16} />
                        <span>Join Live Video Room</span>
                      </button>
                    ) : (
                      <button className="get-directions-btn">
                        <Building2 size={16} />
                        <span>View Clinic Map</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 4. Past Visits & Prescriptions Tab */}
      {activeTab === 'past' && (
        <div className="past-consultations-grid">
          {pastConsultations.map(consult => (
            <div key={consult.id} className="past-consult-card">
              <div className="past-consult-header">
                <div className="past-doc-info">
                  <img src={consult.doctorImage} alt={consult.doctorName} className="past-doc-thumb" />
                  <div>
                    <h4 className="past-doc-title">{consult.doctorName}</h4>
                    <span className="past-consult-date">{consult.date} • {consult.clinicName}</span>
                  </div>
                </div>

                <span className="consult-type-chip">
                  {consult.type === 'telehealth' ? 'Telemedicine' : 'In-Clinic'}
                </span>
              </div>

              <div className="past-diagnosis-box">
                <span className="diag-kicker">Clinical Diagnosis</span>
                <strong className="diag-name">{consult.diagnosis}</strong>
                <span className="icd-code-pill">{consult.icdCode}</span>
              </div>

              <p className="past-summary-text">
                {consult.summary}
              </p>

              <div className="past-consult-footer">
                <div className="rx-badge-pill">
                  <Pill size={14} color="#059669" />
                  <span>{consult.prescription.medications.length} Prescribed Medications</span>
                </div>

                <button 
                  className="view-rx-modal-btn"
                  onClick={() => setSelectedRx(consult)}
                >
                  <FileText size={15} />
                  <span>View Official ℞ Slip</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. Official Digital Prescription Slip (℞) Modal */}
      {selectedRx && (
        <div className="rx-modal-overlay">
          <div className="rx-slip-modal-container">
            <div className="rx-modal-toolbar">
              <span className="rx-modal-heading">Digital Medical Prescription</span>
              <div className="rx-toolbar-actions">
                <button 
                  className="rx-download-btn"
                  onClick={() => handleDownloadRx(selectedRx)}
                >
                  <Download size={15} />
                  <span>Download PDF</span>
                </button>
                <button 
                  className="rx-close-btn"
                  onClick={() => setSelectedRx(null)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Realistic Hospital Header & Slip */}
            <div className="hospital-rx-paper">
              <div className="rx-paper-header">
                <div className="hospital-branding">
                  <div className="hospital-icon-circle">
                    <ShieldCheck size={28} color="#0055FF" />
                  </div>
                  <div>
                    <h2 className="hospital-name">{selectedRx.clinicName}</h2>
                    <p className="hospital-sub">Center for Clinical Dermatology, Dermatosurgery & Phototherapy</p>
                    <span className="hospital-address">Medical Council Reg: DMC-84920 • NABH Accredited Facility</span>
                  </div>
                </div>

                <div className="rx-serial-block">
                  <strong className="rx-serial-id">{selectedRx.prescription.rxNumber}</strong>
                  <span className="rx-date-stamp">Date: {selectedRx.prescription.issueDate}</span>
                </div>
              </div>

              <div className="rx-doctor-patient-strip">
                <div className="rx-physician-info">
                  <span className="strip-label">Attending Physician:</span>
                  <strong>{selectedRx.doctorName}</strong>
                  <span>{selectedRx.doctorTitle}</span>
                </div>

                <div className="rx-patient-info">
                  <span className="strip-label">Patient Details:</span>
                  <strong>Maliha Mulla (Age: 26 / F)</strong>
                  <span>Patient ID: DERMA-9104 • Blood: B+</span>
                </div>
              </div>

              <div className="rx-diagnosis-banner">
                <span className="diag-label">Clinical Diagnosis:</span>
                <span className="diag-content">
                  <strong>{selectedRx.diagnosis}</strong> ({selectedRx.icdCode})
                </span>
              </div>

              {/* Rx Formulary Symbol & Table */}
              <div className="rx-medication-section">
                <div className="rx-symbol-heading">
                  <span className="latin-rx-symbol">℞</span>
                  <span className="rx-sub-heading">Prescribed Pharmacotherapy Regimen</span>
                </div>

                <div className="rx-drugs-table">
                  <div className="rx-table-head">
                    <div className="rx-col med">Medication & Strength</div>
                    <div className="rx-col freq">Dosage & Frequency</div>
                    <div className="rx-col dur">Duration</div>
                  </div>

                  {selectedRx.prescription.medications.map((med, idx) => (
                    <div key={idx} className="rx-table-row">
                      <div className="rx-col med">
                        <strong className="med-name">{idx + 1}. {med.name}</strong>
                        <span className="med-instruction">{med.instructions}</span>
                      </div>
                      <div className="rx-col freq">
                        <span className="freq-badge">{med.frequency}</span>
                        <span className="dose-sub">{med.dosage}</span>
                      </div>
                      <div className="rx-col dur">
                        <strong className="duration-highlight">{med.duration}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle Guidance */}
              <div className="rx-lifestyle-block">
                <h4 className="lifestyle-heading">Dermatological Care & Flare Prevention Advice:</h4>
                <ul className="lifestyle-list">
                  {selectedRx.prescription.lifestyleAdvice.map((advice, i) => (
                    <li key={i}>{advice}</li>
                  ))}
                </ul>
              </div>

              {/* Follow-up & Signature Footer */}
              <div className="rx-paper-footer">
                <div className="rx-followup-box">
                  <span className="followup-lbl">Scheduled Follow-up:</span>
                  <strong className="followup-val">{selectedRx.prescription.followUp}</strong>
                </div>

                <div className="rx-signature-block">
                  <div className="digital-sign-stamp">
                    <CheckCircle2 size={18} color="#059669" />
                    <span>Digitally Signed & Verified</span>
                  </div>
                  <strong className="physician-sign-name">{selectedRx.doctorName}</strong>
                  <span className="council-reg">Reg No: KMC-58291-A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Live Telehealth Consultation Screen Modal */}
      {activeVideoCall && (
        <div className="telehealth-call-overlay">
          <div className="telehealth-call-modal">
            <div className="telehealth-call-header">
              <div className="call-live-indicator">
                <span className="red-pulse-dot"></span>
                <span>Live Encrypted Telehealth Session</span>
              </div>
              <div className="call-header-doc">
                <strong>{activeVideoCall.doctorName}</strong>
                <span>{activeVideoCall.clinicName}</span>
              </div>
              <button 
                className="call-close-cross"
                onClick={() => setActiveVideoCall(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="telehealth-video-stage">
              <div className="doctor-main-video-feed">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200" 
                  alt="Doctor Stream" 
                  className="main-stream-video"
                />
                <div className="video-feed-overlay-tag">
                  <span>{activeVideoCall.doctorName} (Doctor Stream)</span>
                </div>

                {/* Self PIP Camera */}
                <div className="patient-pip-camera">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300" 
                    alt="Patient Stream" 
                    className="pip-stream-video"
                  />
                  <span className="pip-label">You (Maliha Mulla)</span>
                </div>

                {/* Shared Dermoscopy Inspection Sidebar */}
                <div className="shared-dermoscopy-hud">
                  <span className="hud-title">Shared Lesion Inspection:</span>
                  <div className="hud-lesion-preview">
                    <img 
                      src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80" 
                      alt="Lesion" 
                      className="hud-lesion-img"
                    />
                    <div className="hud-meta">
                      <strong>SCN-1048</strong>
                      <span>Atopic Dermatitis</span>
                      <span className="match-tag">94.2% AI Confidence</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Controls Strip */}
              <div className="telehealth-controls-bar">
                <div className="call-timer-badge">
                  <Clock size={15} />
                  <span>04:32</span>
                </div>

                <div className="media-buttons-row">
                  <button className="control-circle-btn active" title="Mute Audio">
                    <Phone size={18} />
                  </button>
                  <button className="control-circle-btn active" title="Toggle Camera">
                    <Video size={18} />
                  </button>
                  <button 
                    className="control-circle-btn end-call" 
                    title="End Consultation"
                    onClick={() => setActiveVideoCall(null)}
                  >
                    <X size={20} />
                  </button>
                </div>

                <button 
                  className="call-notes-btn"
                  onClick={() => alert("Doctor is currently reviewing the dermoscopy and will finalize the prescription in your portal upon ending.")}
                >
                  <FileText size={15} />
                  <span>Physician Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Success Toast */}
      {downloadSuccessToast && (
        <div className="download-toast-popup">
          <CheckCircle2 size={18} color="#059669" />
          <span>Official Prescription PDF downloaded successfully!</span>
        </div>
      )}
    </div>
  );
}
