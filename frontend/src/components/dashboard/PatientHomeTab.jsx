import React, { useState } from 'react';
import { 
  Scan, 
  UserCheck, 
  Calendar, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Sun, 
  FileText, 
  MapPin,
  ChevronRight,
  Pill,
  Check,
  AlertCircle,
  Eye,
  Sliders
} from 'lucide-react';

export default function PatientHomeTab({ 
  user, 
  onNavigateTab, 
  appointments = [] 
}) {
  const [protocolCompletedToday, setProtocolCompletedToday] = useState(false);

  const nextApt = appointments[0] || {
    doctorName: "Dr. Sneha Patil",
    clinicName: "Patil Dermacare & Aesthetic Clinic, Kolhapur",
    slot: "Today 4:30 PM",
    diagnosis: "Atopic Dermatitis (Eczema)"
  };

  const pastScans = [
    {
      id: "SCN-1048",
      date: "Today, Oct 11",
      condition: "Atopic Dermatitis (Eczema)",
      confidence: 94.2,
      urgency: "Moderate",
      urgencyColor: "blue",
      bodyArea: "Bilateral Elbow Flexures",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80",
      status: "Doctor Matched"
    },
    {
      id: "SCN-1022",
      date: "Oct 03, 2026",
      condition: "Acne Vulgaris (Papulopustular)",
      confidence: 91.8,
      urgency: "Mild",
      urgencyColor: "green",
      bodyArea: "Facial T-Zone & Cheeks",
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80",
      status: "Resolved"
    },
    {
      id: "SCN-0984",
      date: "Sep 19, 2026",
      condition: "Allergic Contact Dermatitis",
      confidence: 88.5,
      urgency: "Mild",
      urgencyColor: "green",
      bodyArea: "Left Wrist (Watch Contact)",
      img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80",
      status: "Allergen Avoided"
    }
  ];

  return (
    <div className="patient-home-tab-container">
      
      {/* 1. Welcome Header Banner - Hospital Grade Aesthetics */}
      <div className="patient-welcome-card">
        <div className="welcome-header-content">
          <div className="welcome-text-block">
            <div className="patient-status-pill">
              <span className="live-status-dot"></span>
              <span>Patient Clinical ID #DERMA-9104 • Live Triage Active</span>
            </div>
            <h1 className="welcome-greeting">
              Welcome back, {user ? user.name.split(' ')[0] : 'Maliha'} 👋
            </h1>
            <p className="welcome-subtext">
              Track your cutaneous health, run explainable AI skin screenings with Grad-CAM heatmaps, and consult verified board-certified dermatologists.
            </p>
          </div>

          <div className="welcome-quick-actions">
            <button 
              className="welcome-action-btn primary"
              onClick={() => onNavigateTab('scan')}
            >
              <Sparkles size={16} />
              <span>Start AI Skin Scan</span>
            </button>
            <button 
              className="welcome-action-btn secondary"
              onClick={() => onNavigateTab('doctors')}
            >
              <UserCheck size={16} />
              <span>Find Specialists</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Clinical Vitals Metric Cards (4 Harmonious Squircle Cards) */}
      <div className="patient-vitals-grid">
        {/* Metric 1 */}
        <div className="patient-vital-card" onClick={() => onNavigateTab('scan')} role="button" tabIndex={0}>
          <div className="vital-top-row">
            <div className="vital-icon-bubble blue">
              <Scan size={20} color="#0055FF" />
            </div>
            <span className="vital-badge blue">94.2% Match</span>
          </div>
          <span className="vital-title">Recent AI Scan</span>
          <strong className="vital-value">Atopic Dermatitis</strong>
          <span className="vital-desc">Tested Today • Moderate Urgency</span>
        </div>

        {/* Metric 2 */}
        <div className="patient-vital-card" onClick={() => onNavigateTab('appointments')} role="button" tabIndex={0}>
          <div className="vital-top-row">
            <div className="vital-icon-bubble green">
              <Calendar size={20} color="#059669" />
            </div>
            <span className="vital-badge green">Confirmed</span>
          </div>
          <span className="vital-title">Next Consultation</span>
          <strong className="vital-value">{nextApt.slot}</strong>
          <span className="vital-desc">{nextApt.doctorName}</span>
        </div>

        {/* Metric 3 */}
        <div className="patient-vital-card" onClick={() => onNavigateTab('profile')} role="button" tabIndex={0}>
          <div className="vital-top-row">
            <div className="vital-icon-bubble purple">
              <Sun size={20} color="#7C3AED" />
            </div>
            <span className="vital-badge purple">Type IV</span>
          </div>
          <span className="vital-title">Skin Phototype</span>
          <strong className="vital-value">Fitzpatrick Scale IV</strong>
          <span className="vital-desc">Moderate Brown • Daily SPF 50</span>
        </div>

        {/* Metric 4 */}
        <div className="patient-vital-card" onClick={() => onNavigateTab('appointments')} role="button" tabIndex={0}>
          <div className="vital-top-row">
            <div className="vital-icon-bubble blue">
              <ShieldCheck size={20} color="#0055FF" />
            </div>
            <span className="vital-badge blue">Day 3 of 7</span>
          </div>
          <span className="vital-title">Treatment Protocol</span>
          <strong className="vital-value">Active Recovery Plan</strong>
          <span className="vital-desc">Mupirocin 2% & Ceramides</span>
        </div>
      </div>

      {/* 3. Full-Fledged Feature: Active Treatment & Care Protocol Tracker */}
      <div className="clinical-card patient-treatment-tracker-card">
        <div className="tracker-header-row">
          <div>
            <div className="tracker-badge-pill">
              <Pill size={14} color="#0055FF" />
              <span>Prescribed Clinical Care Protocol</span>
            </div>
            <h3 className="tracker-title">Topical Barrier Recovery Protocol</h3>
            <p className="tracker-sub">Prescribed by Dr. Sneha Patil for Atopic Dermatitis (Eczema) • 7-Day Course</p>
          </div>

          <div className="tracker-status-box">
            <span className="tracker-pct-label">Progress: 43% Completed</span>
            <div className="tracker-day-chips">
              {[1, 2, 3, 4, 5, 6, 7].map(day => (
                <div 
                  key={day} 
                  className={`tracker-day-chip ${day < 3 ? 'done' : day === 3 ? (protocolCompletedToday ? 'done' : 'active') : 'pending'}`}
                >
                  {day < 3 || (day === 3 && protocolCompletedToday) ? (
                    <Check size={12} strokeWidth={3} />
                  ) : (
                    <span>D{day}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="tracker-medicines-grid">
          <div className="tracker-med-item">
            <div className="med-time-tag morning">Morning & Evening</div>
            <strong className="med-name">1. Mupirocin 2% Ointment</strong>
            <p className="med-instruction">Apply thin layer across active erythematous plaques after cleansing.</p>
          </div>

          <div className="tracker-med-item">
            <div className="med-time-tag mid-day">3x Throughout Day</div>
            <strong className="med-name">2. Ceramide Barrier Repair Cream</strong>
            <p className="med-instruction">Apply liberally within 3 minutes of bathing to seal lipid moisture barrier.</p>
          </div>

          <div className="tracker-med-item">
            <div className="med-time-tag night">Bedtime (As Needed)</div>
            <strong className="med-name">3. Tab. Levocetirizine 5mg</strong>
            <p className="med-instruction">Take 1 tablet at night if severe nocturnal pruritus (itching) persists.</p>
          </div>
        </div>

        <div className="tracker-footer-row">
          <div className="tracker-reminder-text">
            <Clock size={14} color="#0055FF" />
            <span>Next application reminder scheduled for <strong>8:00 PM tonight</strong>.</span>
          </div>

          <button 
            className={`btn-tracker-log ${protocolCompletedToday ? 'completed' : ''}`}
            onClick={() => setProtocolCompletedToday(!protocolCompletedToday)}
          >
            {protocolCompletedToday ? (
              <>
                <CheckCircle2 size={16} />
                <span>Today's Protocol Logged & Completed ✓</span>
              </>
            ) : (
              <>
                <Check size={16} />
                <span>Mark Day 3 Regimen Completed</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4. Full-Fledged Feature: Recent Clinical Scans & Triage History */}
      <div className="clinical-card patient-scans-history-card">
        <div className="scans-history-header">
          <div>
            <h3 className="card-section-title">Recent Clinical Scans & Triage History</h3>
            <p className="card-section-desc">Chronological neural scans with confidence levels and Grad-CAM activation heatmaps.</p>
          </div>
          <button 
            className="btn-history-view-all"
            onClick={() => onNavigateTab('scan')}
          >
            <span>Run New Scan</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="scans-history-list">
          {pastScans.map(scan => (
            <div key={scan.id} className="scan-history-row-item">
              <div className="scan-thumb-wrap">
                <img src={scan.img} alt={scan.condition} className="scan-thumb-img" />
                <span className="scan-thumb-pill">
                  <Sparkles size={11} /> Heatmap
                </span>
              </div>

              <div className="scan-info-main">
                <div className="scan-meta-top">
                  <span className="scan-id-tag">{scan.id}</span>
                  <span className="scan-date-tag">{scan.date}</span>
                </div>
                <h4 className="scan-condition-heading">{scan.condition}</h4>
                <div className="scan-details-row">
                  <span className="scan-location-tag">
                    <MapPin size={12} /> {scan.bodyArea}
                  </span>
                  <span className={`scan-urgency-tag ${scan.urgencyColor}`}>
                    {scan.urgency} Urgency
                  </span>
                </div>
              </div>

              <div className="scan-action-col">
                <div className="scan-confidence-score">
                  <span className="conf-num">{scan.confidence}%</span>
                  <span className="conf-sub">AI Match</span>
                </div>
                <button 
                  className="btn-view-scan-detail"
                  onClick={() => onNavigateTab('scan')}
                  title="View Grad-CAM Deep Vision Analysis"
                >
                  <Eye size={14} />
                  <span>Inspect Heatmap</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Triage Spotlight Banner with Grad-CAM Visualization */}
      <div className="patient-triage-spotlight-card">
        <div className="spotlight-badge-row">
          <span className="spotlight-tag">
            <Activity size={13} color="#0055FF" /> Latest Clinical Scan Triage
          </span>
          <span className="spotlight-date">Scanned Oct 11, 2026 • 14:22</span>
        </div>

        <div className="spotlight-body-layout">
          <div className="spotlight-thumb-wrap" onClick={() => onNavigateTab('scan')}>
            <img 
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80" 
              alt="Recent Scan Lesion" 
              className="spotlight-img"
            />
            <div className="spotlight-overlay-pill">
              <Sparkles size={12} /> Grad-CAM Active
            </div>
          </div>

          <div className="spotlight-info-col">
            <div className="spotlight-heading-row">
              <h3 className="spotlight-condition-name">Atopic Dermatitis (Eczema)</h3>
              <span className="spotlight-conf-badge">94.2% Confidence</span>
            </div>
            <p className="spotlight-summary-text">
              Deep convolutional neural network localized severe erythema and cutaneous barrier degradation across flexural creases. Grad-CAM visual heatmaps confirmed high gradient activation on active erythematous patches.
            </p>

            <div className="spotlight-actions-row">
              <button 
                className="btn-spotlight-primary"
                onClick={() => onNavigateTab('scan')}
              >
                <span>Inspect Grad-CAM Heatmap</span>
                <ArrowRight size={15} />
              </button>
              <button 
                className="btn-spotlight-secondary"
                onClick={() => onNavigateTab('doctors')}
              >
                <span>Match Dermatologist</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Complete Patient Modules Navigation Cards (4 Luxury Squircles) */}
      <div className="patient-section-header">
        <div>
          <h2 className="patient-section-heading">Clinical Care Modules</h2>
          <p className="patient-section-desc">Access full-fledged diagnostic tools, appointments, and medical tracking records.</p>
        </div>
      </div>

      <div className="patient-modules-grid">
        {/* Module 1: AI Scanner */}
        <div className="patient-module-card" onClick={() => onNavigateTab('scan')} role="button" tabIndex={0}>
          <div className="module-card-icon-bubble blue">
            <Scan size={26} color="#0055FF" strokeWidth={2.4} />
          </div>
          <h3 className="module-card-title">AI Vision & Grad-CAM Scanner</h3>
          <p className="module-card-desc">
            Upload custom skin photos for deep learning classification across 80+ dermatoses with interactive split-slider heatmaps.
          </p>
          <div className="module-card-footer">
            <span className="module-card-cta">Launch AI Scanner</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Module 2: Doctor Match */}
        <div className="patient-module-card" onClick={() => onNavigateTab('doctors')} role="button" tabIndex={0}>
          <div className="module-card-icon-bubble purple">
            <UserCheck size={26} color="#7C3AED" strokeWidth={2.4} />
          </div>
          <h3 className="module-card-title">Smart Dermatologist Match</h3>
          <p className="module-card-desc">
            Algorithmic doctor matching by location proximity, same-day schedule slots, rating, and physician gender preference.
          </p>
          <div className="module-card-footer">
            <span className="module-card-cta">Find Specialists</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Module 3: Consultations */}
        <div className="patient-module-card" onClick={() => onNavigateTab('appointments')} role="button" tabIndex={0}>
          <div className="module-card-icon-bubble emerald">
            <Calendar size={26} color="#059669" strokeWidth={2.4} />
          </div>
          <h3 className="module-card-title">My Consultations & Prescriptions</h3>
          <p className="module-card-desc">
            View upcoming visits, doctor notes, and digital prescriptions (℞) with medication schedules and care protocols.
          </p>
          <div className="module-card-footer">
            <span className="module-card-cta">View Appointments</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Module 4: Health Passport */}
        <div className="patient-module-card" onClick={() => onNavigateTab('profile')} role="button" tabIndex={0}>
          <div className="module-card-icon-bubble blue">
            <Heart size={26} color="#0055FF" strokeWidth={2.4} />
          </div>
          <h3 className="module-card-title">Skin Health Passport & History</h3>
          <p className="module-card-desc">
            Manage your Fitzpatrick phototype assessment, cutaneous allergy manager, and chronological lesion screening logs.
          </p>
          <div className="module-card-footer">
            <span className="module-card-cta">Open Health Passport</span>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>

    </div>
  );
}
