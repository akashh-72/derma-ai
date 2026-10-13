import React, { useState } from 'react';
import { 
  Layers, 
  Eye, 
  Sliders, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { CLINICAL_CASES } from '../data/mockData';

export default function GradCamShowcase({ onOpenScanner }) {
  const [selectedCaseId, setSelectedCaseId] = useState(CLINICAL_CASES[0].id);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'sideBySide'

  const activeCase = CLINICAL_CASES.find(c => c.id === selectedCaseId) || CLINICAL_CASES[0];

  const isUrgent = activeCase.urgency === 'Urgent';
  const isModerate = activeCase.urgency === 'Moderate';

  return (
    <section className="skinive-gradcam-section" id="gradcam-showcase">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="skinive-section-eyebrow">
            <span className="eyebrow-pulse-dot"></span>
            <span>Explainable Neural Architecture</span>
          </span>
          <h2 className="skinive-section-title">
            Visual Explainability with <span className="text-electric">Grad-CAM Heatmaps</span>
          </h2>
          <p className="skinive-section-desc">
            Traditional neural networks act as opaque black boxes. DermaAI computes gradient-weighted class activation maps (Grad-CAM) to visually highlight the exact tissue borders driving diagnostic predictions.
          </p>
        </div>

        {/* High-End Benchmark Case Switcher */}
        <div className="gradcam-case-tabs-container">
          <span className="case-tabs-caption">Select Clinical Benchmark Case:</span>
          <div className="gradcam-case-tabs-list">
            {CLINICAL_CASES.map(item => (
              <button
                key={item.id}
                className={`gradcam-case-tab-btn ${item.id === selectedCaseId ? 'active' : ''}`}
                onClick={() => setSelectedCaseId(item.id)}
              >
                <span className="tab-case-name">{item.name.split('(')[0]}</span>
                <span className="tab-case-conf-pill">{item.confidence}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Visualizer & Diagnostic Card Grid */}
        <div className="gradcam-main-grid">
          
          {/* Left Column: Interactive Visualizer Card */}
          <div className="gradcam-viewer-squircle-card">
            <div className="viewer-card-topbar">
              <div className="viewer-top-left">
                <span className="live-status-blip"></span>
                <span className="viewer-layer-tag">CONV_FINAL Feature Activation • Jet Colormap</span>
              </div>
              <div className="viewer-mode-switch">
                <button 
                  className={`viewer-mode-pill ${viewMode === 'slider' ? 'active' : ''}`}
                  onClick={() => setViewMode('slider')}
                >
                  <Sliders size={14} />
                  <span>Interactive Split</span>
                </button>
                <button 
                  className={`viewer-mode-pill ${viewMode === 'sideBySide' ? 'active' : ''}`}
                  onClick={() => setViewMode('sideBySide')}
                >
                  <Eye size={14} />
                  <span>Side-by-Side</span>
                </button>
              </div>
            </div>

            {viewMode === 'slider' ? (
              <div className="gradcam-slider-viewport">
                {/* Background: Grad-CAM Overlay */}
                <div className="gradcam-slice bg-gradcam">
                  <img 
                    src={activeCase.gradcamImage} 
                    alt={`Grad-CAM Heatmap for ${activeCase.name}`}
                    className="viewport-img"
                  />
                  <span className="viewport-watermark right">Grad-CAM Jet Heatmap</span>
                </div>

                {/* Foreground: Raw Dermoscopic Tissue */}
                <div 
                  className="gradcam-slice fg-original"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img 
                    src={activeCase.originalImage} 
                    alt={`Original Dermoscopic for ${activeCase.name}`}
                    className="viewport-img"
                  />
                  <span className="viewport-watermark left">Raw Dermoscopy</span>
                </div>

                {/* Split Handle */}
                <div 
                  className="slider-divider-line"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="slider-handle-bubble">
                    <span>‹ ›</span>
                  </div>
                </div>

                {/* Range Slider for Dragging */}
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="slider-range-control"
                  aria-label="Grad-CAM comparison slider"
                />
              </div>
            ) : (
              /* Side by Side Mode */
              <div className="gradcam-side-by-side-viewport">
                <div className="sbs-panel">
                  <span className="sbs-panel-tag">Raw Dermoscopy</span>
                  <img src={activeCase.originalImage} alt={activeCase.name} className="viewport-img" />
                </div>
                <div className="sbs-panel">
                  <span className="sbs-panel-tag gradcam-tag">Grad-CAM Heatmap</span>
                  <img src={activeCase.gradcamImage} alt={activeCase.name} className="viewport-img" />
                </div>
              </div>
            )}

            <div className="viewer-footer-hint">
              <Info size={15} color="#0055FF" />
              <span>Drag slider or toggle modes to compare raw epithelial tissue with neural activation hot zones.</span>
            </div>
          </div>

          {/* Right Column: High-Grade Clinical Readout Squircle Card */}
          <div className="gradcam-readout-squircle-card">
            <div>
              <div className="readout-card-header">
                <span className="readout-cat-pill">{activeCase.category}</span>
                {activeCase.datasetFolder && (
                  <span style={{ fontSize: '11px', color: '#60A5FA', background: 'rgba(59, 130, 246, 0.12)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(59, 130, 246, 0.25)', marginLeft: '6px' }}>
                    📁 {activeCase.datasetFolder}
                  </span>
                )}
                <div className="readout-urgency-pill">
                  {isUrgent ? (
                    <span className="badge-danger">
                      <AlertTriangle size={13} />
                      High Risk Triage
                    </span>
                  ) : isModerate ? (
                    <span className="badge-warning">
                      <AlertTriangle size={13} />
                      Moderate Risk
                    </span>
                  ) : (
                    <span className="badge-success">
                      <CheckCircle2 size={13} />
                      Routine / Low Threat
                    </span>
                  )}
                </div>
              </div>

              <h3 className="readout-condition-title">{activeCase.name}</h3>

              {/* Confidence Meter */}
              <div className="readout-confidence-box">
                <div className="conf-bar-header">
                  <span className="conf-bar-label">CNN Prediction Confidence</span>
                  <span className="conf-bar-val">{activeCase.confidence}%</span>
                </div>
                <div className="conf-bar-track">
                  <div 
                    className="conf-bar-fill" 
                    style={{ width: `${activeCase.confidence}%` }}
                  ></div>
                </div>
              </div>

              <p className="readout-description-p">{activeCase.description}</p>

              {/* Hallmark Symptoms List */}
              <div className="readout-symptoms-section">
                <h4 className="symptoms-title">Observed Clinical Signs:</h4>
                <ul className="symptoms-clean-list">
                  {activeCase.symptoms.slice(0, 3).map((symp, idx) => (
                    <li key={idx} className="symptom-item">
                      <span className="symp-bullet"></span>
                      <span>{symp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clinical Protocol Box */}
              <div className="readout-consult-advisory">
                <strong>Clinical Advisory:</strong> {activeCase.whenToConsult}
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="readout-card-action">
              <button 
                className="skinive-btn-pill-primary full-width"
                onClick={onOpenScanner}
              >
                <span>Launch Live Scanner with this Case</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
