import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  User, 
  Activity, 
  ArrowRight,
  Info,
  Check,
  X
} from 'lucide-react';
import { CLINICAL_CASES } from '../../data/mockData';

export default function DoctorTriageQueue({ onProceedToPrescription }) {
  const triageCases = [
    {
      id: "SCN-8821",
      patientName: "Rahul Sharma",
      age: "29 / M",
      patientId: "DERMA-9104",
      phototype: "Fitzpatrick Type IV",
      location: "Left Antecubital Fossa (Elbow)",
      symptomDuration: "3 Weeks",
      pruritusScore: "8 / 10 (Severe nocturnal itching)",
      allergies: "Nickel, Fragrance Mix I",
      top1: "Eczema / Atopic Dermatitis",
      datasetFolder: "Eczema Photos",
      top1Prob: 94.2,
      top1Icd: "ICD-11: EA80",
      top2: "Fungal Infection / Ringworm",
      top2Prob: 4.1,
      top3: "Healthy Skin (Control)",
      top3Prob: 1.7,
      originalImg: CLINICAL_CASES[1]?.originalImage,
      gradcamImg: CLINICAL_CASES[1]?.gradcamImage,
      urgency: "Moderate Flare",
      status: "Pending Attending Sign-Off"
    },
    {
      id: "SCN-8822",
      patientName: "Priya Patel",
      age: "42 / F",
      patientId: "DERMA-7320",
      phototype: "Fitzpatrick Type III",
      location: "Upper Thoracic Posterior (Mid-Back)",
      symptomDuration: "Noticed 2 Months ago",
      pruritusScore: "1 / 10 (Asymptomatic)",
      allergies: "No known drug allergies",
      top1: "Melanoma & Skin Cancer / Moles",
      datasetFolder: "Melanoma Skin Cancer Nevi And Moles",
      top1Prob: 93.9,
      top1Icd: "ICD-11: 2C30 / 2B90",
      top2: "Vascular Tumors & Lesions",
      top2Prob: 4.6,
      top3: "Healthy Skin (Control)",
      top3Prob: 1.5,
      originalImg: CLINICAL_CASES[5]?.originalImage,
      gradcamImg: CLINICAL_CASES[5]?.gradcamImage,
      urgency: "Urgent Biopsy Priority",
      status: "Pending Attending Sign-Off"
    },
    {
      id: "SCN-8823",
      patientName: "Amit Roy",
      age: "36 / M",
      patientId: "DERMA-6411",
      phototype: "Fitzpatrick Type IV",
      location: "Bilateral Cheeks & Nose (Malar)",
      symptomDuration: "2 Months",
      pruritusScore: "5 / 10 (Moderate Burning)",
      allergies: "Sulfa antibiotics",
      top1: "Acne & Rosacea",
      datasetFolder: "Acne And Rosacea Photos",
      top1Prob: 95.8,
      top1Icd: "ICD-11: ED80 / ED90",
      top2: "Eczema / Atopic Dermatitis",
      top2Prob: 2.8,
      top3: "Healthy Skin (Control)",
      top3Prob: 1.4,
      originalImg: CLINICAL_CASES[0]?.originalImage,
      gradcamImg: CLINICAL_CASES[0]?.gradcamImage,
      urgency: "Moderate",
      status: "Pending Attending Sign-Off"
    },
    {
      id: "SCN-8824",
      patientName: "Suman Gupta",
      age: "31 / F",
      patientId: "DERMA-5231",
      phototype: "Fitzpatrick Type IV",
      location: "Right Flexor Forearm",
      symptomDuration: "10 Days",
      pruritusScore: "7 / 10 (Intense peripheral itch)",
      allergies: "Penicillin",
      top1: "Fungal Infection / Ringworm",
      datasetFolder: "Fu Ringworm",
      top1Prob: 91.4,
      top1Icd: "ICD-11: 1F28",
      top2: "Eczema / Atopic Dermatitis",
      top2Prob: 6.2,
      top3: "Healthy Skin (Control)",
      top3Prob: 2.4,
      originalImg: CLINICAL_CASES[2]?.originalImage,
      gradcamImg: CLINICAL_CASES[2]?.gradcamImage,
      urgency: "Moderate",
      status: "Pending Attending Sign-Off"
    },
    {
      id: "SCN-8825",
      patientName: "Rohan Mehta",
      age: "26 / M",
      patientId: "DERMA-4190",
      phototype: "Fitzpatrick Type III",
      location: "Scalp Parietal Crown",
      symptomDuration: "4 Weeks",
      pruritusScore: "2 / 10 (Mild)",
      allergies: "None",
      top1: "Alopecia & Hair/Scalp Diseases",
      datasetFolder: "Hair Loss Photos Alopecia And Other Hair Diseases",
      top1Prob: 92.6,
      top1Icd: "ICD-11: ED70",
      top2: "Fungal Infection / Ringworm",
      top2Prob: 5.1,
      top3: "Healthy Skin (Control)",
      top3Prob: 2.3,
      originalImg: CLINICAL_CASES[3]?.originalImage,
      gradcamImg: CLINICAL_CASES[3]?.gradcamImage,
      urgency: "Moderate",
      status: "Pending Attending Sign-Off"
    },
    {
      id: "SCN-8826",
      patientName: "Ananya Sen",
      age: "38 / F",
      patientId: "DERMA-3814",
      phototype: "Fitzpatrick Type III",
      location: "Anterior Left Shoulder",
      symptomDuration: "6 Months",
      pruritusScore: "0 / 10 (Asymptomatic)",
      allergies: "Latex",
      top1: "Vascular Tumors & Lesions",
      datasetFolder: "Vascular Tumors",
      top1Prob: 92.1,
      top1Icd: "ICD-11: 2E81",
      top2: "Melanoma & Skin Cancer / Moles",
      top2Prob: 5.8,
      top3: "Healthy Skin (Control)",
      top3Prob: 2.1,
      originalImg: CLINICAL_CASES[6]?.originalImage,
      gradcamImg: CLINICAL_CASES[6]?.gradcamImage,
      urgency: "Moderate",
      status: "Pending Attending Sign-Off"
    },
    {
      id: "SCN-8827",
      patientName: "Aryan Deshmukh",
      age: "8 / M",
      patientId: "DERMA-2980",
      phototype: "Fitzpatrick Type IV",
      location: "Trunk & Abdominal Wall",
      symptomDuration: "3 Days (Febrile)",
      pruritusScore: "9 / 10 (High)",
      allergies: "Aspirin (Strictly Avoided)",
      top1: "Chickenpox (Viral Infection)",
      datasetFolder: "Vi Chickenpox",
      top1Prob: 94.7,
      top1Icd: "ICD-11: 1E90",
      top2: "Acne & Rosacea",
      top2Prob: 3.2,
      top3: "Eczema / Atopic Dermatitis",
      top3Prob: 2.1,
      originalImg: CLINICAL_CASES[7]?.originalImage,
      gradcamImg: CLINICAL_CASES[7]?.gradcamImage,
      urgency: "High / Contagious",
      status: "Pending Attending Sign-Off"
    }
  ];

  const [selectedCase, setSelectedCase] = useState(triageCases[0]);
  const [sliderPos, setSliderPos] = useState(50);
  const [concordanceDecision, setConcordanceDecision] = useState('concordant'); // 'concordant' | 'discordant' | 'biopsy'
  const [severityGrade, setSeverityGrade] = useState('Moderate');
  const [physicianNotes, setPhysicianNotes] = useState(
    "Verified erythematous excoriation with epidermal barrier disruption. Grad-CAM visual attention corresponds with primary cutaneous involvement zone. Concordant with clinical presentation."
  );
  const [isSigned, setIsSigned] = useState(false);
  const [signSuccessToast, setSignSuccessToast] = useState(false);

  const handleSignCase = (e) => {
    e.preventDefault();
    setIsSigned(true);
    setSignSuccessToast(true);
    setTimeout(() => {
      setSignSuccessToast(false);
    }, 3500);
  };

  return (
    <div className="doctor-triage-container">
      {/* 1. Header Banner */}
      <div className="doctor-triage-header-card">
        <div className="triage-header-text">
          <div className="triage-status-pill">
            <span className="live-status-dot"></span>
            <span>CNN Vision Backbone & Grad-CAM Visual Explainability</span>
          </div>
          <h1 className="triage-header-title">Clinical Dermoscopy Triage Workstation</h1>
          <p className="triage-header-desc">
            Review spatial gradient class activation maps (Grad-CAM), analyze differential diagnostic neural probabilities, and document physician concordance.
          </p>
        </div>

        <div className="triage-queue-counter">
          <span className="queue-counter-lbl">Cases in Queue</span>
          <strong className="queue-counter-num">{triageCases.length}</strong>
          <span className="queue-counter-sub">Review SLA: &lt; 2 hrs</span>
        </div>
      </div>

      {/* 2. Main Workstation Grid: Left Case Queue, Right Examination Deck */}
      <div className="triage-workstation-deck">
        {/* Left Column: Triage Case Selector */}
        <div className="triage-selector-column">
          <h3 className="selector-column-heading">Pending Patient Queue</h3>
          <div className="triage-selector-list">
            {triageCases.map(item => (
              <div 
                key={item.id}
                className={`triage-select-card ${selectedCase.id === item.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCase(item);
                  setIsSigned(false);
                }}
                role="button"
                tabIndex={0}
              >
                <div className="select-card-top">
                  <strong className="select-patient-name">{item.patientName}</strong>
                  <span className={`select-urgency-tag ${item.urgency.toLowerCase().includes('urgent') ? 'red' : 'blue'}`}>
                    {item.urgency}
                  </span>
                </div>
                <span className="select-location-text">{item.location}</span>
                <div className="select-pred-row">
                  <span className="select-pred-name">{item.top1}</span>
                  <strong className="select-prob">{item.top1Prob}%</strong>
                </div>
                <div className="select-card-footer">
                  <span className="case-id-tag">{item.id}</span>
                  <span className="case-time-tag">Oct 12</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Deep Inspection Deck */}
        <div className="triage-inspection-deck">
          {/* Patient Meta Strip */}
          <div className="inspection-patient-strip">
            <div className="patient-strip-col">
              <span className="strip-lbl">Patient Name</span>
              <strong className="strip-val">{selectedCase.patientName} ({selectedCase.age})</strong>
              <span className="strip-sub">ID: {selectedCase.patientId}</span>
            </div>
            <div className="patient-strip-col">
              <span className="strip-lbl">Lesion Location</span>
              <strong className="strip-val">{selectedCase.location}</strong>
              <span className="strip-sub">Duration: {selectedCase.symptomDuration}</span>
            </div>
            <div className="patient-strip-col">
              <span className="strip-lbl">Phototype</span>
              <strong className="strip-val">{selectedCase.phototype}</strong>
              <span className="strip-sub">Pruritus: {selectedCase.pruritusScore}</span>
            </div>
            <div className="patient-strip-col">
              <span className="strip-lbl">Known Sensitivities</span>
              <strong className="strip-val allergy">{selectedCase.allergies}</strong>
            </div>
          </div>

          {/* Interactive Split Grad-CAM Visualizer */}
          <div className="dermoscopy-inspection-canvas-box">
            <div className="canvas-header-toolbar">
              <div className="canvas-title-group">
                <Layers size={17} color="#0055FF" />
                <strong className="canvas-title">Interactive Explainable AI Inspection (Grad-CAM Slider)</strong>
              </div>
              <div className="slider-mode-indicators">
                <span className="indicator-pill original">Original Dermoscopy</span>
                <span className="indicator-pill-divider">↔</span>
                <span className="indicator-pill gradcam">Grad-CAM Heatmap</span>
              </div>
            </div>

            <div className="dermoscopy-split-stage">
              {/* Underlayer: Grad-CAM */}
              <div className="stage-image-layer underlay">
                <img src={selectedCase.gradcamImg} alt="Grad-CAM" className="stage-img" />
                <span className="stage-label right">Grad-CAM Class Activation Map (Turbo Jet)</span>
              </div>

              {/* Overlay: Original Dermoscopy clipped by slider */}
              <div 
                className="stage-image-layer overlay"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img src={selectedCase.originalImg} alt="Dermoscopy" className="stage-img" />
                <span className="stage-label left">High-Resolution Dermoscopy</span>
              </div>

              {/* Slider Handle */}
              <div className="split-slider-line" style={{ left: `${sliderPos}%` }}>
                <div className="split-slider-handle">
                  <Sliders size={14} color="#0055FF" />
                </div>
              </div>

              {/* Invisible Range Input */}
              <input 
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="stage-range-scrubber"
              />
            </div>

            <div className="canvas-telemetry-bar">
              <span className="telemetry-item">Layer: <code>Conv_Block_4_Final</code></span>
              <span className="telemetry-item">Focal Activation Peak: <code>0.942</code></span>
              <span className="telemetry-item">Resolution: <code>1024 x 1024 Dermoscopic</code></span>
              <span className="telemetry-item">Norm: <code>CLAHE Equalized</code></span>
            </div>
          </div>

          {/* Differential Probabilities & ICD-11 Breakdown */}
          <div className="differential-diagnosis-panel">
            <h3 className="panel-section-title">Neural Differential Probability Distribution</h3>
            
            <div className="differential-bars-list">
              <div className="differential-bar-row top1">
                <div className="diff-title-row">
                  <div>
                    <strong className="diff-name">1. {selectedCase.top1}</strong>
                    <span className="diff-icd">{selectedCase.top1Icd}</span>
                  </div>
                  <strong className="diff-prob-val">{selectedCase.top1Prob}%</strong>
                </div>
                <div className="diff-progress-track">
                  <div className="diff-progress-fill top1" style={{ width: `${selectedCase.top1Prob}%` }}></div>
                </div>
              </div>

              <div className="differential-bar-row top2">
                <div className="diff-title-row">
                  <div>
                    <span className="diff-name">2. {selectedCase.top2}</span>
                  </div>
                  <strong className="diff-prob-val">{selectedCase.top2Prob}%</strong>
                </div>
                <div className="diff-progress-track">
                  <div className="diff-progress-fill secondary" style={{ width: `${selectedCase.top2Prob}%` }}></div>
                </div>
              </div>

              <div className="differential-bar-row top3">
                <div className="diff-title-row">
                  <div>
                    <span className="diff-name">3. {selectedCase.top3}</span>
                  </div>
                  <strong className="diff-prob-val">{selectedCase.top3Prob}%</strong>
                </div>
                <div className="diff-progress-track">
                  <div className="diff-progress-fill secondary" style={{ width: `${selectedCase.top3Prob}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Attending Concordance & Certification Sign-Off Form */}
          <div className="concordance-signoff-card">
            <div className="signoff-card-header">
              <ShieldCheck size={20} color="#0055FF" />
              <div>
                <h3 className="signoff-heading">Attending Physician Concordance Certification</h3>
                <span className="signoff-sub">Clinician must certify concordance before patient discharge or prescription issuance.</span>
              </div>
            </div>

            <form onSubmit={handleSignCase} className="signoff-form">
              {/* Concordance Decision Radios */}
              <div className="concordance-options-grid">
                <button 
                  type="button"
                  className={`concordance-option-btn ${concordanceDecision === 'concordant' ? 'selected' : ''}`}
                  onClick={() => setConcordanceDecision('concordant')}
                >
                  <div className="option-check-circle">
                    {concordanceDecision === 'concordant' && <Check size={12} />}
                  </div>
                  <div className="option-text">
                    <strong>Concordant with AI Prediction</strong>
                    <span>Attending agrees with Top-1 diagnosis ({selectedCase.top1})</span>
                  </div>
                </button>

                <button 
                  type="button"
                  className={`concordance-option-btn ${concordanceDecision === 'discordant' ? 'selected' : ''}`}
                  onClick={() => setConcordanceDecision('discordant')}
                >
                  <div className="option-check-circle">
                    {concordanceDecision === 'discordant' && <Check size={12} />}
                  </div>
                  <div className="option-text">
                    <strong>Discordant / Alternate Diagnosis</strong>
                    <span>Physician diagnosis overrides convolutional model</span>
                  </div>
                </button>

                <button 
                  type="button"
                  className={`concordance-option-btn biopsy ${concordanceDecision === 'biopsy' ? 'selected' : ''}`}
                  onClick={() => setConcordanceDecision('biopsy')}
                >
                  <div className="option-check-circle">
                    {concordanceDecision === 'biopsy' && <Check size={12} />}
                  </div>
                  <div className="option-text">
                    <strong>Flag for Punch / Shave Biopsy</strong>
                    <span>Suspected atypia or dysplastic architecture</span>
                  </div>
                </button>
              </div>

              {/* Severity Level */}
              <div className="form-row-severity">
                <label className="field-label">Severity Grading:</label>
                <div className="severity-pills-row">
                  {['Mild', 'Moderate', 'Severe / Urgent'].map(sev => (
                    <button 
                      key={sev}
                      type="button"
                      className={`severity-pill-btn ${severityGrade === sev ? 'active' : ''}`}
                      onClick={() => setSeverityGrade(sev)}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Physician Notes */}
              <div className="form-field-group">
                <label className="field-label">Clinical Remarks & Diagnostic Rationale:</label>
                <textarea 
                  className="clinical-notes-textarea"
                  rows={3}
                  value={physicianNotes}
                  onChange={(e) => setPhysicianNotes(e.target.value)}
                  required
                />
              </div>

              {/* Submit / Status Button */}
              <div className="signoff-actions-footer">
                {isSigned ? (
                  <div className="signed-certified-banner">
                    <CheckCircle2 size={20} color="#059669" />
                    <div className="certified-text-block">
                      <strong>Certified by Dr. Ananya Sharma, MD (Reg: KMC-58291-A)</strong>
                      <span>Status: Signed & Concordance Documented • {selectedCase.top1}</span>
                    </div>
                    {onProceedToPrescription && (
                      <button 
                        type="button"
                        className="proceed-rx-btn"
                        onClick={() => onProceedToPrescription(selectedCase)}
                      >
                        <FileText size={15} />
                        <span>Proceed to ℞ Studio</span>
                        <ArrowRight size={15} />
                      </button>
                    )}
                  </div>
                ) : (
                  <button type="submit" className="sign-case-btn">
                    <ShieldCheck size={16} />
                    <span>Sign & Certify Concordance Decision</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {signSuccessToast && (
        <div className="doctor-toast-popup">
          <CheckCircle2 size={18} color="#059669" />
          <span>Case {selectedCase.id} signed and certified in EHR database!</span>
        </div>
      )}
    </div>
  );
}
