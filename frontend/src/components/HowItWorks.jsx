import React from 'react';
import { 
  UploadCloud, 
  Cpu, 
  Layers, 
  UserCheck, 
  ArrowRight
} from 'lucide-react';

export default function HowItWorks({ onOpenScanner }) {
  const steps = [
    {
      num: "01",
      icon: <UploadCloud size={20} className="text-electric" strokeWidth={2} />,
      title: "Image Ingestion",
      desc: "Upload a dermoscopic photo via our web app or send it via WhatsApp. Automated checks ensure adequate focus, lighting, and resolution."
    },
    {
      num: "02",
      icon: <Cpu size={20} className="text-electric" strokeWidth={2} />,
      title: "Tensor Preprocessing",
      desc: "The system standardizes input dimensions, applies CLAHE contrast optimization, and normalizes RGB channels to clinical model tensor format."
    },
    {
      num: "03",
      icon: <Layers size={20} className="text-electric" strokeWidth={2} />,
      title: "CNN & Grad-CAM Analysis",
      desc: "Convolutional neural network extracts deep spatial features while computing backpropagation gradients to produce visual activation heatmaps."
    },
    {
      num: "04",
      icon: <UserCheck size={20} className="text-electric" strokeWidth={2} />,
      title: "Triage & Smart Doctor Connect",
      desc: "Receive immediate condition triage with self-care precautions, then connect with nearby dermatologists filtered by location and gender preference."
    }
  ];

  return (
    <section className="section-padding how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Diagnostic Flow</span>
          <h2 className="section-title">
            The 4-Step <span className="text-electric">Image Analysis Pipeline</span>
          </h2>
          <p className="section-desc">
            From raw smartphone dermoscopy to explainable neural heatmaps and clinical appointment scheduling.
          </p>
        </div>

        <div className="clean-steps-grid">
          {steps.map((step) => (
            <div key={step.num} className="clean-step-card">
              <div className="step-card-header">
                <span className="step-counter">{step.num}</span>
                <div className="step-icon-box">{step.icon}</div>
              </div>
              <h3 className="step-heading">{step.title}</h3>
              <p className="step-copy">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="section-cta-center">
          <button 
            className="btn btn-primary"
            onClick={onOpenScanner}
          >
            <span>Experience The Live Pipeline</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
