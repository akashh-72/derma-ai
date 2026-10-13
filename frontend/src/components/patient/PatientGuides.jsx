import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  ShieldCheck, 
  Sun, 
  Droplets, 
  Camera, 
  CheckCircle2, 
  Heart, 
  Leaf, 
  BookOpen, 
  AlertCircle 
} from 'lucide-react';

export default function PatientGuides({ onNavigateTab }) {
  const [activeGuideTab, setActiveGuideTab] = useState('actives'); // 'actives' | 'routines' | 'nutrition' | 'photography'

  const actives = [
    {
      name: 'Ceramides (Lipid Complex)',
      role: 'Skin Barrier Repair & Moisture Lock',
      bestFor: 'Eczema, Atopic Dermatitis, Compromised Barrier, Dry Skin',
      howToUse: 'Apply within 3 minutes of bathing to seal in hydration. Non-comedogenic and ideal for daily twice-a-day use.',
      clinicalNote: 'Essential structural lipids that constitute >50% of the normal epidermal stratum corneum.'
    },
    {
      name: 'Salicylic Acid (BHA 1-2%)',
      role: 'Pore Clarifying & Keratolytic Exfoliation',
      bestFor: 'Acne Vulgaris, Blackheads, Oily Skin, Follicular Clogging',
      howToUse: 'Use 2-3 nights per week as a cleanser or leave-on serum. Oil-soluble so it penetrates deep inside sebaceous pores.',
      clinicalNote: 'Breaches sebum plug to dissolve desquamated keratinocytes and curb Cutibacterium acnes.'
    },
    {
      name: 'Azelaic Acid (10-20%)',
      role: 'Anti-inflammatory, Redness Reduction & Anti-Bacterial',
      bestFor: 'Rosacea, Facial Flushing, Post-Inflammatory Erythema (PIE), Melasma',
      howToUse: 'Apply thin layer morning or evening before heavier moisturizer. Safe for sensitive skin.',
      clinicalNote: 'Inhibits follicular micro-comedones and reduces cutaneous tyrosinase enzyme activity.'
    },
    {
      name: 'Niacinamide (Vitamin B3 2-5%)',
      role: 'Sebum Normalization & Barrier Lipid Synthesis',
      bestFor: 'Redness, Enlarged Pores, Mild Acne, Sensitive Complexion',
      howToUse: 'Gentle water-soluble vitamin. Can be layered twice daily with almost all other dermatological actives.',
      clinicalNote: 'Increases epidermal ceramide synthesis and dampens IL-6 cytokine inflammatory cascade.'
    },
    {
      name: 'Mineral Zinc Oxide & Titanium Dioxide (SPF 50+)',
      role: 'Broad-Spectrum UV Photoprotection',
      bestFor: 'All Skin Types, Reactive Skin, Post-Procedural Care, Moles',
      howToUse: 'Apply generously every morning 15 minutes before UV exposure. Reapply every 2 hours outdoors.',
      clinicalNote: 'Physical blockers that reflect UVA and UVB photons without generating inflammatory chemical heat.'
    },
    {
      name: 'Topical Retinoids (Adapalene / Tretinoin)',
      role: 'Cellular Turnover Acceleration & Collagen Genesis',
      bestFor: 'Comedonal Acne, Skin Texture, Photodamage, Fine Wrinkles',
      howToUse: 'Apply a pea-sized amount at bedtime onto dry skin. Always pair with morning sunscreen.',
      clinicalNote: 'Binds to nuclear retinoic acid receptors (RAR) to normalize epidermal differentiation.'
    }
  ];

  return (
    <div className="patient-guides-tab">
      {/* 1. Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            Dermatology Clinical Guides & Skincare Encyclopedia
          </h1>
          <p>
            Evidence-based clinical guidelines on active dermatological ingredients, skin barrier restoration, dietary wellness, and diagnostic photography.
          </p>
        </div>

        <div className="portal-welcome-actions">
          <button 
            className="portal-btn-primary"
            onClick={() => onNavigateTab('scanner')}
          >
            <Camera size={16} />
            <span>Scan My Skin</span>
          </button>
        </div>
      </div>

      {/* 2. Guide Tabs Selector */}
      <div className="portal-card" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'actives', label: '🔬 Active Ingredients Encyclopedia' },
            { id: 'routines', label: '🧴 Skincare Routines by Skin Type' },
            { id: 'nutrition', label: '🥗 Nutrition & Gut-Skin Wellness' },
            { id: 'photography', label: '📸 Diagnostic Photography Guide' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveGuideTab(tab.id)}
              style={{
                border: 'none',
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: activeGuideTab === tab.id ? '#0055FF' : '#F1F5F9',
                color: activeGuideTab === tab.id ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Active Ingredients Content */}
      {activeGuideTab === 'actives' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {actives.map((act, i) => (
            <div key={i} className="portal-card" style={{ margin: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="portal-badge blue" style={{ fontSize: '0.7rem' }}>
                  Clinical Active
                </span>
                <Sparkles size={16} color="#0055FF" />
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                {act.name}
              </h3>
              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0055FF', marginBottom: '0.85rem' }}>
                {act.role}
              </p>

              <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '0.85rem', fontSize: '0.8rem' }}>
                <strong style={{ color: '#0F172A' }}>Ideal Condition:</strong>
                <p style={{ color: '#475569', margin: '0.2rem 0 0' }}>{act.bestFor}</p>
              </div>

              <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                <strong style={{ color: '#0F172A' }}>Application Protocol: </strong>{act.howToUse}
              </p>

              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.65rem', fontSize: '0.75rem', color: '#64748B', fontStyle: 'italic' }}>
                💡 {act.clinicalNote}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Routines by Skin Type Content */}
      {activeGuideTab === 'routines' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              type: 'Oily & Acne-Prone Complexion',
              color: 'blue',
              morning: ['Gentle foaming salicylic acid wash (2%)', 'Lightweight Niacinamide 4% serum', 'Oil-free gel moisturizer', 'Broad-spectrum matte mineral SPF 50+'],
              evening: ['Double cleanse with micellar water & gentle cleanser', 'Adapalene 0.1% or Azelaic acid 15%', 'Non-comedogenic barrier hydrator']
            },
            {
              type: 'Dry & Eczema-Prone Barrier Defect',
              color: 'amber',
              morning: ['Lukewarm water splash (skip foaming cleanser)', 'Hyaluronic acid on damp skin', 'Heavy Ceramide 3/6-II lipid cream', 'Hydrating mineral SPF 50+ without alcohol'],
              evening: ['Gentle cream cleanser (syndet)', 'Petroleum / Squalane barrier occlusion balm', 'Topical prescription hydrocortisone or tacrolimus as directed']
            },
            {
              type: 'Rosacea & Reactive Sensitive Skin',
              color: 'red',
              morning: ['Soap-free ultra-calming milk cleanser', 'Azelaic acid 10% for redness', 'Centella Asiatica / Cica calming cream', '100% Zinc Oxide mineral SPF 50+'],
              evening: ['Gentle rinse with thermal spring water', 'Panthenol / B5 repairing emulsion', 'Avoid all chemical peels, AHAs, and fragrances']
            }
          ].map((r, i) => (
            <div key={i} className="portal-card" style={{ margin: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className={`portal-badge ${r.color}`}>Skin Type Routine</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
                {r.type}
              </h3>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0055FF', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                  <Sun size={14} /> Morning Protocol (AM)
                </span>
                <ol style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#475569', lineHeight: 1.6 }}>
                  {r.morning.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                  <Droplets size={14} /> Evening Protocol (PM)
                </span>
                <ol style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#475569', lineHeight: 1.6 }}>
                  {r.evening.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. Nutrition & Gut-Skin Wellness Content */}
      {activeGuideTab === 'nutrition' && (
        <div className="portal-card">
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              The Gut-Skin Microbiome Axis & Clinical Nutrition
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              Cutaneous inflammation often mirrors systemic metabolic and gut microbial balance. Targeted dietary choices dampen pro-inflammatory cytokines that exacerbate acne, eczema, and psoriasis.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1.25rem', borderRadius: '16px' }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#065F46', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={16} /> Beneficial Skin Foods
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#047857', lineHeight: 1.6 }}>
                  <li><strong>Wild Salmon & Sardines:</strong> Rich in EPA/DHA Omega-3s that suppress leukotriene B4.</li>
                  <li><strong>Leafy Greens & Berries:</strong> Polyphenols and Vitamin C neutralize UV free radicals.</li>
                  <li><strong>Fermented Foods (Kefir, Kimchi):</strong> Fortifies gut microbiome diversity.</li>
                  <li><strong>Pumpkin Seeds & Walnuts:</strong> High in Zinc and Vitamin E for cellular repair.</li>
                </ul>
              </div>

              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '1.25rem', borderRadius: '16px' }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#991B1B', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertCircle size={16} /> Common Flare Triggers
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#B91C1C', lineHeight: 1.6 }}>
                  <li><strong>High Glycemic Sugars:</strong> Spikes insulin and IGF-1, provoking sebaceous clogging.</li>
                  <li><strong>Skim Dairy Products:</strong> Contains whey hormones that trigger follicular flares.</li>
                  <li><strong>Alcohol & Spicy Capsaicin:</strong> Dilates facial microvessels, provoking rosacea flushing.</li>
                  <li><strong>Industrial Trans Fats:</strong> Accelerates systemic lipid peroxidation.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Diagnostic Photography Guide */}
      {activeGuideTab === 'photography' && (
        <div className="portal-card">
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Clinical Best Practices for Capturing Lesion Photos for AI
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              Deep learning computer vision models achieve optimal accuracy when input photos meet standardized dermoscopic illumination and distance criteria.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'block' }}>💡</span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>Diffused Natural Light</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>
                  Use natural daylight or white LED illumination. Avoid harsh direct phone flash which washes out lesion borders and creates specular glare.
                </p>
              </div>

              <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'block' }}>📏</span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>Optimal Distance (10 - 15 cm)</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>
                  Hold phone approximately 10 to 15 centimeters from the skin. Tap screen directly on the lesion center to lock focal sharpness.
                </p>
              </div>

              <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'block' }}>🔬</span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>Clean Neutral Background</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>
                  Ensure clothing, jewelry, or distracting shadows are removed from frame so neural attention focuses strictly on cutaneous tissue.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
