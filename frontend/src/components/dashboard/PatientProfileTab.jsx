import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  MapPin, 
  Sun, 
  Heart, 
  FileText, 
  Download, 
  Plus, 
  X, 
  CheckCircle2, 
  ChevronRight,
  Activity,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function PatientProfileTab({ user, onNavigateToScan, onNavigateToDoctors }) {
  const [fitzpatrickType, setFitzpatrickType] = useState(4); // Default Type IV (Olive/Moderate Brown)
  const [allergies, setAllergies] = useState(['Nickel Sulfate', 'Fragrance Mix', 'Latex']);
  const [newAllergyInput, setNewAllergyInput] = useState('');
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState({
    name: user?.emergencyContactName || 'Amina Mulla',
    relation: 'Mother / Guardian',
    phone: user?.emergencyContactPhone || '+91 98220 54321'
  });

  const fitzpatrickData = [
    {
      type: 1,
      label: 'Type I',
      tone: 'Very Fair / Ivory',
      sunburn: 'Always burns, never tans',
      color: '#FBE8D6',
      advice: 'Extremely high risk for UV erythema. Broad-spectrum SPF 50+ mandatory. Regular full-body mole checks required.'
    },
    {
      type: 2,
      label: 'Type II',
      tone: 'Fair / Light',
      sunburn: 'Burns easily, tans minimally',
      color: '#F5DAC1',
      advice: 'High risk for sunburn and photoaging. Apply SPF 50 every 2 hours when outdoors. Monitor atypical pigmented lesions.'
    },
    {
      type: 3,
      label: 'Type III',
      tone: 'Medium / Golden',
      sunburn: 'Burns moderately, tans gradually',
      color: '#E8C5A5',
      advice: 'Moderate burn risk. Broad spectrum SPF 30+ recommended daily. Check exposed facial and neck zones.'
    },
    {
      type: 4,
      label: 'Type IV',
      tone: 'Olive / Moderate Brown',
      sunburn: 'Burns minimally, tans easily',
      color: '#D4A373',
      advice: 'Common in South Asian populations. Prone to post-inflammatory hyperpigmentation (PIH) after acne or eczema flares. Daily mineral SPF 30-50 recommended.'
    },
    {
      type: 5,
      label: 'Type V',
      tone: 'Dark Brown / Caramel',
      sunburn: 'Rarely burns, tans profusely',
      color: '#A9714B',
      advice: 'Very low sunburn risk. Elevated susceptibility to keloid formation and pigmentary dyschromia. Gentle barrier care indicated.'
    },
    {
      type: 6,
      label: 'Type VI',
      tone: 'Deeply Pigmented / Dark',
      sunburn: 'Never burns, deeply pigmented',
      color: '#6B4226',
      advice: 'High melanin photoprotection. Clinical vigilance required on acral surfaces (palms, soles, subungual nail beds) for atypical melanocytic lesions.'
    }
  ];

  const currentFitz = fitzpatrickData.find(f => f.type === fitzpatrickType) || fitzpatrickData[3];

  const handleAddAllergy = (e) => {
    e.preventDefault();
    if (newAllergyInput.trim() && !allergies.includes(newAllergyInput.trim())) {
      setAllergies([...allergies, newAllergyInput.trim()]);
      setNewAllergyInput('');
      setShowAddAllergy(false);
    }
  };

  const handleRemoveAllergy = (item) => {
    setAllergies(allergies.filter(a => a !== item));
  };

  // Mock patient scan history records
  const scanHistory = [
    {
      id: 'SCN-1048',
      date: 'Oct 11, 2026',
      time: '14:22',
      condition: 'Atopic Dermatitis (Eczema)',
      bodySite: 'Bilateral Elbow Flexures',
      confidence: 94.2,
      riskLevel: 'Moderate',
      status: 'Consultation Scheduled',
      doctor: 'Dr. Sneha Patil',
      hasGradcam: true
    },
    {
      id: 'SCN-1022',
      date: 'Oct 03, 2026',
      time: '11:15',
      condition: 'Acne Vulgaris (Papulopustular)',
      bodySite: 'Facial T-Zone & Cheeks',
      confidence: 91.8,
      riskLevel: 'Low',
      status: 'Resolved via Topicals',
      doctor: 'Dr. Vikram Malhotra',
      hasGradcam: true
    },
    {
      id: 'SCN-0984',
      date: 'Sep 19, 2026',
      time: '09:40',
      condition: 'Allergic Contact Dermatitis',
      bodySite: 'Left Wrist / Watch Contact Area',
      confidence: 88.5,
      riskLevel: 'Low',
      status: 'Allergen Avoidance',
      doctor: 'Self-Care Protocol',
      hasGradcam: true
    }
  ];

  return (
    <div className="dashboard-tab-content patient-profile-tab-container">
      
      {/* 1. Header Passport Card */}
      <div className="clinical-card patient-passport-card">
        <div className="passport-header-layout">
          <div className="passport-avatar-block">
            <div className="passport-avatar-circle">
              <span>{user ? user.name.charAt(0).toUpperCase() : 'M'}</span>
            </div>
            <div className="passport-meta-block">
              <div className="passport-name-row">
                <h3 className="passport-fullname">{user ? user.name : 'Maliha Mulla'}</h3>
                <span className="passport-verified-pill">
                  <CheckCircle2 size={13} /> Verified Patient
                </span>
              </div>
              <span className="passport-clinical-id">Clinical Record ID: #DERMA-9104-IND</span>
              <p className="passport-subtext">
                Registered Member • DOB: {user?.dob || '1998-05-14'} • Gender: {user?.gender ? (user.gender.charAt(0).toUpperCase() + user.gender.slice(1)) : 'Female'} • Region: Maharashtra (Kolhapur / Pune)
              </p>
            </div>
          </div>

          <div className="passport-quick-metrics">
            <div className="passport-metric-tile">
              <span className="metric-tile-num">3</span>
              <span className="metric-tile-lbl">Total AI Scans</span>
            </div>
            <div className="passport-metric-tile">
              <span className="metric-tile-num">1</span>
              <span className="metric-tile-lbl">Active Consult</span>
            </div>
            <div className="passport-metric-tile">
              <span className="metric-tile-num">Type IV</span>
              <span className="metric-tile-lbl">Fitzpatrick Scale</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Grid: Fitzpatrick Assessment & Medical Allergies */}
      <div className="profile-two-col-grid">
        
        {/* Fitzpatrick Phototype Interactive Module */}
        <div className="clinical-card fitzpatrick-card">
          <div className="card-heading-row">
            <div>
              <span className="card-kicker-tag"><Sun size={13} color="#0055FF" /> Dermatological Phototype</span>
              <h4 className="card-section-title">Fitzpatrick Skin Phototype Assessment</h4>
            </div>
            <span className="badge badge-blue">Type {currentFitz.type} Selected</span>
          </div>

          <p className="fitz-desc">
            The Fitzpatrick classification predicts UV susceptibility, erythema likelihood, and risks for post-inflammatory hyperpigmentation.
          </p>

          {/* Interactive Scale Selector */}
          <div className="fitz-scale-selector-row">
            {fitzpatrickData.map((f) => (
              <button
                key={f.type}
                type="button"
                className={`fitz-chip-btn ${fitzpatrickType === f.type ? 'active' : ''}`}
                onClick={() => setFitzpatrickType(f.type)}
                style={{ '--skin-tone': f.color }}
              >
                <span className="skin-tone-swatch"></span>
                <span className="fitz-btn-title">{f.label}</span>
              </button>
            ))}
          </div>

          {/* Active Phototype Details Card */}
          <div className="fitz-active-insight-box">
            <div className="insight-top-bar">
              <div>
                <strong className="insight-title">{currentFitz.label} — {currentFitz.tone}</strong>
                <p className="insight-sub">{currentFitz.sunburn}</p>
              </div>
              <div 
                className="insight-tone-badge" 
                style={{ backgroundColor: currentFitz.color }}
              ></div>
            </div>
            <div className="insight-advice-text">
              <strong>Clinical Photoprotection Advice:</strong> {currentFitz.advice}
            </div>
          </div>
        </div>

        {/* Patient Allergies & Emergency Contact */}
        <div className="clinical-card allergies-profile-card">
          <div className="card-heading-row">
            <div>
              <span className="card-kicker-tag"><AlertTriangle size={13} color="#EF4444" /> Patient Safety Data</span>
              <h4 className="card-section-title">Known Contact Allergies & Sensitivities</h4>
            </div>
            <button 
              className="btn-add-allergy-trigger"
              onClick={() => setShowAddAllergy(!showAddAllergy)}
            >
              <Plus size={14} />
              <span>Add Allergy</span>
            </button>
          </div>

          <p className="fitz-desc">
            Reported cutaneous allergens automatically cross-checked during triage and treatment recommendation synthesis.
          </p>

          {showAddAllergy && (
            <form onSubmit={handleAddAllergy} className="add-allergy-form-row">
              <input 
                type="text"
                placeholder="e.g. Cobalt, Lanolin, Balsam of Peru..."
                value={newAllergyInput}
                onChange={(e) => setNewAllergyInput(e.target.value)}
                className="allergy-text-input"
                autoFocus
              />
              <button type="submit" className="btn btn-primary btn-sm">Add</button>
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                onClick={() => setShowAddAllergy(false)}
              >
                Cancel
              </button>
            </form>
          )}

          <div className="allergy-chips-wrap">
            {allergies.map(item => (
              <span key={item} className="allergy-danger-pill">
                <span>{item}</span>
                <button 
                  type="button" 
                  onClick={() => handleRemoveAllergy(item)}
                  title="Remove allergy"
                  className="allergy-remove-btn"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          {/* Emergency Family Contact & Blood Group */}
          <div className="emergency-contact-box">
            <div className="emergency-header">
              <Heart size={16} color="#DC2626" />
              <strong>Emergency Medical & Family Contact</strong>
            </div>
            <div className="emergency-grid">
              <div>
                <span className="em-lbl">Contact Name</span>
                <strong className="em-val">{emergencyContact.name} ({emergencyContact.relation})</strong>
              </div>
              <div>
                <span className="em-lbl">Phone Number</span>
                <strong className="em-val">{emergencyContact.phone}</strong>
              </div>
              <div>
                <span className="em-lbl">Blood Group</span>
                <strong className="em-val text-electric">B Positive (B+)</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Scan History & Lesion Timeline Card */}
      <div className="clinical-card scan-history-card">
        <div className="history-header-row">
          <div>
            <span className="card-kicker-tag"><Activity size={13} color="#0055FF" /> Historical Triage Log</span>
            <h4 className="card-section-title">Patient AI Screening & Lesion History</h4>
            <p className="history-subtext">
              Complete chronological audit trail of processed images, Grad-CAM attention maps, and attached physician visits.
            </p>
          </div>

          <div className="history-actions-row">
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => alert("Downloading complete patient medical record as encrypted PDF...")}
            >
              <Download size={14} />
              <span>Export Record (PDF)</span>
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={onNavigateToScan}
            >
              <Sparkles size={14} />
              <span>New AI Skin Scan</span>
            </button>
          </div>
        </div>

        {/* Scan Log Table */}
        <div className="scan-history-table-container">
          <table className="scan-history-table">
            <thead>
              <tr>
                <th>Scan ID & Date</th>
                <th>Triaged Condition</th>
                <th>Anatomical Site</th>
                <th>AI Confidence</th>
                <th>Urgency</th>
                <th>Clinical Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scanHistory.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="table-scan-id-cell">
                      <strong className="scan-id-text">{item.id}</strong>
                      <span className="scan-date-text">{item.date} • {item.time}</span>
                    </div>
                  </td>
                  <td>
                    <strong className="condition-cell-title">{item.condition}</strong>
                  </td>
                  <td>
                    <span className="site-cell-text">{item.bodySite}</span>
                  </td>
                  <td>
                    <div className="conf-cell-pill">
                      <span className="conf-num">{item.confidence}%</span>
                      <div className="conf-micro-bar">
                        <div className="conf-micro-fill" style={{ width: `${item.confidence}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`urgency-tag ${item.riskLevel.toLowerCase()}`}>
                      {item.riskLevel}
                    </span>
                  </td>
                  <td>
                    <span className="status-cell-text">{item.status}</span>
                  </td>
                  <td>
                    <button 
                      className="btn-table-action"
                      onClick={onNavigateToScan}
                      title="Inspect Grad-CAM Visualizer"
                    >
                      <span>Inspect</span>
                      <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
