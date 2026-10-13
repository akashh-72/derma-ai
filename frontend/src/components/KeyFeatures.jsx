import React from 'react';
import { 
  Calendar, 
  Eye, 
  Layers, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  Activity,
  Sparkles
} from 'lucide-react';

import keyFeaturesImg from '../assets/key-features.png';

export default function KeyFeatures({ onOpenScanner }) {
  const features = [
    {
      id: "self-checks",
      icon: <Calendar size={26} color="#FFFFFF" strokeWidth={2.3} />,
      title: "Structured Self-Checks & Longitudinal Monitoring",
      text: "Perform regular, structured skin self-checks and monitor visible changes over time with timeline lesion comparison."
    },
    {
      id: "camera-guidance",
      icon: <Eye size={26} color="#FFFFFF" strokeWidth={2.3} />,
      title: "Real-Time AI Camera Guidance & Framing",
      text: "Real-time AI camera guidance helps users capture clear, properly framed images with uniform lighting for more reliable skin analysis."
    },
    {
      id: "gradcam-mapping",
      icon: <Layers size={26} color="#FFFFFF" strokeWidth={2.3} />,
      title: "Explainable Grad-CAM Lesion Heatmap Mapping",
      text: "Visual gradient heatmaps highlight exact tissue morphology guiding model confidence, helping clinicians document lesions transparently."
    }
  ];

  return (
    <section className="skinive-features-section" id="key-features">
      {/* Background Decorative Medical Elements */}
      <div className="features-ambient-backdrop">
        <div className="features-ambient-glow left"></div>
        <div className="features-ambient-glow right"></div>
        <svg className="features-bg-svg-lines" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <path 
            d="M 0 180 Q 400 80 800 220 T 1440 140" 
            fill="none" 
            stroke="#0055FF" 
            strokeWidth="1.2" 
            opacity="0.06" 
          />
          <path 
            d="M 0 320 Q 500 420 1000 260 T 1440 380" 
            fill="none" 
            stroke="#0055FF" 
            strokeWidth="1.5" 
            opacity="0.04" 
          />
        </svg>
      </div>

      <div className="container relative-z">
        <div className="features-layout-grid">
          
          {/* Left Column: Consolidated High-Fidelity 3D Graphic Showcase */}
          <div className="features-phone-col">
            <div className="features-showcase-container">
              <img 
                src={keyFeaturesImg} 
                alt="DermaAI Key Clinical Features - 10x Macro Viewfinder & Diagnostic Triage" 
                className="features-real-graphic-img"
              />
            </div>
          </div>

          {/* Right Column: Key Features Content */}
          <div className="features-content-col">
            <div className="features-header-wrap">
              <span className="features-kicker">Core Diagnostic Capabilities</span>
              <h2 className="features-main-title">Key Features</h2>
            </div>

            <div className="features-rows-stack">
              {features.map((item) => (
                <div key={item.id} className="feature-row-item">
                  <div className="feature-squircle-icon">
                    {item.icon}
                  </div>
                  <div className="feature-row-text">
                    <h3 className="feature-row-headline">{item.title}</h3>
                    <p className="feature-row-paragraph">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="features-action-row">
              <button className="skinive-btn-pill-primary" onClick={onOpenScanner}>
                <span>Launch Interactive Scanner</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
