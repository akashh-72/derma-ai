import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Activity, 
  HelpCircle, 
  Sparkles,
  Calendar
} from 'lucide-react';

export default function PatientQuestionnaire({ 
  user, 
  onNavigateTab 
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form State
  const [formData, setFormData] = useState({
    duration: '< 1 week',
    affectedArea: 'Face & Neck',
    symptoms: ['Itching', 'Redness'],
    severityRating: 6,
    skinConditions: 'no',
    skinConditionsDetails: '',
    medications: 'no',
    medicationsDetails: '',
    allergies: 'no',
    allergiesDetails: '',
    sunscreenUsage: 'Daily SPF 30+',
    sunExposure: 'Moderate (1-3 hrs/day)',
    stressLevel: 'Moderate'
  });

  const [assessmentResult, setAssessmentResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleSymptom = (sym) => {
    setFormData(prev => {
      const exists = prev.symptoms.includes(sym);
      return {
        ...prev,
        symptoms: exists ? prev.symptoms.filter(s => s !== sym) : [...prev.symptoms, sym]
      };
    });
  };

  const handleCalculateAssessment = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      // Calculate risk score
      let score = 20;
      if (formData.duration === '> 6 months') score += 25;
      else if (formData.duration === '1-6 months') score += 15;

      score += formData.severityRating * 3.5;
      score += formData.symptoms.length * 5;

      if (formData.symptoms.includes('Bleeding/Oozing')) score += 20;
      if (formData.skinConditions === 'yes') score += 10;
      if (formData.sunscreenUsage === 'Never') score += 15;

      let riskLevel = 'Moderate Risk';
      let riskColor = 'amber';
      let recommendation = 'Schedule a standard dermatological consultation. In the interim, implement gentle barrier repair moisturization and daily SPF 50+ broad-spectrum photoprotection.';

      if (score >= 70 || formData.symptoms.includes('Bleeding/Oozing')) {
        riskLevel = 'Elevated Clinical Attention';
        riskColor = 'red';
        recommendation = 'Your clinical symptom score indicates active inflammation or potentially evolving cutaneous changes. Prompt evaluation and dermoscopic biopsy within 3 to 5 days is recommended.';
      } else if (score < 40) {
        riskLevel = 'Mild / Low Risk';
        riskColor = 'emerald';
        recommendation = 'Symptoms appear mild and characteristic of localized, transient barrier irritation. Continue gentle non-comedogenic skincare and monitor for morphological changes.';
      }

      const result = {
        score: Math.min(96, Math.round(score)),
        riskLevel,
        riskColor,
        recommendation,
        submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      setAssessmentResult(result);
      setIsSubmitting(false);

      // Save to localStorage
      try {
        const assessments = JSON.parse(localStorage.getItem('dermaai_questionnaires') || '[]');
        assessments.unshift({ ...result, patientId: user?.uid, details: formData });
        localStorage.setItem('dermaai_questionnaires', JSON.stringify(assessments));
      } catch (e) {}
    }, 600);
  };

  return (
    <div className="patient-questionnaire-tab">
      {/* 1. Header Banner */}
      <div className="portal-welcome-header">
        <div className="portal-welcome-left">
          <h1>
            Clinical Dermatology Health Questionnaire
          </h1>
          <p>
            Complete this 10-point validated clinical assessment to evaluate skin health risk, barrier disruption, and diagnostic priorities.
          </p>
        </div>
      </div>

      {!assessmentResult ? (
        <div className="portal-card" style={{ maxWidth: '820px', margin: '0 auto' }}>
          {/* Progress Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: '#64748B', marginBottom: '0.4rem' }}>
              <span>Phase {currentStep} of {totalSteps}: {currentStep === 1 ? 'Condition Profile' : currentStep === 2 ? 'Symptoms & Severity' : currentStep === 3 ? 'Medical History' : 'Lifestyle & Photoprotection'}</span>
              <span style={{ color: '#0055FF' }}>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ width: `${(currentStep / totalSteps) * 100}%`, height: '100%', background: '#0055FF', transition: 'width 0.3s ease' }} />
            </div>
          </div>

          {/* Step 1: Duration and Affected Area */}
          {currentStep === 1 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.25rem' }}>
                1. Duration & Location of Cutaneous Concern
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.5rem' }}>
                  How long has this skin symptom or spot been present?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.65rem' }}>
                  {['< 1 week', '1-4 weeks', '1-6 months', '> 6 months'].map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setFormData({ ...formData, duration: d })}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '12px',
                        border: formData.duration === d ? '2px solid #0055FF' : '1px solid #E2E8F0',
                        background: formData.duration === d ? '#EFF6FF' : '#FFFFFF',
                        color: formData.duration === d ? '#0055FF' : '#475569',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.5rem' }}>
                  Primary Affected Anatomical Region:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.65rem' }}>
                  {['Face & Neck', 'Hands & Arms', 'Chest & Back', 'Legs & Feet', 'Scalp / Beard', 'Generalized Body'].map(area => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setFormData({ ...formData, affectedArea: area })}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '12px',
                        border: formData.affectedArea === area ? '2px solid #0055FF' : '1px solid #E2E8F0',
                        background: formData.affectedArea === area ? '#EFF6FF' : '#FFFFFF',
                        color: formData.affectedArea === area ? '#0055FF' : '#475569',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Symptoms and Severity */}
          {currentStep === 2 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.25rem' }}>
                2. Symptoms & Pain/Itch Intensity
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.5rem' }}>
                  Select all symptoms you are currently experiencing:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.65rem' }}>
                  {['Itching', 'Redness', 'Burning', 'Bumps/Pimples', 'Flaking/Scaling', 'Dryness', 'Bleeding/Oozing', 'Tenderness'].map(sym => {
                    const isChecked = formData.symptoms.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        style={{
                          padding: '0.65rem',
                          borderRadius: '12px',
                          border: isChecked ? '2px solid #0055FF' : '1px solid #E2E8F0',
                          background: isChecked ? '#EFF6FF' : '#FFFFFF',
                          color: isChecked ? '#0055FF' : '#475569',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {isChecked ? '✓ ' : '+ '}{sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                    Overall Discomfort / Severity Rating (1 to 10):
                  </label>
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0055FF' }}>
                    {formData.severityRating} / 10
                  </span>
                </div>
                <input 
                  type="range"
                  min="1"
                  max="10"
                  value={formData.severityRating}
                  onChange={(e) => setFormData({ ...formData, severityRating: parseInt(e.target.value) })}
                  style={{ width: '100%', accentColor: '#0055FF' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B', marginTop: '0.35rem' }}>
                  <span>1 (Barely noticeable)</span>
                  <span>5 (Moderate discomfort)</span>
                  <span>10 (Severe / Disabling)</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Medical History & Allergies */}
          {currentStep === 3 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.25rem' }}>
                3. Dermatological History & Allergies
              </h3>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.4rem' }}>
                  Do you have a personal or family history of chronic skin disease (Eczema, Psoriasis, Melanoma)?
                </label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['no', 'yes'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFormData({ ...formData, skinConditions: val })}
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '10px',
                        border: formData.skinConditions === val ? '2px solid #0055FF' : '1px solid #E2E8F0',
                        background: formData.skinConditions === val ? '#EFF6FF' : '#FFFFFF',
                        color: formData.skinConditions === val ? '#0055FF' : '#475569',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                {formData.skinConditions === 'yes' && (
                  <input 
                    type="text"
                    placeholder="Specify condition (e.g. maternal atopic eczema, dysplastic nevi)..."
                    value={formData.skinConditionsDetails}
                    onChange={(e) => setFormData({ ...formData, skinConditionsDetails: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', marginTop: '0.5rem', fontSize: '0.8rem' }}
                  />
                )}
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.4rem' }}>
                  Do you have any known contact, drug, or environmental allergies?
                </label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['no', 'yes'].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFormData({ ...formData, allergies: val })}
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '10px',
                        border: formData.allergies === val ? '2px solid #0055FF' : '1px solid #E2E8F0',
                        background: formData.allergies === val ? '#EFF6FF' : '#FFFFFF',
                        color: formData.allergies === val ? '#0055FF' : '#475569',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                {formData.allergies === 'yes' && (
                  <input 
                    type="text"
                    placeholder="Specify allergies (e.g. Nickel, fragrance mix, penicillin)..."
                    value={formData.allergiesDetails}
                    onChange={(e) => setFormData({ ...formData, allergiesDetails: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '10px', border: '1px solid #CBD5E1', marginTop: '0.5rem', fontSize: '0.8rem' }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Step 4: Lifestyle & Sun Exposure */}
          {currentStep === 4 && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.25rem' }}>
                4. Sunscreen Habits & UV Exposure
              </h3>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.4rem' }}>
                  How frequently do you apply sunscreen on exposed skin?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  {['Daily SPF 30+', 'Only on Sunny Days', 'Rarely / Outdoors Only', 'Never'].map(sc => (
                    <button
                      key={sc}
                      type="button"
                      onClick={() => setFormData({ ...formData, sunscreenUsage: sc })}
                      style={{
                        padding: '0.65rem',
                        borderRadius: '10px',
                        border: formData.sunscreenUsage === sc ? '2px solid #0055FF' : '1px solid #E2E8F0',
                        background: formData.sunscreenUsage === sc ? '#EFF6FF' : '#FFFFFF',
                        color: formData.sunscreenUsage === sc ? '#0055FF' : '#475569',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '0.4rem' }}>
                  Average Daily Direct Sun Exposure:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
                  {['Low (< 1 hr)', 'Moderate (1-3 hrs/day)', 'High (> 3 hrs/day)'].map(exp => (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => setFormData({ ...formData, sunExposure: exp })}
                      style={{
                        padding: '0.65rem',
                        borderRadius: '10px',
                        border: formData.sunExposure === exp ? '2px solid #0055FF' : '1px solid #E2E8F0',
                        background: formData.sunExposure === exp ? '#EFF6FF' : '#FFFFFF',
                        color: formData.sunExposure === exp ? '#0055FF' : '#475569',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem' }}>
            {currentStep > 1 ? (
              <button
                className="portal-btn-secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                <ArrowLeft size={16} />
                <span>Previous Step</span>
              </button>
            ) : <div />}

            {currentStep < totalSteps ? (
              <button
                className="portal-btn-primary"
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                className="portal-btn-primary"
                onClick={handleCalculateAssessment}
                disabled={isSubmitting}
              >
                <Sparkles size={16} />
                <span>{isSubmitting ? 'Calculating Score...' : 'Calculate Clinical Assessment'}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Assessment Results Card */
        <div className="portal-card" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#EFF6FF', color: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <ShieldCheck size={32} />
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
              Cutaneous Clinical Risk Score: {assessmentResult.score} / 100
            </h2>
            <span className={`portal-badge ${assessmentResult.riskColor}`} style={{ fontSize: '0.85rem', padding: '0.35rem 0.85rem' }}>
              {assessmentResult.riskLevel}
            </span>
          </div>

          <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #E2E8F0' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
              Personalized Clinical Recommendation:
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>
              {assessmentResult.recommendation}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.85rem', borderRadius: '12px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>RECORDED AREA</span>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>{formData.affectedArea}</span>
            </div>
            <div style={{ padding: '0.85rem', borderRadius: '12px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>SYMPTOMS COUNT</span>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>{formData.symptoms.join(', ')}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button
              className="portal-btn-secondary"
              onClick={() => {
                setAssessmentResult(null);
                setCurrentStep(1);
              }}
            >
              Retake Questionnaire
            </button>
            <button
              className="portal-btn-primary"
              onClick={() => onNavigateTab('scanner')}
            >
              Scan Lesion with AI Vision
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
