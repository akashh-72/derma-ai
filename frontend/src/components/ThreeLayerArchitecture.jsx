import React from 'react';
import { 
  Scan, 
  UserCheck, 
  HeartHandshake, 
  ArrowRight,
  Clock
} from 'lucide-react';

export default function ThreeLayerArchitecture({ onOpenScanner, onOpenDoctorMatch }) {
  const layers = [
    {
      num: "01",
      icon: <Scan size={22} className="text-electric" strokeWidth={2} />,
      title: "AI Vision & Explainability",
      subtitle: "Layer 01 • Deep CNN Inference",
      desc: "Instant image classification for 80+ skin conditions with Grad-CAM feature heatmaps that visually pinpoint lesion borders.",
      points: [
        "Broad classification (Eczema, Psoriasis, Acne, Melanoma)",
        "Grad-CAM visual gradients verify neural reasoning",
        "Sub-30 second clinical triage speed"
      ],
      actionText: "Try AI Scanner",
      action: onOpenScanner
    },
    {
      num: "02",
      icon: <UserCheck size={22} className="text-electric" strokeWidth={2} />,
      title: "Smart Dermatologist Match",
      subtitle: "Layer 02 • Clinical Triage Connect",
      desc: "Connects patients directly to verified local dermatologists based on GPS proximity, same-day slots, and doctor gender preferences.",
      points: [
        "Haversine distance ranking for nearest clinics",
        "Gender preference matching (Female / Male / Any)",
        "Direct appointment slot reservation"
      ],
      actionText: "Find Dermatologists",
      action: onOpenDoctorMatch
    },
    {
      num: "03",
      icon: <HeartHandshake size={22} className="text-electric" strokeWidth={2} />,
      title: "Comprehensive Care Journey",
      subtitle: "Layer 03 • Ongoing Guidance",
      desc: "Structured self-care precautions, digital prescription records, and multi-channel image submission via WhatsApp.",
      points: [
        "Actionable home care precautions & red flag alerts",
        "WhatsApp channel for mobile photo submission",
        "Digital consultation notes & longitudinal history"
      ],
      actionText: "Explore Protocols",
      action: onOpenScanner
    }
  ];

  return (
    <section className="section-padding three-layer-section" id="three-layer">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Care Architecture</span>
          <h2 className="section-title">
            The DermaAI <span className="text-electric">3-Layer Model</span>
          </h2>
          <p className="section-desc">
            Unlike fragmented apps that only output a raw prediction, DermaAI connects deep image analysis, explainable heatmaps, and local clinical matching into one integrated continuum.
          </p>
        </div>

        <div className="layers-grid">
          {layers.map((layer) => (
            <div key={layer.num} className="clean-layer-card">
              <div className="layer-top-row">
                <div className="layer-icon-circle">
                  {layer.icon}
                </div>
                <span className="layer-index">{layer.num}</span>
              </div>

              <span className="layer-kicker">{layer.subtitle}</span>
              <h3 className="layer-heading">{layer.title}</h3>
              <p className="layer-body">{layer.desc}</p>

              <ul className="layer-points-list">
                {layer.points.map((pt, idx) => (
                  <li key={idx} className="layer-point-item">
                    <span className="point-bullet"></span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="layer-footer-btn">
                <button 
                  className="clean-text-link"
                  onClick={layer.action}
                >
                  <span>{layer.actionText}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Longitudinal Care Insight */}
        <div className="clean-monitoring-card">
          <div className="monitoring-inner">
            <div className="monitoring-icon-frame">
              <Clock size={20} className="text-electric" />
            </div>
            <div className="monitoring-copy">
              <h4 className="monitoring-headline">
                One Scan is a Snapshot — Longitudinal Monitoring Builds Insight
              </h4>
              <p className="monitoring-subtext">
                Dermatological health evolves over weeks. Tracking visual flare-ups every 3–4 weeks generates chronological records that certified dermatologists can review to assess treatment response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
