import React from 'react';
import { Activity, Clock, ShieldAlert } from 'lucide-react';

export default function StatsBanner({ onOpenScanner }) {
  const stats = [
    { value: "14.58%", label: "RISKS IDENTIFIED", detail: "Early triage flagged" },
    { value: "111,549", label: "ECZEMA & ATOPIC", detail: "Inflammatory cases" },
    { value: "207,287", label: "PSORIASIS RISKS", detail: "Plaque & pustular" },
    { value: "1,867", label: "CANCER / MELANOMA", detail: "Urgent biopsy flagged" },
    { value: "726,032", label: "ACNE, ROSACEA", detail: "Follicular evaluations" }
  ];

  return (
    <section className="skinive-stats-banner-section" id="statistics">
      <div className="container">
        <div className="skinive-stats-card-shell">
          
          {/* Subtle Dynamic Neural Wave Vectors in Background */}
          <div className="stats-card-bg-waves">
            <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="bg-waves-svg">
              <path 
                d="M 0 120 Q 300 40 600 130 T 1200 80" 
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="1.2" 
                opacity="0.16" 
              />
              <path 
                d="M 0 200 Q 350 290 700 160 T 1200 240" 
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="1.5" 
                opacity="0.12" 
              />
              <path 
                d="M 0 80 Q 400 180 800 60 T 1200 140" 
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="0.9" 
                opacity="0.2" 
              />
            </svg>
          </div>

          {/* Top Row: Heading on Left, Glass Stat Box on Right */}
          <div className="stats-card-top-row">
            <div className="stats-card-title-col">
              <span className="stats-card-eyebrow">DermaAI Usage Statistics</span>
              <h2 className="stats-card-heading">
                Skin Checks and Risk Indicators Reported
              </h2>
            </div>

            <div className="stats-card-glass-counter">
              <div className="counter-inner">
                <span className="counter-big-number">679,085+</span>
                <span className="counter-sub-label">Skin checks done</span>
                <div className="counter-timestamp-pill">
                  <span className="timestamp-dot"></span>
                  <span>Last updated: 11.10.2026 15:37</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 5 Metric Columns */}
          <div className="stats-metrics-strip">
            {stats.map((s, idx) => (
              <div key={idx} className="metric-strip-item">
                <span className="metric-strip-value">{s.value}</span>
                <span className="metric-strip-label">{s.label}</span>
                <span className="metric-strip-detail">{s.detail}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
