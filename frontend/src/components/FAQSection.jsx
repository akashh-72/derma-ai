import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="skinive-faq-section" id="faq">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="skinive-section-eyebrow">
            <span className="eyebrow-pulse-dot"></span>
            <span>Frequently Asked Questions</span>
          </span>
          <h2 className="skinive-section-title">
            Questions & <span className="text-electric">Clinical Answers</span>
          </h2>
          <p className="skinive-section-desc">
            Key insights regarding deep learning inference, Grad-CAM visual heatmaps, and dermatologist matching.
          </p>
        </div>

        {/* Modern Accordion Stack */}
        <div className="faq-modern-accordion-stack">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-modern-squircle-item ${isOpen ? 'active' : ''}`}
              >
                <button 
                  className="faq-modern-trigger-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-title-text">{item.q}</span>
                  <div className={`faq-circle-chevron ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-dropdown-pane">
                    <p className="faq-answer-body-text">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
