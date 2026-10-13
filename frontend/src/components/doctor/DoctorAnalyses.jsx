import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  UserCheck, 
  Layers, 
  Sliders, 
  FileText, 
  Send, 
  Plus, 
  Trash2,
  Calendar,
  ShieldCheck,
  RotateCcw,
  X
} from 'lucide-react';
import { CLINICAL_CASES } from '../../data/mockData';
import { BALANCED_DATASET_CLASSES } from '../../firebase/dbService';

export default function DoctorAnalyses({ 
  user, 
  initialReviewItem = null,
  onNavigateTab,
  onProceedToPrescription
}) {
  const [analysesList, setAnalysesList] = useState([
    {
      id: 'SCN-8920',
      patientName: 'Kavita Sharma',
      patientEmail: 'kavita.sharma@example.com',
      patientAge: 48,
      patientGender: 'Female',
      predictedClass: 'Melanoma & Abnormal Moles',
      folderName: 'Melanoma Skin Cancer Nevi And Moles',
      confidence: 93.8,
      severity: 'Urgent',
      status: 'pending',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      imageUrl: CLINICAL_CASES[5].originalImage,
      overlay: CLINICAL_CASES[5].gradcamImage,
      symptoms: 'Pigmented lesion on right scapula; noted asymmetry and dark color variegation over past 2 months.'
    },
    {
      id: 'SCN-8935',
      patientName: 'Arjun Deshmukh',
      patientEmail: 'arjun.deshmukh@example.com',
      patientAge: 26,
      patientGender: 'Male',
      predictedClass: 'Acne & Rosacea',
      folderName: 'Acne And Rosacea Photos',
      confidence: 95.4,
      severity: 'Moderate',
      status: 'pending',
      timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
      imageUrl: CLINICAL_CASES[0].originalImage,
      overlay: CLINICAL_CASES[0].gradcamImage,
      symptoms: 'Facial flushing across cheeks and painful pustules.'
    },
    {
      id: 'SCN-8941',
      patientName: 'Maliha Mulla',
      patientEmail: 'maliha.mulla@example.com',
      patientAge: 27,
      patientGender: 'Female',
      predictedClass: 'Eczema / Atopic Dermatitis',
      folderName: 'Eczema Photos',
      confidence: 96.2,
      severity: 'Moderate',
      status: 'reviewed',
      doctorNotes: 'Classic flexural lichenification and pruritus. Advised barrier restoration with Ceramide balm twice daily and low-potency topical hydrocortisone 1% for 5 days.',
      prescription: [
        { name: 'Ceramide Lipid Emollient', dosage: 'Apply BID', duration: 'Ongoing' },
        { name: 'Hydrocortisone 1% Cream', dosage: 'Apply thin layer at night', duration: '5 Days' }
      ],
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      imageUrl: CLINICAL_CASES[1].originalImage,
      overlay: CLINICAL_CASES[1].gradcamImage,
      symptoms: 'Pruritic excoriated plaques on bilateral antecubital flexures.'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'reviewed' | 'urgent'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Review Station Modal State
  const [activeReviewScan, setActiveReviewScan] = useState(initialReviewItem);
  const [doctorDiagnosis, setDoctorDiagnosis] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [doctorFollowUp, setDoctorFollowUp] = useState('2 Weeks');
  const [prescriptionItems, setPrescriptionItems] = useState([
    { name: 'Ceramide Barrier Cream', dosage: 'Apply twice daily', duration: 'Ongoing' }
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [reviewSliderPos, setReviewSliderPos] = useState(50);
  const [actionSuccessToast, setActionSuccessToast] = useState('');

  useEffect(() => {
    if (initialReviewItem) {
      openReviewModal(initialReviewItem);
    }
  }, [initialReviewItem]);

  const openReviewModal = (scan) => {
    setActiveReviewScan(scan);
    setDoctorDiagnosis(scan.predictedClass || 'Eczema / Atopic Dermatitis');
    setDoctorNotes(scan.doctorNotes || `Clinical evaluation validates AI prediction of ${scan.predictedClass}. Patient demonstrates typical dermoscopic vascularity and epidermal changes.`);
    if (scan.prescription && Array.isArray(scan.prescription)) {
      setPrescriptionItems(scan.prescription);
    } else {
      setPrescriptionItems([
        { name: 'Barrier Repair Emollient (Ceramides)', dosage: 'Apply twice daily', duration: 'Ongoing' }
      ]);
    }
    setActionSuccessToast('');
  };

  const handleAddMedication = () => {
    if (!newMedName) return;
    setPrescriptionItems([...prescriptionItems, { name: newMedName, dosage: newMedDosage || 'As directed', duration: '14 Days' }]);
    setNewMedName('');
    setNewMedDosage('');
  };

  const handleRemoveMedication = (idx) => {
    setPrescriptionItems(prescriptionItems.filter((_, i) => i !== idx));
  };

  // Approve Scan and Send to Patient
  const handleApproveScan = () => {
    if (!activeReviewScan) return;

    const updated = analysesList.map(item => {
      if (item.id === activeReviewScan.id) {
        return {
          ...item,
          status: 'reviewed',
          doctorName: user?.name || 'Dr. Sneha Patil',
          doctorDiagnosis,
          doctorNotes,
          prescription: prescriptionItems,
          reviewedAt: new Date().toISOString()
        };
      }
      return item;
    });

    setAnalysesList(updated);
    setActionSuccessToast(`Analysis #${activeReviewScan.id} approved and clinical prescription transmitted to patient records!`);

    setTimeout(() => {
      setActiveReviewScan(null);
      setActionSuccessToast('');
    }, 1800);
  };

  // Request Retake / Revision
  const handleRequestRevision = () => {
    if (!activeReviewScan) return;
    const reason = prompt("Please enter clinical reason for image revision / retake:", "Image contains glare / low focal resolution. Please retake under natural light at 10-15cm distance.");
    if (!reason) return;

    const updated = analysesList.map(item => {
      if (item.id === activeReviewScan.id) {
        return {
          ...item,
          status: 'revision_requested',
          doctorNotes: `Revision requested: ${reason}`
        };
      }
      return item;
    });

    setAnalysesList(updated);
    alert("Revision request sent to patient.");
    setActiveReviewScan(null);
  };

  // Filter list
  const filteredList = analysesList.filter(item => {
    const text = `${item.patientName} ${item.predictedClass}`.toLowerCase();
    const matchesSearch = text.includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'pending') return item.status === 'pending';
    if (activeFilter === 'reviewed') return item.status === 'reviewed';
    if (activeFilter === 'urgent') return item.severity === 'Urgent';
    return true;
  });

  return (
    <div className="doctor-analyses-tab">
      {/* 1. Clinician Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            Clinical Diagnostic Review & Triage Station
          </h1>
          <p>
            Inspect patient lesion captures, cross-reference neural Grad-CAM attention heatmaps, confirm diagnoses, and issue digital prescriptions.
          </p>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="portal-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: `All Scans (${analysesList.length})` },
              { id: 'pending', label: `Awaiting Review (${analysesList.filter(a => a.status === 'pending').length})` },
              { id: 'reviewed', label: `Signed Off (${analysesList.filter(a => a.status === 'reviewed').length})` },
              { id: 'urgent', label: `Urgent Flagged (${analysesList.filter(a => a.severity === 'Urgent').length})` }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  border: 'none',
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: activeFilter === f.id ? '#0055FF' : '#F1F5F9',
                  color: activeFilter === f.id ? '#FFFFFF' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search patient or diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 1rem 0.45rem 2.25rem',
                borderRadius: '9999px',
                border: '1px solid #E2E8F0',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Review Queue Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {filteredList.map(item => {
          const isPending = item.status === 'pending';
          const isUrgent = item.severity === 'Urgent';

          return (
            <div 
              key={item.id} 
              className="portal-card"
              style={{ 
                margin: 0, 
                borderColor: isUrgent ? '#FECACA' : '#E2E8F0',
                background: isUrgent && isPending ? '#FFF5F5' : '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>
                    REF #{item.id}
                  </span>
                  <span className={`portal-badge ${isPending ? 'amber' : 'emerald'}`}>
                    {isPending ? '⏳ Awaiting Review' : '✓ Validated & Signed'}
                  </span>
                </div>

                {/* Patient Profile Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>
                      {item.patientName}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {item.patientAge} Yrs • {item.patientGender}
                    </span>
                  </div>
                  <span className={`portal-badge ${isUrgent ? 'red' : 'blue'}`}>
                    {item.severity}
                  </span>
                </div>

                {/* Image Pair (Original vs Grad-CAM) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
                  <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                    <img src={item.imageUrl} alt="Lesion" style={{ width: '100%', height: '130px', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(0,0,0,0.6)', color: '#FFFFFF', fontSize: '0.62rem', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                      Original
                    </span>
                  </div>
                  <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                    <img src={item.overlay} alt="Grad-CAM" style={{ width: '100%', height: '130px', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(0,0,0,0.6)', color: '#FFFFFF', fontSize: '0.62rem', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                      Grad-CAM
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>AI MODEL PREDICTION:</span>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.15rem' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0F172A' }}>{item.predictedClass}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0055FF' }}>{item.confidence}%</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4, margin: '0 0 1rem', background: '#F8FAFC', padding: '0.65rem', borderRadius: '10px' }}>
                  <strong>Reported Symptoms: </strong>{item.symptoms}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.85rem' }}>
                <button
                  className="portal-btn-primary"
                  onClick={() => openReviewModal(item)}
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '0.55rem' }}
                >
                  <Eye size={14} />
                  <span>{isPending ? 'Open Diagnostic Review Station' : 'View Signed Clinical Record'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Full Diagnostic Review Station Modal */}
      {activeReviewScan && (
        <div className="portal-modal-overlay" onClick={() => setActiveReviewScan(null)}>
          <div className="portal-modal-box" style={{ maxWidth: '860px' }} onClick={(e) => e.stopPropagation()}>
            <div className="portal-modal-header">
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  CLINICAL DIAGNOSTIC WORKSTATION • REF #{activeReviewScan.id}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                  Patient: {activeReviewScan.patientName} ({activeReviewScan.patientAge}y, {activeReviewScan.patientGender})
                </h3>
              </div>
              <button 
                className="portal-modal-close-btn"
                onClick={() => setActiveReviewScan(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="portal-modal-body">
              {/* Dual Lesion Compare Slider */}
              <div 
                className="portal-gradcam-viewer-box"
                style={{ maxHeight: '300px', marginBottom: '1.5rem' }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = ((e.clientX - rect.left) / rect.width) * 100;
                  setReviewSliderPos(Math.max(5, Math.min(95, pos)));
                }}
              >
                <img src={activeReviewScan.overlay} alt="Grad-CAM" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${reviewSliderPos}%`, overflow: 'hidden', borderRight: '2px solid #FFFFFF' }}>
                  <img src={activeReviewScan.imageUrl} alt="Original" style={{ width: '580px', maxWidth: 'none', height: '300px', objectFit: 'cover' }} />
                </div>
                <div className="portal-gradcam-slider-track" style={{ left: `${reviewSliderPos}%` }}>
                  <div className="portal-gradcam-slider-handle" style={{ width: '28px', height: '28px' }}>
                    <Sliders size={13} />
                  </div>
                </div>
                <span className="portal-gradcam-pill-legend" style={{ fontSize: '0.7rem' }}>
                  Slide to verify lesion borders against Grad-CAM heatmap
                </span>
              </div>

              {/* Patient Symptoms Banner */}
              <div style={{ background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Patient Clinical Symptoms & Intake Notes:
                </span>
                <p style={{ fontSize: '0.82rem', color: '#0F172A', margin: '0.2rem 0 0', lineHeight: 1.5 }}>
                  {activeReviewScan.symptoms}
                </p>
              </div>

              {/* Doctor Review Form */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                {/* Clinical Verdict */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>
                    Validated Clinical Diagnosis:
                  </label>
                  <select
                    value={doctorDiagnosis}
                    onChange={(e) => setDoctorDiagnosis(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.85rem', background: '#FFFFFF' }}
                  >
                    {BALANCED_DATASET_CLASSES.map(cls => (
                      <option key={cls.id} value={cls.name}>{cls.name}</option>
                    ))}
                  </select>
                </div>

                {/* Follow-up Period */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>
                    Recommended Follow-up Interval:
                  </label>
                  <select
                    value={doctorFollowUp}
                    onChange={(e) => setDoctorFollowUp(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.85rem', background: '#FFFFFF' }}
                  >
                    <option value="48 Hours (Urgent)">48 Hours (Urgent Dermoscopy)</option>
                    <option value="1 Week">1 Week</option>
                    <option value="2 Weeks">2 Weeks</option>
                    <option value="1 Month">1 Month</option>
                    <option value="Routine Annual Care">Routine Annual Care</option>
                  </select>
                </div>
              </div>

              {/* Doctor Clinical Remarks */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>
                  Clinician Diagnostic Remarks & Justification:
                </label>
                <textarea 
                  rows={3}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.82rem', fontFamily: 'inherit' }}
                />
              </div>

              {/* Digital Prescription Studio */}
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase' }}>
                    ℞ Digital Prescription Studio
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Items appear on patient portal</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {prescriptionItems.map((med, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF', padding: '0.5rem 0.75rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <div>
                        <strong style={{ fontSize: '0.82rem', color: '#0F172A' }}>{med.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#64748B', marginLeft: '0.5rem' }}>({med.dosage} • {med.duration})</span>
                      </div>
                      <button
                        onClick={() => handleRemoveMedication(idx)}
                        style={{ background: 'transparent', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new med row */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="Medicine / Topicals (e.g. Tacrolimus 0.1%)"
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    style={{ flex: 2, padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }}
                  />
                  <input 
                    type="text" 
                    placeholder="Dosage (e.g. Apply BID)"
                    value={newMedDosage}
                    onChange={(e) => setNewMedDosage(e.target.value)}
                    style={{ flex: 1, padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }}
                  />
                  <button
                    onClick={handleAddMedication}
                    className="portal-btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '0.45rem 0.75rem' }}
                  >
                    + Add
                  </button>
                </div>
              </div>

              {actionSuccessToast && (
                <div style={{ padding: '0.75rem 1rem', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', color: '#065F46', fontSize: '0.82rem', fontWeight: 600 }}>
                  ✓ {actionSuccessToast}
                </div>
              )}
            </div>

            <div className="portal-modal-footer">
              <button 
                className="portal-btn-secondary"
                onClick={handleRequestRevision}
                style={{ color: '#DC2626', borderColor: '#FECACA', background: '#FEF2F2' }}
              >
                Request Retake / Revision
              </button>

              {onProceedToPrescription && (
                <button
                  className="portal-btn-secondary"
                  onClick={() => {
                    const pat = {
                      id: activeReviewScan.id,
                      name: activeReviewScan.patientName,
                      age: `${activeReviewScan.patientAge} / ${activeReviewScan.patientGender[0]}`,
                      diagnosis: doctorDiagnosis || activeReviewScan.predictedClass,
                      folder: activeReviewScan.folderName,
                      phototype: "Fitzpatrick Type IV"
                    };
                    setActiveReviewScan(null);
                    onProceedToPrescription(pat);
                  }}
                  style={{ color: '#7C3AED', borderColor: '#DDD6FE', background: '#F5F3FF' }}
                >
                  <FileText size={15} />
                  <span>Draft ℞ in Studio</span>
                </button>
              )}

              <button 
                className="portal-btn-primary"
                onClick={handleApproveScan}
              >
                <CheckCircle2 size={16} />
                <span>Approve & Transmit to Patient</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
