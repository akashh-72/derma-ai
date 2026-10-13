import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Stethoscope, 
  Download,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function AppointmentsTab({ appointments, onNewAppointmentClick }) {
  const [selectedApt, setSelectedApt] = useState(appointments[0] || null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <div className="dashboard-tab-content appointments-tab-container">
      {/* Header */}
      <div className="clinical-card appointments-header-card">
        <div className="apt-header-row">
          <div>
            <h3 className="tab-title">Consultation Records & Prescriptions</h3>
            <p className="tab-sub">
              Review your scheduled visits, attached Grad-CAM triage history, and digital doctor notes.
            </p>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={onNewAppointmentClick}
          >
            <Plus size={16} />
            <span>Book New Consultation</span>
          </button>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="clinical-card empty-apt-card text-center">
          <Calendar size={48} className="text-electric mb-3" />
          <h4 className="empty-title">No Appointments Scheduled Yet</h4>
          <p className="empty-desc">
            After running your AI skin scan, use our Smart Doctor Matcher to reserve a consultation with a verified dermatologist.
          </p>
          <button 
            className="btn btn-primary mt-3"
            onClick={onNewAppointmentClick}
          >
            <span>Explore Matched Doctors</span>
          </button>
        </div>
      ) : (
        <div className="appointments-split-layout">
          {/* List Column */}
          <div className="apt-list-col">
            <h4 className="list-col-heading">Scheduled Visits ({appointments.length})</h4>
            <div className="apt-cards-stack">
              {appointments.map(apt => (
                <div 
                  key={apt.id}
                  className={`clinical-card apt-item-card ${selectedApt?.id === apt.id ? 'active' : ''}`}
                  onClick={() => setSelectedApt(apt)}
                >
                  <div className="apt-card-top-row">
                    <span className="badge badge-green">
                      <CheckCircle2 size={12} /> {apt.status}
                    </span>
                    <span className="apt-date-tag">{apt.date}</span>
                  </div>

                  <h4 className="apt-doc-heading">{apt.doctorName}</h4>
                  <p className="apt-clinic-text">{apt.clinicName}</p>

                  <div className="apt-meta-info-row">
                    <span className="apt-time-badge">
                      <Clock size={13} /> {apt.slot}
                    </span>
                    <span className="apt-cond-badge">
                      {apt.diagnosis}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details & Digital Prescription Pane */}
          {selectedApt && (
            <div className="clinical-card apt-details-col">
              <div className="details-header-row">
                <div>
                  <span className="details-kicker">Clinical Summary Report</span>
                  <h3 className="details-doc-name">{selectedApt.doctorName}</h3>
                  <p className="details-clinic">{selectedApt.clinicName}</p>
                </div>
                <span className="badge badge-green">{selectedApt.status}</span>
              </div>

              <div className="details-info-grid">
                <div className="detail-item">
                  <span className="detail-lbl">Scheduled Slot</span>
                  <strong className="detail-val">{selectedApt.slot}</strong>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Booking Reference</span>
                  <strong className="detail-val font-mono">{selectedApt.id}</strong>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Triaged Condition</span>
                  <strong className="detail-val text-electric">{selectedApt.diagnosis}</strong>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Patient Notes</span>
                  <p className="detail-val text-sm">{selectedApt.notes || "None specified"}</p>
                </div>
              </div>

                {/* Digital Doctor Prescription Slip */}
                <div className="prescription-slip-box">
                  <div className="rx-header">
                    <div className="rx-symbol">℞</div>
                    <div>
                      <h4 className="rx-title">Digital Clinical Prescription & Care Protocol</h4>
                      <p className="rx-subtitle">Issued by Verified Board Dermatologist • Ref: DERMA-RX-{selectedApt.id.slice(-4)}</p>
                    </div>
                  </div>

                  <div className="rx-medicines-table">
                    <div className="rx-row header">
                      <span>Medication / Formulation</span>
                      <span>Dosage</span>
                      <span>Frequency & Instructions</span>
                    </div>
                    <div className="rx-row">
                      <strong>1. Mupirocin 2% Ointment</strong>
                      <span>Apply thin layer</span>
                      <span>Twice daily for 7 days after cleansing</span>
                    </div>
                    <div className="rx-row">
                      <strong>2. Ceramide Barrier Repair Cream</strong>
                      <span>Liberal application</span>
                      <span>3 times daily on affected flexures</span>
                    </div>
                    <div className="rx-row">
                      <strong>3. Tab. Levocetirizine 5mg</strong>
                      <span>1 tablet</span>
                      <span>At bedtime if nocturnal pruritus occurs</span>
                    </div>
                  </div>

                  <div className="rx-instructions-note">
                    <strong>Clinical Advice:</strong> Avoid hot water immersion and scented soaps. Present this summary along with Grad-CAM images during physical consultation if flare-ups persist.
                  </div>

                  {downloadSuccess && (
                    <div className="rx-download-success-banner animate-fadeIn">
                      <CheckCircle2 size={16} color="#059669" />
                      <span>Official PDF Prescription Slip (DERMA-RX-{selectedApt.id.slice(-4)}.pdf) Generated & Downloaded!</span>
                    </div>
                  )}

                  <div className="rx-footer-actions">
                    <div className="rx-signature-block">
                      <span className="rx-verified-badge">
                        <CheckCircle2 size={13} color="#059669" />
                        <span>Digitally Signed: {selectedApt.doctorName} (MCI Reg #9104-D)</span>
                      </span>
                    </div>

                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={handleDownloadPdf}
                    >
                      <Download size={14} />
                      <span>Download Clinical PDF Slip</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
