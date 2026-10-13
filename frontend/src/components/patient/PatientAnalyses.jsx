import React, { useState, useEffect } from 'react';
import { 
  Scan, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Eye, 
  FileText, 
  UserCheck, 
  Layers, 
  Sliders, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CLINICAL_CASES } from '../../data/mockData';
import { fetchUserScansFromFirebase } from '../../firebase/dbService';

export default function PatientAnalyses({ 
  user, 
  onNavigateTab, 
  onBookDoctorForCondition 
}) {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'pending' | 'reviewed' | 'urgent'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScan, setSelectedScan] = useState(null);
  const [modalSliderPos, setModalSliderPos] = useState(50);

  // Load scans from Firebase
  useEffect(() => {
    async function loadScans() {
      setLoading(true);
      try {
        const userId = user?.uid || user?.email || 'patient-local';
        const list = await fetchUserScansFromFirebase(userId);
        if (list && list.length > 0) {
          setAnalyses(list);
        } else {
          // Pre-populate with high-value clinical baseline records
          const baselines = [
            {
              id: 'SCN-8941',
              diseaseName: 'Eczema / Atopic Dermatitis',
              predictedClass: 'Eczema / Atopic Dermatitis',
              folderName: 'Eczema Photos',
              confidence: 96.2,
              severity: 'Moderate',
              status: 'reviewed',
              doctorName: 'Dr. Sneha Patil',
              doctorNotes: 'Classic flexural lichenification and pruritus. Advised barrier restoration with Ceramide balm twice daily and low-potency topical hydrocortisone 1% for 5 days. Avoid hot water showers.',
              prescription: 'Ceramide Barrier Ointment (apply BID), Hydrocortisone 1% cream (apply at night x 5 days)',
              createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
              imageUrl: CLINICAL_CASES[1].originalImage,
              overlay: CLINICAL_CASES[1].gradcamImage
            },
            {
              id: 'SCN-8935',
              diseaseName: 'Acne & Rosacea',
              predictedClass: 'Acne & Rosacea',
              folderName: 'Acne And Rosacea Photos',
              confidence: 95.4,
              severity: 'Low - Moderate',
              status: 'pending',
              doctorNotes: '',
              createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
              imageUrl: CLINICAL_CASES[0].originalImage,
              overlay: CLINICAL_CASES[0].gradcamImage
            },
            {
              id: 'SCN-8920',
              diseaseName: 'Melanoma & Abnormal Moles',
              predictedClass: 'Melanoma & Skin Cancer / Moles',
              folderName: 'Melanoma Skin Cancer Nevi And Moles',
              confidence: 93.8,
              severity: 'Urgent',
              status: 'reviewed',
              doctorName: 'Dr. Rajesh Kulkarni',
              doctorNotes: 'Noted border irregularity and asymmetry >6mm. Recommended urgent in-person dermoscopic biopsy within 48 hours for histopathological confirmation.',
              prescription: 'Urgent referral for punch/excisional biopsy. Do not attempt topical acids or manipulation.',
              createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
              imageUrl: CLINICAL_CASES[5].originalImage,
              overlay: CLINICAL_CASES[5].gradcamImage
            }
          ];
          setAnalyses(baselines);
        }
      } catch (err) {
        console.warn("Failed loading analyses:", err);
      } finally {
        setLoading(false);
      }
    }
    loadScans();
  }, [user]);

  // Filtering
  const filteredAnalyses = analyses.filter(item => {
    const title = (item.diseaseName || item.predictedClass || '').toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'pending') {
      return item.status === 'pending' || !item.status;
    }
    if (activeFilter === 'reviewed') {
      return item.status === 'reviewed' || item.status === 'completed';
    }
    if (activeFilter === 'urgent') {
      return item.severity === 'Urgent' || item.severity === 'High';
    }
    return true;
  });

  return (
    <div className="patient-analyses-tab">
      {/* 1. Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            My Lesion Analyses & Clinical Records
          </h1>
          <p>
            Review all AI Vision scan results, verify Grad-CAM heatmaps, and read clinical dermatologist verdicts.
          </p>
        </div>

        <div className="portal-welcome-actions">
          <button 
            className="portal-btn-primary"
            onClick={() => onNavigateTab('scanner')}
          >
            <Scan size={16} />
            <span>New AI Scan</span>
          </button>
        </div>
      </div>

      {/* 2. Filter & Search Control Strip */}
      <div className="portal-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: `All Scans (${analyses.length})` },
              { id: 'pending', label: `Pending Review (${analyses.filter(a => a.status === 'pending' || !a.status).length})` },
              { id: 'reviewed', label: `Reviewed by Doctor (${analyses.filter(a => a.status === 'reviewed' || a.status === 'completed').length})` },
              { id: 'urgent', label: `Urgent Flagged (${analyses.filter(a => a.severity === 'Urgent' || a.severity === 'High').length})` }
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

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search by condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 1rem 0.45rem 2.25rem',
                borderRadius: '9999px',
                border: '1px solid #E2E8F0',
                fontSize: '0.82rem',
                background: '#FFFFFF',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Analyses Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {filteredAnalyses.map(scan => {
          const isReviewed = scan.status === 'reviewed' || scan.status === 'completed';
          const isUrgent = scan.severity === 'Urgent' || scan.severity === 'High';

          return (
            <div 
              key={scan.id} 
              className="portal-card"
              style={{ 
                margin: 0, 
                borderColor: isUrgent ? '#FECACA' : '#E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B' }}>
                    ID: {scan.id?.substring(0, 10)}
                  </span>
                  <span className={`portal-badge ${isReviewed ? 'emerald' : isUrgent ? 'red' : 'amber'}`}>
                    {isReviewed ? '✓ Reviewed by Doctor' : isUrgent ? '⚠️ Urgent Triage' : '⏳ Pending Review'}
                  </span>
                </div>

                {/* Dual Image Preview (Original + Grad-CAM) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
                  <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                    <img 
                      src={scan.imageUrl || scan.preview || CLINICAL_CASES[1].originalImage} 
                      alt="Original lesion"
                      style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute', bottom: '6px', left: '6px', background: 'rgba(0,0,0,0.65)', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      Original
                    </span>
                  </div>

                  <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                    <img 
                      src={scan.overlay || scan.imageUrl || CLINICAL_CASES[1].gradcamImage} 
                      alt="Grad-CAM"
                      style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                    />
                    <span style={{ position: 'absolute', bottom: '6px', left: '6px', background: 'rgba(0,0,0,0.65)', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 600, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                      Grad-CAM
                    </span>
                  </div>
                </div>

                {/* Title & Diagnostic Details */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                  {scan.diseaseName || scan.predictedClass}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    {new Date(scan.createdAt || scan.timestamp || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0055FF' }}>
                    Confidence: {scan.confidence ? `${scan.confidence}%` : 'High'}
                  </span>
                </div>

                {/* Doctor Note Snippet if reviewed */}
                {isReviewed && scan.doctorNotes && (
                  <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem', color: '#065F46', fontSize: '0.75rem', fontWeight: 700 }}>
                      <UserCheck size={14} />
                      <span>{scan.doctorName || 'Doctor'} Verdict:</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#047857', lineHeight: 1.4, margin: 0 }}>
                      {scan.doctorNotes.length > 90 ? `${scan.doctorNotes.substring(0, 90)}...` : scan.doctorNotes}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.85rem' }}>
                <button
                  className="portal-btn-primary"
                  onClick={() => setSelectedScan(scan)}
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.78rem', padding: '0.5rem' }}
                >
                  <Eye size={14} />
                  <span>Inspect Scan</span>
                </button>
                <button
                  className="portal-btn-secondary"
                  onClick={() => onBookDoctorForCondition(scan.diseaseName || scan.predictedClass)}
                  style={{ fontSize: '0.78rem', padding: '0.5rem 0.85rem' }}
                  title="Book Doctor"
                >
                  <Calendar size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAnalyses.length === 0 && (
        <div className="portal-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
          <Scan size={42} color="#94A3B8" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
            No matching scan records found
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Try clearing search filters or upload a new photo to begin.
          </p>
          <button 
            className="portal-btn-primary"
            onClick={() => onNavigateTab('scanner')}
          >
            Launch AI Scanner
          </button>
        </div>
      )}

      {/* 4. Full Scan Detail Modal with Wipe Slider */}
      {selectedScan && (
        <div className="portal-modal-overlay" onClick={() => setSelectedScan(null)}>
          <div className="portal-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="portal-modal-header">
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  CLINICAL CASE DOSSIER
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                  {selectedScan.diseaseName || selectedScan.predictedClass}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedScan(null)}
                style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem' }}
              >
                ✕
              </button>
            </div>

            <div className="portal-modal-body">
              {/* Wipe Slider Modal */}
              <div 
                className="portal-gradcam-viewer-box"
                style={{ marginBottom: '1.5rem', maxHeight: '320px' }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = ((e.clientX - rect.left) / rect.width) * 100;
                  setModalSliderPos(Math.max(5, Math.min(95, pos)));
                }}
              >
                <img 
                  src={selectedScan.overlay || selectedScan.imageUrl} 
                  alt="Grad-CAM"
                  style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    bottom: 0, 
                    width: `${modalSliderPos}%`, 
                    overflow: 'hidden', 
                    borderRight: '2px solid #FFFFFF'
                  }}
                >
                  <img 
                    src={selectedScan.imageUrl || selectedScan.preview} 
                    alt="Original" 
                    style={{ width: '580px', maxWidth: 'none', height: '320px', objectFit: 'cover' }}
                  />
                </div>
                <div className="portal-gradcam-slider-track" style={{ left: `${modalSliderPos}%` }}>
                  <div className="portal-gradcam-slider-handle" style={{ width: '30px', height: '30px' }}>
                    <Sliders size={14} />
                  </div>
                </div>
              </div>

              {/* Status and Confidence */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>CONFIDENCE RATING</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0055FF' }}>{selectedScan.confidence}%</span>
                </div>
                <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>CLINICAL SEVERITY</span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: selectedScan.severity === 'Urgent' ? '#DC2626' : '#D97706' }}>
                    {selectedScan.severity || 'Moderate'}
                  </span>
                </div>
              </div>

              {/* Dermatologist Clinical Notes */}
              {selectedScan.doctorNotes ? (
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '16px', padding: '1.25rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <UserCheck size={18} color="#059669" />
                    <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#065F46' }}>
                      Certified Dermatologist Clinical Review:
                    </h5>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#047857', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    {selectedScan.doctorNotes}
                  </p>
                  {selectedScan.prescription && (
                    <div style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: '10px', border: '1px solid #A7F3D0' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#065F46', textTransform: 'uppercase' }}>
                        PRESCRIPTION & CARE PLAN:
                      </span>
                      <p style={{ fontSize: '0.8rem', color: '#065F46', fontWeight: 600, marginTop: '0.2rem' }}>
                        {selectedScan.prescription}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '16px', padding: '1.25rem', marginBottom: '1rem' }}>
                  <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#92400E', marginBottom: '0.25rem' }}>
                    Pending Doctor Validation
                  </h5>
                  <p style={{ fontSize: '0.82rem', color: '#B45309' }}>
                    This scan is currently queued in the clinical review stream. A certified dermatologist will validate this prediction shortly.
                  </p>
                </div>
              )}
            </div>

            <div className="portal-modal-footer">
              <button 
                className="portal-btn-secondary"
                onClick={() => setSelectedScan(null)}
              >
                Close
              </button>
              <button 
                className="portal-btn-primary"
                onClick={() => {
                  setSelectedScan(null);
                  onBookDoctorForCondition(selectedScan.diseaseName || selectedScan.predictedClass);
                }}
              >
                <Calendar size={14} />
                <span>Book Dermatologist Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
