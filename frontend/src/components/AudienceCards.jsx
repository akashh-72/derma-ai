import React from 'react';
import { 
  Home, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  Lock, 
  Award
} from 'lucide-react';

export default function AudienceCards({ onOpenScanner, onOpenDoctorMatch, onOpenAuth, onOpenDoctorPortal }) {
  const cards = [
    {
      id: "individuals",
      tag: "PATIENTS & INDIVIDUALS",
      title: "For Individuals",
      description: "Check visible skin concerns, monitor changes over time, and learn when professional clinical care is recommended.",
      bgClass: "card-gradient-blue",
      iconColor: "#0066FF",
      icon: <Home size={28} color="#0066FF" strokeWidth={2.4} />,
      action: onOpenScanner,
      btnText: "Launch Patient Scan"
    },
    {
      id: "clinicians",
      tag: "DOCTORS & DERMATOLOGY CLINICS",
      title: "For Clinicians",
      description: "Support more consistent skin assessments, track lesion morphometry, and improve the triage efficiency of clinical workflows.",
      bgClass: "card-gradient-indigo",
      iconColor: "#1D4ED8",
      icon: <ShieldCheck size={28} color="#1D4ED8" strokeWidth={2.4} />,
      action: onOpenDoctorPortal || (() => onOpenAuth('doctor')),
      btnText: "Access Doctor Portal"
    },
    {
      id: "developers",
      tag: "TELEHEALTH & CHANNELS",
      title: "For Multi-Platform & WhatsApp",
      description: "Integrate AI-powered skin analysis into digital health portals, telemedicine records, and zero-install WhatsApp channels.",
      bgClass: "card-gradient-violet",
      iconColor: "#6366F1",
      icon: <Smartphone size={28} color="#6366F1" strokeWidth={2.4} />,
      action: onOpenScanner,
      btnText: "Explore Multi-Channel"
    }
  ];

  return (
    <section className="skinive-audience-section" id="audience">
      <div className="container">
        
        {/* Header Row: Title on Left, Regulatory Trust Badges on Right */}
        <div className="audience-header-row">
          <div className="audience-header-left">
            <span className="audience-eyebrow">Dermatology Technology for Everyone</span>
            <h2 className="audience-title">Universal AI Skin Screening</h2>
          </div>

          <div className="audience-header-right">
            {/* Regulatory Compliance Badges */}
            <div className="regulatory-badges-group">
              {/* CE Mark */}
              <div className="reg-badge ce-badge">
                <span className="ce-symbol">CE</span>
              </div>

              {/* GDPR Compliant */}
              <div className="reg-badge gdpr-badge">
                <div className="gdpr-star-ring">
                  <Lock size={12} className="gdpr-lock-icon" />
                </div>
                <div className="gdpr-text-col">
                  <span className="gdpr-title">GDPR</span>
                  <span className="gdpr-sub">COMPLIANT</span>
                </div>
              </div>

              {/* ISO 13485 */}
              <div className="reg-badge iso-badge">
                <div className="iso-check-icon">
                  <Award size={15} />
                </div>
                <div className="iso-text-col">
                  <span className="iso-title">ISO 13485</span>
                  <span className="iso-sub">CLINICAL QUALITY</span>
                </div>
              </div>
            </div>

            <p className="regulatory-compliance-subtext">
              DermaAI software is developed with clinical dermatological protocols and used by individuals, researchers, and healthcare professionals worldwide.
            </p>
          </div>
        </div>

        {/* 3 High-Contrast Rounded Squircle Cards */}
        <div className="audience-squircles-grid">
          {cards.map((c) => (
            <div 
              key={c.id} 
              className={`audience-squircle-card ${c.bgClass}`}
              onClick={c.action}
              role="button"
              tabIndex={0}
            >
              <div className="squircle-card-content">
                {/* White Rounded Squircle Icon Box */}
                <div className="squircle-icon-box">
                  {c.icon}
                </div>

                <div className="squircle-body">
                  <span className="squircle-badge-tag">{c.tag}</span>
                  <h3 className="squircle-title">{c.title}</h3>
                  <p className="squircle-desc">{c.description}</p>
                </div>

                {/* Bottom Action Arrow */}
                <div className="squircle-footer">
                  <span className="squircle-action-hint">{c.btnText}</span>
                  <div className="squircle-arrow-bubble">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
