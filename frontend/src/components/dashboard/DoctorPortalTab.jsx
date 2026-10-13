import React, { useState } from 'react';
import { 
  Stethoscope, 
  User, 
  Layers, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Plus, 
  Send, 
  ShieldCheck, 
  Eye, 
  AlertTriangle, 
  Search, 
  Filter, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Calendar, 
  Activity, 
  Check, 
  Sliders, 
  Sparkles, 
  Download, 
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Pill,
  X
} from 'lucide-react';
import { CLINICAL_CASES } from '../../data/mockData';

export default function DoctorPortalTab() {
  const [activeSubTab, setActiveSubTab] = useState('triage'); // 'triage' | 'telehealth' | 'prescriptions' | 'analytics'
  const [filterUrgency, setFilterUrgency] = useState('all'); // 'all' | 'urgent' | 'pending' | 'issued'
  const [searchQuery, setSearchQuery] = useState('');

  const [patientCases, setPatientCases] = useState([
    {
      id: "case-p1",
      patientId: "PT-8291",
      patientName: "Rohan Varma",
      age: 28,
      gender: "Male",
      slot: "Today, 4:30 PM",
      condition: "Atopic Dermatitis (Eczema)",
      confidence: 88.6,
      urgency: "Moderate",
      urgencyColor: "amber",
      allergies: "Nickel Sulfate, Fragrance Mix",
      fitzpatrick: "Type IV",
      notes: "Severe pruritus on bilateral inner elbow flexures and neck for past 3 weeks. OTC calamine did not alleviate erythema.",
      status: "Review Pending",
      caseData: CLINICAL_CASES[0],
      differentials: [
        { name: "Atopic Dermatitis (Eczema)", pct: 88.6, primary: true },
        { name: "Allergic Contact Dermatitis", pct: 7.8, primary: false },
        { name: "Lichen Simplex Chronicus", pct: 3.6, primary: false }
      ]
    },
    {
      id: "case-p2",
      patientId: "PT-8294",
      patientName: "Meera K.",
      age: 34,
      gender: "Female",
      slot: "Today, 6:15 PM",
      condition: "Plaque Psoriasis",
      confidence: 93.2,
      urgency: "Moderate",
      urgencyColor: "amber",
      allergies: "None Reported",
      fitzpatrick: "Type III",
      notes: "Scaling plaques over extensor surface of knees. Significant hyperkeratosis and silver micaceous scaling after seasonal weather change.",
      status: "Confirmed",
      caseData: CLINICAL_CASES[1],
      differentials: [
        { name: "Plaque Psoriasis", pct: 93.2, primary: true },
        { name: "Nummular Eczema", pct: 4.5, primary: false },
        { name: "Guttate Parapsoriasis", pct: 2.3, primary: false }
      ]
    },
    {
      id: "case-p3",
      patientId: "PT-8302",
      patientName: "Aman Shaikh",
      age: 46,
      gender: "Male",
      slot: "Tomorrow, 10:30 AM",
      condition: "Suspicious Pigmented Lesion (Melanoma Screen)",
      confidence: 91.4,
      urgency: "Urgent",
      urgencyColor: "red",
      allergies: "Penicillin, Latex",
      fitzpatrick: "Type V",
      notes: "Asymmetrical pigmented macule on upper right shoulder with irregular scalloped borders and variegated dark brown tones. Occasional bleeding on friction.",
      status: "Review Pending",
      caseData: CLINICAL_CASES[3],
      differentials: [
        { name: "Superficial Spreading Melanoma", pct: 91.4, primary: true },
        { name: "Atypical Dysplastic Nevus", pct: 6.2, primary: false },
        { name: "Pigmented Basal Cell Carcinoma", pct: 2.4, primary: false }
      ]
    }
  ]);

  const [selectedCase, setSelectedCase] = useState(patientCases[0]);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'sideBySide' | 'gradcam' | 'original'
  const [sliderPos, setSliderPos] = useState(50);
  const [doctorAgreement, setDoctorAgreement] = useState('agree'); // 'agree' | 'override'
  
  const [clinicalNotes, setClinicalNotes] = useState(
    "Dermoscopy and clinical presentation show prominent erythematous flexural plaques with epidermal lichenification, closely matching AI Grad-CAM hotzones. Advise topical barrier repair and short-course mild corticosteroid."
  );
  const [rxMedicines, setRxMedicines] = useState([
    { name: "Mupirocin 2% Ointment", dose: "Thin layer", freq: "Twice daily for 7 days" },
    { name: "Ceramide Barrier Repair Cream", dose: "Liberal application", freq: "3 times daily on affected plaques" },
    { name: "Tab. Levocetirizine 5mg", dose: "1 tablet", freq: "At bedtime if nocturnal pruritus occurs" }
  ]);
  const [followUpDays, setFollowUpDays] = useState("7 Days");
  const [isSuccess, setIsSuccess] = useState(false);

  // Telehealth Video Call Modal State
  const [isTelehealthOpen, setIsTelehealthOpen] = useState(false);
  const [callDuration, setCallDuration] = useState("04:18");
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Quick formulary preset items
  const formularyPresets = [
    { name: "Hydrocortisone 1% Cream", dose: "Thin film", freq: "Twice daily for 5 days" },
    { name: "Clobetasol Propionate 0.05%", dose: "Fingertip unit", freq: "Once daily for 3 days" },
    { name: "Tacrolimus 0.1% Ointment", dose: "Sparingly", freq: "Twice daily for 14 days" },
    { name: "Tab. Bilastine 20mg", dose: "1 tablet", freq: "Once daily before breakfast" },
    { name: "Ketoconazole 2% Cream", dose: "Pea size", freq: "Twice daily for 10 days" }
  ];

  const handleAddPresetMed = (preset) => {
    if (!rxMedicines.some(m => m.name === preset.name)) {
      setRxMedicines([...rxMedicines, preset]);
    }
  };

  const handleRemoveMed = (index) => {
    setRxMedicines(rxMedicines.filter((_, i) => i !== index));
  };

  const handleSendPrescription = (e) => {
    e.preventDefault();
    setPatientCases(prev => prev.map(c => 
      c.id === selectedCase.id ? { ...c, status: "Prescription Issued" } : c
    ));
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 4000);
  };

  const filteredQueue = patientCases.filter(c => {
    const matchesSearch = c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterUrgency === 'urgent') return c.urgency === 'Urgent';
    if (filterUrgency === 'pending') return c.status === 'Review Pending';
    if (filterUrgency === 'issued') return c.status === 'Prescription Issued';
    return true;
  });

  return (
    <div className="dashboard-tab-content doctor-portal-container">
      
      {/* 1. Doctor Workstation Top Header Card */}
      <div className="clinical-card doctor-workstation-header">
        <div className="doc-portal-row">
          <div className="doc-identity-block">
            <div className="doc-badge-chip">
              <Stethoscope size={15} color="#0055FF" />
              <span>Dermatologist Clinical Workstation • Attending Level</span>
            </div>
            <h2 className="doc-main-title">Inpatient Triage & Neural Grad-CAM Verification</h2>
            <p className="doc-subtitle">
              Review convolutional neural network saliency maps, verify differential triage, and furnish digitally signed clinical prescriptions (℞).
            </p>
          </div>

          <div className="doc-duty-badge">
            <div className="doc-avatar-dot-wrap">
              <span className="live-dot-glow"></span>
            </div>
            <div className="doc-duty-info">
              <span className="doc-duty-name">Dr. Ananya Sharma, MD</span>
              <span className="doc-duty-sub">MCI Reg #9104-D • Active Duty</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Real-Time Clinical Vitals & Concordance Metrics (4 Squircles) */}
      <div className="doctor-metrics-grid">
        <div className="doc-metric-card">
          <div className="metric-icon-wrap blue">
            <Activity size={20} color="#0055FF" />
          </div>
          <div className="metric-info-col">
            <span className="metric-label">Active Triage Queue</span>
            <strong className="metric-number">{patientCases.length} Patients</strong>
            <span className="metric-tag red">1 Urgent Melanoma Alert</span>
          </div>
        </div>

        <div className="doc-metric-card">
          <div className="metric-icon-wrap green">
            <ShieldCheck size={20} color="#059669" />
          </div>
          <div className="metric-info-col">
            <span className="metric-label">Diagnostic Concordance</span>
            <strong className="metric-number">98.4% Match</strong>
            <span className="metric-tag green">Physician vs Model Agreement</span>
          </div>
        </div>

        <div className="doc-metric-card">
          <div className="metric-icon-wrap purple">
            <Calendar size={20} color="#7C3AED" />
          </div>
          <div className="metric-info-col">
            <span className="metric-label">Today's Completed Visits</span>
            <strong className="metric-number">14 Patients</strong>
            <span className="metric-tag blue">Avg 11 min / Consultation</span>
          </div>
        </div>

        <div className="doc-metric-card">
          <div className="metric-icon-wrap blue">
            <Video size={20} color="#0055FF" />
          </div>
          <div className="metric-info-col">
            <span className="metric-label">Virtual Telehealth Room</span>
            <strong className="metric-number">Clinic Ready</strong>
            <button 
              className="metric-launch-btn"
              onClick={() => setIsTelehealthOpen(true)}
            >
              <span>Test Video Call</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub-Navigation Tabs */}
      <div className="doc-subnav-bar">
        <button 
          className={`doc-subnav-pill ${activeSubTab === 'triage' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('triage')}
        >
          <Layers size={15} />
          <span>Triage Queue & XAI Review</span>
          <span className="subnav-count-badge">{patientCases.length}</span>
        </button>

        <button 
          className={`doc-subnav-pill ${activeSubTab === 'telehealth' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('telehealth')}
        >
          <Video size={15} />
          <span>Telehealth Schedule ({patientCases.length} Slots)</span>
        </button>

        <button 
          className={`doc-subnav-pill ${activeSubTab === 'prescriptions' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('prescriptions')}
        >
          <FileText size={15} />
          <span>Formulary & Prescription Studio</span>
        </button>
      </div>

      {/* Tab Pane 1: Triage Queue & XAI Review */}
      {activeSubTab === 'triage' && (
        <div className="doctor-portal-split">
          
          {/* Left Column: Patient Triage Queue */}
          <div className="doc-queue-col">
            <div className="queue-filter-header">
              <div className="queue-search-wrap">
                <Search size={15} className="queue-search-icon" />
                <input 
                  type="text" 
                  placeholder="Search patient, ID, or condition..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="queue-search-input"
                />
              </div>

              <div className="queue-filter-pills">
                <button 
                  className={`queue-filter-btn ${filterUrgency === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterUrgency('all')}
                >
                  All ({patientCases.length})
                </button>
                <button 
                  className={`queue-filter-btn ${filterUrgency === 'urgent' ? 'active' : ''}`}
                  onClick={() => setFilterUrgency('urgent')}
                >
                  Urgent (1)
                </button>
                <button 
                  className={`queue-filter-btn ${filterUrgency === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilterUrgency('pending')}
                >
                  Pending (2)
                </button>
                <button 
                  className={`queue-filter-btn ${filterUrgency === 'issued' ? 'active' : ''}`}
                  onClick={() => setFilterUrgency('issued')}
                >
                  Issued (1)
                </button>
              </div>
            </div>

            <div className="queue-list">
              {filteredQueue.map(item => (
                <div 
                  key={item.id}
                  className={`clinical-card queue-card ${selectedCase.id === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedCase(item)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="queue-card-top">
                    <div className="queue-user-meta">
                      <span className="queue-name">{item.patientName}</span>
                      <span className="queue-id-tag">{item.patientId}</span>
                    </div>
                    <span className={`badge ${item.status === 'Prescription Issued' ? 'badge-green' : item.urgency === 'Urgent' ? 'badge-red' : 'badge-amber'}`}>
                      {item.urgency === 'Urgent' ? '⚠️ High Urgency' : item.status}
                    </span>
                  </div>

                  <div className="queue-demographics-row">
                    <span>{item.age} yrs • {item.gender}</span>
                    <span className="queue-time-slot">
                      <Clock size={12} /> {item.slot}
                    </span>
                  </div>

                  <div className="queue-cond-tag">
                    <span className="queue-cond-label">Model Inference:</span>
                    <strong className="queue-cond-val">{item.condition}</strong>
                    <span className="queue-conf-badge">{item.confidence}%</span>
                  </div>

                  <p className="queue-snippet-note">"{item.notes}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: In-Depth Clinical Evaluation & Prescription Studio */}
          <div className="doc-workspace-col clinical-card">
            
            {/* Patient Header Banner */}
            <div className="doc-ws-header">
              <div>
                <div className="ws-kicker-row">
                  <span className="ws-kicker">Patient Clinical Intake Profile</span>
                  <span className="ws-record-id">ID: {selectedCase.patientId}</span>
                </div>
                <h3 className="ws-patient-name">
                  {selectedCase.patientName} 
                  <span className="ws-age-tag">({selectedCase.age} yrs, {selectedCase.gender})</span>
                </h3>
                
                <div className="ws-patient-tags-strip">
                  <span className="ws-pill-tag fitz">
                    Fitzpatrick: {selectedCase.fitzpatrick}
                  </span>
                  <span className="ws-pill-tag allergy">
                    Allergies: {selectedCase.allergies}
                  </span>
                  <span className="ws-pill-tag slot">
                    <Clock size={12} /> {selectedCase.slot}
                  </span>
                </div>

                <div className="ws-patient-notes-callout">
                  <strong>Patient Symptoms:</strong> "{selectedCase.notes}"
                </div>
              </div>

              <div className="ws-quick-actions-col">
                <button 
                  className="btn-launch-video-call"
                  onClick={() => setIsTelehealthOpen(true)}
                  title="Connect via High-Definition Video Telehealth"
                >
                  <Video size={16} />
                  <span>Start Telehealth Video</span>
                </button>
              </div>
            </div>

            {/* Explainable AI Layer & Grad-CAM Verification Studio */}
            <div className="doc-xai-inspection-box">
              <div className="xai-strip-header">
                <div className="xai-header-left">
                  <Layers size={16} color="#0055FF" />
                  <strong>Explainable AI Verification (CNN Model Grad-CAM Layer)</strong>
                </div>

                <div className="xai-view-modes">
                  <button 
                    className={`btn-xai-mode ${viewMode === 'slider' ? 'active' : ''}`}
                    onClick={() => setViewMode('slider')}
                  >
                    <Sliders size={13} /> Split Slider
                  </button>
                  <button 
                    className={`btn-xai-mode ${viewMode === 'sideBySide' ? 'active' : ''}`}
                    onClick={() => setViewMode('sideBySide')}
                  >
                    Side-by-Side
                  </button>
                  <button 
                    className={`btn-xai-mode ${viewMode === 'gradcam' ? 'active' : ''}`}
                    onClick={() => setViewMode('gradcam')}
                  >
                    Grad-CAM
                  </button>
                  <button 
                    className={`btn-xai-mode ${viewMode === 'original' ? 'active' : ''}`}
                    onClick={() => setViewMode('original')}
                  >
                    Raw Skin
                  </button>
                </div>
              </div>

              {/* Interactive Visualizer Canvas */}
              <div className="doc-viewer-canvas">
                {viewMode === 'slider' && (
                  <div className="interactive-slider-box">
                    <div className="viewer-slide-layer gradcam-bg">
                      <img src={selectedCase.caseData.gradcamImage} alt="Grad-CAM Heatmap" className="viewer-img" />
                      <div className="viewer-watermark right">Grad-CAM Jet Heatmap (Layer: Conv5)</div>
                    </div>
                    <div 
                      className="viewer-slide-layer original-fg"
                      style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                    >
                      <img src={selectedCase.caseData.originalImage} alt="Raw Tissue" className="viewer-img" />
                      <div className="viewer-watermark left">Raw Ingested Dermoscopic Tissue</div>
                    </div>
                    <div className="viewer-divider-bar" style={{ left: `${sliderPos}%` }}>
                      <div className="viewer-divider-handle"><span>&lt; &gt;</span></div>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPos}
                      onChange={(e) => setSliderPos(Number(e.target.value))}
                      className="viewer-range-slider"
                      aria-label="Grad-CAM slider"
                    />
                  </div>
                )}

                {viewMode === 'sideBySide' && (
                  <div className="dual-side-viewer-grid">
                    <div className="dual-item">
                      <span className="dual-badge">Raw Ingested Skin</span>
                      <img src={selectedCase.caseData.originalImage} alt="Raw Tissue" className="viewer-img" />
                    </div>
                    <div className="dual-item">
                      <span className="dual-badge gradcam-badge">Grad-CAM Activation Map</span>
                      <img src={selectedCase.caseData.gradcamImage} alt="Grad-CAM Heatmap" className="viewer-img" />
                    </div>
                  </div>
                )}

                {viewMode === 'gradcam' && (
                  <div className="single-viewer-box">
                    <img src={selectedCase.caseData.gradcamImage} alt="Grad-CAM Heatmap" className="viewer-img" />
                    <div className="viewer-watermark">Grad-CAM Jet Heatmap Overlay</div>
                  </div>
                )}

                {viewMode === 'original' && (
                  <div className="single-viewer-box">
                    <img src={selectedCase.caseData.originalImage} alt="Raw Tissue" className="viewer-img" />
                    <div className="viewer-watermark">High-Resolution Dermoscopic Image</div>
                  </div>
                )}
              </div>

              {/* Model Confidence & Differential Triage Table */}
              <div className="doc-differential-analysis-card">
                <div className="diff-header-row">
                  <span className="diff-head-title">Neural Model Differential Triage Breakdown</span>
                  <span className="diff-head-accuracy">Validation Sensitivity: 97.2%</span>
                </div>

                <div className="doc-diff-rows-grid">
                  {selectedCase.differentials.map((item, idx) => (
                    <div key={idx} className={`doc-diff-row ${item.primary ? 'primary' : ''}`}>
                      <div className="diff-row-left">
                        <span className="diff-rank">{idx + 1}.</span>
                        <span className="diff-condition-name">{item.name}</span>
                        {item.primary && <span className="diff-primary-tag">Primary</span>}
                      </div>
                      <div className="diff-row-right">
                        <div className="diff-mini-bar">
                          <div className="diff-mini-fill" style={{ width: `${item.pct}%` }}></div>
                        </div>
                        <strong className="diff-pct-text">{item.pct}%</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Doctor Concordance Agreement Action */}
                <div className="doc-concordance-decision-bar">
                  <span className="decision-prompt">Physician Diagnostic Concordance:</span>
                  <div className="decision-buttons">
                    <button 
                      className={`btn-decision ${doctorAgreement === 'agree' ? 'agree' : ''}`}
                      onClick={() => setDoctorAgreement('agree')}
                    >
                      <CheckCircle2 size={15} />
                      <span>Concordant with AI (Confirm {selectedCase.condition.split('(')[0]})</span>
                    </button>
                    <button 
                      className={`btn-decision ${doctorAgreement === 'override' ? 'override' : ''}`}
                      onClick={() => setDoctorAgreement('override')}
                    >
                      <AlertTriangle size={15} />
                      <span>Diagnostic Override</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Prescription & Advice Form */}
            <form onSubmit={handleSendPrescription} className="doc-action-form">
              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">
                    <FileText size={15} color="#0055FF" />
                    <span>Doctor's Clinical Impression & Examination Remarks</span>
                  </label>
                  <span className="form-hint">Patient portal & EHR record</span>
                </div>
                <textarea 
                  rows={3}
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  className="form-input form-textarea"
                  placeholder="Enter clinical examination remarks, morphological findings, and advice..."
                  required
                />
              </div>

              {/* Interactive Medication Formulary Prescription Builder */}
              <div className="prescription-builder-group">
                <div className="builder-header-row">
                  <label className="form-label">
                    <Pill size={15} color="#0055FF" />
                    <span>Prescribed Formulary & Care Protocol (℞)</span>
                  </label>
                  <span className="builder-sub">Quick formulary presets:</span>
                </div>

                {/* Quick Add Preset Formulations */}
                <div className="formulary-chips-row">
                  {formularyPresets.map((preset, idx) => (
                    <button 
                      key={idx}
                      type="button" 
                      className="btn-add-preset-chip"
                      onClick={() => handleAddPresetMed(preset)}
                      title={`Add ${preset.name} to prescription`}
                    >
                      <Plus size={12} />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>

                {/* Active Medicines Table */}
                <div className="active-medicines-table">
                  <div className="active-med-header">
                    <span>Medication / Molecule</span>
                    <span>Dosage</span>
                    <span>Frequency & Instructions</span>
                    <span>Action</span>
                  </div>
                  {rxMedicines.map((med, idx) => (
                    <div key={idx} className="active-med-row">
                      <strong className="med-name-text">{med.name}</strong>
                      <span className="med-dose-text">{med.dose}</span>
                      <span className="med-freq-text">{med.freq}</span>
                      <button 
                        type="button"
                        className="btn-remove-med"
                        onClick={() => handleRemoveMed(idx)}
                        title="Remove from prescription"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="followup-scheduling-row">
                  <span className="followup-lbl">Recommended Follow-Up Interval:</span>
                  <div className="followup-pills">
                    {["3 Days", "7 Days", "14 Days", "1 Month"].map(duration => (
                      <button
                        key={duration}
                        type="button"
                        className={`followup-pill ${followUpDays === duration ? 'active' : ''}`}
                        onClick={() => setFollowUpDays(duration)}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Digital Doctor Signature Certification Seal */}
              <div className="doc-certification-seal">
                <ShieldCheck size={20} color="#059669" />
                <div className="seal-text">
                  <strong>Digital Signature Certification:</strong> Verified by Dr. Ananya Sharma, MD Dermatology (MCI Reg #9104-D) • Apex Skin & Laser Institute. Prescription is legally certified under Telemedicine Practice Guidelines.
                </div>
              </div>

              {isSuccess && (
                <div className="doc-success-banner animate-fadeIn">
                  <CheckCircle2 size={18} color="#059669" />
                  <div>
                    <strong>Official Digital Prescription (℞) Issued & Dispatched!</strong>
                    <p className="success-sub-text">
                      Synchronized to {selectedCase.patientName}'s Patient Portal and sent via SMS & WhatsApp.
                    </p>
                  </div>
                </div>
              )}

              <div className="doc-form-footer">
                <button type="submit" className="btn btn-primary btn-lg">
                  <Send size={16} />
                  <span>Dispatch Certified Digital Prescription (℞)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab Pane 2: Telehealth Schedule */}
      {activeSubTab === 'telehealth' && (
        <div className="doc-telehealth-pane">
          <div className="clinical-card telehealth-schedule-card">
            <div className="schedule-header-row">
              <div>
                <h3 className="card-section-title">Today's Telehealth & Video Consultations</h3>
                <p className="card-section-desc">Encrypted peer-to-peer telehealth video rooms with integrated patient dermoscopic telemetry.</p>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setIsTelehealthOpen(true)}
              >
                <Video size={15} />
                <span>Open Virtual Telehealth Room</span>
              </button>
            </div>

            <div className="telehealth-slots-stack">
              {patientCases.map((apt, idx) => (
                <div key={apt.id} className="telehealth-slot-item clinical-card">
                  <div className="slot-item-left">
                    <div className="slot-time-bubble">
                      <Clock size={16} color="#0055FF" />
                      <strong>{apt.slot}</strong>
                    </div>
                    <div>
                      <h4 className="slot-patient-title">{apt.patientName} ({apt.age} yrs, {apt.gender})</h4>
                      <p className="slot-patient-diagnosis">Diagnosed: {apt.condition} • {apt.confidence}% AI Confidence</p>
                    </div>
                  </div>

                  <div className="slot-item-right">
                    <span className={`badge ${apt.urgency === 'Urgent' ? 'badge-red' : 'badge-green'}`}>
                      {apt.urgency} Urgency
                    </span>
                    <button 
                      className="btn-join-telehealth"
                      onClick={() => {
                        setSelectedCase(apt);
                        setIsTelehealthOpen(true);
                      }}
                    >
                      <Video size={15} />
                      <span>Launch Video Call</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Pane 3: Clinical Formulary & Prescription Library */}
      {activeSubTab === 'prescriptions' && (
        <div className="clinical-card doc-formulary-library-card">
          <div className="formulary-library-header">
            <div>
              <h3 className="card-section-title">Clinical Formulary & Approved Dermatological Protocols</h3>
              <p className="card-section-desc">Standardized pharmacological guidelines for topical, oral, and biologic dermatoses treatments.</p>
            </div>
          </div>

          <div className="formulary-cards-grid">
            <div className="formulary-detail-card">
              <span className="formulary-category-pill">Topical Corticosteroids (Class IV-VI)</span>
              <h4 className="formulary-drug-name">Hydrocortisone 1% & Desonide 0.05%</h4>
              <p className="formulary-guideline">Indicated for mild flexural eczema and facial dermatoses. Apply thin layer BD for maximum 7 days to prevent epidermal atrophy.</p>
              <span className="formulary-contraindication">Caution: Avoid periocular application without intraocular pressure screening.</span>
            </div>

            <div className="formulary-detail-card">
              <span className="formulary-category-pill">Calcineurin Inhibitors (Non-Steroidal)</span>
              <h4 className="formulary-drug-name">Tacrolimus 0.1% & Pimecrolimus 1%</h4>
              <p className="formulary-guideline">Ideal for long-term maintenance in atopic eczema flares and delicate facial/periorbital skin where steroid atrophy is a risk.</p>
              <span className="formulary-contraindication">Notice: Advise patient of transient mild stinging during initial 48 hours.</span>
            </div>

            <div className="formulary-detail-card">
              <span className="formulary-category-pill">Topical Antibacterials</span>
              <h4 className="formulary-drug-name">Mupirocin 2% & Fusidic Acid 2%</h4>
              <p className="formulary-guideline">Indicated for secondary bacterial impetiginization of eczematous plaques or honey-colored crusting.</p>
              <span className="formulary-contraindication">Regimen: Twice daily for 7 days after lukewarm saline cleanse.</span>
            </div>

            <div className="formulary-detail-card">
              <span className="formulary-category-pill">Barrier Lipid Therapy</span>
              <h4 className="formulary-drug-name">Physiological Ceramide 3:1:1 Complex</h4>
              <p className="formulary-guideline">Restores the stratum corneum extracellular matrix by replenishing ceramides, cholesterol, and free fatty acids.</p>
              <span className="formulary-contraindication">Instructions: Apply within 3 minutes post-bathing to lock in water hydration.</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Live Telehealth Video Consultation Modal */}
      {isTelehealthOpen && (
        <div className="modal-backdrop" onClick={() => setIsTelehealthOpen(false)}>
          <div className="telehealth-video-modal" onClick={(e) => e.stopPropagation()}>
            
            {/* Video Modal Top Bar */}
            <div className="video-modal-header">
              <div className="video-header-left">
                <span className="telehealth-live-dot"></span>
                <strong>Live Telehealth Consultation: {selectedCase.patientName}</strong>
                <span className="video-timer-badge">{callDuration}</span>
              </div>
              <button 
                className="video-modal-close"
                onClick={() => setIsTelehealthOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Streams Canvas */}
            <div className="video-canvas-grid">
              {/* Primary Feed: Patient */}
              <div className="video-stream-box patient-stream">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" 
                  alt="Patient Video" 
                  className="video-stream-img" 
                />
                <div className="video-stream-overlay-label">
                  <span>{selectedCase.patientName} (Patient)</span>
                  <span className="stream-quality-tag">HD 1080p • Encrypted</span>
                </div>

                {/* Picture-in-Picture: Doctor Stream */}
                <div className="video-stream-pip doctor-pip">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80" 
                    alt="Doctor Video" 
                    className="pip-img" 
                  />
                  <span className="pip-label">You (Dr. Ananya)</span>
                </div>
              </div>

              {/* Sidebar: Patient Live Telemetry & Triage Notes */}
              <div className="video-telemetry-sidebar">
                <div className="telemetry-box">
                  <h4 className="telemetry-title">Dermoscopic AI Telemetry</h4>
                  <div className="telemetry-thumb-row">
                    <img src={selectedCase.caseData.originalImage} alt="Patient Skin" className="telemetry-thumb" />
                    <div>
                      <strong>{selectedCase.condition}</strong>
                      <span className="text-electric block text-xs">{selectedCase.confidence}% Confidence</span>
                    </div>
                  </div>
                </div>

                <div className="telemetry-box">
                  <h4 className="telemetry-title">Live Call Remarks</h4>
                  <textarea 
                    rows={4} 
                    className="telemetry-notes-input"
                    placeholder="Type live examination notes during call..."
                    defaultValue={`Patient reporting symptom relief since yesterday. Lesion erythematous boundary decreased by ~20%.`}
                  />
                </div>

                <div className="telemetry-call-actions">
                  <button 
                    className="btn btn-primary btn-block btn-sm"
                    onClick={() => {
                      setIsTelehealthOpen(false);
                      setIsSuccess(true);
                      setTimeout(() => setIsSuccess(false), 4000);
                    }}
                  >
                    <CheckCircle2 size={14} />
                    <span>Conclude Call & Dispatch Rx</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Video Call Controls Bottom Bar */}
            <div className="video-modal-footer">
              <div className="call-controls-row">
                <button 
                  className={`btn-call-control ${isMicMuted ? 'muted' : ''}`}
                  onClick={() => setIsMicMuted(!isMicMuted)}
                  title={isMicMuted ? "Unmute Microphone" : "Mute Microphone"}
                >
                  {isMicMuted ? <MicOff size={18} /> : <Mic size={18} />}
                </button>

                <button 
                  className={`btn-call-control ${isVideoOff ? 'muted' : ''}`}
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
                >
                  {isVideoOff ? <VideoOff size={18} /> : <Video size={18} />}
                </button>

                <button 
                  className="btn-call-control hangup"
                  onClick={() => setIsTelehealthOpen(false)}
                  title="End Consultation Call"
                >
                  <PhoneOff size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
