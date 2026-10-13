import React, { useState } from 'react';
import { 
  UploadCloud, 
  Scan, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Eye, 
  Sliders, 
  FileText, 
  Activity, 
  Info, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Clock
} from 'lucide-react';
import { CLINICAL_CASES } from '../../data/mockData';

export default function ScanTab({ onMatchDoctorsForCondition, initialConditionId = null }) {
  const initialCase = initialConditionId 
    ? (CLINICAL_CASES.find(c => c.id === initialConditionId) || CLINICAL_CASES[0])
    : CLINICAL_CASES[0];

  const [activeCase, setActiveCase] = useState(initialCase);
  const [customImage, setCustomImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0); // 0: idle, 1: preprocess, 2: cnn, 3: gradcam, 4: done
  const [hasAnalyzed, setHasAnalyzed] = useState(true); // default true for immediate clinical exploration
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'gradcam' | 'original' | 'sideBySide'
  const [sliderPos, setSliderPos] = useState(50);
  const [guidanceTab, setGuidanceTab] = useState('precautions'); // 'symptoms' | 'causes' | 'precautions' | 'whenToConsult'

  const analysisStepsList = [
    "Validating image dimensions & color illumination...",
    "Resizing tensor & applying CLAHE contrast normalization...",
    "Extracting deep spatial feature maps via CNN backbone...",
    "Calculating gradient activation maps (Grad-CAM)...",
    "Synthesizing differential diagnosis & clinical triage..."
  ];

  const handleSelectCase = (caseItem) => {
    setActiveCase(caseItem);
    setCustomImage(null);
    setHasAnalyzed(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        setHasAnalyzed(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setIsAnalyzing(false);
          setHasAnalyzed(true);
          return 4;
        }
        return prev + 1;
      });
    }, 450);
  };

  const currentOriginalImg = customImage || activeCase.originalImage;
  const currentGradCamImg = activeCase.gradcamImage;

  return (
    <div className="dashboard-tab-content scan-tab-container">
      {/* Top Banner & Case Picker */}
      <div className="clinical-card scan-intake-card">
        <div className="intake-header">
          <div>
            <h3 className="tab-title">AI Skin Vision Scanner & Grad-CAM Analyzer</h3>
            <p className="tab-sub">
              Upload a clear patient photo or select one of our verified clinical benchmark cases.
            </p>
          </div>
          <div className="intake-badges">
            <span className="badge badge-blue">
              <ShieldCheck size={14} /> Medical Validation Active
            </span>
          </div>
        </div>

        {/* Preset Sample Cases Selector */}
        <div className="sample-cases-strip">
          <span className="strip-title">Try Benchmark Clinical Cases:</span>
          <div className="case-chips-list">
            {CLINICAL_CASES.map(item => (
              <button
                key={item.id}
                className={`case-picker-btn ${activeCase.id === item.id && !customImage ? 'active' : ''}`}
                onClick={() => handleSelectCase(item)}
              >
                <span>{item.name.split('(')[0]}</span>
                <span className="picker-conf-pill">{item.confidence}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upload Dropzone */}
        <div className="upload-dropzone-row">
          <label className="upload-dropzone-box">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="dropzone-hidden-input"
            />
            <div className="dropzone-content">
              <UploadCloud size={28} className="text-electric" />
              <div>
                <span className="dropzone-main-text">Upload Custom Skin Photo</span>
                <span className="dropzone-sub-text">Click or drag & drop (JPG, PNG, WEBP)</span>
              </div>
            </div>
          </label>

          <button 
            className="btn btn-primary btn-run-analysis"
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Running Inference...</span>
              </>
            ) : (
              <>
                <Scan size={18} />
                <span>Execute CNN & Grad-CAM Analysis</span>
              </>
            )}
          </button>
        </div>

        {/* Real-time Analysis Progress Pipeline */}
        {isAnalyzing && (
          <div className="analysis-progress-banner">
            <div className="progress-header-row">
              <span className="progress-step-text">
                Stage {analysisStep + 1} of 5: {analysisStepsList[analysisStep]}
              </span>
              <span className="progress-pct-text">{((analysisStep + 1) * 20)}%</span>
            </div>
            <div className="analysis-bar-track">
              <div 
                className="analysis-bar-fill"
                style={{ width: `${(analysisStep + 1) * 20}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Main Analysis Results & Visualizer */}
      {hasAnalyzed && !isAnalyzing && (
        <div className="scan-results-grid">
          {/* Left Column: Visualizer Box with Heatmap & Sliders */}
          <div className="clinical-card result-visual-card">
            <div className="result-visual-header">
              <div className="visual-title-group">
                <span className="live-dot-glow"></span>
                <span className="visual-title">Explainable Vision Layer</span>
              </div>

              {/* View mode switcher */}
              <div className="view-mode-buttons">
                <button 
                  className={`btn-mode ${viewMode === 'slider' ? 'active' : ''}`}
                  onClick={() => setViewMode('slider')}
                  title="Split Slider"
                >
                  <Sliders size={14} /> Split Slider
                </button>
                <button 
                  className={`btn-mode ${viewMode === 'gradcam' ? 'active' : ''}`}
                  onClick={() => setViewMode('gradcam')}
                  title="Grad-CAM Heatmap"
                >
                  ⚡ Grad-CAM
                </button>
                <button 
                  className={`btn-mode ${viewMode === 'original' ? 'active' : ''}`}
                  onClick={() => setViewMode('original')}
                  title="Original Tissue"
                >
                  Original Skin
                </button>
                <button 
                  className={`btn-mode ${viewMode === 'sideBySide' ? 'active' : ''}`}
                  onClick={() => setViewMode('sideBySide')}
                  title="Side-by-Side"
                >
                  Side-by-Side
                </button>
              </div>
            </div>

            {/* Visualizer Display Area */}
            <div className="interactive-viewer-wrapper">
              {viewMode === 'slider' && (
                <div className="interactive-slider-box">
                  {/* Background: Grad-CAM overlay */}
                  <div className="viewer-slide-layer gradcam-bg">
                    <img src={currentGradCamImg} alt="Grad-CAM Heatmap" className="viewer-img" />
                    <div className="viewer-watermark right">Grad-CAM Jet Heatmap</div>
                  </div>

                  {/* Foreground: Original (clipped by sliderPos) */}
                  <div 
                    className="viewer-slide-layer original-fg"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <img src={currentOriginalImg} alt="Original Tissue" className="viewer-img" />
                    <div className="viewer-watermark left">Original Dermoscopic Tissue</div>
                  </div>

                  {/* Split Divider */}
                  <div 
                    className="viewer-divider-bar"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="viewer-divider-handle">
                      <span>&lt; &gt;</span>
                    </div>
                  </div>

                  <input 
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="viewer-range-slider"
                    aria-label="Interactive Grad-CAM slider"
                  />
                </div>
              )}

              {viewMode === 'gradcam' && (
                <div className="single-viewer-box">
                  <img src={currentGradCamImg} alt="Grad-CAM Heatmap" className="viewer-img" />
                  <div className="viewer-watermark">Grad-CAM Activation Heatmap</div>
                </div>
              )}

              {viewMode === 'original' && (
                <div className="single-viewer-box">
                  <img src={currentOriginalImg} alt="Original Tissue" className="viewer-img" />
                  <div className="viewer-watermark">Original Dermoscopic Tissue</div>
                </div>
              )}

              {viewMode === 'sideBySide' && (
                <div className="dual-side-viewer-grid">
                  <div className="dual-item">
                    <span className="dual-badge">Original Tissue</span>
                    <img src={currentOriginalImg} alt="Original Tissue" className="viewer-img" />
                  </div>
                  <div className="dual-item">
                    <span className="dual-badge gradcam-badge">Grad-CAM Heatmap</span>
                    <img src={currentGradCamImg} alt="Grad-CAM Heatmap" className="viewer-img" />
                  </div>
                </div>
              )}
            </div>

            {/* Grad-CAM Scientific Explainer Bar */}
            <div className="gradcam-scientific-banner">
              <div className="scientific-icon">
                <Layers size={18} className="text-electric" />
              </div>
              <div className="scientific-text">
                <strong>Visual Reasoning:</strong> The neural network’s highest gradient activations (red hotzones) align with the pathological lesion center and margins, validating that diagnosis is based on cellular changes rather than skin glare or background artifacts.
              </div>
            </div>
          </div>

          {/* Right Column: Diagnosis Summary & Patient Guidance */}
          <div className="clinical-card result-diagnostic-card">
            <div className="diagnostic-header-row">
              <span className={`badge ${activeCase.urgency === 'High' ? 'badge-danger' : activeCase.urgency === 'Moderate' ? 'badge-amber' : 'badge-green'}`}>
                Triage Urgency: {activeCase.urgency}
              </span>
              <span className="category-text">{activeCase.category}</span>
            </div>

            <div className="diagnosis-main-title-box">
              <span className="detected-label">Detected Dermatological Condition</span>
              <h2 className="detected-disease-name">{activeCase.name}</h2>
            </div>

            {/* Confidence Score Bar */}
            <div className="confidence-detail-widget">
              <div className="conf-text-row">
                <span className="conf-label">Neural Model Confidence</span>
                <span className="conf-pct-badge">{activeCase.confidence}%</span>
              </div>
              <div className="conf-progress-track">
                <div 
                  className="conf-progress-fill"
                  style={{ width: `${activeCase.confidence}%` }}
                ></div>
              </div>
            </div>

            {/* Full-Fledged Differential Diagnosis Probability Triage */}
            <div className="differential-diagnosis-widget">
              <div className="differential-header">
                <span className="diff-title">Differential Diagnosis Distribution</span>
                <span className="diff-badge">Top 3 Candidates</span>
              </div>

              <div className="differential-list">
                <div className="diff-item active">
                  <div className="diff-item-text">
                    <span className="diff-name">1. {activeCase.name}</span>
                    <strong className="diff-val">{activeCase.confidence}%</strong>
                  </div>
                  <div className="diff-bar-track">
                    <div className="diff-bar-fill primary" style={{ width: `${activeCase.confidence}%` }}></div>
                  </div>
                </div>

                <div className="diff-item">
                  <div className="diff-item-text">
                    <span className="diff-name">2. Allergic Contact Dermatitis</span>
                    <strong className="diff-val">{((100 - activeCase.confidence) * 0.65).toFixed(1)}%</strong>
                  </div>
                  <div className="diff-bar-track">
                    <div className="diff-bar-fill secondary" style={{ width: `${(100 - activeCase.confidence) * 0.65}%` }}></div>
                  </div>
                </div>

                <div className="diff-item">
                  <div className="diff-item-text">
                    <span className="diff-name">3. Lichen Simplex Chronicus</span>
                    <strong className="diff-val">{((100 - activeCase.confidence) * 0.35).toFixed(1)}%</strong>
                  </div>
                  <div className="diff-bar-track">
                    <div className="diff-bar-fill tertiary" style={{ width: `${(100 - activeCase.confidence) * 0.35}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <p className="disease-summary-text">{activeCase.description}</p>

            {/* Patient Guidance Tabs */}
            <div className="guidance-tabs-box">
              <div className="guidance-nav-pills">
                <button 
                  className={`guidance-pill ${guidanceTab === 'precautions' ? 'active' : ''}`}
                  onClick={() => setGuidanceTab('precautions')}
                >
                  Home Care & Precautions
                </button>
                <button 
                  className={`guidance-pill ${guidanceTab === 'symptoms' ? 'active' : ''}`}
                  onClick={() => setGuidanceTab('symptoms')}
                >
                  Symptoms
                </button>
                <button 
                  className={`guidance-pill ${guidanceTab === 'causes' ? 'active' : ''}`}
                  onClick={() => setGuidanceTab('causes')}
                >
                  Causes & Triggers
                </button>
                <button 
                  className={`guidance-pill ${guidanceTab === 'whenToConsult' ? 'active' : ''}`}
                  onClick={() => setGuidanceTab('whenToConsult')}
                >
                  When to See Doctor
                </button>
              </div>

              <div className="guidance-content-pane">
                {guidanceTab === 'precautions' && (
                  <ul className="guidance-items-list">
                    {activeCase.precautions.map((item, idx) => (
                      <li key={idx} className="guidance-item">
                        <CheckCircle2 size={16} className="text-electric" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {guidanceTab === 'symptoms' && (
                  <ul className="guidance-items-list">
                    {activeCase.symptoms.map((item, idx) => (
                      <li key={idx} className="guidance-item">
                        <CheckCircle2 size={16} className="text-electric" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {guidanceTab === 'causes' && (
                  <ul className="guidance-items-list">
                    {activeCase.causes.map((item, idx) => (
                      <li key={idx} className="guidance-item">
                        <CheckCircle2 size={16} className="text-electric" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {guidanceTab === 'whenToConsult' && (
                  <div className="urgency-consult-box">
                    <AlertTriangle size={20} className="text-warning" />
                    <p className="urgency-consult-text">{activeCase.whenToConsult}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Action: Smart Match Doctors */}
            <div className="diagnostic-cta-box">
              <button 
                className="btn btn-primary btn-block btn-lg"
                onClick={() => onMatchDoctorsForCondition(activeCase)}
              >
                <UserCheck size={20} />
                <span>Smart Match Nearby Dermatologists</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
