import React from 'react';
import { Activity, ArrowUp, ShieldCheck, Mail, Smartphone, Lock } from 'lucide-react';

export default function Footer({ onOpenScanner, onOpenDoctorMatch, onOpenAuth, onOpenDoctorPortal, onOpenContact }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="skinive-clean-light-footer">
      <div className="container">
        
        {/* Medical Notice Capsule Bar - Clean Hospital Light Theme */}
        <div className="clean-medical-notice-capsule">
          <div className="clean-shield-icon-bubble">
            <ShieldCheck size={22} color="#0055FF" strokeWidth={2.4} />
          </div>
          <p className="clean-notice-text">
            <strong>Clinical Safety Notice:</strong> DermaAI is an AI-powered preliminary screening and triage assistant designed to support clinical assessment. It does not replace histopathological biopsy or physical evaluation by a board-certified physician. For bleeding, spreading, or painful lesions, seek immediate in-person dermatological care.
          </p>
        </div>

        {/* 4-Column Professional Clean Footer Grid */}
        <div className="clean-footer-grid">
          {/* Brand Col */}
          <div className="clean-footer-col brand-col">
            <div className="clean-footer-brand-wrap" onClick={scrollToTop} role="button" tabIndex={0}>
              <div className="clean-footer-circle-logo">
                <Activity size={20} color="#FFFFFF" strokeWidth={2.8} />
              </div>
              <span className="clean-footer-brand-title">Derma<span className="text-electric">AI</span></span>
            </div>
            <p className="clean-footer-tagline">
              Universal AI-powered dermatology screening with explainable Grad-CAM heatmaps and smart verified doctor matching.
            </p>
            <div className="clean-footer-trust-tags">
              <span className="trust-pill"><Lock size={12} /> GDPR Compliant</span>
              <span className="trust-pill">ISO 13485 Standard</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="clean-footer-col">
            <h4 className="clean-footer-heading">Platform</h4>
            <ul className="clean-footer-links-list">
              <li><button onClick={onOpenScanner} className="clean-footer-link-btn">Launch AI Scanner</button></li>
              <li><a href="#gradcam-showcase" className="clean-footer-link-btn">Grad-CAM Explainability</a></li>
              <li><button onClick={onOpenDoctorMatch} className="clean-footer-link-btn">Doctor Matching</button></li>
              <li><a href="#key-features" className="clean-footer-link-btn">Core Features</a></li>
            </ul>
          </div>

          {/* Solutions & Access */}
          <div className="clean-footer-col">
            <h4 className="clean-footer-heading">Access Channels</h4>
            <ul className="clean-footer-links-list">
              <li><button onClick={onOpenScanner} className="clean-footer-link-btn">Web Application</button></li>
              <li><button onClick={onOpenScanner} className="clean-footer-link-btn">WhatsApp 24/7 Bot</button></li>
              <li><button onClick={() => onOpenDoctorPortal ? onOpenDoctorPortal() : onOpenAuth('doctor')} className="clean-footer-link-btn">Clinician Portal</button></li>
              <li><a href="#faq" className="clean-footer-link-btn">Clinical FAQ</a></li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="clean-footer-col">
            <h4 className="clean-footer-heading">Medical Support</h4>
            <ul className="clean-footer-links-list">
              <li><button onClick={onOpenContact} className="clean-footer-link-btn" style={{ color: '#0055FF', fontWeight: 600 }}>Contact Clinical Desk →</button></li>
              <li><span className="clean-footer-contact-item"><Mail size={14} color="#0055FF" /> support@derma-ai.org</span></li>
              <li><span className="clean-footer-contact-item"><Smartphone size={14} color="#0055FF" /> +91 (020) 2550-1000</span></li>
              <li><span className="clean-footer-meta-pill">Triage Response &lt; 30s</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Rounded Back-to-Top Button */}
        <div className="clean-footer-bottom-bar">
          <p className="clean-footer-copyright">
            © 2026 DermaAI Platform. Deep Image Analysis & Clinical Explainability.
          </p>

          <button 
            className="clean-back-to-top-circle-btn"
            onClick={scrollToTop}
            title="Scroll back to top"
            aria-label="Back to Top"
          >
            <span>Back to Top</span>
            <ArrowUp size={15} />
          </button>
        </div>

      </div>
    </footer>
  );
}
