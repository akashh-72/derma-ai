import React from 'react';
import { 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Stethoscope, 
  ArrowRight, 
  Clock, 
  Activity, 
  Scan, 
  CheckCircle2,
  Calendar,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function PatientScanner({ user, onNavigateTab }) {
  const roadmapItems = [
    { label: "8-Class Balanced Dermatology Dataset", status: "Completed", pct: "100%", done: true },
    { label: "Deep CNN Feature Extraction Architecture", status: "Completed", pct: "100%", done: true },
    { label: "Explainable Grad-CAM Visual Heatmaps", status: "Completed", pct: "100%", done: true },
    { label: "Multi-Clinic Blinded Concordance Testing", status: "In Progress", pct: "88%", inProgress: true },
    { label: "Medical Device Regulatory Audit (CE / ISO 13485)", status: "Scheduled", pct: "72%", inProgress: true }
  ];

  return (
    <div className="patient-scanner-coming-soon-wrapper">
      {/* 1. Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            AI Vision Lesion Scanner
          </h1>
          <p>
            Automated dermatological image analysis, deep learning classification, and explainable Grad-CAM heatmaps.
          </p>
        </div>
      </div>

      {/* 2. Hero Coming Soon / Under Development Card */}
      <div className="portal-card" style={{ 
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F7FF 50%, #EFF6FF 100%)',
        border: '1.5px solid #BFDBFE',
        boxShadow: '0 20px 40px -15px rgba(0, 85, 255, 0.1)',
        padding: '3.5rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        {/* Subtle Background Glow Circle */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 85, 255, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Animated Scanner Radar Emblem */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '96px',
          height: '96px',
          margin: '0 auto 1.75rem auto'
        }}>
          {/* Pulsing Outer Rings */}
          <div style={{
            position: 'absolute',
            inset: '-12px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #0055FF, #38BDF8, #818CF8, #0055FF)',
            animation: 'spinLoader 3.5s linear infinite',
            opacity: 0.7,
            filter: 'blur(8px)'
          }} />

          {/* Central Blue Sphere */}
          <div style={{
            position: 'relative',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0055FF 0%, #1D4ED8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0, 85, 255, 0.35)',
            zIndex: 2
          }}>
            <Scan size={38} color="#FFFFFF" strokeWidth={2.4} />
          </div>
        </div>

        {/* Status Pill Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.4rem 1rem', background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '9999px', marginBottom: '1.25rem' }}>
          <Clock size={14} color="#D97706" />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#B45309', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            In Active Development • Clinical Validation Phase
          </span>
        </div>

        {/* Main Title & Description */}
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          Next-Generation AI Skin Scanner Coming Soon
        </h2>

        <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '680px', margin: '0 auto 2.25rem auto', lineHeight: 1.65 }}>
          Our deep learning Convolutional Neural Network (CNN) and Grad-CAM visual heat-map engine are currently undergoing rigorous multi-center clinical calibration and regulatory audit. This module will be released shortly.
        </p>

        {/* Quick CTA Actions */}
        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="portal-btn-primary"
            onClick={() => onNavigateTab && onNavigateTab('doctors')}
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
          >
            <Stethoscope size={18} />
            <span>Consult Certified Dermatologist</span>
          </button>

          <button
            className="portal-btn-secondary"
            onClick={() => onNavigateTab && onNavigateTab('questionnaire')}
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
          >
            <FileText size={18} />
            <span>Take 10-Point Health Check</span>
          </button>

          <button
            className="portal-btn-secondary"
            onClick={() => onNavigateTab && onNavigateTab('overview')}
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
          >
            <ArrowRight size={18} />
            <span>Back to Overview</span>
          </button>
        </div>
      </div>

      {/* 3. Three Capability Preview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        
        {/* Card 1 */}
        <div className="portal-card" style={{ margin: 0, padding: '1.75rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EFF6FF', color: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Layers size={22} />
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.4rem' }}>
            8 Balanced Clinical Classes
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
            Trained on 2.7 GB balanced clinical dermoscopy images covering Acne, Eczema, Melanoma, Fungal Ringworm, Alopecia, Vascular lesions, Chickenpox, and Healthy skin tissue.
          </p>
        </div>

        {/* Card 2 */}
        <div className="portal-card" style={{ margin: 0, padding: '1.75rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <Sparkles size={22} />
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.4rem' }}>
            Grad-CAM Explainable AI Heatmaps
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
            Transparent AI vision generates Jet colormap overlays highlighting the exact morphological zones and pigmented borders that influenced the network’s diagnostic prediction.
          </p>
        </div>

        {/* Card 3 */}
        <div className="portal-card" style={{ margin: 0, padding: '1.75rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <ShieldCheck size={22} />
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.4rem' }}>
            Smart Skin Tissue Validator
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
            Pre-inference heuristic validation automatically detects and rejects non-skin surfaces (e.g. walls, textiles, animals, blurred frames) before model execution.
          </p>
        </div>
      </div>

      {/* 4. Release Roadmap & Milestones */}
      <div className="portal-card">
        <div className="portal-card-header">
          <div className="portal-card-title-group">
            <div className="portal-card-icon" style={{ background: '#0055FF', color: '#FFFFFF' }}>
              <Activity size={18} />
            </div>
            <div>
              <h3 className="portal-card-title">Engineering & Clinical Roadmap</h3>
              <p className="portal-card-subtitle">Verified milestones leading to public scanner deployment</p>
            </div>
          </div>
          <span className="portal-badge blue">Sprint 4 of 5</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {roadmapItems.map((item, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.9rem 1.15rem',
                borderRadius: '14px',
                background: item.done ? '#F8FAFC' : '#EFF6FF',
                border: item.done ? '1px solid #E2E8F0' : '1px solid #BFDBFE'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {item.done ? (
                  <CheckCircle2 size={18} color="#10B981" />
                ) : (
                  <Clock size={18} color="#0055FF" />
                )}
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: item.done ? '#334155' : '#0F172A' }}>
                  {item.label}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: item.done ? '#059669' : '#0055FF' }}>
                  {item.status} ({item.pct})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
