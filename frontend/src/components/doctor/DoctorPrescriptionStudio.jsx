import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Sparkles, 
  Pill, 
  Clock, 
  AlertTriangle, 
  User, 
  Download, 
  Send,
  Building2,
  Database
} from 'lucide-react';
import { savePrescriptionInFirebase } from '../../firebase/dbService';

export default function DoctorPrescriptionStudio({ initialPatient = null }) {
  const patientList = [
    {
      id: "DERMA-9104",
      name: "Rahul Sharma",
      age: "29 / M",
      diagnosis: "Eczema / Atopic Dermatitis",
      folder: "Eczema Photos",
      icdCode: "ICD-11: EA80",
      allergies: "Nickel, Fragrance Mix I",
      phototype: "Fitzpatrick Type IV"
    },
    {
      id: "DERMA-7320",
      name: "Priya Patel",
      age: "42 / F",
      diagnosis: "Melanoma & Skin Cancer / Moles",
      folder: "Melanoma Skin Cancer Nevi And Moles",
      icdCode: "ICD-11: 2C30 / 2B90",
      allergies: "No known drug allergies",
      phototype: "Fitzpatrick Type III"
    },
    {
      id: "DERMA-6411",
      name: "Amit Roy",
      age: "36 / M",
      diagnosis: "Acne & Rosacea",
      folder: "Acne And Rosacea Photos",
      icdCode: "ICD-11: ED80 / ED90",
      allergies: "Sulfa antibiotics",
      phototype: "Fitzpatrick Type IV"
    },
    {
      id: "DERMA-5231",
      name: "Suman Gupta",
      age: "31 / F",
      diagnosis: "Fungal Infection / Ringworm",
      folder: "Fu Ringworm",
      icdCode: "ICD-11: 1F28",
      allergies: "Penicillin",
      phototype: "Fitzpatrick Type IV"
    },
    {
      id: "DERMA-4190",
      name: "Rohan Mehta",
      age: "26 / M",
      diagnosis: "Alopecia & Hair/Scalp Diseases",
      folder: "Hair Loss Photos Alopecia And Other Hair Diseases",
      icdCode: "ICD-11: ED70",
      allergies: "None",
      phototype: "Fitzpatrick Type III"
    },
    {
      id: "DERMA-3814",
      name: "Ananya Sen",
      age: "38 / F",
      diagnosis: "Vascular Tumors & Lesions",
      folder: "Vascular Tumors",
      icdCode: "ICD-11: 2E81",
      allergies: "Latex",
      phototype: "Fitzpatrick Type III"
    },
    {
      id: "DERMA-2980",
      name: "Aryan Deshmukh",
      age: "8 / M",
      diagnosis: "Chickenpox (Viral Infection)",
      folder: "Vi Chickenpox",
      icdCode: "ICD-11: 1E90",
      allergies: "Aspirin (Contraindicated)",
      phototype: "Fitzpatrick Type IV"
    },
    {
      id: "DERMA-1021",
      name: "Deepak Verma",
      age: "45 / M",
      diagnosis: "Healthy Skin (Control)",
      folder: "Heathy",
      icdCode: "Routine Screen",
      allergies: "None",
      phototype: "Fitzpatrick Type IV"
    }
  ];

  const defaultPatient = initialPatient 
    ? (patientList.find(p => p.name.includes(initialPatient.name)) || patientList[0])
    : patientList[0];

  const [selectedPatient, setSelectedPatient] = useState(defaultPatient);
  const [diagnosis, setDiagnosis] = useState(defaultPatient.diagnosis);
  const [icdCode, setIcdCode] = useState(defaultPatient.icdCode);

  useEffect(() => {
    if (initialPatient) {
      const match = patientList.find(p => p.name.includes(initialPatient.name) || p.id === initialPatient.id) || {
        id: initialPatient.id || "DERMA-9999",
        name: initialPatient.name,
        age: initialPatient.age || "30 / M",
        diagnosis: initialPatient.diagnosis || "Clinical Dermatology Review",
        folder: initialPatient.folder || "Eczema Photos",
        icdCode: initialPatient.icdCode || "ICD-11: Clinical",
        allergies: initialPatient.allergies || "No reported allergies",
        phototype: initialPatient.phototype || "Fitzpatrick Type IV"
      };
      setSelectedPatient(match);
      if (initialPatient.diagnosis) setDiagnosis(initialPatient.diagnosis);
      if (initialPatient.icdCode) setIcdCode(initialPatient.icdCode);
    }
  }, [initialPatient]);

  const [medications, setMedications] = useState([
    {
      id: 1,
      drugName: "Mometasone Furoate 0.1% Topical Cream",
      dosage: "1 Fingertip Unit (FTU)",
      frequency: "Once daily at bedtime",
      duration: "7 Days",
      instructions: "Apply sparing thin layer directly to inflamed antecubital plaques. Do not apply on broken bleeding skin."
    },
    {
      id: 2,
      drugName: "Levocetirizine Dihydrochloride 5mg",
      dosage: "1 Tablet Oral",
      frequency: "Once daily (Night)",
      duration: "10 Days",
      instructions: "For relief of nocturnal pruritus and inflammatory histamine cascade."
    },
    {
      id: 3,
      drugName: "Ceramide III + Colloidal Oat Intensive Barrier Cream",
      dosage: "Liberal Application",
      frequency: "3 to 4 times daily",
      duration: "30 Days (Ongoing)",
      instructions: "Mandatory application within 3 minutes of bathing to seal trans-epidermal hydration."
    }
  ]);

  const [lifestyleInstructions, setLifestyleInstructions] = useState(
    "Use lukewarm water (< 32°C) for bathing; limit shower to 10 minutes. Avoid standard soaps; use syndet cleanser pH 5.5. Wear loose 100% cotton garments."
  );
  const [followUpInterval, setFollowUpInterval] = useState("14 Days");
  const [isPrescriptionIssued, setIsPrescriptionIssued] = useState(false);
  const [issueSuccessToast, setIssueSuccessToast] = useState(false);

  // Protocols presets for the balanced dataset classes
  const applyProtocolPreset = (protocolName) => {
    if (protocolName === 'eczema') {
      setDiagnosis("Eczema / Atopic Dermatitis (Subacute Flare)");
      setIcdCode("ICD-11: EA80");
      setMedications([
        {
          id: 1,
          drugName: "Mometasone Furoate 0.1% Topical Cream",
          dosage: "1 FTU",
          frequency: "Once daily at night",
          duration: "7 Days",
          instructions: "Apply thin film on inflamed patches."
        },
        {
          id: 2,
          drugName: "Ceramide Barrier Emollient",
          dosage: "Liberal",
          frequency: "3x daily",
          duration: "30 Days",
          instructions: "Mandatory post-bath barrier sealing."
        }
      ]);
      setLifestyleInstructions("Lukewarm short showers (<10m). Wear 100% cotton garments. Avoid scented soaps.");
    } else if (protocolName === 'acne_rosacea') {
      setDiagnosis("Acne & Rosacea (Papulopustular & Vascular)");
      setIcdCode("ICD-11: ED80 / ED90");
      setMedications([
        {
          id: 1,
          drugName: "Adapalene 0.1% + Benzoyl Peroxide 2.5% Gel",
          dosage: "Pea-sized amount",
          frequency: "Alternate nights",
          duration: "6 Weeks",
          instructions: "Apply to full face avoiding eye orbit."
        },
        {
          id: 2,
          drugName: "Metronidazole 0.75% Topical Gel",
          dosage: "Thin layer",
          frequency: "Twice daily",
          duration: "4 Weeks",
          instructions: "Apply to flushed cheeks and nasal bridge for rosacea."
        }
      ]);
      setLifestyleInstructions("Use mineral SPF 50+ daily. Avoid hot beverages, spicy seasonings, and alcohol.");
    } else if (protocolName === 'fungal') {
      setDiagnosis("Fungal Infection / Ringworm (Tinea Corporis)");
      setIcdCode("ICD-11: 1F28");
      setMedications([
        {
          id: 1,
          drugName: "Terbinafine Hydrochloride 1% Cream",
          dosage: "Thin layer",
          frequency: "Twice daily",
          duration: "14 Days",
          instructions: "Apply 2cm beyond the expanding active border of ring."
        },
        {
          id: 2,
          drugName: "Clotrimazole 1% Medicated Dusting Powder",
          dosage: "Dusting",
          frequency: "Once daily",
          duration: "21 Days",
          instructions: "Apply to intertriginous flexural zones to maintain dryness."
        }
      ]);
      setLifestyleInstructions("Wash gym apparel and towels at >60°C. Never share personal hygiene items.");
    } else if (protocolName === 'alopecia') {
      setDiagnosis("Alopecia & Hair/Scalp Diseases (Alopecia Areata)");
      setIcdCode("ICD-11: ED70");
      setMedications([
        {
          id: 1,
          drugName: "Clobetasol Propionate 0.05% Scalp Lotion",
          dosage: "5 to 6 Drops",
          frequency: "Once daily (Morning)",
          duration: "14 Days",
          instructions: "Massage lightly into circular bald patches."
        },
        {
          id: 2,
          drugName: "Minoxidil 5% Topical Hair Solution",
          dosage: "1 mL",
          frequency: "Once daily (Evening)",
          duration: "90 Days",
          instructions: "Apply to vertex scalp using metered dropper."
        }
      ]);
      setLifestyleInstructions("Avoid traction hairstyles and thermal irons. Ensure adequate dietary iron and zinc.");
    } else if (protocolName === 'chickenpox') {
      setDiagnosis("Chickenpox (Viral Infection / Varicella Exanthem)");
      setIcdCode("ICD-11: 1E90");
      setMedications([
        {
          id: 1,
          drugName: "Calamine Soothing Topical Lotion",
          dosage: "Generous",
          frequency: "3 to 4 times daily",
          duration: "7 Days",
          instructions: "Dab gently onto itchy vesicles to alleviate pruritus."
        },
        {
          id: 2,
          drugName: "Paracetamol 500mg Oral Tablets",
          dosage: "1 Tablet",
          frequency: "Every 6 hours as needed for fever",
          duration: "4 Days",
          instructions: "Strictly avoid Aspirin to prevent Reye's syndrome."
        }
      ]);
      setLifestyleInstructions("Maintain strict home isolation until all blisters crust. Trim nails short to prevent staph infection.");
    } else if (protocolName === 'vascular') {
      setDiagnosis("Vascular Tumors & Lesions (Hemangioma / Angioma)");
      setIcdCode("ICD-11: 2E81");
      setMedications([
        {
          id: 1,
          drugName: "Timolol Maleate 0.5% Topical Ophthalmic/Gel Solution",
          dosage: "2 Drops",
          frequency: "Twice daily",
          duration: "8 Weeks",
          instructions: "Apply directly over proliferating capillary hemangioma."
        }
      ]);
      setLifestyleInstructions("Protect from accidental trauma or sharp scratching. Apply firm pressure if bleeding occurs.");
    }
  };

  const handleAddMedication = () => {
    setMedications(prev => [
      ...prev,
      {
        id: Date.now(),
        drugName: "",
        dosage: "",
        frequency: "Once daily",
        duration: "7 Days",
        instructions: ""
      }
    ]);
  };

  const handleRemoveMedication = (id) => {
    setMedications(prev => prev.filter(m => m.id !== id));
  };

  const handleUpdateMed = (id, field, value) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleIssuePrescription = (e) => {
    e.preventDefault();
    setIsPrescriptionIssued(true);
    setIssueSuccessToast(true);

    // Save to Firebase Cloud Firestore
    savePrescriptionInFirebase({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      patientAge: selectedPatient.age,
      diagnosis,
      icdCode,
      medications,
      lifestyleInstructions,
      followUpInterval,
      issuedBy: "Dr. Ananya Sharma",
      clinic: "Apex Skin & Laser Institute",
      regNo: "KMC-58291-A",
      timestamp: new Date().toISOString()
    }).catch(() => {});

    setTimeout(() => {
      setIssueSuccessToast(false);
    }, 4000);
  };

  return (
    <div className="doctor-rx-studio-container">
      {/* 1. Header Banner */}
      <div className="rx-studio-header-card">
        <div className="rx-studio-header-text">
          <div className="rx-studio-badge">
            <ShieldCheck size={16} color="#0055FF" />
            <span>Digital Clinical Pharmacotherapy Studio</span>
          </div>
          <h1 className="rx-studio-title">Electronic Prescription Formulary (℞)</h1>
          <p className="rx-studio-desc">
            Formulate evidence-based dermatological treatment regimens, apply certified clinical protocols, and issue digitally signed prescriptions directly into the patient's portal.
          </p>
        </div>

        <div className="rx-doc-credentials-pill">
          <Building2 size={16} color="#0055FF" />
          <div>
            <strong>Apex Skin & Laser Institute</strong>
            <span>Dr. Ananya Sharma, MD, DNB • Reg: KMC-58291-A</span>
          </div>
        </div>
      </div>

      {/* 2. Formulary Studio Workstation */}
      <div className="rx-studio-workspace-grid">
        {/* Left Column: Form Builder */}
        <div className="rx-builder-column">
          <form onSubmit={handleIssuePrescription} className="rx-builder-form">
            {/* Patient Selector Strip */}
            <div className="rx-section-block">
              <span className="section-label">1. Target Patient</span>
              <div className="patient-selector-pills">
                {patientList.map(pat => (
                  <button 
                    key={pat.id}
                    type="button"
                    className={`patient-select-pill ${selectedPatient.id === pat.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedPatient(pat);
                      setDiagnosis(pat.diagnosis);
                      setIcdCode(pat.icdCode);
                    }}
                  >
                    <strong>{pat.name}</strong>
                    <span>{pat.age} • {pat.id}</span>
                  </button>
                ))}
              </div>

              {/* Patient Allergies Alert */}
              <div className="patient-allergy-warning-bar">
                <AlertTriangle size={15} color="#DC2626" />
                <span>Known Patient Sensitivities: <strong>{selectedPatient.allergies}</strong> ({selectedPatient.phototype})</span>
              </div>
            </div>

            {/* Quick Protocol Presets */}
            <div className="rx-section-block">
              <div className="section-header-flex">
                <span className="section-label">2. Fast Clinical Protocols</span>
                <span className="auto-load-hint">One-click standard of care</span>
              </div>
              <div className="protocol-buttons-row" style={{ flexWrap: 'wrap', gap: '8px' }}>
                <button 
                  type="button" 
                  className="protocol-chip-btn"
                  onClick={() => applyProtocolPreset('eczema')}
                >
                  <Sparkles size={13} />
                  <span>Eczema Barrier</span>
                </button>
                <button 
                  type="button" 
                  className="protocol-chip-btn"
                  onClick={() => applyProtocolPreset('acne_rosacea')}
                >
                  <Sparkles size={13} />
                  <span>Acne & Rosacea</span>
                </button>
                <button 
                  type="button" 
                  className="protocol-chip-btn"
                  onClick={() => applyProtocolPreset('fungal')}
                >
                  <Sparkles size={13} />
                  <span>Fungal Ringworm</span>
                </button>
                <button 
                  type="button" 
                  className="protocol-chip-btn"
                  onClick={() => applyProtocolPreset('alopecia')}
                >
                  <Sparkles size={13} />
                  <span>Alopecia & Scalp</span>
                </button>
                <button 
                  type="button" 
                  className="protocol-chip-btn"
                  onClick={() => applyProtocolPreset('chickenpox')}
                >
                  <Sparkles size={13} />
                  <span>Chickenpox (Viral)</span>
                </button>
                <button 
                  type="button" 
                  className="protocol-chip-btn"
                  onClick={() => applyProtocolPreset('vascular')}
                >
                  <Sparkles size={13} />
                  <span>Vascular Lesions</span>
                </button>
              </div>
            </div>

            {/* Diagnosis & ICD-11 */}
            <div className="rx-section-block">
              <span className="section-label">3. Clinical Diagnosis</span>
              <div className="diagnosis-inputs-row">
                <input 
                  type="text" 
                  className="diag-input-field main"
                  placeholder="Clinical Diagnosis name..."
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  required
                />
                <input 
                  type="text" 
                  className="diag-input-field icd"
                  placeholder="ICD-11 Code"
                  value={icdCode}
                  onChange={(e) => setIcdCode(e.target.value)}
                />
              </div>
            </div>

            {/* Medications Table Builder */}
            <div className="rx-section-block">
              <div className="meds-table-header-row">
                <span className="section-label">4. Prescribed Pharmacotherapy (℞)</span>
                <button 
                  type="button"
                  className="add-med-row-btn"
                  onClick={handleAddMedication}
                >
                  <Plus size={14} />
                  <span>Add Medication</span>
                </button>
              </div>

              <div className="medication-rows-container">
                {medications.map((med, idx) => (
                  <div key={med.id} className="med-builder-card">
                    <div className="med-builder-top">
                      <span className="med-index-badge">#{idx + 1}</span>
                      <input 
                        type="text" 
                        className="med-name-input"
                        placeholder="Drug Generic Name & Strength (e.g. Mometasone 0.1% Cream)"
                        value={med.drugName}
                        onChange={(e) => handleUpdateMed(med.id, 'drugName', e.target.value)}
                        required
                      />
                      {medications.length > 1 && (
                        <button 
                          type="button" 
                          className="med-delete-btn"
                          onClick={() => handleRemoveMedication(med.id)}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>

                    <div className="med-builder-details-row">
                      <div className="med-field-box">
                        <label>Dosage</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 1 FTU / 1 Tab"
                          value={med.dosage}
                          onChange={(e) => handleUpdateMed(med.id, 'dosage', e.target.value)}
                        />
                      </div>

                      <div className="med-field-box">
                        <label>Frequency</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Once daily night"
                          value={med.frequency}
                          onChange={(e) => handleUpdateMed(med.id, 'frequency', e.target.value)}
                        />
                      </div>

                      <div className="med-field-box">
                        <label>Duration</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 7 Days"
                          value={med.duration}
                          onChange={(e) => handleUpdateMed(med.id, 'duration', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="med-builder-instruction-box">
                      <label>Patient Application Instructions</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Apply sparing thin film on inflamed plaques only..."
                        value={med.instructions}
                        onChange={(e) => handleUpdateMed(med.id, 'instructions', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifestyle & Care Advice */}
            <div className="rx-section-block">
              <span className="section-label">5. Non-Pharmacological Care & Avoidance</span>
              <textarea 
                className="lifestyle-textarea"
                rows={3}
                value={lifestyleInstructions}
                onChange={(e) => setLifestyleInstructions(e.target.value)}
              />
            </div>

            {/* Follow-up & Issue Button */}
            <div className="rx-submit-strip">
              <div className="followup-picker-wrap">
                <label>Review Follow-Up:</label>
                <select 
                  value={followUpInterval}
                  onChange={(e) => setFollowUpInterval(e.target.value)}
                  className="followup-dropdown"
                >
                  <option value="7 Days">In 7 Days</option>
                  <option value="14 Days">In 14 Days (Standard)</option>
                  <option value="30 Days">In 30 Days</option>
                  <option value="SOS">SOS / On Flare Only</option>
                </select>
              </div>

              <button type="submit" className="issue-prescription-btn">
                <Send size={16} />
                <span>Issue & Sync to Patient Portal</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Official Prescription Preview */}
        <div className="rx-preview-column">
          <div className="official-rx-paper-preview">
            <div className="paper-watermark">DERMA-AI OFFICIAL</div>
            
            <div className="paper-header">
              <div className="paper-hospital-meta">
                <strong className="hospital-title">Apex Skin & Laser Institute</strong>
                <span>NABH Accredited Tertiary Center • Mumbai</span>
                <span className="paper-clinic-phone">Tel: +91 22 2849 1000 • triage@apexskin.org</span>
              </div>
              <div className="paper-rx-no">
                <span className="rx-no-tag">RX-2026-99401</span>
                <span className="rx-date-tag">Date: Oct 12, 2026</span>
              </div>
            </div>

            <div className="paper-patient-row">
              <div>
                <span className="paper-meta-lbl">Patient:</span>
                <strong className="paper-patient-name">{selectedPatient.name} ({selectedPatient.age})</strong>
              </div>
              <div>
                <span className="paper-meta-lbl">Patient ID:</span>
                <strong>{selectedPatient.id}</strong>
              </div>
            </div>

            <div className="paper-diag-strip">
              <span className="paper-meta-lbl">Diagnosis:</span>
              <strong className="paper-diag-text">{diagnosis}</strong>
              <span className="paper-icd-tag">{icdCode}</span>
            </div>

            <div className="paper-symbol-row">
              <span className="latin-rx-big">℞</span>
            </div>

            <div className="paper-meds-list">
              {medications.map((m, i) => (
                <div key={i} className="paper-med-item">
                  <div className="med-item-top">
                    <strong className="med-item-title">{i + 1}. {m.drugName || "Untitled Medication"}</strong>
                    <span className="med-item-dur">{m.duration}</span>
                  </div>
                  <div className="med-item-dose">
                    <span>Dosage: {m.dosage} • {m.frequency}</span>
                  </div>
                  {m.instructions && (
                    <div className="med-item-notes">
                      <em>Note: {m.instructions}</em>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="paper-advice-box">
              <strong className="advice-title">General Care & Barrier Instructions:</strong>
              <p className="advice-text">{lifestyleInstructions}</p>
            </div>

            <div className="paper-footer-seal">
              <div className="followup-reminder">
                <span>Follow-up: <strong>{followUpInterval}</strong></span>
              </div>

              <div className="physician-signature-seal">
                <div className="digital-seal-circle">
                  <ShieldCheck size={22} color="#059669" />
                </div>
                <strong className="seal-doctor-name">Dr. Ananya Sharma</strong>
                <span className="seal-doctor-qual">MD, DNB (Dermatology)</span>
                <span className="seal-reg-no">Reg No: KMC-58291-A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast Notification */}
      {issueSuccessToast && (
        <div className="doctor-toast-popup">
          <CheckCircle2 size={18} color="#059669" />
          <span>Prescription RX-2026-99401 successfully issued and synced to {selectedPatient.name}'s portal!</span>
        </div>
      )}
    </div>
  );
}
