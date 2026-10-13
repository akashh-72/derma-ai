import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Play, 
  Star 
} from 'lucide-react';

import hero1 from '../assets/hero1.png';
import hero2 from '../assets/hero2.png';
import hero3 from '../assets/hero3.png';

const HERO_CASES = [
  {
    id: 'eczema',
    image: hero1,
    name: 'Eczema / Atopic Dermatitis',
    folder: 'Eczema Photos',
    urgency: 'Potential risk',
    badgeClass: 'badge-danger',
    confidence: '96.2%',
    description: 'Chronic inflammatory condition causing dry, pruritic patches with erythema and localized lichenification. Requires barrier restoration and clinical monitoring.'
  },
  {
    id: 'acne',
    image: hero2,
    name: 'Acne & Rosacea',
    folder: 'Acne And Rosacea Photos',
    urgency: 'Moderate risk',
    badgeClass: 'badge-warning',
    confidence: '95.8%',
    description: 'Follicular papulopustular eruption with central facial erythema, telangiectasia, and inflammatory comedones evaluated via dermoscopic macro zoom.'
  },
  {
    id: 'ringworm',
    image: hero3,
    name: 'Fungal Infection / Ringworm',
    folder: 'Fu Ringworm',
    urgency: 'Moderate risk',
    badgeClass: 'badge-warning',
    confidence: '94.7%',
    description: 'Superficial tinea dermatophyte infection characterized by annular scaling erythematous rings with central clearing and active advancing borders.'
  }
];

export default function Hero({ onOpenScanner, onExploreGradCam, onOpenVideoDemo }) {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);

  // Auto-slide every 3.8s with smooth fade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCaseIndex((prev) => (prev + 1) % HERO_CASES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="skinive-hero-section" id="hero">
      <div className="container skinive-hero-container">
        
        {/* Left Column: Bold Typography & Actions */}
        <div className="skinive-hero-left">
          <div className="skinive-hero-eyebrow">
            <span className="eyebrow-pulse-dot"></span>
            <span>CLINICAL AI DERMATOLOGY</span>
          </div>

          <h1 className="skinive-hero-title">
            AI SKIN<br />SCANNER
          </h1>

          <p className="skinive-hero-subtitle">
            Screen skin conditions across 8 balanced dataset classes—Acne & Rosacea, Eczema, Fungal Ringworm, Alopecia, Healthy Control, Melanoma, Vascular Tumors, and Chickenpox—with deep CNN vision and Grad-CAM heatmaps.
          </p>

          <div className="skinive-hero-cta-row">
            <button 
              className="skinive-btn-pill-primary"
              onClick={onOpenScanner}
              id="hero-start-scan-btn"
            >
              <span>Start Free AI Scan</span>
              <ArrowRight size={18} />
            </button>

            <button 
              className="skinive-btn-pill-secondary"
              onClick={onOpenVideoDemo || onExploreGradCam}
              id="hero-watch-demo-btn"
            >
              <div className="play-icon-circle">
                <Play size={13} fill="#0055FF" />
              </div>
              <span>WATCH VIDEO</span>
            </button>
          </div>

          {/* Bottom Floating Stats Cards */}
          <div className="skinive-hero-stats-cards">
            <div className="skinive-stat-card">
              <span className="stat-card-number">50K+</span>
              <span className="stat-card-label">Satisfied users worldwide</span>
            </div>

            <div className="skinive-stat-card">
              <div className="stat-card-rating-row">
                <span className="stat-card-number">4.9</span>
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#FF9500" color="#FF9500" />
                  ))}
                </div>
              </div>
              <span className="stat-card-label">Average clinical rating</span>
            </div>
          </div>
        </div>

        {/* Right Column: Borderless High-Fidelity Diagnostic Screen with Auto-Slide Smooth Fade */}
        <div className="skinive-hero-right">
          <div className="hero-stage-card-wrapper">
            <div className="hero-showcase-frame">
              {HERO_CASES.map((item, index) => {
                const isActive = index === currentCaseIndex;
                return (
                  <img 
                    key={item.id}
                    src={item.image} 
                    alt={`${item.name} - DermaAI Clinical AI Scanner`}
                    className={`hero-showcase-img ${isActive ? 'active' : ''}`}
                    aria-hidden={!isActive}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
