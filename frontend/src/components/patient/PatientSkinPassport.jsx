import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sun, 
  AlertTriangle, 
  Activity, 
  FileText, 
  Plus, 
  CheckCircle2, 
  Info, 
  Clock, 
  Download, 
  Eye, 
  Sparkles,
  Layers,
  X
} from 'lucide-react';

export default function PatientSkinPassport() {
  const [activePhototype, setActivePhototype] = useState(4); // Fitzpatrick Type IV default
  const [allergies, setAllergies] = useState([
    { name: "Nickel (Jewelry / Watch Clasp)", reaction: "Severe Erythema & Pruritus", severity: "High" },
    { name: "Synthetic Fragrance Mix I", reaction: "Contact Eczematous Flare", severity: "Moderate" },
    { name: "Benzoyl Peroxide > 5%", reaction: "Chemical Desquamation / Peeling", severity: "Mild" }
  ]);
  const [newAllergenModal, setNewAllergenModal] = useState(false);
  const [newAllergenName, setNewAllergenName] = useState('');
  const [newAllergenReaction, setNewAllergenReaction] = useState('');
  const [newAllergenSeverity, setNewAllergenSeverity] = useState('Moderate');

  const fitzpatrickTypes = [
    { type: 1, name: "Type I", tone: "#FDE6D2", burn: "Always burns, never tans", sunRisk: "Extreme UV Risk", spf: "SPF 50+ PA++++" },
    { type: 2, name: "Type II", tone: "#F7D0B2", burn: "Burns easily, tans minimally", sunRisk: "Very High UV Risk", spf: "SPF 50+ PA++++" },
    { type: 3, name: "Type III", tone: "#E8B58F", burn: "Burns moderately, tans uniformly", sunRisk: "High UV Risk", spf: "SPF 30-50" },
    { type: 4, name: "Type IV", tone: "#D09E76", burn: "Burns minimally, tans easily (Olive/Brown)", sunRisk: "Moderate UV Risk", spf: "SPF 30-50 PA+++" },
    { type: 5, name: "Type V", tone: "#A9734D", burn: "Rarely burns, tans profusely (Dark Brown)", sunRisk: "Moderate UV Risk", spf: "SPF 30 PA+++" },
    { type: 6, name: "Type VI", tone: "#5B3B26", burn: "Never burns, deeply pigmented", sunRisk: "Low Sunburn / High Hyper-pigmentation", spf: "SPF 30 Broad Spectrum" }
  ];

  const trackedLesions = [
    {
      id: "LES-901",
      name: "Elbow Flexural Erythema",
      bodyLocation: "Left Antecubital Fossa",
      firstRecorded: "Oct 11, 2026",
      lastScan: "Today, Oct 12",
      status: "Active Flare",
      statusColor: "blue",
      stability: "Improving under Mometasone",
      diameter: "28 mm",
      asymmetry: "Symmetric",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "LES-884",
      name: "Facial Inflammatory Papule",
      bodyLocation: "Right Malar Cheek",
      firstRecorded: "Sep 20, 2026",
      lastScan: "Oct 03, 2026",
      status: "Resolved",
      statusColor: "green",
      stability: "Post-inflammatory Erythema fading",
      diameter: "4 mm",
      asymmetry: "Regular circular",
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "LES-742",
      name: "Congenital Melanocytic Nevus",
      bodyLocation: "Upper Mid-Back (Thoracic)",
      firstRecorded: "Mar 15, 2025",
      lastScan: "Sep 15, 2026",
      status: "Benign & Stable",
      statusColor: "green",
      stability: "Zero morphological changes in 18 months",
      diameter: "5.2 mm",
      asymmetry: "Low risk (ABCDE Normal)",
      img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const handleAddAllergen = (e) => {
    e.preventDefault();
    if (!newAllergenName) return;
    setAllergies(prev => [
      ...prev,
      {
        name: newAllergenName,
        reaction: newAllergenReaction || "Skin irritation",
        severity: newAllergenSeverity
      }
    ]);
    setNewAllergenName('');
    setNewAllergenReaction('');
    setNewAllergenModal(false);
  };

  const currentTypeData = fitzpatrickTypes.find(f => f.type === activePhototype) || fitzpatrickTypes[3];

  return (
    <div className="patient-passport-container">
      {/* 1. Header Banner */}
      <div className="passport-header-card">
        <div className="passport-header-content">
          <div className="passport-badge">
            <ShieldCheck size={16} color="#0055FF" />
            <span>Standardized Dermatological Profile</span>
          </div>
          <h1 className="passport-title">Skin Health Passport & Phototype Registry</h1>
          <p className="passport-subtitle">
            Your personalized dermatological record: track constitutional phototypes, chronological mole maps, and validated hypersensitivity profiles.
          </p>
        </div>

        <div className="passport-id-badge">
          <span className="passport-id-label">Clinical Skin Passport ID</span>
          <strong className="passport-id-number">IND-SKN-91048-V2</strong>
          <span className="passport-id-verified">
            <CheckCircle2 size={13} color="#059669" />
            <span>Clinically Validated</span>
          </span>
        </div>
      </div>

      {/* 2. Fitzpatrick Phototype Classification */}
      <div className="passport-phototype-card">
        <div className="phototype-section-header">
          <div>
            <span className="section-kicker">Fitzpatrick Phototyping Scale</span>
            <h2 className="section-title">Constitutional Skin Phototype Assessment</h2>
            <p className="section-subtext">
              Categorizes skin by genetic melanin response to ultraviolet radiation (UVB/UVA) and vulnerability to erythema.
            </p>
          </div>

          <div className="current-phototype-pill">
            <span className="current-phototype-dot" style={{ backgroundColor: currentTypeData.tone }}></span>
            <span>Active Profile: <strong>Fitzpatrick {currentTypeData.name}</strong></span>
          </div>
        </div>

        <div className="phototype-selector-grid">
          {fitzpatrickTypes.map(fp => (
            <div 
              key={fp.type}
              className={`phototype-card-option ${activePhototype === fp.type ? 'selected' : ''}`}
              onClick={() => setActivePhototype(fp.type)}
              role="button"
              tabIndex={0}
            >
              <div className="phototype-swatch-box" style={{ backgroundColor: fp.tone }}>
                <span className="swatch-number">{fp.name}</span>
              </div>
              <strong className="phototype-name">{fp.name}</strong>
              <span className="phototype-burn-text">{fp.burn}</span>
              <span className="phototype-spf-badge">{fp.spf}</span>
            </div>
          ))}
        </div>

        {/* Phototype Clinical Advisory */}
        <div className="phototype-clinical-advisory">
          <div className="advisory-icon-box">
            <Sun size={24} color="#D97706" />
          </div>
          <div className="advisory-text-body">
            <strong>Clinical Photoprotection Guidelines for Fitzpatrick {currentTypeData.name}:</strong>
            <p>
              Your cutaneous phototype demonstrates <em>{currentTypeData.burn}</em>. While risk of severe actinic sunburn is moderate, your skin exhibits heightened susceptibility to <strong>Post-Inflammatory Hyperpigmentation (PIH)</strong> following inflammatory flares (such as Eczema or Acne).
            </p>
            <div className="advisory-bullet-tags">
              <span className="advisory-tag">Recommended: {currentTypeData.spf}</span>
              <span className="advisory-tag">UV Risk: {currentTypeData.sunRisk}</span>
              <span className="advisory-tag">Reapplication: Every 3 Hours Outdoors</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Chronological Mole & Lesion Mapping Registry */}
      <div className="passport-lesions-card">
        <div className="lesions-header-row">
          <div>
            <span className="section-kicker">Chronological Mapping</span>
            <h2 className="section-title">Longitudinal Lesion & Mole Surveillance</h2>
            <p className="section-subtext">
              Track morphological stability across dermoscopic screenings to detect early dysplastic changes.
            </p>
          </div>

          <div className="lesions-stats-strip">
            <span className="lesions-stat-chip">
              <strong>{trackedLesions.length}</strong> Tracked Lesions
            </span>
            <span className="lesions-stat-chip safe">
              <strong>100%</strong> Stable
            </span>
          </div>
        </div>

        <div className="tracked-lesions-grid">
          {trackedLesions.map(lesion => (
            <div key={lesion.id} className="lesion-passport-card">
              <div className="lesion-card-photo-wrap">
                <img src={lesion.img} alt={lesion.name} className="lesion-card-photo" />
                <span className={`lesion-status-bubble ${lesion.statusColor}`}>
                  {lesion.status}
                </span>
              </div>

              <div className="lesion-card-content">
                <div className="lesion-id-row">
                  <span className="lesion-code">{lesion.id}</span>
                  <span className="lesion-location">{lesion.bodyLocation}</span>
                </div>

                <h3 className="lesion-name">{lesion.name}</h3>

                <div className="lesion-metrics-table">
                  <div className="metric-row">
                    <span>Diameter:</span>
                    <strong>{lesion.diameter}</strong>
                  </div>
                  <div className="metric-row">
                    <span>Morphology:</span>
                    <strong>{lesion.asymmetry}</strong>
                  </div>
                  <div className="metric-row">
                    <span>Clinical Stability:</span>
                    <strong className="stability-highlight">{lesion.stability}</strong>
                  </div>
                </div>

                <div className="lesion-dates-footer">
                  <Clock size={12} />
                  <span>First logged: {lesion.firstRecorded} • Last scan: {lesion.lastScan}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Verified Contact Allergies & Hypersensitivities */}
      <div className="passport-allergies-card">
        <div className="allergies-header-row">
          <div>
            <span className="section-kicker">Immunological Profile</span>
            <h2 className="section-title">Cutaneous Allergies & Hypersensitivities</h2>
            <p className="section-subtext">
              Ingredients and contact triggers cross-referenced during clinical telemedicine prescribing.
            </p>
          </div>

          <button 
            className="add-allergy-btn"
            onClick={() => setNewAllergenModal(true)}
          >
            <Plus size={16} />
            <span>Add Allergen Record</span>
          </button>
        </div>

        <div className="allergies-list-grid">
          {allergies.map((allergy, idx) => (
            <div key={idx} className="allergy-item-card">
              <div className="allergy-top-row">
                <AlertTriangle size={18} color={allergy.severity === 'High' ? '#DC2626' : '#D97706'} />
                <span className={`allergy-severity-badge ${allergy.severity.toLowerCase()}`}>
                  {allergy.severity} Risk
                </span>
              </div>

              <strong className="allergy-name">{allergy.name}</strong>
              <p className="allergy-reaction-note">{allergy.reaction}</p>
              <span className="allergy-verified-tag">
                <CheckCircle2 size={12} />
                <span>Verified in Clinical Patch Test</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Allergen Modal */}
      {newAllergenModal && (
        <div className="modal-backdrop-simple">
          <div className="modal-card-simple">
            <div className="modal-simple-header">
              <h3>Add Known Skin Allergen</h3>
              <button onClick={() => setNewAllergenModal(false)} className="close-x-btn">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddAllergen} className="modal-simple-form">
              <div className="form-group-simple">
                <label>Allergen / Chemical Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sodium Lauryl Sulfate, Latex, Lanolin..." 
                  value={newAllergenName}
                  onChange={(e) => setNewAllergenName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-simple">
                <label>Typical Cutaneous Reaction</label>
                <input 
                  type="text" 
                  placeholder="e.g. Itching, vesicular eruption, hives..." 
                  value={newAllergenReaction}
                  onChange={(e) => setNewAllergenReaction(e.target.value)}
                />
              </div>

              <div className="form-group-simple">
                <label>Severity Level</label>
                <select 
                  value={newAllergenSeverity}
                  onChange={(e) => setNewAllergenSeverity(e.target.value)}
                >
                  <option value="Mild">Mild Irritation</option>
                  <option value="Moderate">Moderate Flare / Pruritus</option>
                  <option value="High">High / Severe Vesicular Reaction</option>
                </select>
              </div>

              <div className="modal-simple-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setNewAllergenModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save to Passport
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
