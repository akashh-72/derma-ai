import React, { useState } from 'react';
import { Play, Sparkles, X, ArrowRight, ShieldCheck, CheckCircle2, Stethoscope, Smartphone, Lock, Eye } from 'lucide-react';
import demoBannerImg from '../assets/demo-video-banner.jpeg';

export default function SmartAnalysisBanner({ onOpenScanner }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <section className="skinive-analysis-banner-section" id="smart-analysis">
        <div className="container">
          
          {/* Section Header */}
          <div className="section-header text-center">
            <span className="skinive-section-eyebrow">
              <span className="eyebrow-pulse-dot"></span>
              <span>Your AI Dermatology Assistant, Available 24/7</span>
            </span>
            <h2 className="skinive-section-title">
              Smart Skin Analysis for <span className="text-electric">Better-Informed Care</span>
            </h2>
            <p className="skinive-section-desc">
              Clinical deep learning connects instant smartphone dermoscopy, explainable activation heatmaps, and doctor appointments in one seamless journey.
            </p>
          </div>

          {/* Large Wide Rounded Media Banner Card (Real High-Resolution Banner - Clean & Intact) */}
          <div className="analysis-media-card">
            <img 
              src={demoBannerImg} 
              alt="See DermaAI in Action - Smartphone Clinical Dermoscopy and Grad-CAM Heatmap" 
              className="analysis-media-banner-img"
            />
          </div>

        </div>
      </section>

      {/* Interactive Video / Walkthrough Modal */}
      {isVideoModalOpen && (
        <div className="analysis-modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
          <div className="analysis-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-col">
                <span className="skinive-section-eyebrow">Interactive Clinical Demonstration</span>
                <h3 className="modal-title">DermaAI End-to-End Diagnostic Pipeline</h3>
              </div>
              <button 
                className="modal-close-btn"
                onClick={() => setIsVideoModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-video-viewport">
              <div className="demo-flow-presentation">
                <div className="flow-step-box">
                  <span className="step-num-pill">Step 1</span>
                  <h4>10x Macro Capture</h4>
                  <p>User takes or uploads high-resolution dermoscopic image via mobile app or WhatsApp.</p>
                </div>
                <div className="flow-step-divider">→</div>
                <div className="flow-step-box">
                  <span className="step-num-pill">Step 2</span>
                  <h4>CNN & Grad-CAM</h4>
                  <p>Deep neural layers classify 80+ conditions and generate visual gradient heatmaps.</p>
                </div>
                <div className="flow-step-divider">→</div>
                <div className="flow-step-box">
                  <span className="step-num-pill">Step 3</span>
                  <h4>Doctor Triage</h4>
                  <p>Matches nearby verified clinics by distance, availability, and doctor gender preference.</p>
                </div>
              </div>

              <div className="modal-cta-bar">
                <button 
                  className="skinive-btn-pill-primary"
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onOpenScanner();
                  }}
                >
                  <span>Launch Live Scanner Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
