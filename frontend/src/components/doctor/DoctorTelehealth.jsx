import React, { useState } from 'react';
import { 
  Video, 
  Phone, 
  Mic, 
  MicOff, 
  VideoOff, 
  Share2, 
  FileText, 
  Clock, 
  CheckCircle2, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  ChevronRight,
  ArrowRight,
  X,
  Maximize2
} from 'lucide-react';
import { CLINICAL_CASES } from '../../data/mockData';

const PATIENT_FALLBACK_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Crect width='100' height='100' rx='20' fill='%23EFF6FF'/%3E%3Ccircle cx='50' cy='38' r='18' fill='%230055FF'/%3E%3Cpath d='M22 88c0-16 12-28 28-28s28 12 28 28' fill='%230055FF'/%3E%3C/svg%3E";

export default function DoctorTelehealth({ onLaunchRxForPatient }) {
  const patientRoster = [
    {
      id: "tel-101",
      name: "Maliha Mulla",
      age: "26 / F",
      patientId: "DERMA-9104",
      slot: "04:30 PM (Now)",
      chiefComplaint: "Subacute eczematous flare on elbow flexures",
      triageDiagnosis: "Atopic Dermatitis (Eczema)",
      confidence: 94.2,
      patientImg: "/doctors/doctor-3.jpg",
      lesionImg: CLINICAL_CASES[1]?.originalImage || "/doctors/doctor-3.jpg",
      isLive: true
    },
    {
      id: "tel-102",
      name: "Priya Patel",
      age: "42 / F",
      patientId: "DERMA-7320",
      slot: "06:00 PM",
      chiefComplaint: "Pigmented lesion review post Grad-CAM biopsy alert",
      triageDiagnosis: "Dysplastic Melanocytic Nevus",
      confidence: 86.8,
      patientImg: "/doctors/doctor-5.jpg",
      lesionImg: CLINICAL_CASES[5]?.originalImage || "/doctors/doctor-5.jpg",
      isLive: false
    }
  ];

  const [activePatient, setActivePatient] = useState(patientRoster[0]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [sessionNotes, setSessionNotes] = useState(
    "Patient states itching exacerbated 3 days ago following contact with new laundry detergent. Inspected flexural antecubital plaques on HD camera; notable erythema and excoriations visible. Advised short course topical corticosteroid and strict ceramide barrier replenishment."
  );
  const [callEnded, setCallEnded] = useState(false);

  return (
    <div className="doctor-telehealth-container">
      {/* 1. Header Banner */}
      <div className="telehealth-header-card">
        <div className="telehealth-header-text">
          <div className="telehealth-status-badge">
            <span className="live-status-dot"></span>
            <span>WebRTC 256-Bit Encrypted Telemedicine Suite</span>
          </div>
          <h1 className="telehealth-main-title">Live Telehealth Consultation Studio</h1>
          <p className="telehealth-main-desc">
            Conduct HIPAA-compliant HD video consultations with real-time dermoscopy screen-share, clinical notepad, and instant e-prescription handoff.
          </p>
        </div>

        <div className="telehealth-session-status">
          <div className="telehealth-signal-box">
            <Activity size={16} color="#059669" />
            <span>Connection: <strong>1080p Ultra HD (Lossless)</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Main Studio Grid: Left Video Deck, Right Telemetry & Scratchpad */}
      <div className="telehealth-studio-deck">
        {/* Main Video Screen */}
        <div className="telehealth-video-column">
          <div className="doctor-video-stage-box">
            {callEnded ? (
              <div className="call-ended-splash">
                <CheckCircle2 size={48} color="#059669" />
                <h3>Consultation Session Concluded</h3>
                <p>Call summary and notes have been staged for clinical archiving.</p>
                <div className="call-ended-actions">
                  <button 
                    className="restart-call-btn"
                    onClick={() => setCallEnded(false)}
                  >
                    Reconnect Call
                  </button>
                  <button 
                    className="transition-rx-btn"
                    onClick={() => {
                      if (onLaunchRxForPatient) onLaunchRxForPatient(activePatient);
                    }}
                  >
                    <FileText size={16} />
                    <span>Open ℞ Studio for {activePatient.name}</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Patient Primary Video Feed */}
                <div className="patient-primary-feed">
                  <img 
                    src={activePatient.patientImg} 
                    alt={activePatient.name} 
                    className="patient-stream-img"
                    onError={(e) => { e.target.onerror = null; e.target.src = PATIENT_FALLBACK_AVATAR; }}
                  />
                  <div className="patient-feed-hud">
                    <span className="feed-patient-name">{activePatient.name} (Patient Feed)</span>
                    <span className="feed-audio-indicator">Audio 48kHz • Good</span>
                  </div>

                  {/* Doctor Corner PIP */}
                  <div className="doctor-corner-pip">
                    <img 
                      src="/doctors/doctor-1.jpg" 
                      alt="Doctor Self" 
                      className="pip-img"
                    />
                    <span className="pip-label">You (Dr. Sneha Patil)</span>
                  </div>

                  {/* Co-Viewer Dermoscopy Lesion Widget */}
                  <div className="telehealth-dermoscopy-co-viewer">
                    <div className="co-viewer-top">
                      <Sparkles size={13} color="#0055FF" />
                      <span>Co-Viewer: {activePatient.triageDiagnosis}</span>
                    </div>
                    <img src={activePatient.lesionImg} alt="Dermoscopy" className="co-viewer-thumb" />
                    <span className="co-viewer-confidence">{activePatient.confidence}% AI Concordance</span>
                  </div>
                </div>

                {/* Call Control Strip */}
                <div className="telehealth-controls-bar">
                  <div className="call-elapsed-timer">
                    <Clock size={14} />
                    <span>08:44</span>
                  </div>

                  <div className="controls-center-group">
                    <button 
                      className={`control-pill-btn ${isMuted ? 'muted' : ''}`}
                      onClick={() => setIsMuted(!isMuted)}
                      title={isMuted ? "Unmute Mic" : "Mute Mic"}
                    >
                      {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>

                    <button 
                      className={`control-pill-btn ${isVideoOff ? 'muted' : ''}`}
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
                    >
                      {isVideoOff ? <VideoOff size={18} /> : <Video size={18} />}
                    </button>

                    <button 
                      className="control-pill-btn danger"
                      onClick={() => setCallEnded(true)}
                      title="End Consultation"
                    >
                      <Phone size={18} style={{ transform: 'rotate(135deg)' }} />
                    </button>
                  </div>

                  <button 
                    className="open-rx-shortcut-btn"
                    onClick={() => {
                      if (onLaunchRxForPatient) onLaunchRxForPatient(activePatient);
                    }}
                  >
                    <FileText size={15} />
                    <span>Draft ℞</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar: Patient Telemetry & Live Scratchpad */}
        <div className="telehealth-sidebar-column">
          {/* Patient Quick Profile */}
          <div className="telehealth-patient-card">
            <span className="card-kicker">Active Patient Telemetry</span>
            <div className="patient-card-row">
              <img 
                src={activePatient.patientImg} 
                alt={activePatient.name} 
                className="sidebar-avatar" 
                onError={(e) => { e.target.onerror = null; e.target.src = PATIENT_FALLBACK_AVATAR; }}
              />
              <div>
                <h3 className="sidebar-patient-name">{activePatient.name}</h3>
                <span className="sidebar-patient-meta">{activePatient.age} • ID: {activePatient.patientId}</span>
              </div>
            </div>

            <div className="sidebar-complaint-box">
              <span className="complaint-lbl">Chief Complaint:</span>
              <p className="complaint-text">{activePatient.chiefComplaint}</p>
            </div>
          </div>

          {/* Real-time Consultation Notes Scratchpad */}
          <div className="telehealth-scratchpad-card">
            <div className="scratchpad-header">
              <FileText size={16} color="#0055FF" />
              <h4 className="scratchpad-title">Live Consultation Remarks</h4>
            </div>
            <textarea 
              className="scratchpad-textarea"
              rows={6}
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="Record clinical observations, patient symptoms, and therapeutic rationale..."
            />
            <span className="scratchpad-autosave-tag">
              <CheckCircle2 size={12} color="#059669" />
              <span>Autosaved to EHR clinical record</span>
            </span>
          </div>

          {/* Today's Queue Switcher */}
          <div className="telehealth-queue-card">
            <span className="card-kicker">Today's Video Schedule</span>
            <div className="telehealth-queue-items">
              {patientRoster.map(pat => (
                <div 
                  key={pat.id}
                  className={`queue-item-row ${activePatient.id === pat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActivePatient(pat);
                    setCallEnded(false);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="queue-patient-meta">
                    <strong>{pat.name}</strong>
                    <span>{pat.slot}</span>
                  </div>
                  {pat.isLive && (
                    <span className="live-bubble">Live</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
